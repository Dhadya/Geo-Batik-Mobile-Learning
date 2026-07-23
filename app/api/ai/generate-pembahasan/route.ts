import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const pembahasanSchema = z.object({
  questions: z.array(z.object({
    id: z.number(),
    question: z.string(),
    options: z.array(z.string()),
    correctIndex: z.number(),
    explanation: z.string(),
  })),
  answers: z.record(z.number(), z.number()),
});

const GENERATION_TIMEOUT_MS = 30000;

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

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

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const parsed = pembahasanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Data tidak valid" } },
        { status: 422 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: { code: "INTERNAL_ERROR", message: "AI tidak dikonfigurasi" } },
        { status: 500 },
      );
    }

    const prompt = buildPembahasanPrompt(parsed.data.questions, parsed.data.answers);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings: SAFETY_SETTINGS,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("AI timed out")), GENERATION_TIMEOUT_MS),
    );
    const result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
    const text = result.response.text();
    if (!text) {
      throw new Error("AI returned empty response");
    }

    const cleaned = text.replace(/```(?:json)?\s*/gi, "").trim();
    let feedback: { questionId: number; feedback: string }[];
    try {
      feedback = JSON.parse(cleaned);
    } catch {
      // Fallback: return static explanations
      feedback = parsed.data.questions.map((q) => ({
        questionId: q.id,
        feedback: q.explanation,
      }));
    }

    return NextResponse.json({ ok: true, data: { feedback } });
  } catch (e) {
    return handleError(e);
  }
}
