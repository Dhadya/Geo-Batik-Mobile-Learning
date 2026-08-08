import { createHash } from "node:crypto"
import { getDb } from "@/lib/db"
import { aiFeedbackCache } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import type { EvaluateSectionInput, EvaluateSectionOutput } from "./ai"

export function cacheKeyFor(input: EvaluateSectionInput): string {
  const raw = JSON.stringify({ ...input, answers: input.answers })
  return createHash("sha256").update(raw).digest("hex")
}

export async function getCachedEvaluation(key: string): Promise<EvaluateSectionOutput | null> {
  const db = getDb()
  const cached = await db.query.aiFeedbackCache.findFirst({
    where: eq(aiFeedbackCache.cacheKey, key),
  })
  if (cached && cached.result) {
    return cached.result as unknown as EvaluateSectionOutput
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
