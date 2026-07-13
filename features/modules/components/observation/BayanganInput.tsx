"use client"

import { Input } from "@/components/retroui/Input"
import { allowOnlyNumbers } from "@/features/modules/hooks/useObservation"

interface BayanganInputProps {
  x: string
  y: string
  xError?: string
  yError?: string
  onXChange: (val: string) => void
  onYChange: (val: string) => void
}

/** Horizontal (x, y) input pair with parentheses and error styling. */
export function BayanganInput({ x, y, xError, yError, onXChange, onYChange }: BayanganInputProps) {
  return (
    <div className="flex items-center gap-0.5 md:gap-1 justify-center">
      <span className="text-xs md:text-sm font-bold select-none">(</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="x'"
        value={x}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onXChange(e.target.value)}
        className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${xError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
      <span className="text-xs md:text-sm font-bold select-none">,</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="y'"
        value={y}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onYChange(e.target.value)}
        className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${yError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
      <span className="text-xs md:text-sm font-bold select-none">)</span>
    </div>
  )
}
