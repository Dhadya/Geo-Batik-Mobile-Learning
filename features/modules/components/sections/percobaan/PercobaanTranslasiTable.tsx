"use client"

import { Input } from "@/components/retroui/Input"
import { CoordStack } from "../../shared/CoordStack"
import { allowOnlyNumbers } from "@/features/modules/hooks/allowOnlyNumbers"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"
import type { MatriksItem, KoordinatItem, SectionItem } from "@/features/modules/types"

interface PercobaanTranslasiTableProps {
  items: SectionItem[]
  fields: Record<string, Record<string, string>>
  fieldColors: Record<string, FieldColor>
  setField: (itemId: string, fieldKey: string, value: string) => void
  /** Whether to prefix bayangan labels with A'/B'/C'/D' (used for bangun tab). */
  showPointLetters: boolean
}

/** 3-column grid table for translasi (Titik Awal → Translasi → Titik Bayangan). */
export function PercobaanTranslasiTable({
  items,
  fields,
  fieldColors,
  setField,
  showPointLetters,
}: PercobaanTranslasiTableProps) {
  return (
    <div className="border-4 border-black overflow-hidden bg-background">
      <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
        <div>Titik Awal</div>
        <div>Translasi</div>
        <div>Titik Bayangan</div>
      </div>
      <div className="divide-y-2 divide-black text-xs md:text-sm">
        {items.map((item, idx) => {
          const pointLetter = ["A", "B", "C", "D"][idx] ?? ""
          switch (item.type) {
            case "matriks": {
              const m = item as MatriksItem
              return (
                <div key={m.id} className="grid grid-cols-3 items-center py-2 md:py-3 text-center">
                  <div className="font-bold">{m.label}</div>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <CoordStack
                      a={fields[String(m.id)]?.a ?? ""}
                      b={fields[String(m.id)]?.b ?? ""}
                      aColor={fieldColors[`${m.id}_a`]}
                      bColor={fieldColors[`${m.id}_b`]}
                      onAChange={(val) => setField(String(m.id), "a", val)}
                      onBChange={(val) => setField(String(m.id), "b", val)}
                    />
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <div className="font-bold">{m.targetBayangan}</div>
                </div>
              )
            }
            case "koordinat": {
              const k = item as KoordinatItem
              const bayanganVal = k.bayangan || ""
              const match = bayanganVal.match(/\((-?\d+),\s*(-?\d+)\)/)
              const bx = match?.[1] ?? ""
              const by = match?.[2] ?? ""
              const xColor = fieldColors[`${k.id}_x`]
              const yColor = fieldColors[`${k.id}_y`]

              return (
                <div key={k.id} className="grid grid-cols-3 items-center py-2 md:py-3 text-center">
                  <div className="font-bold">{k.label}</div>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                      <div className="px-0.5 md:px-1 select-none">{bx}</div>
                      <div className="px-0.5 md:px-1 select-none">{by}</div>
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                  </div>
                  <div className="flex items-center justify-center gap-0.5">
                    {showPointLetters && <span className="font-bold text-xs md:text-sm">{pointLetter}&apos;</span>}
                    <span className="font-bold text-xs md:text-sm">(</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="x'"
                      value={fields[String(k.id)]?.x ?? ""}
                      onKeyDown={allowOnlyNumbers}
                      onChange={(e) => setField(String(k.id), "x", e.target.value)}
                      className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(xColor)}`}
                    />
                    <span className="font-bold text-xs md:text-sm">,</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="y'"
                      value={fields[String(k.id)]?.y ?? ""}
                      onKeyDown={allowOnlyNumbers}
                      onChange={(e) => setField(String(k.id), "y", e.target.value)}
                      className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(yColor)}`}
                    />
                    <span className="font-bold text-xs md:text-sm">)</span>
                  </div>
                </div>
              )
            }
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
