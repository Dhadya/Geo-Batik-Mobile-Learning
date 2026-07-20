import { getDb } from "@/lib/db";
import { sectionProgress } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { appError } from "@/lib/api/errors";
import { type SaveSectionInput } from "@/lib/schemas";

/**
 * Persists a student's answer for a section (percobaan/pengamatan/penyimpulan/cek-pemahaman).
 * Prevents re-submission if the section is already in a terminal state (correct or wrong_attempt2).
 * On attempt 2, requires a prior attempt 1 row to exist.
 */
export async function saveSectionAttempt(
  userId: string,
  module: "translasi" | "refleksi",
  input: SaveSectionInput,
) {
  const db = getDb();

  const existing = await db.query.sectionProgress.findFirst({
    where: and(
      eq(sectionProgress.userId, userId),
      eq(sectionProgress.module, module),
      eq(sectionProgress.tab, input.tab),
      eq(sectionProgress.sectionType, input.sectionType),
    ),
  });

  if (existing?.status === "correct" || existing?.status === "wrong_attempt2") {
    throw appError("SECTION_ALREADY_COMPLETED");
  }

  if (input.attempt === 2 && !existing) {
    throw appError("SECTION_NOT_FOUND");
  }

  const attemptField = input.attempt === 1 ? "attempt1" : "attempt2";
  const answerStr = JSON.stringify(input.answer);

  const base = {
    userId,
    module,
    tab: input.tab,
    sectionType: input.sectionType,
    status: input.status ?? ("unsubmitted" as const),
  };

  const patch: Record<string, unknown> = {
    [`${attemptField}Answer`]: answerStr,
    [`${attemptField}Score`]: input.score ?? null,
  };
  if (input.feedback) {
    patch[`${attemptField}Feedback`] = input.feedback;
  }

  const finalize =
    input.status === "correct" || input.status === "wrong_attempt2"
      ? { completedAt: new Date(), finalScore: input.score }
      : {};

  if (existing) {
    const updated = await db
      .update(sectionProgress)
      .set({ ...base, ...patch, ...finalize })
      .where(eq(sectionProgress.id, existing.id))
      .returning();

    return { id: updated[0].id, status: updated[0].status, finalScore: updated[0].finalScore };
  }

  const inserted = await db
    .insert(sectionProgress)
    .values({ ...base, ...patch, ...finalize })
    .returning();

  return { id: inserted[0].id, status: inserted[0].status, finalScore: inserted[0].finalScore };
}

/** Fetches section-level progress for a module, optionally filtered by tab and/or section type. */
export async function getSectionProgress(
  userId: string,
  module: "translasi" | "refleksi",
  tab?: string,
  sectionType?: string,
) {
  const db = getDb();
  const conditions = [
    eq(sectionProgress.userId, userId),
    eq(sectionProgress.module, module),
  ];
  if (tab) conditions.push(eq(sectionProgress.tab, tab));
  if (
    sectionType &&
    (sectionType === "percobaan" ||
      sectionType === "pengamatan" ||
      sectionType === "penyimpulan" ||
      sectionType === "cek-pemahaman")
  ) {
    conditions.push(eq(sectionProgress.sectionType, sectionType));
  }

  const rows = await db.query.sectionProgress.findMany({
    where: and(...conditions),
  });

  return rows.map((r) => ({
    tab: r.tab,
    sectionType: r.sectionType,
    status: r.status,
    finalScore: r.finalScore,
    attempt1Answer: r.attempt1Answer,
    attempt1Feedback: r.attempt1Feedback,
    attempt1Score: r.attempt1Score,
    attempt2Answer: r.attempt2Answer,
    attempt2Feedback: r.attempt2Feedback,
    completedAt: r.completedAt?.toISOString() ?? null,
  }));
}
