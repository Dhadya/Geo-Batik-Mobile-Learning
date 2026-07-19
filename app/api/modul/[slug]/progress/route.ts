import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { getTabProgress } from "@/features/modules/services/progress";
import type { ModuleSlug } from "@/features/modules/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;
    const tabs = await getTabProgress(user.id, slug as ModuleSlug);

    return NextResponse.json({ ok: true, data: { tabs } });
  } catch (e) {
    return handleError(e);
  }
}
