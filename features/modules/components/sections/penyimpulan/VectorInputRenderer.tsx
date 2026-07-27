"use client"

import { useState } from "react"
import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { validateVector } from "./conclusionHelpers"

interface VectorInputRendererProps {
  fields: Record<string, Record<string, string>>
  isChecked: boolean
  setField: (id: string, subKey: string, value: string) => void
}

/** Render translation vector (a, b) input for penyimpulan section. */
export function VectorInputRenderer({
  fields,
  isChecked,
  setField,
}: VectorInputRendererProps) {
  const [vectorErr, setVectorErr] = useState<string>("")
  const aVal = fields["11"]?.a_val ?? ""
  const bVal = fields["11"]?.b_val ?? ""

  return (
    <div className="flex gap-1.5 md:gap-2">
      <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right mt-2">•</span>
      <div className="grow space-y-2 md:space-y-3">
        <div className="flex items-center gap-0.5">
          <p className="text-xs md:text-sm text-black">
            Jika salah satu titik sebuah bangun ditranslasikan oleh
          </p>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
          <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
            <div className="px-1 italic select-none">a</div>
            <div className="px-1 italic select-none">b</div>
          </div>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
        </div>
        <div className="flex items-center gap-0.5">
          <p className="text-xs md:text-sm font-medium text-black">
            maka seluruh titik lainnya ditranslasikan oleh
          </p>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
          <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
            <Input
              type="text"
              value={aVal}
              onChange={(e) => {
                setField("11", "a_val", e.target.value)
                validateVector(e.target.value, bVal, setVectorErr)
              }}
              disabled={isChecked}
              placeholder="..."
              className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${vectorErr ? "border-destructive" : "border-black"}`}
            />
            <Input
              type="text"
              value={bVal}
              onChange={(e) => {
                setField("11", "b_val", e.target.value)
                validateVector(aVal, e.target.value, setVectorErr)
              }}
              disabled={isChecked}
              placeholder="..."
              className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${vectorErr ? "border-destructive" : "border-black"}`}
            />
          </div>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
        </div>
        {isChecked && vectorErr && (
          <Text className="text-destructive text-[10px] md:text-xs font-medium">{vectorErr}</Text>
        )}
      </div>
    </div>
  )
}
