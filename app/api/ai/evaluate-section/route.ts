import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { cacheControl } from "@/lib/api/cache-control";
import { evaluateSectionSchema } from "@/lib/schemas";
import { evaluateSection, type EvaluateSectionInput } from "@/features/modules/services/ai";

/** POST /api/ai/evaluate-section — evaluate a section's answers using Gemini AI. */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const parsed = evaluateSectionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Data evaluasi tidak valid", issues: parsed.error.issues } },
        { status: 422 },
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const result = await evaluateSection(parsed.data as unknown as EvaluateSectionInput);
      console.log(
        `[evaluate-section] module=${parsed.data.module} tab=${parsed.data.tab}`,
        `sectionType=${parsed.data.sectionType} attempt=${parsed.data.attempt}`,
        `score=${result.score} isCorrect=${result.isCorrect}`,
        `items=${parsed.data.items?.length ?? 0} answerKeys=${Object.keys(parsed.data.answers ?? {}).length}`,
      );
      return NextResponse.json(
        { ok: true, data: result },
        { headers: cacheControl("noStore") },
      );
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (e) {
    return handleError(e);
  }
}
