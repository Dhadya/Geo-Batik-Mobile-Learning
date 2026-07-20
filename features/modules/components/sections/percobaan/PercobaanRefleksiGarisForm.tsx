"use client"

import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Select } from "@/components/retroui/Select"
import { useSection, allowOnlyNumbers } from "@/features/modules/hooks/useObservation"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import type { PilihanRefleksiItem } from "@/features/modules/types"

interface PercobaanRefleksiGarisFormProps {
  slug: string
  tab: string
}

/** Percobaan form for refleksi garis — inline coordinate inputs without table. */
export function PercobaanRefleksiGarisForm({ slug, tab }: PercobaanRefleksiGarisFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi,
  } = useSection(slug, tab, "percobaan")

  const refleksiItem = items.find((i): i is PilihanRefleksiItem => i.type === "pilihan_refleksi")
  if (!refleksiItem) return null

  const selectedOption = fields[String(refleksiItem.id)]?.selected ?? ""
  const answers = selectedOption ? refleksiItem.correctAnswers[selectedOption] : []

  return (
    <section className="space-y-3 md:space-y-4">
      {/* Instruction */}
      <Text as="p" className="text-xs md:text-sm font-medium text-black whitespace-pre-line">
        {refleksiItem.question}
      </Text>

      {/* Select dropdown for reflection type */}
      <div className="space-y-2">
        <Select
          value={selectedOption}
          onValueChange={(val) => { if (val) setField(String(refleksiItem.id), "selected", val) }}
          disabled={isChecked}
        >
          <Select.Trigger className="w-full border-2 border-black shadow-[2px_2px_0_0_black] text-xs md:text-sm font-medium">
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

      {/* Inline coordinate inputs */}
      {selectedOption && (
        <div className="space-y-2">
          <Text as="p" className="text-xs md:text-sm font-medium text-black">
            Tentukan bayangan dari ruas garis yang terbentuk
          </Text>
          <Text as="p" className="text-xs md:text-sm font-medium text-black">
            A&apos;B&apos; dengan{" "}
            {answers.map((_, idx) => (
              <span key={idx}>
                {idx === 0 ? "A’" : "B’"}(
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="x"
                  value={fields[String(refleksiItem.id)]?.[`x${idx}`] ?? ""}
                  onKeyDown={allowOnlyNumbers}
                  onChange={(e) => setField(String(refleksiItem.id), `x${idx}`, e.target.value)}
                  disabled={isChecked}
                  className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-5 md:h-6 shadow-none inline-block ${errors[`${refleksiItem.id}_coord${idx}`] ? "border-destructive" : "border-black"}`}
                />
                ,{" "}
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="y"
                  value={fields[String(refleksiItem.id)]?.[`y${idx}`] ?? ""}
                  onKeyDown={allowOnlyNumbers}
                  onChange={(e) => setField(String(refleksiItem.id), `y${idx}`, e.target.value)}
                  disabled={isChecked}
                  className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-5 md:h-6 shadow-none inline-block ${errors[`${refleksiItem.id}_coord${idx}`] ? "border-destructive" : "border-black"}`}
                />
                )
                {idx < answers.length - 1 ? " dan " : ""}
              </span>
            ))}
          </Text>
        </div>
      )}

      {errors[`${refleksiItem.id}_selected`] && (
        <Text className="text-destructive text-[10px] md:text-xs">{errors[`${refleksiItem.id}_selected`]}</Text>
      )}

      <SectionSubmitButton
        isChecked={isChecked}
        isFilled={isFilled}
        isCorrect={isCorrectEvaluation}
        isLocked={isLocked}
        showCobaLagi={showCobaLagi}
        onSubmit={handleSubmit}
        onCobaLagi={handleCobaLagi}
        requireConfirmation={false}
      />

      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 rounded-none">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}
    </section>
  )
}
