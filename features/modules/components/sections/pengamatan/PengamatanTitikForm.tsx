"use client"

import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { Select } from "@/components/retroui/Select"
import { useSection } from "@/features/modules/hooks/useSection"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import { SectionFeedbackPopover } from "../../shared/SectionFeedbackPopover"
import { AttemptBadge } from "../../shared/AttemptBadge"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import type { UraianItem, MemasangkanItem } from "@/features/modules/types"

interface PengamatanTitikFormProps {
  slug: string
  tab: string
}

/** Pengamatan form for translasi titik — renders uraian + memasangkan items from section data. */
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
          /* Uraian / essay: bullet number + textarea for free-form answer */
          case "uraian": {
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]
            const color = fieldColors[`${u.id}_text`]
            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-1">
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    {u.question}
                  </Text>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setField(String(u.id), "text", e.target.value)
                    }
                    disabled={isChecked}
                    rows={5}
                    className={`border-4 font-medium resize-none min-h-20 md:min-h-28 text-xs md:text-sm ${fieldColorClasses(color, !!err)}`}
                  />
                  {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
                </div>
              </div>
            )
          }
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
                      const err = errors[`${m.id}_${left.id}`]
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
                                className={`h-7 md:h-8 w-full max-w-sm border-2 font-semibold text-[10px] md:text-xs bg-white min-w-0 shadow-none capitalize ${fieldColorClasses(fieldColors[`${m.id}_${left.id}`], !!err)}`}
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
          default:
            return null
        }
      })}

      {/* AI feedback popover */}
      <SectionFeedbackPopover
        aiFeedback={aiFeedback ?? ""}
        isChecked={isChecked}
        showCobaLagi={showCobaLagi}
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
