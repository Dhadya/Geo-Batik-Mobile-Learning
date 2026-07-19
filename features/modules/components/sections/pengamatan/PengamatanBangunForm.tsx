"use client"


import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { useSection } from "@/features/modules/hooks/useObservation"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import type { PilihanGandaItem } from "@/features/modules/types"

interface PengamatanBangunFormProps {
  slug: string
  tab: string
}

/** Pengamatan form for translasi bangun — renders pilihan_ganda binary-choice items. */
export function PengamatanBangunForm({ slug, tab }: PengamatanBangunFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, block,
    isLocked, showCobaLagi, isCorrectEvaluation,
  } = useSection(slug, tab, "pengamatan")

  /* Only render pilihan_ganda items (binary choice questions) */
  const pgItems = items.filter((i): i is PilihanGandaItem => i.type === "pilihan_ganda")

  return (
    <form className="space-y-3 md:space-y-4">
      {/* Section instruction */}
      {block?.instruction && (
        <Text as="p" className="text-xs md:text-sm text-black font-semibold leading-relaxed">
          {block.instruction}
        </Text>
      )}

      {/* Binary choice questions: numbered with bullet, Ya / Tidak buttons */}
      {pgItems.map((pg) => {
        const selected = fields[String(pg.id)]?.selected
        const err = errors[`${pg.id}_selection`]

        return (
          <div key={pg.id} className="flex gap-1.5 md:gap-2">
            <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5 text-black">•</span>
            <div className="grow space-y-1.5 md:space-y-2">
              {/* Question text */}
              <Text as="p" className="text-xs md:text-sm font-medium text-black">
                {pg.question}
              </Text>
              {/* Two option buttons side by side */}
              <div className="flex gap-2 md:gap-3">
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
              {/* Error feedback per question */}
              {err && (
                <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>
              )}
            </div>
          </div>
        )
      })}

      {/* AI feedback banner */}
      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 ">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap text-black">{aiFeedback}</Text>
        </div>
      )}

      <SectionSubmitButton
        isChecked={isChecked}
        isFilled={isFilled}
        isCorrect={isCorrectEvaluation}
        isLocked={isLocked}
        showCobaLagi={showCobaLagi}
        onSubmit={handleSubmit}
        requireConfirmation={slug === "translasi" && tab === "titik"}
      />
    </form>
  )
}
