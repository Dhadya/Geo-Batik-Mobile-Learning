"use client"

import { Input } from "@/components/retroui/Input"
import { allowOnlyNumbers } from "@/features/modules/hooks/allowOnlyNumbers"
import { REFLECTION_LABELS } from "@/features/modules/data/moduleConfig"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"
import type { KoordinatItem, SectionItem, RefleksiGroup } from "@/features/modules/types"

interface PercobaanRefleksiTableProps {
  items: SectionItem[]
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
  setField: (itemId: string, fieldKey: string, value: string) => void
  tab: string
  refleksiGroups?: RefleksiGroup[]
}

/** Refleksi table with Titik Awal → Refleksi → Titik Bayangan and rowSpan grouping. */
export function PercobaanRefleksiTable({
  items,
  fields,
  errors,
  fieldColors,
  setField,
  tab,
  refleksiGroups,
}: PercobaanRefleksiTableProps) {
  const reflectText = REFLECTION_LABELS[tab] ?? tab

  // Build a map: itemId → group index for rowSpan handling
  const groupByItem = new Map<number, { garis: string; isFirst: boolean; count: number }>()
  if (refleksiGroups) {
    refleksiGroups.forEach((g) => {
      g.itemIds.forEach((id, i) => {
        groupByItem.set(id, { garis: g.garis, isFirst: i === 0, count: g.itemIds.length })
      })
    })
  }

  return (
    <table className="w-full border-4 border-black border-collapse bg-background text-xs md:text-sm">
      <thead>
        <tr className="bg-muted border-b-4 border-black text-center font-black">
          <th className="p-1.5 md:p-2 border-r-2 border-black">Titik Awal <span>(A)</span></th>
          <th className="p-1.5 md:p-2 border-r-2 border-black">Refleksi terhadap</th>
          <th className="p-1.5 md:p-2">Titik Bayangan <span>(A&apos;)</span></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => {
          if (item.type !== "koordinat") return null
          const k = item as KoordinatItem
          const groupInfo = groupByItem.get(k.id)

          // Determine if this row should show the middle cell
          const showMiddleCell = refleksiGroups
            ? groupInfo?.isFirst ?? false
            : idx === 0
          const rowSpan = refleksiGroups
            ? groupInfo?.count ?? 1
            : items.length
          const middleLabel = refleksiGroups
            ? groupInfo?.garis ?? reflectText
            : reflectText

          // Add top border separator between groups
          const isFirstInGroup = groupInfo?.isFirst ?? false
          const groupIndex = refleksiGroups
            ? refleksiGroups.findIndex(g => g.itemIds.includes(k.id))
            : 0
          const needsTopBorder = refleksiGroups && isFirstInGroup && groupIndex > 0

          return (
            <tr key={k.id} className="text-center">
              <td className={`py-2 md:py-3 font-bold border-r-2 border-black border-b-2 ${needsTopBorder ? "border-t-2 border-t-black" : ""}`}>
                {k.label.replace(/^[A-Z]/, '')}
              </td>
              {showMiddleCell && (
                <td rowSpan={rowSpan} className={`py-2 md:py-3 font-bold border-r-2 border-black align-middle text-xs md:text-sm ${needsTopBorder ? "border-t-2 border-t-black" : ""}`}>
                  {middleLabel}
                </td>
              )}
              <td className={`py-2 md:py-3 border-b-2 border-black ${needsTopBorder ? "border-t-2 border-t-black" : ""}`}>
                <div className="flex items-center justify-center gap-0.5">
                  <span className="font-bold text-xs md:text-sm">(</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="x'"
                    value={fields[String(k.id)]?.x ?? ""}
                    onKeyDown={allowOnlyNumbers}
                    onChange={(e) => setField(String(k.id), "x", e.target.value)}
                    className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(fieldColors[`${k.id}_coord`], !!errors[`${k.id}_coord`])}`}
                  />
                  <span className="font-bold text-xs md:text-sm">,</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="y'"
                    value={fields[String(k.id)]?.y ?? ""}
                    onKeyDown={allowOnlyNumbers}
                    onChange={(e) => setField(String(k.id), "y", e.target.value)}
                    className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(fieldColors[`${k.id}_coord`], !!errors[`${k.id}_coord`])}`}
                  />
                  <span className="font-bold text-xs md:text-sm">)</span>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
