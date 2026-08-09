import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { cacheControl } from "@/lib/api/cache-control";
import { withRequestLog } from "@/lib/api/logger";
import { hasModuleAttempt } from "@/features/modules/services/quiz";
import type { ModuleSlug } from "@/features/modules/types";

/** GET /api/modul/[slug]/quiz/status — check if user has at least one quiz attempt for this module. */
export const GET = withRequestLog(async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;

    const hasAttempt = await hasModuleAttempt(user.id, slug as ModuleSlug);
    return NextResponse.json(
      { ok: true, data: { hasAttempt } },
      { headers: cacheControl("private") },
    );
  } catch (e) {
    return handleError(e);
  }
});
