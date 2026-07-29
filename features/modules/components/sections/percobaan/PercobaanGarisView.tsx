"use client"

import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { allowOnlyNumbers } from "@/features/modules/hooks/allowOnlyNumbers"
import { PercobaanInstruction } from "./PercobaanInstruction"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"
import type { KoordinatItem, UraianItem, SectionItem, GarisTranslasiTable, SectionBlock } from "@/features/modules/types"

interface PercobaanGarisViewProps {
  items: SectionItem[]
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
  isChecked: boolean
  setField: (itemId: string, fieldKey: string, value: string) => void
  block: SectionBlock
  garisTranslasiTable: GarisTranslasiTable
}

/** Full percobaan view for the translasi/garis tab with source/target point layout. */
export function PercobaanGarisView({
  items,
  fields,
  errors,
  fieldColors,
  isChecked,
  setField,
  block,
  garisTranslasiTable: gtTable,
}: PercobaanGarisViewProps) {
  const srcIds = gtTable.sourceItemIds
  const tgtIds = gtTable.targetItemIds
  const [mt, mb] = gtTable.matrix.split(",")
  const srcItems = srcIds.map((id) => items.find((i) => i.id === id) as KoordinatItem)
  const tgtItems = tgtIds.map((id) => items.find((i) => i.id === id) as KoordinatItem)
  const uraianItems = items.filter((i) => i.type === "uraian") as UraianItem[]

  return (
    <>
      {block.instruction && (
        <PercobaanInstruction
          instruction={block.instruction}
          instructionMatrix={block.instructionMatrix}
        />
      )}

      <Text as="p" className="text-xs md:text-sm font-medium text-black">Tentukan dua titik yang dilewati garis k</Text>

      {/* Source point coordinate inputs */}
      {srcItems.map((k, idx) => {
        const label = idx === 0 ? "Titik potong sumbu x" : "Titik potong sumbu y"
        return (
          <div key={k.id} className="flex gap-1.5 md:gap-2">
            <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
            <div className="grow space-y-0.5 md:space-y-1">
              <Text as="p" className="text-xs md:text-sm font-medium text-black">{label}</Text>
              <div className="flex items-center gap-1">
                <Text as="p" className="text-xs md:text-sm font-bold text-black">{idx === 0 ? "A" : "B"}(</Text>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="x"
                  value={fields[String(k.id)]?.x ?? ""}
                  onKeyDown={allowOnlyNumbers}
                  onChange={(e) => setField(String(k.id), "x", e.target.value)}
                  className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(fieldColors[`${k.id}_coord`])}`}
                />
                <Text as="p" className="text-xs md:text-sm font-bold text-black">,</Text>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="y"
                  value={fields[String(k.id)]?.y ?? ""}
                  onKeyDown={allowOnlyNumbers}
                  onChange={(e) => setField(String(k.id), "y", e.target.value)}
                  className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(fieldColors[`${k.id}_coord`])}`}
                />
                <Text as="p" className="text-xs md:text-sm font-bold text-black">)</Text>
              </div>
              {errors[`${k.id}_coord`] && <Text className="text-destructive text-[10px] md:text-xs font-medium">{errors[`${k.id}_coord`]}</Text>}
            </div>
          </div>
        )
      })}

      {/* Translation table: source → matrix → target */}
      <div className="space-y-1 md:space-y-2">
        <div className="flex gap-1.5 md:gap-2">
          <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
          <Text as="p" className="text-xs md:text-sm font-medium text-black">Translasikan kedua titik</Text>
        </div>
        <div className="border-4 border-black overflow-hidden bg-background">
          <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
            <div>Titik Awal</div>
            <div>Translasi</div>
            <div>Titik Bayangan</div>
          </div>
          <div className="divide-y-2 divide-black text-xs md:text-sm">
            {tgtItems.map((k, idx) => {
              const srcK = srcItems[idx]
              const srcX = fields[String(srcK.id)]?.x ?? ""
              const srcY = fields[String(srcK.id)]?.y ?? ""
              const pointLabel = idx === 0 ? "A" : "B"
              return (
                <div key={k.id} className="grid grid-cols-3 items-center py-2 md:py-3 text-center">
                  <div className="font-bold">{pointLabel}({srcX || "..."}, {srcY || "..."})</div>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                      <div className="px-0.5 md:px-1 select-none">{mt}</div>
                      <div className="px-0.5 md:px-1 select-none">{mb}</div>
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                  </div>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="font-bold text-xs md:text-sm">{pointLabel}&apos;(</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="x'"
                      value={fields[String(k.id)]?.x ?? ""}
                      onKeyDown={allowOnlyNumbers}
                      onChange={(e) => setField(String(k.id), "x", e.target.value)}
                      className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(fieldColors[`${k.id}_coord`])}`}
                    />
                    <span className="font-bold text-xs md:text-sm">,</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="y'"
                      value={fields[String(k.id)]?.y ?? ""}
                      onKeyDown={allowOnlyNumbers}
                      onChange={(e) => setField(String(k.id), "y", e.target.value)}
                      className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(fieldColors[`${k.id}_coord`])}`}
                    />
                    <span className="font-bold text-xs md:text-sm">)</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Uraian items with dynamic line equation prompt */}
      {uraianItems.length > 0 && (
        <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
          {tgtItems.length === 2 && (() => {
            const [t0, t1] = tgtItems
            const t0x = fields[String(t0.id)]?.x ?? ""
            const t0y = fields[String(t0.id)]?.y ?? ""
            const t1x = fields[String(t1.id)]?.x ?? ""
            const t1y = fields[String(t1.id)]?.y ?? ""
            return (
              <Text as="p" className="text-xs md:text-sm font-medium text-black">
                {`Tentukan persamaan garis yang melalui 2 titik A'(${t0x || "..."}, ${t0y || "..."}) dan B'(${t1x || "..."}, ${t1y || "..."})`}
              </Text>
            )
          })()}
          {uraianItems.map((u) => {
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]
            const color = fieldColors[`${u.id}_text`]
            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-0.5 md:space-y-1">
                  <Text as="p" className="text-xs md:text-sm font-medium text-black">{u.question}</Text>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                    disabled={isChecked}
                    rows={2}
                    placeholder="Tuliskan jawabanmu..."
                    className={`w-full border-4 font-medium resize-none text-xs md:text-sm text-black p-2 ${fieldColorClasses(color)}`}
                  />
                  {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
