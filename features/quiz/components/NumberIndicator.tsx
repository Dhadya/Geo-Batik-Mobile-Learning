"use client"

import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"

/** Number indicator bar — 1,2,3... with SOAL X DARI Y label. */
export function NumberIndicator({
  total,
  current,
  onSelect,
}: {
  total: number
  current: number
  onSelect: (n: number) => void
}) {
  return (
    <div className="bg-secondary-container border-b-4 border-black p-3 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            variant={n === current ? "default" : "outline"}
            size="sm"
            className="!rounded-none w-9 h-9 md:w-10 md:h-10 p-0 font-bold text-sm"
            onClick={() => onSelect(n)}
          >
            {n}
          </Button>
        ))}
      </div>
      <Text as="p" className="font-bold text-sm md:text-base uppercase whitespace-nowrap">
        Soal {current} Dari {total}
      </Text>
    </div>
  )
}
