"use client"


import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { useSection } from "@/features/modules/hooks/useObservation"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import { UrutkanInput } from "../../shared/UrutkanInput"
import type { UraianItem, PilihanGandaItem, UrutkanItem as UrutkanItemType } from "@/features/modules/types"

interface PengamatanGarisFormProps {
  slug: string
  tab: string
}

/** Garis pengamatan form — renders pilihan_ganda, uraian, and urutkan items. */
export function PengamatanGarisForm({ slug, tab }: PengamatanGarisFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, block,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi,
  } = useSection(slug, tab, "pengamatan")

  const hasConfirmation = slug === "translasi" && tab === "titik"

  return (
    <div className="space-y-3 md:space-y-4">
      {block?.instruction && (
        <Text as="p" className="text-xs md:text-sm text-black font-semibold leading-relaxed">
          {block.instruction}
        </Text>
      )}

      <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
        {items.map((item) => {
          if (item.type === "pilihan_ganda") {
            const pg = item as PilihanGandaItem
            const selected = fields[String(pg.id)]?.selected
            const err = errors[`${pg.id}_selection`]

            return (
              <div key={pg.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <Text as="p" className="text-xs md:text-sm font-medium text-black">
                    {pg.question}
                  </Text>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {pg.options.map((opt, oi) => {
                      const isSelected = Number(selected) === oi
                      const isCorrect = isChecked && isSelected && oi === pg.correctIndex
                      const isWrong = isChecked && isSelected && oi !== pg.correctIndex

                      return (
                        <Button
                          key={oi}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          disabled={isChecked}
                          onClick={() => setField(String(pg.id), "selected", String(oi))}
                          className={`px-2 md:px-4 py-1 md:py-1.5 font-bold uppercase text-[10px] md:text-xs  text-black ${
                            isCorrect ? "border-green-600 bg-green-100 text-green-800" : ""
                          } ${isWrong ? "border-destructive bg-destructive/10" : ""}`}
                        >
                          {opt}
                        </Button>
                      )
                    })}
                  </div>
                  {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
                </div>
              </div>
            )
          }

          if (item.type === "uraian") {
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-1">
                  <Text as="p" className="text-xs md:text-sm font-medium text-black">
                    {u.question}
                  </Text>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                    disabled={isChecked}
                    rows={2}
                    placeholder="Tuliskan jawabanmu..."
                    className={`border-4 border-black font-medium resize-none text-xs md:text-sm text-black ${err ? "border-destructive" : ""}`}
                  />
                  {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
                </div>
              </div>
            )
          }

          if (item.type === "urutkan") {
            const ur = item as UrutkanItemType
            const val = fields[String(ur.id)]?.order ?? ""
            const err = errors[`${ur.id}_order`]

            return (
              <div key={ur.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <Text as="p" className="text-xs md:text-sm font-medium text-black">
                    {ur.question}
                  </Text>
                  <UrutkanInput
                    items={ur.items}
                    value={val}
                    onChange={(order) => setField(String(ur.id), "order", order)}
                    disabled={isChecked}
                  />
                  {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
                </div>
              </div>
            )
          }

          return null
        })}
      </div>

      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 ">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}

      <SectionSubmitButton
        isChecked={isChecked}
        isFilled={isFilled}
        isCorrect={isCorrectEvaluation}
        isLocked={isLocked}
        showCobaLagi={showCobaLagi}
        onSubmit={handleSubmit}
        onCobaLagi={handleCobaLagi}
        requireConfirmation={hasConfirmation}
      />
    </div>
  )
}
