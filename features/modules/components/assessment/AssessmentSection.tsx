"use client"

import { useCallback, useMemo } from "react"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Badge } from "@/components/retroui/Badge"
import { Card } from "@/components/retroui/Card"
import { useAnswerStore } from "../../store/answerStore"
import type { AssessmentQuestion } from "../../types"

const LABELS = ["A", "B", "C", "D", "E", "F"]

/** Count number of set bits in a bitmap. */
function countBits(n: number): number {
  let c = 0
  while (n) { c += n & 1; n >>= 1 }
  return c
}

interface AssessmentSectionProps {
  slug: string
  tab: string
  questions: AssessmentQuestion[]
}

/** Compact answer button for module context — smaller than quiz version. */
function ModuleAnswerButton({
  index,
  text,
  isSelected,
  isCorrect,
  isWrong,
  onSelect,
  matrix,
  disabled,
  imageSrc,
}: {
  index: number
  text: string
  isSelected: boolean
  isCorrect: boolean
  isWrong: boolean
  onSelect: () => void
  matrix?: boolean
  disabled?: boolean
  imageSrc?: string
}) {
  const parsed = matrix ? text.match(/\(([^,]+),\s*([^)]+)\)/) : null

  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={`justify-start! flex-row items-center gap-2 md:gap-3 p-2 md:p-3 text-left font-semibold text-xs md:text-base relative ${
        isCorrect ? "border-green-600 bg-green-50" : isWrong ? "border-destructive bg-destructive/5" : ""
      }`}
      onClick={onSelect}
      disabled={disabled}
    >
      <span className={`w-5 h-5 md:w-7 md:h-7 border-2 border-black flex items-center justify-center text-[10px] md:text-sm shrink-0 ${
        isCorrect ? "bg-green-600 text-white" : isWrong ? "bg-destructive text-white" : "bg-foreground text-background"
      }`}>
        {LABELS[index]}
      </span>
      {imageSrc ? (
        <div className="flex flex-col items-center gap-1">
          <Image
            src={imageSrc}
            alt={text}
            width={100}
            height={100}
            className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] object-contain"
          />
        </div>
      ) : parsed ? (
        <span className="flex items-center justify-start gap-0.5">
          <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
          <span className="flex flex-col items-center gap-0.5 text-[10px] md:text-xs font-black">
            <span className="px-1 md:px-2 select-none text-center">{parsed[1].trim()}</span>
            <span className="px-1 md:px-2 select-none text-center">{parsed[2].trim()}</span>
          </span>
          <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
        </span>
      ) : (
        <span className="grow text-left">{text}</span>
      )}
      {isSelected && !isCorrect && !isWrong && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase">
          Dipilih
        </Badge>
      )}
      {isCorrect && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase bg-green-600">
          Benar
        </Badge>
      )}
      {isWrong && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase bg-destructive">
          Salah
        </Badge>
      )}
    </Button>
  )
}

/** Assessment section — multiple choice questions matching quiz UI. */
export function AssessmentSection({ slug, tab, questions }: AssessmentSectionProps) {
  const tabKey = useMemo(() => `${slug}-${tab}`, [slug, tab])
  const rawTab = useAnswerStore((s) => s.answers[tabKey])
  const selections = useMemo(() => rawTab?.cekPemahaman?.selections ?? [], [rawTab])
  const isChecked = useMemo(() => rawTab?.cekPemahaman?.isChecked ?? false, [rawTab])
  const aiFeedback = useMemo(() => rawTab?.cekPemahaman?.aiFeedback, [rawTab])
  const setSelections = useAnswerStore((s) => s.setSelections)
  const setChecked = useAnswerStore((s) => s.setChecked)

  const allAnswered = useMemo(() =>
    questions.every((q, qi) => {
      if (q.multiSelect) return true // multi-select always "answered"
      return selections[qi] != null
    }),
  [questions, selections])

  const validationErrors = useMemo(() => {
    if (!isChecked) return {}
    const errors: Record<string, boolean> = {}
    questions.forEach((q, qi) => {
      if (q.multiSelect && q.correctIndices) {
        const bitmap = Number(selections[qi] ?? 0)
        const correct = q.correctIndices.every((ci) => bitmap & (1 << ci)) &&
          q.correctIndices.length === countBits(bitmap)
        if (!correct) errors[`${q.id}`] = true
      } else if (selections[qi] !== q.correctIndex) {
        errors[`${q.id}`] = true
      }
    })
    return errors
  }, [isChecked, questions, selections])

  /** Bitmap-encoded selection: toggles option oi on/off for multi-select; stores single index for single-select */
  const handleSelect = useCallback((qi: number, oi: number) => {
    if (isChecked) return
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
  }, [isChecked, selections, setSelections, slug, tab, questions])

  /** Toggle check state: submit answers or allow re-try */
  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(slug, tab, "cekPemahaman" as unknown as "percobaan", false)
    } else {
      setChecked(slug, tab, "cekPemahaman" as unknown as "percobaan", true)
    }
  }, [isChecked, setChecked, slug, tab])

  return (
    <section className="border-4 border-black bg-white shadow-lg p-3 md:p-6">
      {/* Section header: CheckCircle icon + "Cek Pemahaman" title */}
      <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
        <div className="w-8 h-8 md:w-12 md:h-12 border-3 border-black bg-white flex items-center justify-center shrink-0">
          <CheckCircle className="size-4 md:size-6" />
        </div>
        <Text as="h2" className="text-lg md:text-2xl font-black uppercase">
          Cek Pemahaman
        </Text>
      </div>

      {/* Questions loop — renders each as a Card */}
      <div className="space-y-4 md:space-y-6">
        {questions.map((q, qi) => {
          const hasError = validationErrors[q.id]
          const isMulti = q.multiSelect

          return (
            /* Individual question card */
            <Card key={q.id} className="block w-full border-4 border-black shadow-md">
              <Card.Content className="space-y-2 md:space-y-3">
                {/* Question number badge */}
                <div className="flex justify-start">
                  <Badge variant="solid" size="sm">SOAL {qi + 1}</Badge>
                </div>

                {/* Question text + optional embedded image */}
                <div className="w-full px-1 md:px-2 space-y-2">
                  {/* Embedded question image (e.g. soal diagram for item 13) */}
                  {q.questionImage && (
                    <div className="space-y-1 md:space-y-2">
                      <Text as="p" className="text-xs md:text-base font-semibold leading-relaxed text-black">
                        Perhatikan gambar berikut!
                      </Text>
                      <div className="flex justify-start">
                        <Image
                          src={q.questionImage}
                          alt="Soal"
                          width={120}
                          height={120}
                          className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Question text + optional inline matrix + suffix */}
                  {q.questionMatrix ? (
                    <p className="text-xs md:text-base font-semibold leading-relaxed text-black">
                      {q.question}
                      {(() => {
                        const [top, bottom] = q.questionMatrix!.split(",")
                        return (
                          <span className="inline-flex items-center gap-0.5 mx-0.5">
                            <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                            <span className="flex flex-col items-center gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
                              <span className="text-center leading-none select-none">{top}</span>
                              <span className="text-center leading-none select-none">{bottom}</span>
                            </span>
                            <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                          </span>
                        )
                      })()}
                      {q.questionSuffix && ` ${q.questionSuffix}`}
                    </p>
                  ) : (
                    <Text as="p" className="text-xs md:text-base font-semibold leading-relaxed text-black">
                      {q.question}
                    </Text>
                  )}

                  {/* Hint for multi-select questions */}
                  {isMulti && (
                    <Text className="text-[10px] md:text-xs text-muted-foreground font-medium">
                      Pilih beberapa jawaban yang benar
                    </Text>
                  )}
                </div>

                {/* Answer options grid — renders ModuleAnswerButton per option */}
                <div
                  className={`grid gap-2 md:gap-3 ${
                    q.options.length >= 5
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  }`}
                >
                  {q.options.map((opt, oi) => {
                    /* Determine if option oi is selected: bitmap for multi, direct compare for single */
                    const isSelected = isMulti
                      ? !!(Number(selections[qi] ?? 0) & (1 << oi))
                      : selections[qi] === oi

                    /* Mark as correct/wrong only after submission */
                    const isCorrect = isChecked && isSelected && (isMulti
                      ? q.correctIndices?.includes(oi)
                      : selections[qi] === q.correctIndex
                    )
                    const isWrong = isChecked && isSelected && (isMulti
                      ? !q.correctIndices?.includes(oi)
                      : selections[qi] !== q.correctIndex
                    )

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

                {/* Error feedback shown below question when answer is wrong */}
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

      {/* AI-generated feedback banner */}
      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 mt-4 md:mt-6 rounded-none">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}

      {/* Submit / Re-check button */}
      <div className="mt-4 md:mt-8 flex justify-center">
        <Button
          onClick={handleClick}
          disabled={!allAnswered && !isChecked}
          variant="default"
          size="lg"
          className="font-black uppercase tracking-wide rounded-none"
        >
          {isChecked ? "Periksa Lagi" : "Submit Jawaban"}
        </Button>
      </div>
    </section>
  )
}
