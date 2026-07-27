"use client"

import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"

/** Number indicator bar — 1,2,3... with SOAL X DARI Y label, color-coded states. */
export function NumberIndicator({
  total,
  current,
  answeredPositions,
  onSelect,
}: {
  total: number
  current: number
  answeredPositions: Set<number>
  onSelect: (n: number) => void
}) {
  return (
    <div className="bg-secondary-container border-4 border-black shadow-md mx-3 md:mx-4 mt-3 md:mt-4 mb-0 p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
          const isCurrent = n === current
          const isAnswered = answeredPositions.has(n)
          return (
            <Button
              key={n}
              size="sm"
              className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-0 font-bold text-xs md:text-sm border-2 border-black ${isCurrent
                ? "bg-primary text-primary-foreground"
                : isAnswered
                  ? "bg-secondary text-white"
                  : "bg-white text-foreground"
                }`}
              onClick={() => onSelect(n)}
            >
              {n}
            </Button>
          )
        })}
      </div>
      <Text as="p" className="font-black text-base md:text-lg lg:text-xl uppercase whitespace-nowrap">
        Soal {current} Dari {total}
      </Text>
    </div>
  )
}
