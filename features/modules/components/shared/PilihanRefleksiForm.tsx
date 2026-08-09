"use client"


import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Select } from "@/components/retroui/Select"
import { useSection } from "@/features/modules/hooks/useSection"
import { allowOnlyNumbers } from "@/features/modules/hooks/allowOnlyNumbers"
import { fieldColorClasses } from "@/features/modules/lib/fieldColors"
import { SectionSubmitButton } from "./SectionSubmitButton"
import { SectionFeedbackPopover } from "./SectionFeedbackPopover"
import { AttemptBadge } from "./AttemptBadge"
import type { PilihanRefleksiItem } from "@/features/modules/types"

interface PilihanRefleksiFormProps {
  slug: string
  tab: string
}

/** Pilihan Refleksi form — radio selection with dynamic coordinate table. */
export function PilihanRefleksiForm({ slug, tab }: PilihanRefleksiFormProps) {
  const {
    items, fields, errors, fieldColors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi, attempt, isSubmitting,
  } = useSection(slug, tab, "percobaan")

  const hasAnyInput = Object.values(fields).some((f) => Object.values(f).some((v) => v !== ""))

  const refleksiItem = items.find((i): i is PilihanRefleksiItem => i.type === "pilihan_refleksi")
  if (!refleksiItem) return null

  const selectedOption = fields[String(refleksiItem.id)]?.selected ?? ""
  const answers = selectedOption ? refleksiItem.correctAnswers[selectedOption] : []

  return (
    <section className="space-y-3 md:space-y-4">
      <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasAnyInput} />
      <Text as="p" className="text-xs md:text-sm font-medium text-black whitespace-pre-line">
        {refleksiItem.question}
      </Text>

      <div className="space-y-2">
        <Select
          value={selectedOption}
          onValueChange={(val) => { if (val) setField(String(refleksiItem.id), "selected", val) }}
          disabled={isChecked || isLocked}
        >
          <Select.Trigger className={`w-full border-2 shadow-[2px_2px_0_0_black] text-xs md:text-sm font-medium ${fieldColorClasses(fieldColors[`${refleksiItem.id}_selected`])}`}>
            <Select.Value placeholder="Pilih opsi refleksi" />
          </Select.Trigger>
          <Select.Content>
            {refleksiItem.options.map((opt) => (
              <Select.Item key={opt} value={opt} className="text-xs md:text-sm font-medium">
                {opt}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>

      {selectedOption && (
        <>
          <Text as="p" className="text-xs md:text-sm font-medium text-black">
            Lengkapi tabel berikut
          </Text>
          <table className="w-full border-4 border-black border-collapse bg-background text-xs md:text-sm">
            <thead>
              <tr className="bg-muted border-b-4 border-black text-center font-black">
                <th className="p-1.5 md:p-2 border-r-2 border-black">Titik Awal</th>
                <th className="p-1.5 md:p-2 border-r-2 border-black">Refleksi yang dipilih</th>
                <th className="p-1.5 md:p-2">Titik Bayangan</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((ans, idx) => {
                const origItem = items[idx + 1]
                const origLabel = origItem?.type === "koordinat" ? (origItem as import("@/features/modules/types").KoordinatItem).label : "(?, ?)"
                const xColor = fieldColors[`${refleksiItem.id}_x${idx}`]
                const yColor = fieldColors[`${refleksiItem.id}_y${idx}`]

                return (
                  <tr key={idx} className="text-center">
                    <td className="py-2 md:py-3 font-bold border-r-2 border-black border-b-2">
                      {origLabel}
                    </td>
                    {idx === 0 && (
                      <td rowSpan={answers.length} className="py-2 md:py-3 font-medium border-r-2 border-black text-xs md:text-sm align-middle">
                        {selectedOption}
                      </td>
                    )}
                    <td className="py-2 md:py-3 border-b-2 border-black">
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="font-bold text-xs md:text-sm">(</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="x'"
                          value={fields[String(refleksiItem.id)]?.[`x${idx}`] ?? ""}
                          onKeyDown={allowOnlyNumbers}
                          onChange={(e) => setField(String(refleksiItem.id), `x${idx}`, e.target.value)}
                          disabled={isChecked}
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(xColor)}`}
                        />
                        <span className="font-bold text-xs md:text-sm">,</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="y'"
                          value={fields[String(refleksiItem.id)]?.[`y${idx}`] ?? ""}
                          onKeyDown={allowOnlyNumbers}
                          onChange={(e) => setField(String(refleksiItem.id), `y${idx}`, e.target.value)}
                          disabled={isChecked}
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${fieldColorClasses(yColor)}`}
                        />
                        <span className="font-bold text-xs md:text-sm">)</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}

      {errors[`${refleksiItem.id}_selected`] && (
        <Text className="text-destructive text-[10px] md:text-xs">{errors[`${refleksiItem.id}_selected`]}</Text>
      )}

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
        isSubmitting={isSubmitting}
      />
    </section>
  )
}
