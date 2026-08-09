"use client"

import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { getReflectionLabel } from "./conclusionHelpers"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { FieldColor } from "@/features/modules/lib/validation"

interface BayanganTableRendererProps {
  slug: string
  tab: string
  fields: Record<string, Record<string, string>>
  errors: Record<string, string>
  isChecked: boolean
  fieldColors: Record<string, FieldColor>
  setField: (id: string, subKey: string, value: string) => void
}

/** Render table with formula input for bayangan (image) coordinates. */
export function BayanganTableRenderer({
  slug,
  tab,
  fields,
  errors,
  isChecked,
  fieldColors,
  setField,
}: BayanganTableRendererProps) {
  const val = fields["8"]?.text ?? ""
  const err = errors["8_text"]
  const textColor = fieldColors["8_text"]
  const reflectLabel = getReflectionLabel(tab)

  return (
    <div className="flex gap-1.5 md:gap-2">
      <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
      <div className="grow space-y-1.5 md:space-y-2">
        <Text as="p" className="text-xs md:text-sm font-medium text-black">
          Amati percobaanmu.
        </Text>
        {slug === "refleksi" ? (
          <Text as="p" className="text-xs md:text-sm font-medium text-black leading-relaxed">
            Jika titik awal (<span className="italic">x, y</span>) direfleksikan terhadap {reflectLabel}, tentukan titik bayangannya dengan mengisi tabel berikut.
          </Text>
        ) : (
          <p className="text-xs md:text-sm font-medium text-black leading-relaxed">
            Jika titik awal (<span className="italic">x, y</span>) ditranslasikan oleh{" "}
            <span className="inline-flex items-center gap-0.5 mx-0.5 align-middle">
              <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">
                (
              </span>
              <span className="flex flex-col items-center gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
                <span className="text-center leading-none select-none italic">a</span>
                <span className="text-center leading-none select-none italic">b</span>
              </span>
              <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">
                )
              </span>
            </span>
            , tentukan titik bayangannya dengan mengisi tabel berikut.
          </p>
        )}
        <div className="border-4 border-black overflow-hidden bg-background">
          <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
            <div>Titik Awal</div>
            <div>{slug === "refleksi" ? "Refleksi terhadap" : "Translasi oleh"}</div>
            <div>Titik Bayangan</div>
          </div>
          <div className="grid grid-cols-3 items-center py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">
            <div className="italic font-bold">(x, y)</div>
            {slug === "refleksi" ? (
              <div className="text-xs md:text-sm font-semibold">{reflectLabel}</div>
            ) : (
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                  <div className="px-1 select-none italic">a</div>
                  <div className="px-1 select-none italic">b</div>
                </div>
                <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-0.5">
              <span className="text-xs md:text-sm font-bold select-none">(</span>
              <Input
                type="text"
                value={val}
                onChange={(e) => setField("8", "text", e.target.value)}
                disabled={isChecked}
                placeholder="..., ..."
                className={`w-16 md:w-20 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(textColor)}`}
              />
              <span className="text-xs md:text-sm font-bold select-none">)</span>
            </div>
          </div>
        </div>
        {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
      </div>
    </div>
  )
}
