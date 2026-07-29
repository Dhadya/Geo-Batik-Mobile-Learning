"use client"

import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"
import type { UraianItem } from "../../../types"

interface StandardUraianRendererProps {
  item: UraianItem
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
  isChecked: boolean
  setField: (id: string, subKey: string, value: string) => void
}

/** Render a standard uraian (free-text essay) item — textarea with question. */
export function StandardUraianRenderer({
  item,
  fields,
  errors,
  fieldColors,
  isChecked,
  setField,
}: StandardUraianRendererProps) {
  const val = fields[String(item.id)]?.text ?? ""
  const err = errors[`${item.id}_text`]
  const color = fieldColors[`${item.id}_text`]

  return (
    <div className="flex gap-1.5 md:gap-2">
      <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
      <div className="grow space-y-1">
        <Text as="p" className="text-xs md:text-sm font-medium text-black">
          {item.question}
        </Text>
        <Textarea
          value={val}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(item.id), "text", e.target.value)}
          disabled={isChecked}
          rows={2}
          placeholder="Tuliskan jawabanmu..."
          className={`border-4 font-medium resize-none text-xs md:text-sm text-black ${fieldColorClasses(color)}`}
        />
        {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
      </div>
    </div>
  )
}
