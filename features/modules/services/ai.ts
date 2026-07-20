import { GoogleGenerativeAI } from "@google/generative-ai";
import { appError } from "@/lib/api/errors";
import type { SectionItem } from "@/features/modules/types";

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
  sectionType: string,
  items: SectionItem[],
  answers: Record<string, Record<string, string>>,
  attempt: 1 | 2,
): string {
  const itemDescriptions = items.map(describeItem).join("\n");
  const studentAnswers = describeAnswers(items, answers);
  const sectionLabel = sectionType.replace(/_/g, " ");

  if (attempt === 2) {
    return `Kamu adalah asisten pembelajaran geometri transformasi untuk siswa SMP.
Seorang siswa menjawab soal pada bagian ${sectionLabel} di modul ${module}.
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
Seorang siswa menjawab soal pada bagian ${sectionLabel} di modul ${module}.

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

  const prompt = buildPrompt(input.module, input.sectionType, input.items, input.answers, input.attempt);
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
