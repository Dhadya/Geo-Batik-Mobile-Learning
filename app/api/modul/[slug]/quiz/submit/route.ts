import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { cacheControl } from "@/lib/api/cache-control";
import { submitQuizSchema, saveQuizResult } from "@/features/modules/services/quiz";
import type { ModuleSlug } from "@/features/modules/types";

/** POST /api/modul/[slug]/quiz/submit — save a completed quiz result for the module. */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;
    const body = await request.json();

    const parsed = submitQuizSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data kuis tidak valid",
            issues: parsed.error.issues.map((i) => ({
              path: i.path.join("."),
              message: i.message,
            })),
          },
        },
        { status: 422 },
      );
    }

    const result = await saveQuizResult(user.id, slug as ModuleSlug, parsed.data);
    return NextResponse.json(
      { ok: true, data: result },
      { headers: cacheControl("noStore") },
    );
  } catch (e) {
    return handleError(e);
  }
}
