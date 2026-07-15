"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { RadioGroup } from "@/components/retroui/Radio"
import { useSection, allowOnlyNumbers } from "@/features/modules/hooks/useObservation"
import type { PilihanRefleksiItem } from "@/features/modules/types"

interface PilihanRefleksiFormProps {
  slug: string
  tab: string
}

/** Pilihan Refleksi form — radio selection with dynamic coordinate table. */
export function PilihanRefleksiForm({ slug, tab }: PilihanRefleksiFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, setChecked, setErrors,
  } = useSection(slug, tab, "percobaan")

  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(false)
      setErrors({})
    } else {
      handleSubmit()
    }
  }, [isChecked, setChecked, setErrors, handleSubmit])

  // Find the PilihanRefleksiItem
  const refleksiItem = items.find((i): i is PilihanRefleksiItem => i.type === "pilihan_refleksi")
  if (!refleksiItem) return null

  const selectedOption = fields[String(refleksiItem.id)]?.selected ?? ""
  const answers = selectedOption ? refleksiItem.correctAnswers[selectedOption] : []

  return (
    <section className="space-y-3 md:space-y-4">
      <div className="border-4 border-black p-3 md:p-4 bg-background shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3 md:space-y-4">
        <Text as="h3" className="text-sm md:text-base font-black uppercase">
          Percobaan
        </Text>

        {/* Instruction */}
        <Text as="p" className="text-xs md:text-sm font-medium text-black">
          {refleksiItem.question}
        </Text>

        {/* Radio buttons for reflection type */}
        <div className="space-y-2">
          <Text as="p" className="text-xs md:text-sm font-bold text-black">
            Pilih salah satu refleksi berikut:
          </Text>
          <RadioGroup
            value={selectedOption}
            onValueChange={(val) => setField(String(refleksiItem.id), "selected", val)}
            className="grid grid-cols-2 gap-2"
          >
            {refleksiItem.options.map((opt) => (
              <RadioGroup.Item
                key={opt}
                value={opt}
                disabled={isChecked}
                className="flex items-center gap-2 p-2 border-2 border-black data-[checked]:bg-primary data-[checked]:text-primary-foreground"
              >
                <span className="text-xs md:text-sm font-medium">{opt}</span>
              </RadioGroup.Item>
            ))}
          </RadioGroup>
        </div>

        {/* Coordinate table */}
        {selectedOption && (
          <div className="border-4 border-black overflow-hidden bg-background">
            <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
              <div>Titik Awal</div>
              <div>Refleksi terhadap {selectedOption}</div>
              <div>Titik Bayangan</div>
            </div>
            <div className="divide-y-2 divide-black text-xs md:text-sm">
              {answers.map((ans, idx) => {
                const pointLetter = ["A", "B", "C", "D"][idx] ?? ""
                const item = refleksiItem as PilihanRefleksiItem
                const origItem = items[idx + 1]
                const origLabel = origItem?.type === "koordinat" ? (origItem as import("@/features/modules/types").KoordinatItem).label : `${pointLetter}(?, ?)`

                return (
                  <div key={idx} className="grid grid-cols-3 items-center text-center">
                    <div className="p-1.5 md:p-2 font-bold border-r-2 border-black">
                      {origLabel.replace(/^[A-Z]/, '')}
                    </div>
                    <div className="p-1.5 md:p-2 font-medium border-r-2 border-black">
                      {selectedOption}
                    </div>
                    <div className="flex items-center justify-center gap-0.5 p-1.5 md:p-2">
                      <span className="font-bold text-xs md:text-sm">(</span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="x'"
                        value={fields[String(refleksiItem.id)]?.[`x${idx}`] ?? ""}
                        onKeyDown={allowOnlyNumbers}
                        onChange={(e) => setField(String(refleksiItem.id), `x${idx}`, e.target.value)}
                        disabled={isChecked}
                        className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${refleksiItem.id}_coord${idx}`] ? "border-destructive" : "border-black"}`}
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
                        className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${refleksiItem.id}_coord${idx}`] ? "border-destructive" : "border-black"}`}
                      />
                      <span className="font-bold text-xs md:text-sm">)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {errors[`${refleksiItem.id}_selected`] && (
          <Text className="text-destructive text-[10px] md:text-xs">{errors[`${refleksiItem.id}_selected`]}</Text>
        )}
      </div>

      <Button
        onClick={handleClick}
        disabled={!isFilled && !isChecked}
        variant={isChecked ? "secondary" : "default"}
        className="w-full font-bold py-2 md:py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
      >
        {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
      </Button>

      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 rounded-none">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}
    </section>
  )
}
