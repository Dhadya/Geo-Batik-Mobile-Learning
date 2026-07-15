"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Select } from "@/components/retroui/Select"
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
        {/* Instruction */}
        <Text as="p" className="text-xs md:text-sm font-medium text-black">
          {refleksiItem.question}
        </Text>

        {/* Select dropdown for reflection type */}
        <div className="space-y-2">
          <Text as="p" className="text-xs md:text-sm font-bold text-black">
            Pilih salah satu refleksi berikut:
          </Text>
          <Select
            value={selectedOption || "Sumbu x"}
            onValueChange={(val) => { if (val) setField(String(refleksiItem.id), "selected", val) }}
            disabled={isChecked}
          >
            <Select.Trigger className="w-full border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <Select.Value placeholder="Pilih Refleksi" />
            </Select.Trigger>
            <Select.Content>
              {refleksiItem.options.map((opt) => (
                <Select.Item key={opt} value={opt}>
                  {opt}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        {/* Coordinate table */}
        {selectedOption && (
          <table className="w-full border-4 border-black border-collapse bg-background text-xs md:text-sm">
            <thead>
              <tr className="bg-muted border-b-4 border-black text-center font-black">
                <th className="p-1.5 md:p-2 border-r-2 border-black">Titik Awal</th>
                <th className="p-1.5 md:p-2 border-r-2 border-black">Refleksi terhadap</th>
                <th className="p-1.5 md:p-2">Titik Bayangan</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((ans, idx) => {
                const origItem = items[idx + 1]
                const origLabel = origItem?.type === "koordinat" ? (origItem as import("@/features/modules/types").KoordinatItem).label : "(?, ?)"

                return (
                  <tr key={idx} className="text-center">
                    <td className="py-2 md:py-3 font-bold border-r-2 border-black border-b-2">
                      {origLabel.replace(/^[A-Z]/, '')}
                    </td>
                    <td className="py-2 md:py-3 font-medium border-r-2 border-black border-b-2 text-xs md:text-sm">
                      {selectedOption}
                    </td>
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
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${refleksiItem.id}_coord${idx}`] ? "border-destructive" : "border-black"}`}
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
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${refleksiItem.id}_coord${idx}`] ? "border-destructive" : "border-black"}`}
                        />
                        <span className="font-bold text-xs md:text-sm">)</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
