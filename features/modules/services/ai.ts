import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  SchemaType,
  type GenerationConfig,
} from "@google/generative-ai";
import { appError } from "@/lib/api/errors";
import { validateSection, type ValidationResult } from "../lib/validation";
import { buildDeterministicFeedback, feedbackForCorrect, localScore, mergeFeedback } from "../lib/feedback";
import type { SectionItem } from "@/features/modules/types";
import {
  pickKeyIndex,
  markKeyUsed,
  cooldownKey,
  acquireSlot,
  releaseSlot,
} from "@/lib/rate-limit/coordinator";

const GENERATION_TIMEOUT_MS = 4000;
const RETRY_BASE_DELAY_MS = 250;

/** Collect all available Gemini API keys from env vars (GEMINI_API_KEY_1..N, fallback to GEMINI_API_KEY comma-separated). */
function collectApiKeys(): string[] {
  const keys: string[] = [];
  for (let i = 1; i <= 30; i++) {
    const k = process.env[`GEMINI_API_KEY_${i}`];
    if (k) keys.push(k);
  }
  if (keys.length === 0) {
    const single = process.env.GEMINI_API_KEY;
    if (single) keys.push(...single.split(",").map((s) => s.trim()).filter(Boolean));
  }
  return keys;
}

const apiKeys = collectApiKeys();
const MAX_RETRIES = apiKeys.length >= 3 ? 3 : Math.max(1, apiKeys.length);

/** Returns the API key at the given index, or empty string if index is out of range. */
function getKeyAt(index: number): string {
  return apiKeys[index] ?? "";
}

/** Check if an error is a quota/rate-limit error from Gemini. */
function isQuotaError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("RATE_LIMIT");
}

/**
 * Extracts the `retryAfter` seconds from a Gemini 429 error message.
 * Returns 0 if no value is found (treat as unknown / short wait).
 */
function extractRetryAfter(e: unknown): number {
  const msg = e instanceof Error ? e.message : String(e);
  // Gemini SDK surfaces: "Retry after X seconds" or "retry_delay: { seconds: X }"
  const secMatch = msg.match(/retry[\s_-]*(?:after|delay)[\s:,"]*(?:seconds[\s:,"]*)?([0-9]+)/i);
  if (secMatch) return Number(secMatch[1]);
  return 0;
}

/**
 * Retry a promise-returning function with exponential backoff and 429-aware key rotation.
 *
 * @param fn           - Async call to retry, receives the zero-based key index to use.
 * @param label        - Log label for the call (e.g. module/tab/section).
 * @param initialIndex - The key index picked before the first attempt.
 */
async function withRetry<T>(
  fn: (keyIdx: number) => Promise<T>,
  label: string,
  initialIndex: number,
): Promise<T> {
  let lastError: unknown;
  let currentIndex = initialIndex;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn(currentIndex);
    } catch (e) {
      lastError = e;
      if (attempt >= MAX_RETRIES - 1) throw e;

      if (isQuotaError(e)) {
        const retryAfter = extractRetryAfter(e);
        if (retryAfter >= 60) {
          // RPD exhausted — no point retrying within this session.
          console.warn(`[ai] ${label} RPD exhausted (retryAfter=${retryAfter}s), aborting retries`);
          throw e;
        }
        // RPM/TPM hit — cool down this key and pick a fresh one.
        const coolSecs = retryAfter > 0 ? retryAfter : 10;
        await cooldownKey(currentIndex, coolSecs);
        console.warn(
          `[ai] ${label} 429 (retryAfter=${coolSecs}s), cooling key ${currentIndex + 1} and picking new key`,
        );
      } else {
        console.warn(`[ai] ${label} transient error on attempt ${attempt + 1}/${MAX_RETRIES}:`, e);
      }

      // Pick a fresh key (coordinator will skip cooled-down keys).
      currentIndex = await pickKeyIndex(apiKeys.length);
      await markKeyUsed(currentIndex);

      const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

/** Static evaluation rules sent once as the system instruction — keeps the user prompt dynamic only. */
const SECTION_SYSTEM_INSTRUCTION = `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.

ATURAN PENILAIAN:
• KUNCI JAWABAN yang tercantum di prompt adalah MUTLAK dan sudah diverifikasi oleh ahli matematika. JANGAN PERNAH mempertanyakan atau menyebutkan bahwa kunci jawaban salah.
• JANGAN pernah menyebut atau menulis kata "kekeliruan di kunci jawaban", "sepertinya ada kesalahan", atau sejenisnya.
• Feedback harus berfokus pada membantu siswa, bukan mengevaluasi soal atau kunci jawaban.
• Jangan menyebut nomor soal dalam feedback.
• Boleh gunakan kalimat langsung, boleh juga menggunakan • untuk bullet point, jangan gunakan * atau -.
• DILARANG menggunakan karakter * (asterisk) dan — (em dash) dalam feedback.

ATURAN SKORING KHUSUS:
• SOAL URAIAN: penilaian longgar. Jika jawaban siswa mendekati atau mengandung inti yang sama dengan kunci jawaban, anggap BENAR. Tidak harus sama persis kata demi kata.
• SOAL YA/TIDAK DENGAN ALASAN: nilai berdasarkan jawaban pokok (Ya/Tidak) dulu. Jika jawaban pokok siswa SAMA dengan kunci (sama-sama Ya atau sama-sama Tidak), maka nilai MINIMAL 70, terlepas dari apapun alasannya. Jika jawaban pokok benar DAN alasan kuat/relevan, nilai 100. Jika jawaban pokok berbeda, nilai menyesuaikan.
• DILARANG memberi nilai 70-99 jika jawaban pokok berbeda dengan kunci.`;

/** Build the structured-output generation config for a section evaluation call. Attempt 1 caps output at 800 tokens, attempt 2 at 1500. */
function buildSectionGenerationConfig(attempt: 1 | 2): GenerationConfig {
  return {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        isCorrect: { type: SchemaType.BOOLEAN },
        score: { type: SchemaType.NUMBER, nullable: true },
        feedback: { type: SchemaType.STRING },
        errors: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
      required: ["isCorrect", "score", "feedback", "errors"],
    },
    maxOutputTokens: attempt === 1 ? 800 : 1500,
  };
}

/** Static quiz pembahasan rules sent as the system instruction. */
const PEMBAHASAN_SYSTEM_INSTRUCTION = `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.

ATURAN PENTING:
• KUNCI JAWABAN yang tercantum di prompt adalah MUTLAK dan sudah diverifikasi oleh ahli matematika. JANGAN PERNAH mempertanyakan atau menyebutkan bahwa kunci jawaban salah.
• Feedback harus berfokus pada membantu siswa memahami konsep, bukan mengevaluasi soal atau kunci jawaban.
• DILARANG menggunakan karakter * (asterisk) dan — (em dash) dalam feedback.
• Gunakan bahasa Indonesia yang sederhana dan mudah dipahami siswa SMP.

Tugasmu: Berikan feedback/pembahasan untuk SETIAP soal:
• Jika jawaban benar: berikan konfirmasi singkat dan penguatan konsep (1-2 kalimat).
• Jika jawaban salah: jelaskan langkah demi langkah penyelesaian yang benar, dan tunjukkan di mana letak kesalahan siswa.
• JANGAN beri pujian berlebihan, motivasi, atau kalimat penyemangat. Feedback harus to the point.
• Jangan menyebut nomor soal dalam feedback.`;

/** Build the structured-output generation config for quiz pembahasan — an array of per-question feedback. */
function buildPembahasanGenerationConfig(): GenerationConfig {
  return {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          questionId: { type: SchemaType.NUMBER },
          feedback: { type: SchemaType.STRING },
        },
        required: ["questionId", "feedback"],
      },
    },
    maxOutputTokens: 1500,
  };
}

export interface EvaluateSectionInput {
  module: string;
  tab: string;
  sectionType: "percobaan" | "pengamatan" | "penyimpulan" | "cek-pemahaman";
  items: SectionItem[];
  answers: Record<string, Record<string, string>>;
  attempt: 1 | 2;
}

export interface EvaluateSectionOutput {
  isCorrect: boolean;
  score: number | null;
  feedback: string;
  errors: Record<string, string>;
}

/** Describe a single item for the prompt. */
function describeItem(item: SectionItem): string {
  switch (item.type) {
    case "matriks":
      return `Soal ${item.id}: ${item.label} → KUNCI JAWABAN: (${item.answer.a}, ${item.answer.b})`;
    case "koordinat":
      return `Soal ${item.id}: ${item.label} → KUNCI JAWABAN: (${item.answer.x}, ${item.answer.y})`;
    case "uraian": {
      const accept = item.acceptAnswers?.length ? ` (jawaban lain yang diterima: ${item.acceptAnswers.join(", ")})` : "";
      return `Soal ${item.id}: ${item.question} → KUNCI JAWABAN (acuan): ${item.answer}${accept}`;
    }
    case "memasangkan":
      return `Soal ${item.id}: ${item.question} → KUNCI JAWABAN pasangan: ${JSON.stringify(item.correctMatches)}`;
    case "pilihan_ganda":
      return `Soal ${item.id}: ${item.question} Opsi: ${item.options.map((o, i) => `${i}. ${o}`).join(" | ")} → KUNCI JAWABAN: opsi ${item.correctIndex} (${item.options[item.correctIndex]})`;
    case "urutkan":
      return `Soal ${item.id}: ${item.question} → KUNCI JAWABAN urutan: ${item.items.join(" → ")}`;
    case "pilihan_refleksi": {
      const detail = Object.entries(item.correctAnswers)
        .map(([opt, coords]) => `  Opsi ${opt}: (${coords.map((c) => `(${c.x}, ${c.y})`).join(", ")})`)
        .join("\n");
      return `Soal ${item.id}: ${item.question} Opsi: ${item.options.join(" | ")}\nKUNCI JAWABAN:\n${detail}`;
    }
    case "checklist_table": {
      const detail = item.statements.map((s, i) => `  ${i + 1}. ${s}: ${item.correctAnswers[i] ? "Ya" : "Tidak"}`).join("\n");
      return `Soal ${item.id}: ${item.question}\nKUNCI JAWABAN:\n${detail}`;
    }
    default:
      return `Soal ${(item as SectionItem).id}`;
  }
}

/** Format student answers for the prompt. */
function describeAnswers(items: SectionItem[], answers: Record<string, Record<string, string>>): string {
  return items
    .map((item) => {
      const ans = answers[String(item.id)] ?? {};
      return `  Soal ${item.id}: ${JSON.stringify(ans)}`;
    })
    .join("\n");
}

/** Map a local ValidationResult into the EvaluateSectionOutput shape. */
function localToOutput(
  input: EvaluateSectionInput,
  local: ValidationResult,
): EvaluateSectionOutput {
  return {
    isCorrect: local.isCorrect,
    score: local.isCorrect ? 100 : localScore(local),
    feedback: local.isCorrect
      ? feedbackForCorrect(input.sectionType, input.items, input.answers)
      : buildDeterministicFeedback(input, local),
    errors: local.errors,
  };
}

/** Collect uraian items the student answered but got wrong — the only items Gemini needs to judge. */
function collectWrongUraian(
  items: SectionItem[],
  answers: Record<string, Record<string, string>>,
  errors: Record<string, string>,
): SectionItem[] {
  const wrongIds = new Set(
    Object.keys(errors).map((k) => Number(k.split("_")[0])),
  );
  return items.filter(
    (i) =>
      i.type === "uraian" &&
      wrongIds.has(i.id) &&
      Object.values(answers[String(i.id)] ?? {}).some((v) => v && v.trim() !== ""),
  );
}

/** Collect all answered uraian items — used when Gemini is the authority (penyimpulan). */
function collectAnsweredUraian(
  items: SectionItem[],
  answers: Record<string, Record<string, string>>,
): SectionItem[] {
  return items.filter(
    (i) =>
      i.type === "uraian" &&
      Object.values(answers[String(i.id)] ?? {}).some((v) => v && v.trim() !== ""),
  );
}

/** Build a prompt for Gemini based on attempt number and correctness handling. */
export function buildPrompt(
  module: string,
  tab: string,
  sectionType: string,
  items: SectionItem[],
  answers: Record<string, Record<string, string>>,
  attempt: 1 | 2,
): string {
  const itemDescriptions = items.map(describeItem).join("\n");
  const studentAnswers = describeAnswers(items, answers);
  const sectionLabel = sectionType.replace(/_/g, " ");
  const tabLabel = tab.replace(/-/g, " ");

  const basePrompt = `Seorang siswa menjawab soal pada bagian ${sectionLabel} di modul ${module} - ${tabLabel}.
${attempt === 2 ? "Ini adalah percobaan kedua (terakhir) setelah jawaban pertama salah." : "Ini adalah percobaan pertama."}

FOKUS BAGIAN ${sectionLabel.toUpperCase()}:
${
  sectionType === "pengamatan"
    ? "Fokus mengamati sifat pernyataan di GeoGebranya. Feedback harus menekankan pada pemahaman sifat-sifat geometri yang terlihat pada visualisasi."
    : sectionType === "percobaan"
    ? "Fokus mengamati koordinat dan vektornya. Feedback harus menekankan pada perhitungan koordinat titik bayangan dan vektor translasi/refleksi."
    : sectionType === "penyimpulan"
    ? "Kamu adalah PENILAI untuk bagian ini: bandingkan setiap jawaban siswa dengan KUNCI JAWABAN dan putuskan benar/salah serta nilai sesuai aturan penilaian. Feedback harus menjelaskan konsep geometri secara menyeluruh sebagai jawaban dari pertanyaan konseptual."
    : sectionType === "cek-pemahaman"
    ? "Fokus memberikan jawaban yang benar seperti apa. Feedback harus menekankan pada kebenaran jawaban dan cara memperolehnya, dengan standar penilaian yang lebih ketat."
    : ""
}

Soal-soal beserta KUNCI JAWABAN yang sudah diverifikasi kebenarannya:
${itemDescriptions}

Jawaban siswa:
${studentAnswers}
`;

  if (attempt === 2) {
    return `${basePrompt}
INSTRUKSI: PEMBAHASAN (percobaan kedua)
Feedback dibaca siswa setelah kesempatan habis. Tujuannya agar siswa belajar dari kesalahan.

HASIL AKHIR:
• Jika semua jawaban benar: "isCorrect": true, "score": 100.
• Jika ada yang salah: "isCorrect": false, "score" sesuai aturan penilaian di atas.

FEEDBACK WAJIB BENTUK POIN-POIN DENGAN PENJELASAN LENGKAP:
• Tulis feedback sebagai poin-poin (gunakan • di awal tiap baris), BUKAN paragraf panjang.
• Untuk setiap soal yang salah: 2-4 poin berisi penjelasan konsep, rumus, dan langkah penyelesaian yang benar secara detail.
• Untuk setiap soal yang benar: 1-2 poin berisi penguatan konsep dan penjelasan mengapa jawaban tersebut tepat.
• JANGAN beri pujian berlebihan, motivasi, atau kalimat penyemangat.
• JANGAN menyebut nomor soal dalam feedback.

CONTOH FORMAT: "• Konsep translasi: setiap titik (x,y) digeser sejauh (a,b) menghasilkan bayangan (x+a, y+b). Titik A(2,3) ditranslasikan (4,-1) sehingga A'(6,2)."`;
  }

  return `${basePrompt}
INSTRUKSI: HINT (percobaan pertama)
Feedback dibaca siswa sebagai petunjuk sebelum mencoba lagi. JANGAN beri jawaban akhir.

HASIL:
• Jika semua jawaban benar: "isCorrect": true, "score": 100. Feedback tetap berisi 1 poin per soal berisi konsep yang digunakan.
• Jika ada yang salah: "isCorrect": false

FEEDBACK WAJIB BENTUK POIN-POIN DENGAN PENJELASAN:
• Tulis feedback sebagai poin-poin (gunakan • di awal tiap baris), BUKAN paragraf panjang.
• Untuk setiap soal yang salah: 2-4 poin berisi petunjuk arah yang mengarahkan siswa pada letak kekurangan, konsep yang harus dipahami, dan cara mendekati soal tersebut.
• Sebutkan KONSEP apa yang perlu ditinjau ulang dengan penjelasan yang cukup, tidak terlalu pendek.
• Boleh menyebutkan rumus atau contoh serupa, tapi JANGAN berikan jawaban akhir atau angka hasil.
• JANGAN beri pujian, motivasi, atau kalimat pembuka basa-basi.
• JANGAN menyebut nomor soal dalam feedback.

CONTOH FORMAT: "• Untuk soal translasi, ingat kembali rumus: setiap titik (x,y) digeser sejauh (a,b) menghasilkan bayangan (x+a, y+b). Perhatikan tanda positif dan negatif pada pergeseran."`;
}

/** Parse Gemini's response into structured output. */
export function parseAIResponse(response: string): EvaluateSectionOutput {
  const cleaned = response.replace(/```(?:json)?\s*/gi, "").trim()

  // Try direct JSON parse first
  try {
    return JSON.parse(cleaned) as EvaluateSectionOutput
  } catch {
    // Fallback: extract JSON between outermost braces
    try {
      const firstBrace = cleaned.indexOf("{")
      const lastBrace = cleaned.lastIndexOf("}")
      if (firstBrace === -1 || lastBrace === -1) throw new Error("No JSON object found")
      const jsonStr = cleaned.slice(firstBrace, lastBrace + 1)
      return JSON.parse(jsonStr) as EvaluateSectionOutput
    } catch {
      // Final fallback: regex extraction with multiline support
      console.warn("[ai] parseAIResponse regex fallback executed — structured output not applied");
      const section = cleaned.slice(cleaned.indexOf("{"), cleaned.lastIndexOf("}") + 1) || cleaned
      const isCorrect = /"isCorrect"\s*:\s*true/i.test(section)
      const scoreMatch = section.match(/"score"\s*:\s*(\d+|null)/i)
      const feedbackLabel = '"feedback": "'
      const feedbackStart = section.indexOf(feedbackLabel)
      let feedback = "Feedback tidak tersedia"
      if (feedbackStart !== -1) {
        const afterLabel = section.slice(feedbackStart + feedbackLabel.length)
        let end = -1
        let escaped = false
        for (let i = 0; i < afterLabel.length; i++) {
          if (escaped) { escaped = false; continue }
          if (afterLabel[i] === "\\") { escaped = true; continue }
          if (afterLabel[i] === '"') { end = i; break }
        }
        if (end !== -1) {
          feedback = afterLabel.slice(0, end).replace(/\\"/g, '"').replace(/\\n/g, "\n")
        }
      }
      return {
        isCorrect,
        score: scoreMatch ? (scoreMatch[1] === "null" ? null : Number(scoreMatch[1])) : null,
        feedback,
        errors: {},
      }
    }
  }
}

/** Evaluate a section's answers using the Gemini API. */
export async function evaluateSection(
  input: EvaluateSectionInput,
): Promise<EvaluateSectionOutput> {
  if (!input.items?.length || Object.keys(input.answers).length === 0) {
    return {
      isCorrect: false,
      score: null,
      feedback: "Tidak ada jawaban yang ditemukan untuk dievaluasi.",
      errors: {},
    };
  }

  // Deterministic fast-path: Gemini is the authority on uraian answers.
  const local = validateSection(input.items, input.answers);
  const hasUraian = input.items.some((i) => i.type === "uraian");
  const isPenyimpulan = input.sectionType === "penyimpulan";

  // No uraian items → local check is authoritative; never call Gemini.
  if (!hasUraian) {
    return localToOutput(input, local);
  }

  const deterministicFeedback = buildDeterministicFeedback(input, local);

  // Penyimpulan: Gemini is the higher authority for uraian answers — always
  // consult it with ALL answered uraian items, even when local validation says
  // everything is correct. Local keyword matching cannot reliably judge
  // mathematical/conceptual text, so Gemini confirms or overrides the verdict.
  // Other sections: only the wrong, answered uraian items reach Gemini.
  const uraianToJudge = isPenyimpulan
    ? collectAnsweredUraian(input.items, input.answers)
    : collectWrongUraian(input.items, input.answers, local.errors);

  // No answered uraian items to judge → local verdict stands.
  if (uraianToJudge.length === 0) {
    return local.isCorrect
      ? {
          isCorrect: true,
          score: 100,
          feedback: feedbackForCorrect(input.sectionType, input.items, input.answers),
          errors: {},
        }
      : {
          isCorrect: false,
          score: localScore(local),
          feedback: deterministicFeedback,
          errors: local.errors,
        };
  }

  if (apiKeys.length === 0) {
    throw appError("INTERNAL_ERROR");
  }

  // Mini-prompt: send only the uraian items Gemini must judge.
  const miniAnswers: Record<string, Record<string, string>> = {};
  for (const item of uraianToJudge) {
    miniAnswers[String(item.id)] = input.answers[String(item.id)] ?? {};
  }
  const prompt = buildPrompt(
    input.module,
    input.tab,
    input.sectionType,
    uraianToJudge,
    miniAnswers,
    input.attempt,
  );

  // Pick the best key before the first attempt; withRetry will re-pick on retries.
  const initialIndex = await pickKeyIndex(apiKeys.length);
  await markKeyUsed(initialIndex);

  const generate = async (keyIdx: number) => {
    const key = getKeyAt(keyIdx);
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      safetySettings: SAFETY_SETTINGS,
      systemInstruction: SECTION_SYSTEM_INSTRUCTION,
      generationConfig: buildSectionGenerationConfig(input.attempt),
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API timed out")), GENERATION_TIMEOUT_MS),
    );
    await acquireSlot();
    try {
      return await Promise.race([model.generateContent(prompt), timeoutPromise]);
    } finally {
      await releaseSlot();
    }
  };

  let result;
  try {
    result = await withRetry(
      generate,
      `evaluateSection (${input.module}/${input.tab}/${input.sectionType})`,
      initialIndex,
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI evaluation failed";
    const isQuota = isQuotaError(e);
    console.warn("[ai] Gemini API call failed:", isQuota ? "quota/rate limit" : msg);
    throw appError(isQuota ? "AI_EVALUATION_FAILED" : "INTERNAL_ERROR");
  }

  const usage = result.response.usageMetadata;
  console.log(
    `[ai.usage] evaluateSection (${input.module}/${input.tab}/${input.sectionType}) attempt=${input.attempt}`,
    `prompt=${usage?.promptTokenCount} output=${usage?.candidatesTokenCount} total=${usage?.totalTokenCount}`,
  );

  const response = result.response.text();
  if (!response) {
    throw appError("INTERNAL_ERROR");
  }

  const parsed = parseAIResponse(response);
  parsed.feedback = mergeFeedback(deterministicFeedback, parsed.feedback);

  // AI judged only the uraian items — factor deterministic correctness into the final verdict.
  const deterministicAllCorrect = Object.keys(local.errors).every((k) =>
    uraianToJudge.some((i) => i.id === Number(k.split("_")[0])),
  );
  const finalCorrect = parsed.isCorrect === true && deterministicAllCorrect;
  if (finalCorrect) {
    return { isCorrect: true, score: 100, feedback: parsed.feedback, errors: {} };
  }

  parsed.isCorrect = false;
  // Penyimpulan: Gemini's score is authoritative for the uraian verdict, but only
  // when deterministic items are all correct — otherwise the local score reflects
  // the deterministic failures Gemini didn't judge. Elsewhere local score stands.
  parsed.score =
    isPenyimpulan && deterministicAllCorrect && parsed.score != null
      ? parsed.score
      : localScore(local);
  parsed.errors = { ...local.errors, ...parsed.errors };
  console.log(
    `[ai.evaluate] ${input.module}/${input.tab}/${input.sectionType} attempt=${input.attempt}`,
    `score=${parsed.score} isCorrect=${parsed.isCorrect}`,
    `items=${input.items.length}`,
    `feedback=${parsed.feedback?.slice(0, 60)}...`,
  );
  return parsed;
}

/** Timeout for pembahasan generation (longer — needs per-question analysis). */
const PEMBAHASAN_TIMEOUT_MS = 5000;

/** A quiz question with a static explanation, used for pembahasan generation. */
interface PembahasanQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

/** Build prompt for pembahasan generation — static rules live in PEMBAHASAN_SYSTEM_INSTRUCTION. */
function buildPembahasanPrompt(
  questions: PembahasanQuestion[],
  answers: Record<number, number>,
): string {
  const lines = questions.map((q) => {
    const userAns = answers[q.id];
    const isCorrect = userAns === q.correctIndex;
    return `Soal ${q.id}: ${q.question}
Opsi: ${q.options.map((o, i) => `${i}. ${o}`).join(" | ")}
KUNCI JAWABAN: opsi ${q.correctIndex} (${q.options[q.correctIndex]})
Penjelasan referensi: ${q.explanation}
Jawaban siswa: ${userAns != null ? q.options[userAns] ?? "Tidak dijawab" : "Tidak dijawab"}
Hasil: ${isCorrect ? "BENAR" : "SALAH"}`;
  }).join("\n\n");

  return `Seorang siswa telah menyelesaikan kuis dengan hasil sebagai berikut:

${lines}

Keluarkan JSON SAJA (tanpa markdown) dengan format array:
[
  {
    "questionId": number,
    "feedback": "string pembahasan dalam Bahasa Indonesia"
  }
]`;
}

/** Build per-question pembahasan from static explanations, pointing out the correct option. */
function buildStaticPembahasan(
  questions: PembahasanQuestion[],
  answers: Record<number, number>,
): { questionId: number; feedback: string }[] {
  return questions.map((q) => {
    const userAns = answers[q.id];
    const isCorrect = userAns === q.correctIndex;
    const correctText = q.options[q.correctIndex];
    const userText = userAns != null ? q.options[userAns] ?? "Tidak dijawab" : "Tidak dijawab";
    let feedback = q.explanation;
    if (isCorrect) {
      feedback = `${q.explanation}\n\nJawaban benar: ${correctText}`;
    } else {
      feedback = `${q.explanation}\n\nJawaban kamu: ${userText}\nJawaban benar: ${correctText}`;
    }
    return { questionId: q.id, feedback };
  });
}

/** Generate AI-powered pembahasan for a completed quiz. Returns per-question feedback, falling back to static explanations on failure. */
export async function generatePembahasan(
  questions: PembahasanQuestion[],
  answers: Record<number, number>,
): Promise<{ questionId: number; feedback: string }[]> {
  // Static explanations are the default path — Gemini is optional enrichment only.
  if (process.env.AI_PEMBAHASAN_ENABLED !== "true") {
    return buildStaticPembahasan(questions, answers);
  }

  if (apiKeys.length === 0) {
    return buildStaticPembahasan(questions, answers);
  }

  const prompt = buildPembahasanPrompt(questions, answers);

  // Pick the best key before the first attempt; withRetry will re-pick on retries.
  const initialIndex = await pickKeyIndex(apiKeys.length);
  await markKeyUsed(initialIndex);

  const generate = async (keyIdx: number) => {
    const key = getKeyAt(keyIdx);
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      safetySettings: SAFETY_SETTINGS,
      systemInstruction: PEMBAHASAN_SYSTEM_INSTRUCTION,
      generationConfig: buildPembahasanGenerationConfig(),
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("AI timed out")), PEMBAHASAN_TIMEOUT_MS),
    );
    await acquireSlot();
    try {
      return await Promise.race([model.generateContent(prompt), timeoutPromise]);
    } finally {
      await releaseSlot();
    }
  };

  try {
    const result = await withRetry(generate, "generatePembahasan", initialIndex);
    const usage = result.response.usageMetadata;
    console.log(
      `[ai.usage] generatePembahasan prompt=${usage?.promptTokenCount} output=${usage?.candidatesTokenCount} total=${usage?.totalTokenCount}`,
    );
    const text = result.response.text();
    if (!text) throw new Error("AI returned empty response");

    const cleaned = text.replace(/```(?:json)?\s*/gi, "").trim();
    const feedback: { questionId: number; feedback: string }[] = JSON.parse(cleaned);
    return feedback;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("[ai] generatePembahasan failed, falling back to static explanations:", msg);
    return buildStaticPembahasan(questions, answers);
  }
}
