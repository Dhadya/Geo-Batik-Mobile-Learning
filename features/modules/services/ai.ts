import { GoogleGenerativeAI } from "@google/generative-ai";
import { appError } from "@/lib/api/errors";
import type { SectionItem } from "@/features/modules/types";
import type { QuizQuestion } from "@/features/quiz/types";

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
  const cleaned = response.replace(/```(?:json)?\s*/gi, "").trim();
  try {
    return JSON.parse(cleaned) as EvaluateSectionOutput;
  } catch {
    const isCorrect = /"isCorrect"\s*:\s*true/i.test(cleaned);
    const scoreMatch = cleaned.match(/"score"\s*:\s*(\d+|null)/i);
    const feedbackMatch = cleaned.match(/"feedback"\s*:\s*"([^"]+)"/);
    return {
      isCorrect,
      score: scoreMatch ? (scoreMatch[1] === "null" ? null : Number(scoreMatch[1])) : null,
      feedback: feedbackMatch?.[1] ?? "Feedback tidak tersedia",
      errors: {},
    };
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

  const prompt = buildPrompt(input.module, input.tab, input.sectionType, input.items, input.answers, input.attempt);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  let result;
  try {
    result = await model.generateContent(prompt);
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
  question: QuizQuestion;
  answer: unknown;
  attempt: 1 | 2;
}

export interface EvaluateQuizQuestionOutput {
  isCorrect: boolean;
  score: number;
  feedback: string;
}

/** Describe a quiz question for the prompt. */
function describeQuizQuestion(question: QuizQuestion): string {
  switch (question.type) {
    case "pilihan_ganda":
      return `Soal ${question.id} (Pilihan Ganda): ${question.question}\nOpsi: ${question.options.join(" | ")}\nJawaban benar: opsi ${question.correctIndex}`;
    case "uraian":
      return `Soal ${question.id} (Uraian): ${question.question}\nJawaban benar (acuan): ${question.answer}`;
    case "angka":
      return `Soal ${question.id} (Angka): ${question.question}\nJawaban benar: ${JSON.stringify(question.answer)}`;
    case "campuran":
      const subs = question.subQuestions.map((sq) => `  - ${sq.question}`).join("\n");
      return `Soal ${question.id} (Campuran):\n${subs}`;
  }
}

/** Build a prompt for Gemini to evaluate a single quiz question. */
function buildQuizPrompt(
  question: QuizQuestion,
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

  const prompt = buildQuizPrompt(input.question, input.answer, input.attempt);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    if (!response) {
      return { isCorrect: false, score: 0, feedback: "Gagal mendapatkan feedback AI" };
    }
    return parseQuizAIResponse(response);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Quiz AI evaluation failed";
    console.warn("[ai] quiz Gemini API call failed:", msg);
    return { isCorrect: false, score: 0, feedback: "Gagal mengevaluasi jawaban. Silakan coba lagi." };
  }
}
