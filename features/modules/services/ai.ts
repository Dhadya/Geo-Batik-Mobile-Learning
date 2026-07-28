import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { appError } from "@/lib/api/errors";
import type { SectionItem } from "@/features/modules/types";

const GENERATION_TIMEOUT_MS = 10000;
const RETRY_BASE_DELAY_MS = 1000;

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
let keyIndex = 0;

function getCurrentKey(): string {
  return apiKeys[keyIndex] ?? "";
}

function rotateKey(): void {
  keyIndex = (keyIndex + 1) % apiKeys.length;
  console.warn(`[ai] rotating to key ${keyIndex + 1}/${apiKeys.length}`);
}

/** Check if an error is a quota/rate-limit error from Gemini. */
function isQuotaError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("RATE_LIMIT");
}

/** Retry a promise-returning function with exponential backoff and key rotation on any error. */
async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
        const ctx = isQuotaError(e) ? "quota" : "transient";
        console.warn(`[ai] ${label} ${ctx} error, rotating key and retrying in ${delay}ms (attempt ${attempt + 2}/${MAX_RETRIES})`);
        rotateKey();
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw e;
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

  const basePrompt = `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.
Seorang siswa menjawab soal pada bagian ${sectionLabel} di modul ${module} - ${tabLabel}.
${attempt === 2 ? "Ini adalah percobaan kedua (terakhir) setelah jawaban pertama salah." : "Ini adalah percobaan pertama."}

FOKUS BAGIAN ${sectionLabel.toUpperCase()}:
${
  sectionType === "pengamatan"
    ? "Fokus mengamati sifat pernyataan di GeoGebranya. Feedback harus menekankan pada pemahaman sifat-sifat geometri yang terlihat pada visualisasi."
    : sectionType === "percobaan"
    ? "Fokus mengamati koordinat dan vektornya. Feedback harus menekankan pada perhitungan koordinat titik bayangan dan vektor translasi/refleksi."
    : sectionType === "penyimpulan"
    ? "Fokus memberikan feedback berupa penjelasan konsep dari pertanyaan yang diajukan. Feedback harus menjelaskan konsep geometri secara menyeluruh sebagai jawaban dari pertanyaan konseptual."
    : sectionType === "cek-pemahaman"
    ? "Fokus memberikan jawaban yang benar seperti apa. Feedback harus menekankan pada kebenaran jawaban dan cara memperolehnya, dengan standar penilaian yang lebih ketat."
    : ""
}

Soal-soal beserta KUNCI JAWABAN yang sudah diverifikasi kebenarannya:
${itemDescriptions}

Jawaban siswa:
${studentAnswers}

ATURAN PENILAIAN:
• KUNCI JAWABAN yang tercantum di atas adalah MUTLAK dan sudah diverifikasi oleh ahli matematika. JANGAN PERNAH mempertanyakan atau menyebutkan bahwa kunci jawaban salah.
• JANGAN pernah menyebut atau menulis kata "kekeliruan di kunci jawaban", "sepertinya ada kesalahan", atau sejenisnya.
• Feedback harus berfokus pada membantu siswa, bukan mengevaluasi soal atau kunci jawaban.
• Jangan menyebut nomor soal dalam feedback.
• Boleh gunakan kalimat langsung, boleh juga menggunakan • untuk bullet point, jangan gunakan * atau -
• DILARANG menggunakan karakter * (asterisk) dan — (em dash) dalam feedback.

ATURAN SKORING KHUSUS:
• SOAL URAIAN: penilaian longgar. Jika jawaban siswa mendekati atau mengandung inti yang sama dengan kunci jawaban, anggap BENAR. Tidak harus sama persis kata demi kata.
• SOAL YA/TIDAK DENGAN ALASAN: nilai berdasarkan jawaban pokok (Ya/Tidak) dulu. Jika jawaban pokok siswa SAMA dengan kunci (sama-sama Ya atau sama-sama Tidak), maka nilai MINIMAL 70, terlepas dari apapun alasannya. Jika jawaban pokok benar DAN alasan kuat/relevan, nilai 100. Jika jawaban pokok berbeda, nilai menyesuaikan.
• DILARANG memberi nilai 70-99 jika jawaban pokok berbeda dengan kunci.
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
• JANGAN menyebut nomor soal dalam feedback. Langsung jelaskan konsep atau penyelesaiannya.
• Beri penjelasan yang cukup, tidak terlalu pendek. Siswa perlu memahami konsepnya.

CONTOH FORMAT FEEDBACK YANG BENAR:
• Konsep translasi: setiap titik (x,y) digeser sejauh (a,b) menghasilkan bayangan (x+a, y+b). Pada soal ini, titik A(2,3) ditranslasikan (4,-1) sehingga A'(6,2). Translasi tidak mengubah bentuk atau orientasi, hanya posisi.
• Refleksi terhadap sumbu X mengubah tanda koordinat y menjadi kebalikannya. Titik (x,y) dicerminkan menjadi (x,-y). Maka B(1,4) setelah direfleksikan terhadap sumbu X menjadi B'(1,-4). Konsep ini berlaku untuk semua bangun datar.

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0-100) atau null,
  "feedback": "string dalam Bahasa Indonesia, berbentuk poin-poin menggunakan •",
  "errors": { "fieldKey": "alasan kesalahan" }
}`;
  }

  return `${basePrompt}
INSTRUKSI: HINT (percobaan pertama):
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

CONTOH FORMAT FEEDBACK YANG BENAR:
• Untuk soal translasi, ingat kembali rumus: setiap titik (x,y) digeser sejauh (a,b) menghasilkan bayangan (x+a, y+b). Coba terapkan rumus ini dengan nilai a dan b yang diketahui pada soal. Perhatikan tanda positif dan negatif pada pergeseran.
• Untuk soal refleksi sumbu X, koordinat y berubah tanda menjadi -y sedangkan koordinat x tetap. Coba gambarkan posisi titik awal dan bayangannya pada koordinat kartesius untuk memvisualisasikan perubahan ini.

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0-100) atau null,
  "feedback": "string dalam Bahasa Indonesia, berbentuk poin-poin menggunakan •",
  "errors": { "fieldKey": "alasan kesalahan" }
}`;
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
  if (apiKeys.length === 0) {
    throw appError("INTERNAL_ERROR");
  }

  if (!input.items?.length || Object.keys(input.answers).length === 0) {
    return {
      isCorrect: false,
      score: null,
      feedback: "Tidak ada jawaban yang ditemukan untuk dievaluasi.",
      errors: {},
    };
  }

  const prompt = buildPrompt(input.module, input.tab, input.sectionType, input.items, input.answers, input.attempt);

  const generate = async () => {
    rotateKey();
    const key = getCurrentKey();
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      safetySettings: SAFETY_SETTINGS,
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API timed out")), GENERATION_TIMEOUT_MS),
    );
    return await Promise.race([model.generateContent(prompt), timeoutPromise]);
  };

  let result;
  try {
    result = await withRetry(
      generate,
      `evaluateSection (${input.module}/${input.tab}/${input.sectionType})`,
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI evaluation failed";
    const isQuota = isQuotaError(e);
    console.warn("[ai] Gemini API call failed:", isQuota ? "quota/rate limit" : msg);
    throw appError(isQuota ? "AI_EVALUATION_FAILED" : "INTERNAL_ERROR");
  }

  const response = result.response.text();
  if (!response) {
    throw appError("INTERNAL_ERROR");
  }

  const parsed = parseAIResponse(response);
  console.log(
    `[ai.evaluate] ${input.module}/${input.tab}/${input.sectionType} attempt=${input.attempt}`,
    `score=${parsed.score} isCorrect=${parsed.isCorrect}`,
    `items=${input.items.length}`,
    `feedback=${parsed.feedback?.slice(0, 60)}...`,
  );
  return parsed;
}

/** Timeout for pembahasan generation (longer — needs per-question analysis). */
const PEMBAHASAN_TIMEOUT_MS = 10000;

/** Build prompt for pembahasan generation. */
function buildPembahasanPrompt(
  questions: { id: number; question: string; options: string[]; correctIndex: number; explanation: string }[],
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

  return `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.

Seorang siswa telah menyelesaikan kuis dengan hasil sebagai berikut:

${lines}

ATURAN PENTING:
- KUNCI JAWABAN yang tercantum di atas adalah MUTLAK dan sudah diverifikasi oleh ahli matematika. JANGAN PERNAH mempertanyakan atau menyebutkan bahwa kunci jawaban salah.
- Feedback harus berfokus pada membantu siswa memahami konsep, bukan mengevaluasi soal atau kunci jawaban.
- DILARANG menggunakan karakter * (asterisk) dan — (em dash) dalam feedback.
- Gunakan bahasa Indonesia yang sederhana dan mudah dipahami siswa SMP.

Tugasmu: Berikan feedback/pembahasan untuk SETIAP soal:
- Jika jawaban benar: berikan konfirmasi singkat dan penguatan konsep (1-2 kalimat)
- Jika jawaban salah: jelaskan langkah demi langkah penyelesaian yang benar, dan tunjukkan di mana letak kesalahan siswa
- JANGAN beri pujian berlebihan, motivasi, atau kalimat penyemangat. Feedback harus to the point.
- Jangan menyebut nomor soal dalam feedback.

Keluarkan JSON SAJA (tanpa markdown) dengan format array:
[
  {
    "questionId": number,
    "feedback": "string pembahasan dalam Bahasa Indonesia"
  }
]`;
}

/** Generate AI-powered pembahasan for a completed quiz. Returns per-question feedback, falling back to static explanations on failure. */
export async function generatePembahasan(
  questions: { id: number; question: string; options: string[]; correctIndex: number; explanation: string }[],
  answers: Record<number, number>,
): Promise<{ questionId: number; feedback: string }[]> {
  if (apiKeys.length === 0) {
    return questions.map((q) => ({ questionId: q.id, feedback: q.explanation }));
  }

  const prompt = buildPembahasanPrompt(questions, answers);

  const generate = async () => {
    rotateKey();
    const key = getCurrentKey();
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      safetySettings: SAFETY_SETTINGS,
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("AI timed out")), PEMBAHASAN_TIMEOUT_MS),
    );
    return await Promise.race([model.generateContent(prompt), timeoutPromise]);
  };

  try {
    const result = await withRetry(generate, "generatePembahasan");
    const text = result.response.text();
    if (!text) throw new Error("AI returned empty response");

    const cleaned = text.replace(/```(?:json)?\s*/gi, "").trim();
    const feedback: { questionId: number; feedback: string }[] = JSON.parse(cleaned);
    return feedback;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("[ai] generatePembahasan failed, falling back to static explanations:", msg);
    return questions.map((q) => {
      const userAns = answers[q.id]
      const isCorrect = userAns === q.correctIndex
      const correctText = q.options[q.correctIndex]
      const userText = userAns != null ? q.options[userAns] ?? "Tidak dijawab" : "Tidak dijawab"
      let feedback = q.explanation
      if (isCorrect) {
        feedback = `${q.explanation}\n\nJawaban benar: ${correctText}`
      } else {
        feedback = `${q.explanation}\n\nJawaban kamu: ${userText}\nJawaban benar: ${correctText}`
      }
      return { questionId: q.id, feedback }
    })
  }
}
