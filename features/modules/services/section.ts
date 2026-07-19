import { getDb } from "@/lib/db";
import { sectionProgress } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { appError } from "@/lib/api/errors";

export interface SaveSectionInput {
  tab: string;
  sectionType: "percobaan" | "pengamatan" | "penyimpulan" | "cek-pemahaman";
  attempt: 1 | 2;
  answer: Record<string, unknown>;
  score?: number | null;
  status?: "correct" | "wrong_attempt1" | "wrong_attempt2";
}

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

  const isAttempt1 = input.attempt === 1;

  const base = {
    userId,
    module,
    tab: input.tab,
    sectionType: input.sectionType,
    status: input.status ?? "unsubmitted" as const,
  };

  const answerStr = JSON.stringify(input.answer);

  if (existing) {
    const patch = isAttempt1
      ? { attempt1Answer: answerStr, attempt1Score: input.score ?? null }
      : { attempt2Answer: answerStr, attempt2Score: input.score ?? null };

    const finalize = (input.status === "correct" || input.status === "wrong_attempt2")
      ? { completedAt: new Date(), finalScore: input.score }
      : {};

    const updated = await db
      .update(sectionProgress)
      .set({ ...base, ...patch, ...finalize })
      .where(eq(sectionProgress.id, existing.id))
      .returning();

    return { id: updated[0].id, status: updated[0].status, finalScore: updated[0].finalScore };
  }

  const insertData = {
    ...base,
    ...(isAttempt1
      ? { attempt1Answer: answerStr, attempt1Score: input.score ?? null }
      : { attempt2Answer: answerStr, attempt2Score: input.score ?? null }),
    ...(input.status === "correct" || input.status === "wrong_attempt2"
      ? { completedAt: new Date(), finalScore: input.score }
      : {}),
  };

  const inserted = await db.insert(sectionProgress).values(insertData).returning();
  return { id: inserted[0].id, status: inserted[0].status, finalScore: inserted[0].finalScore };
}

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
  if (sectionType && (sectionType === "percobaan" || sectionType === "pengamatan" || sectionType === "penyimpulan" || sectionType === "cek-pemahaman")) {
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
    completedAt: r.completedAt?.toISOString() ?? null,
  }));
}
