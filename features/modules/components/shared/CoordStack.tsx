"use client"

import { Input } from "@/components/retroui/Input"
import { allowOnlyNumbers } from "@/features/modules/hooks/allowOnlyNumbers"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"

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
      <Input
        type="text"
        inputMode="numeric"
        placeholder="a"
        value={a}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onAChange(e.target.value)}
        className={`text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(aColor, !!aError)}`}
      />
      <Input
        type="text"
        inputMode="numeric"
        placeholder="b"
        value={b}
        onKeyDown={allowOnlyNumbers}
        onChange={(e) => onBChange(e.target.value)}
        className={`text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(bColor, !!bError)}`}
      />
    </div>
  )
}
