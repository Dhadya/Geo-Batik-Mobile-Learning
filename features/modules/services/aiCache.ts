import { createHash } from "node:crypto"
import { getDb } from "@/lib/db"
import { aiFeedbackCache } from "@/drizzle/schema"
import { eq, lt } from "drizzle-orm"
import type { EvaluateSectionInput, EvaluateSectionOutput } from "./ai"

export function cacheKeyFor(input: EvaluateSectionInput): string {
  const raw = JSON.stringify({ ...input, answers: input.answers })
  return createHash("sha256").update(raw).digest("hex")
}

export async function getCachedEvaluation(key: string): Promise<EvaluateSectionOutput | null> {
  try {
    const db = getDb()
    const cached = await db.query.aiFeedbackCache.findFirst({
      where: eq(aiFeedbackCache.cacheKey, key),
    })
    if (cached && cached.result) {
      return cached.result as unknown as EvaluateSectionOutput
    }
  } catch (e) {
    console.warn("[aiCache] Error reading cache (table may not exist yet):", e instanceof Error ? e.message : e)
  }
  return null
}

export async function setCachedEvaluation(key: string, result: EvaluateSectionOutput): Promise<void> {
  const db = getDb()
  try {
    await db.insert(aiFeedbackCache).values({
      cacheKey: key,
      result: result as unknown as Record<string, unknown>,
    }).onConflictDoNothing()
  } catch (e) {
    console.error("[aiCache] Error setting cache:", e)
  }
}

/**
 * Deletes cached evaluations older than `olderThanDays` days.
 * Used by a scheduled cron job to keep the table from growing unbounded.
 *
 * @param olderThanDays - Minimum age in days; rows created before this are removed.
 * @returns The number of deleted rows.
 */
export async function deleteExpiredCache(olderThanDays: number): Promise<number> {
  const db = getDb()
  const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000)
  const result = await db
    .delete(aiFeedbackCache)
    .where(lt(aiFeedbackCache.createdAt, cutoff))
    .returning({ id: aiFeedbackCache.id })
  return result.length
}
