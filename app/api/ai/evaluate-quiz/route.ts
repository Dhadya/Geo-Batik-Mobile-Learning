import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { evaluateQuizQuestion, type EvaluateQuizQuestionInput } from "@/features/modules/services/ai";

const evaluateQuizSchema = z.object({
  question: z.object({
    id: z.number(),
    type: z.literal("pilihan_ganda"),
    question: z.string(),
    options: z.array(z.string()),
    correctIndex: z.number(),
    explanation: z.string(),
    module: z.string().optional(),
    tab: z.string().optional(),
    questionMatrix: z.string().optional(),
    questionSuffix: z.string().optional(),
  }),
  answer: z.number(),
  attempt: z.union([z.literal(1), z.literal(2)]),
});

/** POST /api/ai/evaluate-quiz — evaluate a single quiz question using Gemini AI. */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const parsed = evaluateQuizSchema.safeParse(body);
      if (!parsed.success) {
        clearTimeout(timeoutId);
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

      const result = await evaluateQuizQuestion(
        parsed.data as unknown as EvaluateQuizQuestionInput,
      );
      clearTimeout(timeoutId);
      return NextResponse.json({ ok: true, data: result });
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (e) {
    return handleError(e);
  }
}
