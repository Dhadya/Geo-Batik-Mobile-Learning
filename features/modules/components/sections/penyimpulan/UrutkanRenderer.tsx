"use client"

import { Text } from "@/components/retroui/Text"
import { UrutkanInput } from "../../shared/UrutkanInput"
import type { UrutkanItem } from "../../../types"

interface UrutkanRendererProps {
  item: UrutkanItem
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  isChecked: boolean
  setField: (id: string, subKey: string, value: string) => void
}

/** Render a drag-and-drop urutkan (sorting) exercise item. */
export function UrutkanRenderer({
  item,
  fields,
  errors,
  isChecked,
  setField,
}: UrutkanRendererProps) {
  const val = fields[String(item.id)]?.order ?? ""
  const err = errors[`${item.id}_order`]

  return (
    <div className="flex gap-1.5 md:gap-2">
      <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
      <div className="grow space-y-1.5 md:space-y-2">
        <Text as="p" className="text-xs md:text-sm font-medium text-black">
          {item.question}
        </Text>
        <UrutkanInput
          items={item.items}
          value={val}
          onChange={(order) => setField(String(item.id), "order", order)}
          disabled={isChecked}
        />
        {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
      </div>
    </div>
  )
}
