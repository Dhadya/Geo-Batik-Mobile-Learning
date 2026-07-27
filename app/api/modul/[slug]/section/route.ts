import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { saveSectionAttempt, getSectionProgress } from "@/features/modules/services/section";
import { saveSectionSchema } from "@/lib/schemas";
import type { ModuleSlug } from "@/features/modules/types";

/** POST /api/modul/[slug]/section — save a student's section attempt (percobaan/pengamatan/penyimpulan/cek-pemahaman). */
export async function POST(
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

    const parsed = saveSectionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data tidak valid",
            issues: parsed.error.issues.map((i) => ({
              path: i.path.join("."),
              message: i.message,
            })),
          },
        },
        { status: 422 },
      );
    }

    const result = await saveSectionAttempt(user.id, slug as ModuleSlug, parsed.data);
    console.log(
      `[section.save] slug=${slug} tab=${parsed.data.tab}`,
      `sectionType=${parsed.data.sectionType} attempt=${parsed.data.attempt}`,
      `status=${parsed.data.status} score=${parsed.data.score}`,
    );
    return NextResponse.json({ ok: true, data: result }, { status: 200 });
  } catch (e) {
    return handleError(e);
  }
}

/** GET /api/modul/[slug]/section — fetch section progress, optionally filtered by tab and/or sectionType query params. */
export async function GET(
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
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get("tab") ?? undefined;
    const sectionType = searchParams.get("sectionType") ?? undefined;

    const sections = await getSectionProgress(user.id, slug as ModuleSlug, tab, sectionType);
    console.log(
      `[section.fetch] slug=${slug} tab=${tab ?? "all"} sectionType=${sectionType ?? "all"}`,
      `count=${sections.length}`,
      sections.map((s) => `${s.sectionType}[${s.tab}]:${s.status}`).join(" "),
    );
    return NextResponse.json({ ok: true, data: { sections } });
  } catch (e) {
    return handleError(e);
  }
}
