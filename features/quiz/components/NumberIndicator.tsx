"use client"

import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"

/** Number indicator bar — 1,2,3... with SOAL X DARI Y label, color-coded states. */
export function NumberIndicator({
  total,
  current,
  answeredIds,
  onSelect,
}: {
  total: number
  current: number
  answeredIds: number[]
  onSelect: (n: number) => void
}) {
  return (
    <div className="bg-secondary-container border-4 border-black shadow-md mx-3 md:mx-4 mt-3 md:mt-4 mb-0 p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
          const isCurrent = n === current
          const isAnswered = answeredIds.includes(n)
          return (
            <Button
              key={n}
              size="sm"
              className={`!rounded-none w-10 h-10 md:w-11 md:h-11 p-0 font-bold text-sm border-2 border-black ${
                isCurrent
                  ? "bg-primary text-primary-foreground"
                  : isAnswered
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-white text-foreground"
              }`}
              onClick={() => onSelect(n)}
            >
              {n}
            </Button>
          )
        })}
      </div>
      <Text as="p" className="font-black text-xl md:text-2xl uppercase whitespace-nowrap">
        Soal {current} Dari {total}
      </Text>
    </div>
  )
}
