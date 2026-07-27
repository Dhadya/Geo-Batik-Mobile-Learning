import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { appError } from "@/lib/api/errors";
import type { SectionItem } from "@/features/modules/types";

const GENERATION_TIMEOUT_MS = 20000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

/** Check if an error is a quota/rate-limit error from Gemini. */
function isQuotaError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("RATE_LIMIT");
}

/** Retry a promise-returning function with exponential backoff on quota errors. */
async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (isQuotaError(e) && attempt < MAX_RETRIES - 1) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[ai] ${label} quota error, retrying in ${delay}ms (attempt ${attempt + 2}/${MAX_RETRIES})`);
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

Soal-soal beserta KUNCI JAWABAN yang sudah diverifikasi kebenarannya:
${itemDescriptions}

Jawaban siswa:
${studentAnswers}

ATURAN PENTING YANG HARUS DIPATUHI:
- KUNCI JAWABAN yang tercantum di atas adalah MUTLAK dan sudah diverifikasi oleh ahli matematika. JANGAN PERNAH mempertanyakan atau menyebutkan bahwa kunci jawaban salah.
- Tugasmu HANYA membandingkan jawaban siswa dengan kunci jawaban. Jika cocok, maka jawaban siswa BENAR.
- JANGAN pernah menyebut atau menulis kata "kekeliruan di kunci jawaban", "sepertinya ada kesalahan", atau sejenisnya.
- Feedback harus berfokus pada membantu siswa, bukan mengevaluasi soal atau kunci jawaban.
- Gunakan bahasa Indonesia yang sederhana dan sesuai tingkat SMP.
- Jangan menyebut nomor soal dalam feedback. Gunakan poin-poin bullet saja.

`;

  if (attempt === 2) {
    return `${basePrompt}
INSTRUKSI: PEMBAHASAN (percobaan kedua)
Feedback ini akan dibaca siswa setelah kesempatan habis. Tujuannya agar siswa belajar dari kesalahan.

- Jika semua jawaban benar: isi "isCorrect": true, "score": 100, beri pujian dan semangat
- Jika ada yang salah: isi "isCorrect": false, "score" sesuai proporsi benar
- Untuk setiap soal yang salah: jelaskan LANGKAH demi LANGKAH penyelesaiannya secara ringkas
- Tunjukkan jawaban yang benar beserta cara mendapatkannya
- Akhiri dengan semangat untuk terus belajar

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0-100) atau null,
  "feedback": "string dalam Bahasa Indonesia — berisi pembahasan lengkap per poin",
  "errors": { "fieldKey": "alasan kesalahan" }
}`;
  }

  return `${basePrompt}
INSTRUKSI — HINT (percobaan pertama):
Feedback ini akan dibaca siswa sebagai petunjuk sebelum mencoba lagi. JANGAN beri jawaban akhir.

- Jika semua jawaban benar: isi "isCorrect": true, "score": 100, beri pujian singkat
- Jika ada yang salah: isi "isCorrect": false
- Berikan PETUNJUK ARAH (2-3 kalimat) yang mengarahkan siswa pada letak kekurangan
- Sebutkan KONSEP apa yang perlu ditinjau ulang (misal: "Perhatikan lagi arah perpindahan pada sumbu x")
- JANGAN menyebutkan jawaban akhir, angka hasil, atau langkah perhitungan
- Bersifat membimbing, bukan mengoreksi — siswa masih punya kesempatan mencoba lagi

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0-100) atau null,
  "feedback": "string dalam Bahasa Indonesia — berisi hint/petunjuk, bukan pembahasan",
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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
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
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    safetySettings: SAFETY_SETTINGS,
  });

  let result;
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API timed out")), GENERATION_TIMEOUT_MS),
    );
    result = await withRetry(
      () => Promise.race([model.generateContent(prompt), timeoutPromise]),
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

  return parseAIResponse(response);
}

/** Timeout for pembahasan generation (longer — needs per-question analysis). */
const PEMBAHASAN_TIMEOUT_MS = 30000;

/** Build prompt for pembahasan generation. */
function buildPembahasanPrompt(
  questions: { id: number; question: string; options: string[]; correctIndex: number }[],
  answers: Record<number, number>,
): string {
  const lines = questions.map((q) => {
    const userAns = answers[q.id];
    const isCorrect = userAns === q.correctIndex;
    return `Soal ${q.id}: ${q.question}\nOpsi: ${q.options.join(" | ")}\nJawaban benar: ${q.options[q.correctIndex]} (opsi ${q.correctIndex})\nJawaban siswa: ${userAns != null ? q.options[userAns] ?? "Tidak dijawab" : "Tidak dijawab"}\nHasil: ${isCorrect ? "BENAR" : "SALAH"}`;
  }).join("\n\n");

  return `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.

Seorang siswa telah menyelesaikan kuis dengan hasil sebagai berikut:

${lines}

Tugasmu: Berikan feedback/pembahasan yang mendalam untuk SETIAP soal, fokus pada:
- Jika jawaban benar: berikan konfirmasi dan penguatan konsep
- Jika jawaban salah: jelaskan langkah demi langkah penyelesaian yang benar, dan tunjukkan di mana letak kesalahan siswa
- Gunakan bahasa Indonesia yang sederhana dan mudah dipahami
- Berikan semangat untuk terus belajar

Keluarkan JSON SAJA (tanpa markdown) dengan format array：
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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return questions.map((q) => ({ questionId: q.id, feedback: q.explanation }));
  }

  const prompt = buildPembahasanPrompt(questions, answers);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    safetySettings: SAFETY_SETTINGS,
  });

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("AI timed out")), PEMBAHASAN_TIMEOUT_MS),
    );
    const result = await withRetry(
      () => Promise.race([model.generateContent(prompt), timeoutPromise]),
      "generatePembahasan",
    );
    const text = result.response.text();
    if (!text) throw new Error("AI returned empty response");

    const cleaned = text.replace(/```(?:json)?\s*/gi, "").trim();
    const feedback: { questionId: number; feedback: string }[] = JSON.parse(cleaned);
    return feedback;
  } catch {
    return questions.map((q) => ({ questionId: q.id, feedback: q.explanation }));
  }
}
