"use client"

import { Input } from "@/components/retroui/Input"

interface CoordStackProps {
  a: string
  b: string
  aError?: string
  bError?: string
  onAChange: (val: string) => void
  onBChange: (val: string) => void
}

export function CoordStack({ a, b, aError, bError, onAChange, onBChange }: CoordStackProps) {
  return (
    <div className="flex flex-col gap-0.5 w-10">
      <Input
        type="text"
        value={a}
        onChange={(e) => onAChange(e.target.value)}
        className={`text-center p-1 font-black border-2 text-xs h-7 ${aError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
      <Input
        type="text"
        value={b}
        onChange={(e) => onBChange(e.target.value)}
        className={`text-center p-1 font-black border-2 text-xs h-7 ${bError ? "border-destructive bg-destructive-container" : "border-black"}`}
      />
    </div>
  )
}
