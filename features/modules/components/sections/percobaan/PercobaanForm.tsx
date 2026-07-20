"use client"

import { Text } from "@/components/retroui/Text"
import { useSection } from "@/features/modules/hooks/useObservation"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
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
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, block,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi,
  } = useSection(slug, tab, "percobaan")

  if (items.length === 0) return null

  const isGaris = tab === "garis"
  const gtTable = isGaris ? block?.garisTranslasiTable : undefined
  const tableItems = items.filter((i) => i.type === "matriks" || i.type === "koordinat")
  const uraianItems = items.filter((i) => i.type === "uraian") as UraianItem[]

  // ── Garis branch (special 2-point → translate → equation layout) ──
  if (isGaris && gtTable && block) {
    return (
      <div className="space-y-3 md:space-y-4">
        <PercobaanGarisView
          items={items}
          fields={fields}
          errors={errors}
          isChecked={isChecked}
          setField={setField}
          block={block}
          garisTranslasiTable={gtTable}
        />

        <AiFeedbackBanner aiFeedback={aiFeedback} isChecked={isChecked} />

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
      </div>
    )
  }

  // ── Default branch (translasi titik/bangun or refleksi) ──
  return (
    <div className="space-y-3 md:space-y-4">
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

      <AiFeedbackBanner aiFeedback={aiFeedback} isChecked={isChecked} />

      <SectionSubmitButton
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

// ── Shared mini-components ──────────────────────────────────

/** AI feedback banner — shown after submission. */
function AiFeedbackBanner({ aiFeedback, isChecked }: { aiFeedback?: string; isChecked: boolean }) {
  if (!isChecked || !aiFeedback) return null
  return (
    <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 ">
      <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
    </div>
  )
}
