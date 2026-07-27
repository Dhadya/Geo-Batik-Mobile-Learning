"use client"

import { Input } from "@/components/retroui/Input"
import { allowOnlyNumbers } from "@/features/modules/hooks/allowOnlyNumbers"
import type { FieldColor } from "@/features/modules/lib/validation"

function colorClasses(color?: FieldColor, hasError?: boolean): string {
  if (hasError) return "border-destructive bg-destructive-container"
  if (color === "green") return "border-green-600 bg-green-50"
  if (color === "red") return "border-destructive bg-destructive/10"
  return "border-black"
}

interface BayanganInputProps {
  x: string
  y: string
  xError?: string
  yError?: string
  xColor?: FieldColor
  yColor?: FieldColor
  onXChange: (val: string) => void
  onYChange: (val: string) => void
}

/** Horizontal (x, y) input pair with parentheses and error styling. */
export function BayanganInput({ x, y, xError, yError, xColor, yColor, onXChange, onYChange }: BayanganInputProps) {
  return (
    <div className="flex items-center gap-0.5 md:gap-1 justify-center">
      {/* Opening parenthesis */}
      <span className="text-xs md:text-sm font-bold select-none">(</span>
      {/* X' coordinate input */}
      <Input
        type="text"
        inputMode="numeric"
        placeholder="x'"
        value={x}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onXChange(e.target.value)}
        className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${colorClasses(xColor, !!xError)}`}
      />
      {/* Comma separator */}
      <span className="text-xs md:text-sm font-bold select-none">,</span>
      {/* Y' coordinate input */}
      <Input
        type="text"
        inputMode="numeric"
        placeholder="y'"
        value={y}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onYChange(e.target.value)}
        className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${colorClasses(yColor, !!yError)}`}
      />
      {/* Closing parenthesis */}
      <span className="text-xs md:text-sm font-bold select-none">)</span>
    </div>
  )
}
