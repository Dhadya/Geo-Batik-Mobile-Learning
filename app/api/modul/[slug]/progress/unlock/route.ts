import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { cacheControl } from "@/lib/api/cache-control";
import { withRequestLog } from "@/lib/api/logger";
import { unlockNextTab, reconcileAndUnlockNextTab } from "@/features/modules/services/progress";
import { unlockSchema } from "@/lib/schemas";
import { getModuleTabs } from "@/features/modules/data";
import type { ModuleSlug } from "@/features/modules/types";

/** POST /api/modul/[slug]/progress/unlock — unlock the next tab after completing all sections of the current tab. */
export const POST = withRequestLog(async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;
    if (slug !== "translasi" && slug !== "refleksi") {
      return NextResponse.json(
        { ok: false, error: { code: "MODULE_NOT_FOUND", message: "Modul tidak ditemukan" } },
        { status: 404 },
      );
    }

    const body = await request.json();
    const parsed = unlockSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "completedTab wajib diisi" } },
        { status: 422 },
      );
    }

    const tabs = getModuleTabs(slug);
    const tabExists = tabs?.some((t) => t.value === parsed.data.completedTab);
    if (!tabExists) {
      return NextResponse.json(
        { ok: false, error: { code: "TAB_NOT_FOUND", message: "Tab tidak ditemukan" } },
        { status: 404 },
      );
    }

    const result =
      parsed.data.sections?.length
        ? await reconcileAndUnlockNextTab(user.id, slug as ModuleSlug, parsed.data.completedTab, parsed.data.sections)
        : await unlockNextTab(user.id, slug as ModuleSlug, parsed.data.completedTab);
    return NextResponse.json(
      { ok: true, data: result },
      { headers: cacheControl("noStore") },
    );
  } catch (e) {
    return handleError(e);
  }
});
