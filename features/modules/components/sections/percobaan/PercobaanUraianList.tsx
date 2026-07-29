"use client"

import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"
import type { UraianItem } from "@/features/modules/types"

interface PercobaanUraianListProps {
  items: UraianItem[]
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
  isChecked: boolean
  setField: (itemId: string, fieldKey: string, value: string) => void
}

/** Renders a bullet list of uraian (free-text) items with validation. */
export function PercobaanUraianList({ items, fields, errors, fieldColors, isChecked, setField }: PercobaanUraianListProps) {
  if (items.length === 0) return null

  return (
    <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
      {items.map((u) => {
        const val = fields[String(u.id)]?.text ?? ""
        const err = errors[`${u.id}_text`]
        const color = fieldColors[`${u.id}_text`]

        return (
          <div key={u.id} className="flex gap-1.5 md:gap-2">
            <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
            <div className="grow space-y-0.5 md:space-y-1">
              <Text as="p" className="text-xs md:text-sm font-medium text-black">
                {u.question}
              </Text>
              <Textarea
                value={val}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                disabled={isChecked}
                rows={2}
                placeholder="Tuliskan jawabanmu..."
                className={`border-4 font-medium resize-none text-xs md:text-sm text-black ${fieldColorClasses(color)}`}
              />
              {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
