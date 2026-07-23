import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { appError } from "@/lib/api/errors";
import type { SectionItem } from "@/features/modules/types";
import type { PilihanGandaQuestion } from "@/features/quiz/types";

const GENERATION_TIMEOUT_MS = 20000;

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
      return `Soal ${item.id}: ${item.label} → Jawaban benar: (${item.answer.a}, ${item.answer.b})`;
    case "koordinat":
      return `Soal ${item.id}: ${item.label} → Jawaban benar: (${item.answer.x}, ${item.answer.y})`;
    case "uraian":
      return `Soal ${item.id}: ${item.question} → Jawaban benar (acuan): ${item.answer}`;
    case "memasangkan":
      return `Soal ${item.id}: ${item.question} → Pasangan benar: ${JSON.stringify(item.correctMatches)}`;
    case "pilihan_ganda":
      return `Soal ${item.id}: ${item.question} Opsi: ${item.options.join(" | ")} → Jawaban benar: opsi ${item.correctIndex}`;
    case "urutkan":
      return `Soal ${item.id}: ${item.question} → Urutan benar: ${item.items.join(" → ")}`;
    case "pilihan_refleksi":
      return `Soal ${item.id}: ${item.question} Opsi: ${item.options.join(" | ")}`;
    case "checklist_table":
      return `Soal ${item.id}: ${item.question} Pernyataan: ${JSON.stringify(item.statements)} → Kebenaran: ${JSON.stringify(item.correctAnswers)}`;
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

  if (attempt === 2) {
    return `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.
Seorang siswa menjawab soal pada bagian ${sectionLabel} di modul ${module} - ${tabLabel}.
Ini adalah percobaan kedua (terakhir).

Soal:
${itemDescriptions}

Jawaban siswa:
${studentAnswers}

INSTRUKSI:
- Jika semua jawaban benar: isi "isCorrect": true, "score": 100, beri semangat
- Jika ada yang salah: isi "isCorrect": false, berikan feedback mendalam
- Jelaskan langkah demi langkah penyelesaiannya
- Tampilkan jawaban yang benar sebagai bahan evaluasi
- Gunakan bahasa Indonesia yang sederhana
- Berikan semangat untuk terus belajar

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0-100) atau null,
  "feedback": "string dalam Bahasa Indonesia",
  "errors": { "fieldKey": "alasan kesalahan" }
}`;
  }

  return `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.
Seorang siswa menjawab soal pada bagian ${sectionLabel} di modul ${module} - ${tabLabel}.

Soal:
${itemDescriptions}

Jawaban siswa:
${studentAnswers}

INSTRUKSI PENTING:
- Jika semua jawaban benar: isi "isCorrect": true, "score": 100, "feedback": pujian singkat, "errors": {}
- Jika ada yang salah: isi "isCorrect": false, beri petunjuk singkat (1-2 kalimat) yang mengarahkan siswa pada letak kekurangan mereka
- JANGAN menyebutkan jawaban akhir
- JANGAN memberikan angka atau langkah perhitungan
- Gunakan bahasa Indonesia yang sederhana

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0-100) atau null,
  "feedback": "string dalam Bahasa Indonesia",
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
    model: "gemini-2.0-flash",
    safetySettings: SAFETY_SETTINGS,
  });

  let result;
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API timed out")), GENERATION_TIMEOUT_MS),
    );
    result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI evaluation failed";
    console.warn("[ai] Gemini API call failed:", msg);
    throw new Error(msg);
  }

  const response = result.response.text();
  if (!response) {
    throw appError("INTERNAL_ERROR");
  }

  return parseAIResponse(response);
}

// ── Quiz question evaluation ──────────────────────────────────────

export interface EvaluateQuizQuestionInput {
  question: PilihanGandaQuestion;
  answer: unknown;
  attempt: 1 | 2;
}

export interface EvaluateQuizQuestionOutput {
  isCorrect: boolean;
  score: number;
  feedback: string;
}

/** Describe a quiz question for the prompt. */
function describeQuizQuestion(question: PilihanGandaQuestion): string {
  return `Soal ${question.id} (Pilihan Ganda): ${question.question}\nOpsi: ${question.options.join(" | ")}\nJawaban benar: opsi ${question.correctIndex}`;
}

/** Build a prompt for Gemini to evaluate a single quiz question. */
function buildQuizPrompt(
  question: PilihanGandaQuestion,
  answer: unknown,
  attempt: 1 | 2,
): string {
  const qDesc = describeQuizQuestion(question);
  const answerStr = JSON.stringify(answer);

  if (attempt === 2) {
    return `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.
Ini adalah percobaan kedua (terakhir).

${qDesc}

Jawaban siswa: ${answerStr}

INSTRUKSI:
- Jika jawaban benar: isi "isCorrect": true, "score": 100, "feedback": pujian singkat
- Jika jawaban salah: isi "isCorrect": false, "score": 0, beri feedback mendalam
- Jelaskan langkah demi langkah penyelesaiannya
- Tampilkan jawaban yang benar sebagai bahan evaluasi
- Gunakan bahasa Indonesia yang sederhana
- Berikan semangat untuk terus belajar

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0 atau 100),
  "feedback": "string dalam Bahasa Indonesia"
}`;
  }

  return `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.

${qDesc}

Jawaban siswa: ${answerStr}

INSTRUKSI PENTING:
- Jika jawaban benar: isi "isCorrect": true, "score": 100, "feedback": pujian singkat
- Jika jawaban salah: isi "isCorrect": false, "score": 0
- JANGAN menyebutkan jawaban akhir
- JANGAN memberikan angka atau langkah perhitungan
- Beri petunjuk singkat (1-2 kalimat) yang mengarahkan siswa pada letak kekurangan mereka
- Gunakan bahasa Indonesia yang sederhana

Keluarkan JSON SAJA (tanpa markdown) dengan format:
{
  "isCorrect": boolean,
  "score": number (0 atau 100),
  "feedback": "string dalam Bahasa Indonesia"
}`;
}

/** Parse Gemini quiz evaluation response. */
function parseQuizAIResponse(response: string): EvaluateQuizQuestionOutput {
  const cleaned = response.replace(/```(?:json)?\s*/gi, "").trim();
  try {
    return JSON.parse(cleaned) as EvaluateQuizQuestionOutput;
  } catch {
    const isCorrect = /"isCorrect"\s*:\s*true/i.test(cleaned);
    const scoreMatch = cleaned.match(/"score"\s*:\s*(\d+)/i);
    const feedbackMatch = cleaned.match(/"feedback"\s*:\s*"([^"]+)"/);
    return {
      isCorrect,
      score: scoreMatch ? Number(scoreMatch[1]) : 0,
      feedback: feedbackMatch?.[1] ?? "Feedback tidak tersedia",
    };
  }
}

/** Evaluate a single quiz question using the Gemini API. */
export async function evaluateQuizQuestion(
  input: EvaluateQuizQuestionInput,
): Promise<EvaluateQuizQuestionOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw appError("INTERNAL_ERROR");
  }

  const localCorrect = input.answer === input.question.correctIndex;

  const prompt = buildQuizPrompt(input.question, input.answer, input.attempt);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    safetySettings: SAFETY_SETTINGS,
  });

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API timed out")), GENERATION_TIMEOUT_MS),
    );
    const result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
    const response = result.response.text();
    if (!response) {
      return {
        isCorrect: localCorrect,
        score: localCorrect ? 100 : 0,
        feedback: localCorrect ? "Jawaban kamu benar." : "Jawaban kamu belum tepat.",
      };
    }
    return parseQuizAIResponse(response);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Quiz AI evaluation failed";
    console.warn("[ai] quiz Gemini API call failed:", msg);
    return {
      isCorrect: localCorrect,
      score: localCorrect ? 100 : 0,
      feedback: localCorrect
        ? "Jawaban kamu benar."
        : "Jawaban kamu belum tepat. Periksa kembali pemahamanmu tentang konsep yang sedang dipelajari.",
    };
  }
}
