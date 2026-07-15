"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Checkbox } from "@/components/retroui/Checkbox"
import { useSection } from "@/features/modules/hooks/useObservation"
import type { ChecklistTableItem } from "@/features/modules/types"

interface ChecklistTableFormProps {
  slug: string
  tab: string
}

/** Checklist Table form — statements with Ya/Tidak checkboxes. */
export function ChecklistTableForm({ slug, tab }: ChecklistTableFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, setChecked, setErrors,
  } = useSection(slug, tab, "pengamatan")

  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(false)
      setErrors({})
    } else {
      handleSubmit()
    }
  }, [isChecked, setChecked, setErrors, handleSubmit])

  // Find the ChecklistTableItem
  const checklistItem = items.find((i): i is ChecklistTableItem => i.type === "checklist_table")
  if (!checklistItem) return null

  const handleCheckboxChange = (statementIdx: number, value: "ya" | "tidak") => {
    setField(String(checklistItem.id), `statement_${statementIdx}`, value)
  }

  return (
    <section className="space-y-3 md:space-y-4">
      <div className="border-4 border-black p-3 md:p-4 bg-background shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3 md:space-y-4">
        <Text as="h3" className="text-sm md:text-base font-black uppercase">
          Pengamatan
        </Text>

        {/* Instruction */}
        <Text as="p" className="text-xs md:text-sm font-medium text-black">
          {checklistItem.question}
        </Text>

        {/* Checklist table */}
        <div className="border-4 border-black overflow-hidden bg-background">
          <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
            <div className="text-left">Pernyataan</div>
            <div>Ya</div>
            <div>Tidak</div>
          </div>
          <div className="divide-y-2 divide-black text-xs md:text-sm">
            {checklistItem.statements.map((statement, idx) => {
              const currentValue = fields[String(checklistItem.id)]?.[`statement_${idx}`] ?? ""
              return (
                <div key={idx} className="grid grid-cols-3 items-center text-center">
                  <div className="p-1.5 md:p-2 font-medium text-left border-r-2 border-black">
                    {statement}
                  </div>
                  <div className="flex items-center justify-center p-1.5 md:p-2 border-r-2 border-black">
                    <Checkbox
                      checked={currentValue === "ya"}
                      onCheckedChange={() => handleCheckboxChange(idx, "ya")}
                      disabled={isChecked}
                    />
                  </div>
                  <div className="flex items-center justify-center p-1.5 md:p-2">
                    <Checkbox
                      checked={currentValue === "tidak"}
                      onCheckedChange={() => handleCheckboxChange(idx, "tidak")}
                      disabled={isChecked}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {errors[`${checklistItem.id}_checklist`] && (
          <Text className="text-destructive text-[10px] md:text-xs">{errors[`${checklistItem.id}_checklist`]}</Text>
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
