"use client"

import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"

interface MatrixExplanationRendererProps {
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
  isChecked: boolean
  setField: (id: string, subKey: string, value: string) => void
}

/** Render matrix (2/1) with a free-text explanation textarea. */
export function MatrixExplanationRenderer({
  fields,
  errors,
  fieldColors,
  isChecked,
  setField,
}: MatrixExplanationRendererProps) {
  const val = fields["7"]?.text ?? ""
  const err = errors["7_text"]
  const color = fieldColors["7_text"]

  return (
    <div className="flex gap-1.5 md:gap-2">
      <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right mt-2">•</span>
      <div className="grow space-y-1.5 md:space-y-2">
        <p className="text-xs md:text-sm font-medium text-black leading-relaxed">
          Apa arti dari translasi berikut{" "}
          <span className="inline-flex items-center gap-0.5 mx-0.5 align-middle">
            <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">
              (
            </span>
            <span className="flex flex-col items-center gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
              <span className="text-center leading-none select-none">2</span>
              <span className="text-center leading-none select-none">1</span>
            </span>
            <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">
              )
            </span>
          </span>
          ?
        </p>
        <Textarea
          value={val}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField("7", "text", e.target.value)}
          disabled={isChecked}
          rows={2}
          placeholder="Tuliskan penjelasanmu..."
          className={`border-4 font-medium resize-none text-xs md:text-sm text-black ${fieldColorClasses(color)}`}
        />
        {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
      </div>
    </div>
  )
}
