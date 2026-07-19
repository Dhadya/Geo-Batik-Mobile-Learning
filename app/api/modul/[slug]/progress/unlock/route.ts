import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { unlockNextTab } from "@/features/modules/services/progress";
import type { ModuleSlug } from "@/features/modules/types";

/** POST /api/modul/[slug]/progress/unlock — unlock the next tab after completing all 4 sections of the current tab. */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;
    const body = await request.json();
    const completedTab = body.completedTab;

    if (!completedTab) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: "VALIDATION_ERROR", message: "completedTab wajib diisi" },
        },
        { status: 422 },
      );
    }

    const result = await unlockNextTab(user.id, slug as ModuleSlug, completedTab);
    return NextResponse.json({ ok: true, data: result });
  } catch (e) {
    return handleError(e);
  }
}
