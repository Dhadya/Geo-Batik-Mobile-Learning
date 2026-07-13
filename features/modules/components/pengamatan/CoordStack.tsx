"use client"

import { Input } from "@/components/retroui/Input"
import { allowOnlyNumbers } from "@/features/modules/hooks/useObservation"

interface CoordStackProps {
  a: string
  b: string
  aError?: string
  bError?: string
  onAChange: (val: string) => void
  onBChange: (val: string) => void
}

/** Stacked vertical (a, b) input pair used in translasi titik table rows. */
export function CoordStack({ a, b, aError, bError, onAChange, onBChange }: CoordStackProps) {
  return (
    <div className="flex flex-col gap-0.5 w-8 md:w-10">
      <Input
        type="text"
        inputMode="numeric"
        placeholder="a"
        value={a}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onAChange(e.target.value)}
        className={`text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${aError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
      <Input
        type="text"
        inputMode="numeric"
        placeholder="b"
        value={b}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onBChange(e.target.value)}
        className={`text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${bError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
    </div>
  )
}
