"use client"

import { Text } from "@/components/retroui/Text"
import { Select } from "@/components/retroui/Select"
import { Button } from "@/components/retroui/Button"
import { useSection } from "@/features/modules/hooks/useSection"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import { SectionFeedbackPopover } from "../../shared/SectionFeedbackPopover"
import { AttemptBadge } from "../../shared/AttemptBadge"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { MemasangkanItem, PilihanGandaItem } from "@/features/modules/types"

interface PengamatanTitikFormProps {
  slug: string
  tab: string
}

/** Pengamatan form for translasi titik — renders pilihan_ganda and memasangkan items. */
export function PengamatanTitikForm({ slug, tab }: PengamatanTitikFormProps) {
  const {
    items, fields, errors, fieldColors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, block,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi, attempt, isSubmitting,
  } = useSection(slug, tab, "pengamatan")

  const hasAnyInput = Object.values(fields).some((f) => Object.values(f).some((v) => v !== ""))

  const hasConfirmation = slug === "translasi" && tab === "titik"

  return (
    <form className="space-y-3 md:space-y-4">
      <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasAnyInput} />
      {/* Section instruction */}
      {block?.instruction && (
        <Text as="p" className="text-xs md:text-sm text-muted-foreground font-semibold leading-relaxed">
          {block.instruction}
        </Text>
      )}

      {items.map((item) => {
        switch (item.type) {
          /* Memasangkan / matching: left items with dropdown selects to right items */
          case "memasangkan": {
            const m = item as MemasangkanItem
            return (
              <div key={m.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-2 md:space-y-3">
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    {m.question}
                  </Text>
                  <div className="space-y-1.5 md:space-y-2">
                    {m.leftItems.map((left) => {
                      const selected = fields[String(m.id)]?.[left.id] ?? ""
                      return (
                        <div key={left.id} className="flex items-center gap-1 md:gap-1.5">
                          <div className="border-2 border-black px-2 md:px-3 py-0.5 md:py-1 font-bold text-xs md:text-sm shrink-0 text-center">
                            {left.label}
                          </div>
                          <span className="text-sm md:text-base font-bold shrink-0">→</span>
                          <div className="flex-1 min-w-0">
                            <Select
                              value={selected || null}
                              onValueChange={(val) => setField(String(m.id), left.id, val ?? "")}
                            >
                              <Select.Trigger
                                disabled={isChecked}
                                className={`h-7 md:h-8 w-full max-w-sm border-2 font-semibold text-[10px] md:text-xs bg-white min-w-0 shadow-none capitalize ${fieldColorClasses(fieldColors[`${m.id}_${left.id}`])}`}
                              >
                                <Select.Value placeholder="Pilih..." />
                              </Select.Trigger>
                              <Select.Content className="bg-white">
                                {m.rightItems.map((right) => (
                                   <Select.Item key={right.id} value={right.id} className="text-[10px] md:text-xs font-medium">
                                    {right.label}
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {m.leftItems.some((l) => errors[`${m.id}_${l.id}`]) && (
                    <Text className="text-destructive text-[10px] md:text-xs font-medium">
                      Ada pasangan yang belum tepat
                    </Text>
                  )}
                </div>
              </div>
            )
          }
          /* Pilihan ganda: question with two option buttons */
          case "pilihan_ganda": {
            const pg = item as PilihanGandaItem
            const selected = fields[String(pg.id)]?.selected
            const err = errors[`${pg.id}_selection`]
            return (
              <div key={pg.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    {pg.question}
                  </Text>
                  <div className="flex gap-2 md:gap-3">
                    {pg.options.map((opt, oi) => {
                      const isSelected = Number(selected) === oi
                      const isCorrect = isChecked && isSelected && oi === pg.correctIndex
                      const isWrong = isChecked && isSelected && oi !== pg.correctIndex
                      const isWrongAttempt2 = isWrong && attempt === 2
                      return (
                        <Button
                          key={oi}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          disabled={isChecked}
                          onClick={() => setField(String(pg.id), "selected", String(oi))}
                          className={`px-2 md:px-4 py-1 md:py-1.5 font-bold uppercase text-[10px] md:text-xs ${
                            isCorrect ? "border-green-600 bg-green-100 text-green-800" : isWrongAttempt2 ? "border-destructive bg-destructive/10 text-destructive" : isWrong ? "border-orange-500 bg-orange-50 text-orange-800" : ""
                          }`}
                        >
                          {opt}
                        </Button>
                      )
                    })}
                  </div>
                  {err && (
                    <Text className="text-destructive text-[10px] md:text-xs font-medium">
                      {err}
                    </Text>
                  )}
                </div>
              </div>
            )
          }
          default:
            return null
        }
      })}

      {/* AI feedback popover */}
      <SectionFeedbackPopover
        aiFeedback={aiFeedback ?? ""}
        isLocked={isLocked}
      />

      <SectionSubmitButton
        attempt={attempt}
        isChecked={isChecked}
        isFilled={isFilled}
        isCorrect={isCorrectEvaluation}
        isLocked={isLocked}
        showCobaLagi={showCobaLagi}
        onSubmit={handleSubmit}
        onCobaLagi={handleCobaLagi}
        requireConfirmation={hasConfirmation}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
