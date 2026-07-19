import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { getLatestQuizResult } from "@/features/modules/services/quiz";
import type { ModuleSlug } from "@/features/modules/types";

/** GET /api/modul/[slug]/quiz/result — fetch the latest quiz result for the module (null if none exists). */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;

    const result = await getLatestQuizResult(user.id, slug as ModuleSlug);
    return NextResponse.json({ ok: true, data: { result } });
  } catch (e) {
    return handleError(e);
  }
}
