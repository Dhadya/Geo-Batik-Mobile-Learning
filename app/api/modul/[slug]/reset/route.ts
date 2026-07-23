import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { getDb } from "@/lib/db";
import { sectionProgress, quizResults, tabProgress } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import type { ModuleSlug } from "@/features/modules/types";

/** DELETE /api/modul/[slug]/reset — dev-only: deletes all DB records for the module (section_progress, tab_progress, quiz_results). */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: { code: "FORBIDDEN", message: "Hanya tersedia di development" } },
        { status: 403 },
      )
    }

    const user = await requireAuth();
    const { slug } = await params;
    const moduleSlug = slug as ModuleSlug;

    const db = getDb();

    await db.delete(sectionProgress)
      .where(and(
        eq(sectionProgress.userId, user.id),
        eq(sectionProgress.module, moduleSlug),
      ));

    await db.delete(tabProgress)
      .where(and(
        eq(tabProgress.userId, user.id),
        eq(tabProgress.module, moduleSlug),
      ));

    await db.delete(quizResults)
      .where(and(
        eq(quizResults.userId, user.id),
        eq(quizResults.module, moduleSlug),
      ));

    return NextResponse.json({ ok: true });
  } catch (e) {
    return handleError(e);
  }
}
