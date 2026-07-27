"use client"

import { Button } from "@/components/retroui/Button"
import { Badge } from "@/components/retroui/Badge"

const LABELS = ["A", "B", "C", "D"]

/** Renders a vertical 2×1 matrix with scaled parentheses. */
function MatrixInline({ matrix }: { matrix: string }) {
  const [top, bottom] = matrix.split(",")
  return (
    <span className="inline-flex items-center gap-0.5 mx-1 align-middle">
      <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
      <span className="flex flex-col items-center gap-0 md:gap-0.5 text-xs md:text-sm font-black align-middle">
        <span className="leading-none text-center">{top}</span>
        <span className="leading-none text-center">{bottom}</span>
      </span>
      <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
    </span>
  )
}

/** Single answer option button with DIPILIH indicator. */
export function AnswerButton({
  index,
  text,
  matrix,
  isSelected,
  onSelect,
  disabled,
}: {
  index: number
  text: string
  matrix?: string
  isSelected: boolean
  onSelect: () => void
  disabled?: boolean
}) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      size="lg"
       className="w-full justify-start gap-3 p-4 md:p-5 text-left font-medium text-xs md:text-sm wrap-break-word relative"
      onClick={onSelect}
      disabled={disabled}
    >
      <span className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 border-4 border-black bg-foreground text-background flex items-center justify-center text-xs md:text-sm lg:text-base shrink-0">
        {LABELS[index]}
      </span>
      <span className="grow min-w-0 wrap-break-word">
        {matrix ? <MatrixInline matrix={matrix} /> : text}
      </span>
      {isSelected && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase">
          Dipilih
        </Badge>
      )}
    </Button>
  )
}
