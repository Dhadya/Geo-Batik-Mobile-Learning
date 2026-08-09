import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { cacheControl } from "@/lib/api/cache-control";
import { withRequestLog } from "@/lib/api/logger";
import { getTabProgress } from "@/features/modules/services/progress";
import type { ModuleSlug } from "@/features/modules/types";

/** GET /api/modul/[slug]/progress — fetch all tab unlock/completion state for the module. */
export const GET = withRequestLog(async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;
    const tabs = await getTabProgress(user.id, slug as ModuleSlug);

    return NextResponse.json({ ok: true, data: { tabs } }, { headers: cacheControl("private") });
  } catch (e) {
    return handleError(e);
  }
});
