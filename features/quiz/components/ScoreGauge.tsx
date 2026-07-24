"use client"

import { RadialBarChart, RadialBar, PolarRadiusAxis, Label, ResponsiveContainer } from "recharts"
import { getScoreConfig } from "@/features/modules/lib/scoreColors"

const colorMap: Record<string, string> = {
  "bg-red-500": "#ef4444",
  "bg-orange-400": "#fb923c",
  "bg-secondary-container": "#a3e635",
  "bg-gray-300": "#d1d5db",
}

/**
 * Semicircle radial arc gauge showing score proportionally.
 * Grey arc = full 180° background, colored arc fills based on score percentage.
 */
export function ScoreGauge({ score, attemptLabel }: { score: number; attemptLabel?: string }) {
  const config = getScoreConfig(score)
  const strokeColor = colorMap[config.bgClass] ?? "#d1d5db"

  const chartData = [{ name: "gauge", score }]

  return (
    <div className="flex flex-col items-center select-none">
      {attemptLabel && (
        <span className="text-base md:text-lg font-black uppercase mb-4">
          {attemptLabel}
        </span>
      )}
      <ResponsiveContainer width={320} height={180}>
        <RadialBarChart
          data={chartData}
          startAngle={180}
          endAngle={0}
          innerRadius="60%"
          outerRadius="120%"
          barSize={20}
        >
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  const cx = viewBox.cx ?? 160
                  const cy = viewBox.cy ?? 160
                  return (
                    <text x={cx} y={cy} textAnchor="middle" style={{ pointerEvents: "none" }}>
                      <tspan
                        x={cx}
                        y={cy - 10}
                        className="fill-foreground text-5xl md:text-6xl font-black"
                      >
                        {score}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + 18}
                        className="fill-muted-foreground text-sm md:text-base font-bold"
                      >
                        /100
                      </tspan>
                    </text>
                  )
                }
                return null
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="score"
            max={100}
            cornerRadius={0}
            fill={strokeColor}
            background={{ fill: "#e5e7eb" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
