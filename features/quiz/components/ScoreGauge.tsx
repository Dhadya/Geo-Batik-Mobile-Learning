"use client"

import { getScoreConfig } from "@/features/modules/lib/scoreColors"

/** Half-circle gauge showing score as a percentage-filled arc with color coding. */
export function ScoreGauge({ score, attemptLabel }: { score: number; attemptLabel?: string }) {
  const config = getScoreConfig(score)
  const percentage = Math.min(Math.max(score, 0), 100)

  const size = 200
  const strokeWidth = 16
  const cx = size / 2
  const cy = size / 2 + 10
  const radius = (size - strokeWidth) / 2 - 10

  // Arc from 180deg (left) to 0deg (right) — half circle
  const startAngle = Math.PI
  const totalArc = Math.PI
  const filledArc = (percentage / 100) * totalArc

  function arcPath(startA: number, arcLen: number): string {
    const x1 = cx + radius * Math.cos(startA)
    const y1 = cy - radius * Math.sin(startA)
    const endA = startA - arcLen
    const x2 = cx + radius * Math.cos(endA)
    const y2 = cy - radius * Math.sin(endA)
    const large = arcLen > Math.PI ? 1 : 0
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 0 ${x2} ${y2}`
  }

  const colorMap: Record<string, string> = {
    "bg-red-500": "#ef4444",
    "bg-orange-400": "#fb923c",
    "bg-secondary-container": "#a3e635",
    "bg-gray-300": "#d1d5db",
  }
  const strokeColor = colorMap[config.bgClass] ?? "#d1d5db"

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size * 0.65}`} className="w-48 h-32 md:w-60 md:h-40">
        {/* Background arc */}
        <path
          d={arcPath(startAngle, totalArc)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        {percentage > 0 && (
          <path
            d={arcPath(startAngle, filledArc)}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
        {/* Score number */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          className="fill-foreground text-4xl md:text-5xl font-black"
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          className="fill-muted-foreground text-xs md:text-sm font-bold"
        >
          /100
        </text>
      </svg>
      {attemptLabel && (
        <span className="text-lg md:text-xl font-black uppercase mt-1">
          {attemptLabel}
        </span>
      )}
    </div>
  )
}
