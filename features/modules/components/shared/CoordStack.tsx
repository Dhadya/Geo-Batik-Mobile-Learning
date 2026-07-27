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

interface CoordStackProps {
  a: string
  b: string
  aError?: string
  bError?: string
  aColor?: FieldColor
  bColor?: FieldColor
  onAChange: (val: string) => void
  onBChange: (val: string) => void
}

/** Stacked vertical (a, b) input pair used in translasi titik table rows. */
export function CoordStack({ a, b, aError, bError, aColor, bColor, onAChange, onBChange }: CoordStackProps) {
  return (
    <div className="flex flex-col gap-0.5 w-8 md:w-10">
      {/* A-value input (top row of the stacked vector) */}
      <Input
        type="text"
        inputMode="numeric"
        placeholder="a"
        value={a}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onAChange(e.target.value)}
        className={`text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${colorClasses(aColor, !!aError)}`}
      />
      {/* B-value input (bottom row of the stacked vector) */}
      <Input
        type="text"
        inputMode="numeric"
        placeholder="b"
        value={b}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onBChange(e.target.value)}
        className={`text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${colorClasses(bColor, !!bError)}`}
      />
    </div>
  )
}
