import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { evaluateQuizQuestion } from "@/features/modules/services/ai";
import type { QuizQuestion } from "@/features/quiz/types";

const evaluateQuizSchema = z.object({
  question: z.object({
    id: z.number(),
    type: z.enum(["pilihan_ganda", "uraian", "angka", "campuran"]),
    question: z.string(),
    module: z.string().optional(),
    tab: z.string().optional(),
  }).passthrough(),
  answer: z.unknown(),
  attempt: z.union([z.literal(1), z.literal(2)]),
});

/** POST /api/ai/evaluate-quiz — evaluate a single quiz question using Gemini AI. */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const parsed = evaluateQuizSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data evaluasi tidak valid",
            issues: parsed.error.issues.map((i) => ({
              path: i.path.join("."),
              message: i.message,
            })),
          },
        },
        { status: 422 },
      );
    }

    const result = await evaluateQuizQuestion({
      question: parsed.data.question as unknown as QuizQuestion,
      answer: parsed.data.answer,
      attempt: parsed.data.attempt,
    });

    return NextResponse.json({ ok: true, data: result });
  } catch (e) {
    return handleError(e);
  }
}
