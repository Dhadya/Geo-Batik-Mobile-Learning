"use client"

import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"

interface MatrixExplanationRendererProps {
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  isChecked: boolean
  setField: (id: string, subKey: string, value: string) => void
}

/** Render matrix (2/1) with a free-text explanation textarea. */
export function MatrixExplanationRenderer({
  fields,
  errors,
  isChecked,
  setField,
}: MatrixExplanationRendererProps) {
  const val = fields["7"]?.text ?? ""
  const err = errors["7_text"]

  return (
    <div className="flex gap-1.5 md:gap-2">
      <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
      <div className="grow space-y-1.5 md:space-y-2">
        <div className="flex items-center gap-0.5">
          <Text as="p" className="text-xs md:text-sm font-medium text-black">
            Apa arti dari translasi berikut.
          </Text>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
          <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
            <div className="px-1 select-none">2</div>
            <div className="px-1 select-none">1</div>
          </div>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
        </div>
        <Textarea
          value={val}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField("7", "text", e.target.value)}
          disabled={isChecked}
          rows={2}
          placeholder="Tuliskan penjelasanmu..."
          className={`border-4 border-black font-medium resize-none text-xs md:text-sm text-black ${err ? "border-destructive" : ""}`}
        />
        {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
      </div>
    </div>
  )
}
