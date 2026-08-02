import { handleAuthError } from "@/lib/api/auth-error"
import { toast } from "sonner"
import { validateSection } from "./validation"
import type { FieldColor } from "./validation"
import { getScoreColor } from "./scoreColors"
import { buildDeterministicFeedback, feedbackForCorrect, localScore } from "./feedback"
import type { SectionItem } from "../types"

/**
 * Derive field colors uniformly from the AI section score tier.
 * All user-answered fields receive the same color based on score thresholds
 * (matching SectionScoreIndicator):
 * - 71-100 (green tier): all fields green
 * - 31-70  (orange tier): all fields orange
 * - 0-30   (red tier):   all fields red
 *
 * Per-field error messages are still shown as text below each input —
 * only the border/background color is determined by the section score.
 */
function deriveFieldColorsFromAI(
  fields: Record<string, Record<string, string>>,
  localFieldColors: Record<string, FieldColor>,
  _aiErrors: Record<string, string>,
  aiScore: number | null,
): Record<string, FieldColor> {
  const colors: Record<string, FieldColor> = {}
  const scoreColor = getScoreColor(aiScore)

  // Collect all field keys that have user answers
  const userKeys = new Set<string>()
  for (const [itemId, itemFields] of Object.entries(fields)) {
    for (const key of Object.keys(itemFields)) {
      if (itemFields[key]?.trim()) {
        userKeys.add(`${itemId}_${key}`)
      }
    }
  }
  // Include local validation keys for coverage (e.g. items where answer format differs from fields)
  for (const key of Object.keys(localFieldColors)) {
    userKeys.add(key)
  }

  for (const key of userKeys) {
    colors[key] = scoreColor === "gray" ? null : scoreColor
  }

  return colors
}

/**
 * Client-side AI evaluation caller with local validation fallback.
 * Posts to /api/ai/evaluate-section; falls back to validateSection() on network or API error.
 * Shows toast notification when falling back to local validation.
 */
export async function evaluateSection(
  slug: string,
  tab: string,
  sectionType: string,
  items: SectionItem[],
  fields: Record<string, Record<string, string>>,
  attempt: 1 | 2,
): Promise<{
  isCorrect: boolean
  score: number | null
  feedback: string
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
}> {
  try {
    const response = await fetch("/api/ai/evaluate-section", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ module: slug, tab, sectionType, items, answers: fields, attempt }),
    })
    if (response.status === 401) { handleAuthError(new Error("UNAUTHORIZED")); throw new Error("Unauthorized") }
    const json = await response.json()
    if (!json.ok) throw new Error(json.error?.message ?? "AI evaluation failed")
    const aiCorrect = json.data.isCorrect
    const local = validateSection(items, fields, undefined)
    const aiScore = json.data.score

    // Use effective score for field colors: when AI says correct, force green tier (71-100)
    // so all fields appear green regardless of raw AI score, matching SectionScoreIndicator
    const effectiveScore = aiCorrect ? (aiScore != null ? Math.max(aiScore, 100) : 100) : aiScore
    const aiFieldColors = deriveFieldColorsFromAI(
      fields, local.fieldColors, json.data.errors ?? {}, effectiveScore,
    )
    if (aiCorrect) {
      return {
        ...json.data,
        isCorrect: true,
        score: aiScore != null ? Math.max(aiScore, 100) : 100,
        errors: {},
        fieldColors: aiFieldColors,
      }
    }

    // AI says wrong — use its score or fall back to local calculation
    const numericScore = aiScore != null ? aiScore
      : local.correctCount === local.totalItems ? 100
      : local.correctCount === 0 ? 0
      : 50
    return {
      ...json.data,
      isCorrect: false,
      score: numericScore,
      errors: json.data.errors ?? local.errors ?? {},
      fieldColors: aiFieldColors,
    }
  } catch {
    toast.error(`Gagal memuat feedback AI, menggunakan penilaian lokal`)
    const local = validateSection(items, fields, undefined)

    return {
      isCorrect: local.isCorrect,
      score: local.isCorrect ? 100 : localScore(local),
      feedback: local.isCorrect
        ? feedbackForCorrect(sectionType, items, fields)
        : buildDeterministicFeedback({ module: slug, tab, sectionType, items, answers: fields, attempt }, local, true),
      errors: local.errors ?? {},
      fieldColors: local.fieldColors ?? {},
    }
  }
}
