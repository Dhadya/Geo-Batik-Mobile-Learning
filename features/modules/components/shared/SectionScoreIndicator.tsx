import { getScoreColor, getScoreConfig, type ScoreColor } from "../../lib/scoreColors"

/**
 * Small colored dot indicator reflecting a section's score range.
 * Numeric scores are never shown — only the color.
 *
 * Colors:
 * - Gray (unsubmitted)  → Belum Dinilai
 * - Red (0–30)          → Perlu Perbaikan
 * - Orange (31–70)      → Cukup
 * - Green (71–100)      → Baik
 */
export function SectionScoreIndicator({
  score,
  size = "sm",
}: {
  score: number | null | undefined
  size?: "sm" | "md"
}) {
  const color: ScoreColor = getScoreColor(score)
  const config = getScoreConfig(score)

  if (color === "gray") return null

  const dotSize = size === "md" ? "size-3 md:size-4" : "size-2.5 md:size-3"

  return (
    <span
      className={`inline-block ${dotSize} rounded-full ${config.bgClass} border-2 border-black shrink-0`}
      title={config.label}
    />
  )
}
