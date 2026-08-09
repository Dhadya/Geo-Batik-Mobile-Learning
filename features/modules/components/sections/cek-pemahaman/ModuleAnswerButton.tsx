"use client"

import Image from "next/image"

import { Button } from "@/components/retroui/Button"
import { Badge } from "@/components/retroui/Badge"
import { LABELS } from "../../../lib/assessmentHelpers"

interface ModuleAnswerButtonProps {
  /** Zero-based option index. */
  index: number
  /** Option display text. */
  text: string
  /** Whether this option is currently selected. */
  isSelected: boolean
  /** Whether this option is marked correct (show green). */
  isCorrect: boolean
  /** Whether this option is marked wrong (show red/orange). */
  isWrong: boolean
  /** Called when the button is clicked. */
  onSelect: () => void
  /** Render option text as a coordinate matrix (a/b stacked). */
  matrix?: boolean
  /** Disable interaction. */
  disabled?: boolean
  /** Optional image URL to render instead of text. */
  imageSrc?: string
  /** Current attempt number — determines orange (attempt 1) vs red (attempt 2) for wrong answers. */
  attempt?: 1 | 2
}

/** Compact answer button for module context — smaller than quiz version. */
export function ModuleAnswerButton({
  index,
  text,
  isSelected,
  isCorrect,
  isWrong,
  onSelect,
  matrix,
  disabled,
  imageSrc,
  attempt = 1,
}: ModuleAnswerButtonProps) {
  const parsed = matrix ? text.match(/\(([^,]+),\s*([^)]+)\)/) : null
  const isWrongAttempt2 = isWrong && attempt === 2

  return (
    <Button
      variant={isSelected && !isCorrect && !isWrong ? "default" : "outline"}
      className={`justify-start flex-row items-center gap-2 md:gap-3 p-2 md:p-3 text-left font-semibold text-sm md:text-base relative ${isCorrect ? "border-green-600 bg-green-50 text-black" : isWrongAttempt2 ? "border-destructive bg-destructive/10 text-black" : isWrong ? "border-orange-500 bg-orange-50 text-black" : ""
        }`}
      onClick={onSelect}
      disabled={disabled}
    >
      <span
        className={`w-5 h-5 md:w-7 md:h-7 border-2 border-black flex items-center justify-center text-[10px] md:text-sm shrink-0 ${isCorrect ? "bg-secondary text-white" : isWrongAttempt2 ? "bg-destructive text-white" : isWrong ? "bg-orange-500 text-white" : "bg-foreground text-background"
          }`}
      >
        {LABELS[index]}
      </span>
      {imageSrc ? (
        <div className="flex flex-col items-center gap-1">
          <Image
            src={imageSrc}
            alt={text}
            width={100}
            height={100}
            className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] object-contain"
          />
        </div>
      ) : parsed ? (
        <span className="flex items-center justify-start gap-0.5">
          <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.7] origin-center">
            (
          </span>
          <span className="flex flex-col items-center gap-0.5 text-[10px] md:text-xs font-black">
            <span className="px-1 md:px-2 select-none text-center">{parsed[1].trim()}</span>
            <span className="px-1 md:px-2 select-none text-center">{parsed[2].trim()}</span>
          </span>
          <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.7] origin-center">
            )
          </span>
        </span>
      ) : (
        <span className="grow text-left">{text}</span>
      )}
      {isSelected && !isCorrect && !isWrong && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase">
          Dipilih
        </Badge>
      )}
      {isCorrect && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase bg-secondary">
          Benar
        </Badge>
      )}
      {isWrong && (
        <Badge variant="solid" size="sm" className={`absolute -top-2 -right-2 uppercase ${isWrongAttempt2 ? "bg-destructive" : "bg-orange-500"}`}>
          Salah
        </Badge>
      )}
    </Button>
  )
}
