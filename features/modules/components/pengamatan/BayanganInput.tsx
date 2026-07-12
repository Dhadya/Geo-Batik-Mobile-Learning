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
    <div className="flex items-center gap-1 justify-center">
      <span className="text-sm font-bold select-none">(</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="x'"
        value={x}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onXChange(e.target.value)}
        className={`w-10 text-center p-1 font-black border-2 text-xs h-7 ${xError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
      <span className="text-sm font-bold select-none">,</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="y'"
        value={y}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onYChange(e.target.value)}
        className={`w-10 text-center p-1 font-black border-2 text-xs h-7 ${yError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
      <span className="text-sm font-bold select-none">)</span>
    </div>
  )
}
