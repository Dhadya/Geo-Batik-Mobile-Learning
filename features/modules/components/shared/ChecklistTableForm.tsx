"use client"


import { Text } from "@/components/retroui/Text"
import { Checkbox } from "@/components/retroui/Checkbox"
import { useSection } from "@/features/modules/hooks/useSection"
import { SectionSubmitButton } from "./SectionSubmitButton"
import { AttemptBadge } from "./AttemptBadge"
import type { ChecklistTableItem } from "@/features/modules/types"

interface ChecklistTableFormProps {
  slug: string
  tab: string
}

/** Checklist Table form — statements with Ya/Tidak checkboxes. */
export function ChecklistTableForm({ slug, tab }: ChecklistTableFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi, attempt, isSubmitting,
  } = useSection(slug, tab, "pengamatan")

  const hasAnyInput = Object.values(fields).some((f) => Object.values(f).some((v) => v !== ""))

  // Find the ChecklistTableItem
  const checklistItem = items.find((i): i is ChecklistTableItem => i.type === "checklist_table")
  if (!checklistItem) return null

  const handleCheckboxChange = (statementIdx: number, value: "ya" | "tidak") => {
    const current = fields[String(checklistItem.id)]?.[`statement_${statementIdx}`] ?? ""
    setField(String(checklistItem.id), `statement_${statementIdx}`, current === value ? "" : value)
  }

  return (
    <section className="space-y-3 md:space-y-4">
      <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasAnyInput} />
      {/* Instruction */}
      <Text as="p" className="text-xs md:text-sm font-medium text-black">
        {checklistItem.question}
      </Text>

      {/* Checklist table */}
      <table className="w-full border-4 border-black-coll borderapse bg-background text-xs md:text-sm">
        <thead>
          <tr className="bg-muted border-b-4 border-black text-center font-black">
            <th className="p-2 md:p-3 border-r-2 border-black text-left">Pernyataan</th>
            <th className="p-2 md:p-3 border-r-2 border-black w-12 md:w-16">Ya</th>
            <th className="p-2 md:p-3 w-12 md:w-16">Tidak</th>
          </tr>
        </thead>
        <tbody>
          {checklistItem.statements.map((statement, idx) => {
            const currentValue = fields[String(checklistItem.id)]?.[`statement_${idx}`] ?? ""
            return (
              <tr key={idx} className="text-center">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-left border-r-2 border-black border-b-2">
                  {statement}
                </td>
                <td className="py-3 md:py-4 border-r-2 border-b-2">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={currentValue === "ya"}
                      onCheckedChange={() => handleCheckboxChange(idx, "ya")}
                      disabled={isChecked}
                    />
                  </div>
                </td>
                <td className="py-3 md:py-4 border-b-2 border-black">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={currentValue === "tidak"}
                      onCheckedChange={() => handleCheckboxChange(idx, "tidak")}
                      disabled={isChecked}
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {errors[`${checklistItem.id}_checklist`] && (
        <Text className="text-destructive text-[10px] md:text-xs">{errors[`${checklistItem.id}_checklist`]}</Text>
      )}

      {isChecked && aiFeedback && (
        <div className="border-4 border-black bg-background p-3 md:p-4">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}

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
