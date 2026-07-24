"use client"

import { useCallback, useMemo, useState } from "react"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import Image from "next/image"
import { Text } from "@/components/retroui/Text"
import { Badge } from "@/components/retroui/Badge"
import { Card } from "@/components/retroui/Card"
import { toast } from "sonner"
import { SectionSubmitButton } from "../../shared/SectionSubmitButton"
import { SectionScoreIndicator } from "../../shared/SectionScoreIndicator"
import { AttemptBadge } from "../../shared/AttemptBadge"
import { useAnswerStore } from "../../../store/answerStore"
import { evaluateSection } from "../../../lib/evaluateSection"
import { triggerTabUnlockIfComplete } from "../../../lib/progressSync"
import { useSubmitSection } from "../../../hooks/useSectionSubmission"
import { selectionsToFields, toSectionItems, computeErrors } from "../../../lib/assessmentHelpers"
import { ModuleAnswerButton } from "./ModuleAnswerButton"
import type { AssessmentQuestion } from "../../../types"

interface AssessmentSectionProps {
  slug: string
  tab: string
  questions: AssessmentQuestion[]
}

/** Assessment section — multiple choice questions with two-attempt AI flow. */
export function AssessmentSection({ slug, tab, questions }: AssessmentSectionProps) {
  const tabKey = useMemo(() => `${slug}-${tab}`, [slug, tab])
  const rawTab = useAnswerStore((s) => s.answers[tabKey])
  const selections = useMemo(() => rawTab?.cekPemahaman?.selections ?? [], [rawTab])
  const aiFeedback = useMemo(() => rawTab?.cekPemahaman?.aiFeedback, [rawTab])
  const persistedStatus = rawTab?.cekPemahaman?.status
  const persistedAttempt = rawTab?.cekPemahaman?.attempt
  const setSelections = useAnswerStore((s) => s.setSelections)
  const hasInput = selections.some((s) => s != null)

  const [attempt, setAttempt] = useState<1 | 2>(() => {
    if (persistedStatus === "correct" || persistedStatus === "wrong_attempt2") return 2
    if (persistedStatus === "wrong_attempt1") return 2
    return persistedAttempt ?? 1
  })
  const [isLocked, setIsLocked] = useState(() =>
    persistedStatus === "correct" || persistedStatus === "wrong_attempt2"
  )
  const [showCobaLagi, setShowCobaLagi] = useState(() =>
    persistedStatus === "wrong_attempt1"
  )
  const [isChecked, setIsChecked] = useState(() =>
    persistedStatus === "correct" || persistedStatus === "wrong_attempt1" || persistedStatus === "wrong_attempt2"
  )
  const [isCorrect, setIsCorrect] = useState<boolean | null>(() =>
    persistedStatus === "correct" ? true
      : persistedStatus === "wrong_attempt1" || persistedStatus === "wrong_attempt2" ? false
        : null
  )
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({})

  const submitMutation = useSubmitSection(slug)

  const allAnswered = useMemo(
    () =>
      questions.every((q, qi) => {
        if (q.multiSelect) return true
        return selections[qi] != null
      }),
    [questions, selections],
  )

  /** Bitmap-encoded selection: toggles option on/off for multi-select; stores single index for single-select */
  const handleSelect = useCallback(
    (qi: number, oi: number) => {
      if (isChecked && !showCobaLagi) return
      const next = [...selections]

      const q = questions[qi]
      if (q.multiSelect) {
        const bitmap = Number(next[qi] ?? 0)
        next[qi] = bitmap & (1 << oi) ? bitmap & ~(1 << oi) : bitmap | (1 << oi)
        if (next[qi] === 0) next[qi] = null
      } else {
        next[qi] = oi
      }

      setSelections(slug, tab, next)
    },
    [isChecked, showCobaLagi, selections, setSelections, slug, tab, questions],
  )

  /** Submit answers with AI evaluation and two-attempt flow. */
  const doSubmit = useCallback(async () => {
    if (submitMutation.isPending) return
    const fields = selectionsToFields(selections, questions)
    const items = toSectionItems(questions)

    try {
      const result = await evaluateSection(slug, tab, "cek-pemahaman", items, fields, attempt)
      const localErrors = computeErrors(selections, questions)
      const isCorrectResult = result.isCorrect
      const finalErrors = isCorrectResult ? {} : localErrors

      const savePayload = {
        tab,
        sectionType: "cek-pemahaman",
        attempt,
        answer: fields as Record<string, unknown>,
        score: result.score,
        feedback: result.feedback,
      }

      if (isCorrectResult) {
        await submitMutation.mutateAsync({ ...savePayload, status: "correct" })
        setIsChecked(true)
        setValidationErrors(finalErrors)
        setIsCorrect(true)
        setIsLocked(true)
        setShowCobaLagi(false)
        useAnswerStore.getState().setCekPemahamanFeedback(slug, tab, result.feedback)
        useAnswerStore.getState().setCekPemahamanScore(slug, tab, result.score)
        useAnswerStore.getState().setCekPemahamanStatus(slug, tab, "correct", attempt)
        toast.success("Jawaban kamu benar, selamat!")
        await triggerTabUnlockIfComplete(slug, tab)
      } else if (attempt === 1) {
        await submitMutation.mutateAsync({ ...savePayload, status: "wrong_attempt1" })
        setIsChecked(true)
        setValidationErrors(finalErrors)
        setIsCorrect(false)
        setShowCobaLagi(true)
        setAttempt(2)
        useAnswerStore.getState().setCekPemahamanFeedback(slug, tab, result.feedback)
        useAnswerStore.getState().setCekPemahamanScore(slug, tab, result.score)
        useAnswerStore.getState().setCekPemahamanStatus(slug, tab, "wrong_attempt1", 2)
        toast.error("Jawaban kamu kurang tepat, tersisa satu kesempatan lagi")
      } else {
        await submitMutation.mutateAsync({ ...savePayload, status: "wrong_attempt2" })
        setIsChecked(true)
        setValidationErrors(finalErrors)
        setIsCorrect(false)
        setIsLocked(true)
        setShowCobaLagi(false)
        useAnswerStore.getState().setCekPemahamanFeedback(slug, tab, result.feedback)
        useAnswerStore.getState().setCekPemahamanScore(slug, tab, result.score)
        useAnswerStore.getState().setCekPemahamanStatus(slug, tab, "wrong_attempt2", 2)
        toast.error("Jawaban kamu masih kurang tepat, kesempatan habis")
        await triggerTabUnlockIfComplete(slug, tab)
      }
    } catch {
      // submission error handled silently
    }
  }, [slug, tab, questions, selections, attempt, submitMutation])

  return (
    <section className="border-4 border-black bg-white shadow-lg p-3 md:p-6 mt-4 md:mt-6">
      {/* Section header */}
      <div className="flex items-center justify-start gap-2 mb-4 md:mb-6">
        <div className="w-8 h-8 md:w-12 md:h-12 border-3 border-black bg-white flex items-center justify-center shrink-0">
          <MaterialIcon name="check_circle" className="size-4 md:size-6" />
        </div>
        <Text as="h2" className="text-lg md:text-2xl font-black uppercase">
          Cek Pemahaman
        </Text>
        <AttemptBadge attempt={attempt} showCobaLagi={showCobaLagi} isLocked={isLocked} hasInput={hasInput} />
        <SectionScoreIndicator score={rawTab?.cekPemahaman?.score ?? null} size="md" />
      </div>

      {/* Questions loop */}
      <div className="space-y-4 md:space-y-6">
        {questions.map((q, qi) => {
          const hasError = validationErrors[q.id]
          const isMulti = q.multiSelect

          return (
            <Card key={q.id} className="block w-full border-4 border-black shadow-md">
              <Card.Content className="space-y-2 md:space-y-3">
                <div className="flex justify-start">
                  <Badge variant="solid" size="sm">
                    SOAL {qi + 1}
                  </Badge>
                </div>

                <div className="w-full px-1 md:px-2 space-y-2">
                  {q.questionImage && (
                    <div className="space-y-1 md:space-y-2">
                      <Text
                        as="p"
                        className="text-xs md:text-base font-semibold leading-relaxed text-black"
                      >
                        Perhatikan gambar berikut!
                      </Text>
                      <div className="flex justify-start">
                        <Image
                          src={q.questionImage}
                          alt="Soal"
                          width={120}
                          height={120}
                          className="w-40 h-40 sm:w-50 sm:h-50 md:w-60 md:h-60 object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {q.questionMatrix ? (
                    <p className="text-xs md:text-base font-semibold leading-relaxed text-black">
                      {q.question}
                      {(() => {
                        const [top, bottom] = q.questionMatrix!.split(",")
                        return (
                          <span className="inline-flex items-center gap-0.5 mx-0.5">
                            <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">
                              (
                            </span>
                            <span className="flex flex-col items-center gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
                              <span className="text-center leading-none select-none">{top}</span>
                              <span className="text-center leading-none select-none">
                                {bottom}
                              </span>
                            </span>
                            <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">
                              )
                            </span>
                          </span>
                        )
                      })()}
                      {q.questionSuffix && ` ${q.questionSuffix}`}
                    </p>
                  ) : (
                    <Text
                      as="p"
                      className="text-xs md:text-base font-semibold leading-relaxed text-black"
                    >
                      {q.question}
                    </Text>
                  )}

                  {isMulti && (
                    <Text className="text-[10px] md:text-xs text-muted-foreground font-medium">
                      Pilih beberapa jawaban yang benar
                    </Text>
                  )}
                </div>

                <div
                  className={`grid gap-2 md:gap-3 ${q.options.length >= 5
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    }`}
                >
                  {q.options.map((opt, oi) => {
                    const isSelected = isMulti
                      ? !!(Number(selections[qi] ?? 0) & (1 << oi))
                      : selections[qi] === oi

                    const isCorrect = isChecked && isSelected
                      ? isMulti
                        ? q.correctIndices?.includes(oi)
                        : selections[qi] === q.correctIndex
                      : false
                    const isWrong = isChecked && isSelected
                      ? isMulti
                        ? !q.correctIndices?.includes(oi)
                        : selections[qi] !== q.correctIndex
                      : false

                    return (
                      <ModuleAnswerButton
                        key={oi}
                        index={oi}
                        text={opt}
                        isSelected={isSelected}
                        isCorrect={!!isCorrect}
                        isWrong={!!isWrong}
                        onSelect={() => handleSelect(qi, oi)}
                        matrix={q.optionFormat === "matrix"}
                        disabled={isChecked}
                        imageSrc={q.imageOptions?.[oi]}
                      />
                    )
                  })}
                </div>

                {isChecked && hasError && (
                  <Text className="text-destructive text-[10px] md:text-xs font-medium text-center">
                    Jawaban kurang tepat
                  </Text>
                )}
              </Card.Content>
            </Card>
          )
        })}
      </div>

      {/* AI feedback banner */}
      {isChecked && aiFeedback && (
        <div className="border-4 border-black bg-background p-3 md:p-4 mt-4 md:mt-6">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">
            {aiFeedback}
          </Text>
        </div>
      )}

      {/* Submit button — shown in all states */}
      <div className="mt-4 md:mt-8">
        <SectionSubmitButton
          isChecked={isChecked}
          isFilled={allAnswered}
          isCorrect={isCorrect}
          isLocked={isLocked}
          showCobaLagi={showCobaLagi}
          attempt={attempt}
          onSubmit={doSubmit}
          onCobaLagi={() => {
            setIsChecked(false)
            setIsCorrect(null)
            setValidationErrors({})
            setShowCobaLagi(false)
            useAnswerStore.getState().setCekPemahamanFeedback(slug, tab, "")
            useAnswerStore.getState().setCekPemahamanStatus(slug, tab, "unsubmitted", 2)
          }}
          requireConfirmation={slug === "translasi" && tab === "titik"}
        />
      </div>
    </section>
  )
}
