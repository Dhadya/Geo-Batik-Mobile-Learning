"use client"

import { useSection } from "@/features/modules/hooks/useSection"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import { SectionFeedbackPopover } from "../../shared/SectionFeedbackPopover"
import { AttemptBadge } from "../../shared/AttemptBadge"
import type { UraianItem } from "@/features/modules/types"

import { PercobaanInstruction } from "./PercobaanInstruction"
import { PercobaanUraianList } from "./PercobaanUraianList"
import { PercobaanTranslasiTable } from "./PercobaanTranslasiTable"
import { PercobaanRefleksiTable } from "./PercobaanRefleksiTable"
import { PercobaanGarisView } from "./PercobaanGarisView"

interface PercobaanFormProps {
  slug: string
  tab: string
}

/** Percobaan form — orchestrator that delegates to view-specific sub-components. */
export function PercobaanForm({ slug, tab }: PercobaanFormProps) {
  const {
    items, fields, errors, fieldColors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, block,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi, attempt, isSubmitting,
  } = useSection(slug, tab, "percobaan")

  const hasAnyInput = Object.values(fields).some((f) => Object.values(f).some((v) => v !== ""))

  if (items.length === 0) return null

  const isGaris = tab === "garis"
  const gtTable = isGaris ? block?.garisTranslasiTable : undefined
  const tableItems = items.filter((i) => i.type === "matriks" || i.type === "koordinat")
  const uraianItems = items.filter((i) => i.type === "uraian") as UraianItem[]

  // ── Garis branch (special 2-point → translate → equation layout) ──
  if (isGaris && gtTable && block) {
    return (
      <div className="space-y-3 md:space-y-4">
        <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasAnyInput} />
        <PercobaanGarisView
          items={items}
          fields={fields}
          errors={errors}
          fieldColors={fieldColors}
          isChecked={isChecked}
          setField={setField}
          block={block}
          garisTranslasiTable={gtTable}
        />

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
          requireConfirmation={false}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }

  // ── Default branch (translasi titik/bangun or refleksi) ──
  return (
    <div className="space-y-3 md:space-y-4">
      <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasAnyInput} />
      {block?.instruction && (
        <PercobaanInstruction
          instruction={block.instruction}
          instructionMatrix={block.instructionMatrix}
        />
      )}

      {/* Static matrix display for translasi/bangun without instructionMatrix */}
      {slug === "translasi" && tab === "bangun" && !block?.instructionMatrix && (
        <div className="flex items-center justify-center gap-0.5 pt-1">
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
          <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
            <div className="px-1 md:px-2 select-none">6</div>
            <div className="px-1 md:px-2 select-none">-4</div>
          </div>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
        </div>
      )}

      {/* Refleksi table */}
      {tableItems.length > 0 && slug === "refleksi" && (
        <PercobaanRefleksiTable
          items={tableItems}
          fields={fields}
          errors={errors}
          fieldColors={fieldColors}
          setField={setField}
          tab={tab}
          refleksiGroups={block?.refleksiGroups}
        />
      )}

      {/* Translasi table (non-garis) */}
      {tableItems.length > 0 && slug !== "refleksi" && (
        <PercobaanTranslasiTable
          items={tableItems}
          fields={fields}
          errors={errors}
          fieldColors={fieldColors}
          setField={setField}
          showPointLetters={tab === "bangun"}
        />
      )}

      {/* Uraian (free-text) items */}
      <PercobaanUraianList
        items={uraianItems}
        fields={fields}
        errors={errors}
        isChecked={isChecked}
        setField={setField}
      />

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
        requireConfirmation={slug === "translasi" && tab === "titik"}
      />
    </div>
  )
}
