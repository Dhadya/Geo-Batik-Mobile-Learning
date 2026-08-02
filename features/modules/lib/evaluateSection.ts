import { handleAuthError } from "@/lib/api/auth-error"
import { toast } from "sonner"
import { validateSection } from "./validation"
import type { FieldColor } from "./validation"
import { buildDeterministicFeedback, feedbackForCorrect, localScore } from "./feedback"
import type { SectionItem } from "../types"

/**
 * Derive per-field colors using local validation (green/red per input),
 * enhanced by AI error messages. Each field gets its own individual color
 * based on whether that specific input is correct or wrong.
 *
 * When AI reports errors for specific fields, those are overridden to red.
 * This lets students see exactly which inputs are wrong, not just a
 * uniform color based on the section score.
 */
function deriveFieldColors(
  localFieldColors: Record<string, FieldColor>,
  aiErrors: Record<string, string>,
): Record<string, FieldColor> {
  const colors = { ...localFieldColors }
  for (const key of Object.keys(aiErrors)) {
    if (colors[key] !== undefined) {
      colors[key] = "red"
    }
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

    // Per-field colors: local validation gives green/red per input,
    // AI errors override specific fields to red when the AI disagrees.
    const fieldColors = deriveFieldColors(
      local.fieldColors, json.data.errors ?? {},
    )
    if (aiCorrect) {
      return {
        ...json.data,
        isCorrect: true,
        score: aiScore != null ? Math.max(aiScore, 100) : 100,
        errors: {},
        fieldColors,
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
      fieldColors,
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
