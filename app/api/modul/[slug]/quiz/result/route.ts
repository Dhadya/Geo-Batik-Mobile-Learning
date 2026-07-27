import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { getLatestQuizResult, getAllQuizResults } from "@/features/modules/services/quiz";
import type { ModuleSlug } from "@/features/modules/types";

/** GET /api/modul/[slug]/quiz/result — fetch the latest and all quiz results for the module. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;

    const [latest, all] = await Promise.all([
      getLatestQuizResult(user.id, slug as ModuleSlug),
      getAllQuizResults(user.id, slug as ModuleSlug),
    ]);

    const finalResult = all.find((r) => r.attemptNumber === 1) ?? null;

    return NextResponse.json(
      { ok: true, data: { result: latest, allResults: all, finalResult } },
      {
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  } catch (e) {
    return handleError(e);
  }
}
