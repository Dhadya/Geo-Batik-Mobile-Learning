import { Check } from "lucide-react"
import { getScoreColor, getScoreConfig, type ScoreColor } from "../../lib/scoreColors"

/**
 * Colored circle with black checkmark indicating a section's score range.
 * Numeric scores are never shown — only the color.
 *
 * Colors:
 * - Gray (unsubmitted)  → Belum Dinilai (hidden)
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

  const circleSize = size === "md" ? "size-5 md:size-6" : "size-4 md:size-5"
  const iconSize = size === "md" ? "size-3 md:size-3.5" : "size-2.5 md:size-3"

  return (
    <span
      className={`inline-flex items-center justify-center ${circleSize} rounded-full ${config.bgClass} border-2 border-black shrink-0`}
      title={config.label}
    >
      <Check className={`${iconSize} text-black stroke-[3]`} />
    </span>
  )
}
