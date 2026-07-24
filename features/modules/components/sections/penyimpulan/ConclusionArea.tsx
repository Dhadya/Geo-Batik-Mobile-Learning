"use client"

import { useCallback } from "react"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Text } from "@/components/retroui/Text"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import { SectionScoreIndicator } from "../../shared/SectionScoreIndicator"
import { useSection } from "../../../hooks/useSection"
import { AttemptBadge } from "../../shared/AttemptBadge"
import { useAnswerStore } from "../../../store/answerStore"
import type { UraianItem, UrutkanItem as UrutkanItemType } from "../../../types"
import { UrutkanRenderer } from "./UrutkanRenderer"
import { VectorInputRenderer } from "./VectorInputRenderer"
import { MatrixExplanationRenderer } from "./MatrixExplanationRenderer"
import { BayanganTableRenderer } from "./BayanganTableRenderer"
import { StandardUraianRenderer } from "./StandardUraianRenderer"

interface ConclusionAreaProps {
  slug: string
  tab: string
}

/** Penyimpulan section — renders uraian items with special layouts per item. */
export function ConclusionArea({ slug, tab }: ConclusionAreaProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit,
    isLocked, showCobaLagi, isCorrectEvaluation, handleCobaLagi: resetState,
    attempt,
  } = useSection(slug, tab, "penyimpulan")

  const hasAnyInput = Object.values(fields).some((f) => Object.values(f).some((v) => v !== ""))

  const penyimpulanAnswers = useAnswerStore((s) => s.answers[`${slug}-${tab}`]?.penyimpulan)
  const score = penyimpulanAnswers?.score ?? null

  const handleCobaLagi = useCallback(() => {
    resetState()
  }, [resetState])

  return (
    <section className="border-4 border-black bg-white shadow-lg p-3 md:p-6">
      <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
        <div className="w-8 h-8 md:w-12 md:h-12 border-3 border-black bg-white flex items-center justify-center shrink-0">
          <MaterialIcon className="size-4 md:size-6" name="lightbulb" />
        </div>
        <Text as="h2" className="text-lg md:text-2xl font-black uppercase">
          Penyimpulan
        </Text>
        <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasAnyInput} />
        <SectionScoreIndicator score={score} size="md" />
      </div>

      <div className="space-y-4 md:space-y-6">
        {items.map((item) => {
          if (item.type === "urutkan") {
            return (
              <UrutkanRenderer
                key={item.id}
                item={item as UrutkanItemType}
                fields={fields}
                errors={errors}
                isChecked={isChecked}
                setField={setField}
              />
            )
          }

          if (item.type !== "uraian") return null
          const u = item as UraianItem

          if (u.id === 11) {
            return (
              <VectorInputRenderer
                key={u.id}
                fields={fields}
                isChecked={isChecked}
                setField={setField}
              />
            )
          }

          if (u.id === 7) {
            return (
              <MatrixExplanationRenderer
                key={u.id}
                fields={fields}
                errors={errors}
                isChecked={isChecked}
                setField={setField}
              />
            )
          }

          if (u.id === 8) {
            return (
              <BayanganTableRenderer
                key={u.id}
                slug={slug}
                tab={tab}
                fields={fields}
                errors={errors}
                isChecked={isChecked}
                setField={setField}
              />
            )
          }

          return (
            <StandardUraianRenderer
              key={u.id}
              item={u}
              fields={fields}
              errors={errors}
              isChecked={isChecked}
              setField={setField}
            />
          )
        })}

        {isChecked && aiFeedback && (
          <div className="border-4 border-black bg-background p-3 md:p-4">
            <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
          </div>
        )}

        <SectionSubmitButton
          isChecked={isChecked}
          isFilled={isFilled}
          isCorrect={isCorrectEvaluation}
          isLocked={isLocked}
          showCobaLagi={showCobaLagi}
          attempt={attempt}
          onSubmit={handleSubmit}
          onCobaLagi={handleCobaLagi}
          requireConfirmation={slug === "translasi" && tab === "titik"}
        />
      </div>
    </section>
  )
}
