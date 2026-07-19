import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { saveSectionSchema, saveSectionAttempt, getSectionProgress } from "@/features/modules/services/section";
import type { ModuleSlug } from "@/features/modules/types";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;
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

    return NextResponse.json({ ok: true, data: result }, { status: 200 });
  } catch (e) {
    return handleError(e);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireAuth();
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get("tab") ?? undefined;
    const sectionType = searchParams.get("sectionType") ?? undefined;

    const sections = await getSectionProgress(user.id, slug as ModuleSlug, tab, sectionType);

    return NextResponse.json({ ok: true, data: { sections } });
  } catch (e) {
    return handleError(e);
  }
}
