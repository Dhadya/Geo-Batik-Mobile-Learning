import { z } from "zod";
import { getDb } from "@/lib/db";
import { quizResults } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import type { ModuleSlug } from "@/features/modules/types";

/** Zod schema for a single quiz answer entry. */
export const quizAnswerSchema = z.object({
  questionId: z.number(),
  type: z.enum(["pilihan_ganda", "uraian", "angka", "campuran"]),
  attempt1Answer: z.unknown().nullable(),
  attempt1Correct: z.boolean().nullable(),
  attempt1Feedback: z.string().nullable(),
  attempt1Score: z.number().int().nullable(),
  attempt2Answer: z.unknown().nullable(),
  attempt2Correct: z.boolean().nullable(),
  attempt2Feedback: z.string().nullable(),
  attempt2Score: z.number().int().nullable(),
  finalScore: z.number().int(),
  status: z.enum(["correct_attempt1", "wrong_attempt1", "wrong_attempt2"]),
});

/** Zod schema for submitting all quiz results at once. */
export const submitQuizSchema = z.object({
  answers: z.array(quizAnswerSchema),
  totalScore: z.number().int().min(0).max(100),
  attemptNumber: z.number().int().min(1),
  packageId: z.number().int().min(0).max(1),
});

/** Inferred input type for submitting quiz results. */
export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;

/** Persists a completed quiz result for a module. Returns the inserted row id, totalScore, and attemptNumber. */
export async function saveQuizResult(userId: string, module: ModuleSlug, input: SubmitQuizInput) {
  const db = getDb();

  const inserted = await db
    .insert(quizResults)
    .values({
      userId,
      module,
      attemptNumber: input.attemptNumber,
      packageId: input.packageId,
      answers: input.answers,
      totalScore: input.totalScore,
      completedAt: new Date(),
    })
    .returning({ id: quizResults.id, totalScore: quizResults.totalScore, attemptNumber: quizResults.attemptNumber });

  return { id: inserted[0].id, totalScore: inserted[0].totalScore, attemptNumber: inserted[0].attemptNumber };
}

/** Fetches the most recent quiz result for a module, or null if none exists. */
export async function getLatestQuizResult(userId: string, module: ModuleSlug) {
  const db = getDb();

  const row = await db.query.quizResults.findFirst({
    where: and(
      eq(quizResults.userId, userId),
      eq(quizResults.module, module),
    ),
    orderBy: [desc(quizResults.completedAt)],
  });

  if (!row) return null;

  return {
    id: row.id,
    attemptNumber: row.attemptNumber,
    packageId: row.packageId,
    totalScore: row.totalScore,
    answers: row.answers,
    completedAt: row.completedAt?.toISOString() ?? null,
  };
}

/** Checks if a user has any quiz attempt for the given module. Used by RefleksiLockGuard for cross-module locking. */
export async function hasModuleAttempt(userId: string, module: ModuleSlug): Promise<boolean> {
  const db = getDb();

  const row = await db.query.quizResults.findFirst({
    where: and(
      eq(quizResults.userId, userId),
      eq(quizResults.module, module),
    ),
    columns: { id: true },
  });

  return !!row;
}

/** Fetches all quiz results for a module, ordered by attempt number. */
export async function getAllQuizResults(userId: string, module: ModuleSlug) {
  const db = getDb();

  const rows = await db.query.quizResults.findMany({
    where: and(
      eq(quizResults.userId, userId),
      eq(quizResults.module, module),
    ),
    orderBy: [quizResults.attemptNumber],
  });

  return rows.map((r) => ({
    id: r.id,
    attemptNumber: r.attemptNumber,
    packageId: r.packageId,
    totalScore: r.totalScore,
    answers: r.answers,
    completedAt: r.completedAt?.toISOString() ?? null,
  }));
}
