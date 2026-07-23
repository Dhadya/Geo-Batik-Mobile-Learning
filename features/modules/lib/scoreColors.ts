/**
 * Score thresholds and color indicator mapping for module section scores.
 * Numeric scores (0–100) are stored in the database, but students only ever
 * see the color indicator to avoid demotivation.
 */
export type ScoreColor = "red" | "orange" | "green" | "gray"

export interface ScoreColorConfig {
  color: ScoreColor
  label: string
  bgClass: string
  textClass: string
  borderClass: string
}

const SCORE_CONFIG: Record<ScoreColor, ScoreColorConfig> = {
  gray: { color: "gray", label: "Belum Dinilai", bgClass: "bg-gray-300", textClass: "text-gray-800", borderClass: "border-gray-400" },
  red: { color: "red", label: "Perlu Perbaikan", bgClass: "bg-red-500", textClass: "text-red-700", borderClass: "border-red-600" },
  orange: { color: "orange", label: "Cukup", bgClass: "bg-orange-400", textClass: "text-orange-700", borderClass: "border-orange-500" },
  green: { color: "green", label: "Baik", bgClass: "bg-green-500", textClass: "text-green-700", borderClass: "border-green-600" },
}

/**
 * Maps a numeric score (0–100) to a color indicator.
 * Returns "gray" for null/undefined scores (unsubmitted).
 *
 * Thresholds:
 * - 0–30  → red    (Perlu Perbaikan)
 * - 31–70 → orange (Cukup)
 * - 71–100 → green  (Baik)
 */
export function getScoreColor(score: number | null | undefined): ScoreColor {
  if (score == null) return "gray"
  if (score <= 30) return "red"
  if (score <= 70) return "orange"
  return "green"
}

/** Returns the full config object for a given score. */
export function getScoreConfig(score: number | null | undefined): ScoreColorConfig {
  return SCORE_CONFIG[getScoreColor(score)]
}
