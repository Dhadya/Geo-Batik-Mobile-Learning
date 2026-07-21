"use client"

import { Button } from "@/components/retroui/Button"
import { Badge } from "@/components/retroui/Badge"

const LABELS = ["A", "B", "C", "D"]

/** Single answer option button with DIPILIH indicator. */
export function AnswerButton({
  index,
  text,
  isSelected,
  onSelect,
  disabled,
}: {
  index: number
  text: string
  isSelected: boolean
  onSelect: () => void
  disabled?: boolean
}) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      size="lg"
      className="w-full justify-start gap-3 p-4 md:p-5 text-left font-bold text-base md:text-lg relative"
      onClick={onSelect}
      disabled={disabled}
    >
      <span className="w-8 h-8 md:w-10 md:h-10 border-4 border-black bg-foreground text-background flex items-center justify-center text-sm md:text-base shrink-0">
        {LABELS[index]}
      </span>
      <span className="grow">{text}</span>
      {isSelected && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase">
          Dipilih
        </Badge>
      )}
    </Button>
  )
}
