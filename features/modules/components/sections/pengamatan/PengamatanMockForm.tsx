"use client"


import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { useSection } from "@/features/modules/hooks/useSection"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import { AttemptBadge } from "../../shared/AttemptBadge"
import type { KoordinatItem, UraianItem } from "@/features/modules/types"

interface PengamatanMockFormProps {
  slug: string
  tab: string
}

/** Generic pengamatan form — renders koordinat or uraian items by type. */
export function PengamatanMockForm({ slug, tab }: PengamatanMockFormProps) {
  const {
    items, fields, errors, isChecked, isFilled,
    setField, handleSubmit,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi, attempt, isSubmitting,
  } = useSection(slug, tab, "pengamatan")

  const hasAnyInput = Object.values(fields).some((f) => Object.values(f).some((v) => v !== ""))

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-3 md:space-y-4">
      <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasAnyInput} />
      {/* Static instruction for all mock tabs */}
      <Text as="p" className="text-xs md:text-sm text-muted-foreground font-semibold leading-relaxed">
        Amati visualisasi GeoGebra di samping, lalu jawab pertanyaan berikut.
      </Text>

      <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
        {items.map((item) => {
          /* Koordinat type: horizontal (x, y) input with parentheses */
          if (item.type === "koordinat") {
            const k = item as KoordinatItem
            const xVal = fields[String(k.id)]?.x ?? ""
            const yVal = fields[String(k.id)]?.y ?? ""
            const coordErr = errors[`${k.id}_coord`]

            return (
              <div key={k.id} className="space-y-0.5 md:space-y-1">
                <label className="font-bold text-xs md:text-sm uppercase mb-0.5 md:mb-1 block select-none">
                  Koordinat Bayangan {k.label}
                </label>
                <div className="flex gap-1.5 md:gap-2 items-center">
                  <span className="font-bold text-xs md:text-sm">(</span>
                  <Input
                    type="text"
                    placeholder="x"
                    value={xVal}
                    onChange={(e) => setField(String(k.id), "x", e.target.value)}
                    disabled={isChecked}
                    className={`w-16 md:w-20 text-center border-4 border-black font-bold text-xs md:text-sm ${coordErr ? "border-destructive" : ""}`}
                  />
                  <span className="font-bold text-xs md:text-sm">,</span>
                  <Input
                    type="text"
                    placeholder="y"
                    value={yVal}
                    onChange={(e) => setField(String(k.id), "y", e.target.value)}
                    disabled={isChecked}
                    className={`w-16 md:w-20 text-center border-4 border-black font-bold text-xs md:text-sm ${coordErr ? "border-destructive" : ""}`}
                  />
                  <span className="font-bold text-xs md:text-sm">)</span>
                </div>
                {coordErr && <span className="text-[10px] md:text-xs text-destructive font-medium">{coordErr}</span>}
              </div>
            )
          }

          /* Uraian type: label + textarea for essay answer */
          if (item.type === "uraian") {
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            return (
              <div key={u.id} className="space-y-0.5 md:space-y-1">
                <label className="font-bold text-xs md:text-sm uppercase mb-0.5 md:mb-1 block select-none">
                  {u.question}
                </label>
                <Textarea
                  value={val}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                  disabled={isChecked}
                  rows={3}
                  className={`border-4 border-black font-medium resize-none text-xs md:text-sm ${err ? "border-destructive" : ""}`}
                />
                {err && (
                  <span className="text-[10px] md:text-xs text-destructive font-medium">{err}</span>
                )}
              </div>
            )
          }

          return null
        })}
      </div>

<SectionSubmitButton
        attempt={attempt}
        isChecked={isChecked}
        isFilled={isFilled}
        isCorrect={isCorrectEvaluation}
        isLocked={isLocked}
        showCobaLagi={showCobaLagi}
        onSubmit={handleSubmit}
        onCobaLagi={handleCobaLagi}
        requireConfirmation={false}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
