"use client"

import { useCallback, useMemo } from "react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Badge } from "@/components/retroui/Badge"
import { useAnswerStore } from "../store/answerStore"
import type { AssessmentQuestion } from "../types"

const LABELS = ["A", "B", "C", "D"]

interface AssessmentSectionProps {
  slug: string
  tab: string
  questions: AssessmentQuestion[]
}

/** Assessment section — multiple choice questions matching quiz UI. */
export function AssessmentSection({ slug, tab, questions }: AssessmentSectionProps) {
  const tabKey = useMemo(() => `${slug}-${tab}`, [slug, tab])
  const selections = useAnswerStore((s) => s.answers[tabKey]?.cekPemahaman?.selections ?? [])
  const isChecked = useAnswerStore((s) => s.answers[tabKey]?.cekPemahaman?.isChecked ?? false)
  const aiFeedback = useAnswerStore((s) => s.answers[tabKey]?.cekPemahaman?.aiFeedback)
  const setSelections = useAnswerStore((s) => s.setSelections)
  const setChecked = useAnswerStore((s) => s.setChecked)

  const allAnswered = questions.every((_, i) => selections[i] != null)

  const handleSelect = useCallback((qi: number, oi: number) => {
    if (isChecked) return
    const next = [...selections]
    next[qi] = oi
    setSelections(slug, tab, next)
  }, [isChecked, selections, setSelections, slug, tab])

  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(slug, tab, "cekPemahaman" as unknown as "percobaan", false)
    } else {
      setChecked(slug, tab, "cekPemahaman" as unknown as "percobaan", true)
    }
  }, [isChecked, setChecked, slug, tab])

  return (
    <section className="border-4 border-black bg-white shadow-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
        <Badge variant="solid" size="sm">
          Latihan 01
        </Badge>
        <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
          Cek Pemahaman
        </Text>
      </div>

      <div className="space-y-10 max-w-3xl mx-auto">
        {questions.map((q, qi) => (
          <div key={q.id} className="space-y-4">
            <Text as="p" className="text-base md:text-lg font-medium text-center">
              {q.question}
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((opt, oi) => {
                const selected = selections[qi] === oi
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => handleSelect(qi, oi)}
                    disabled={isChecked}
                    className={`flex items-center gap-3 p-4 border-4 border-black text-left font-bold text-base md:text-lg relative transition-all ${
                      selected
                        ? "bg-yellow-400 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                        : "bg-white hover:bg-muted"
                    }`}
                  >
                    <span className="w-8 h-8 md:w-10 md:h-10 border-2 border-black bg-foreground text-background flex items-center justify-center text-sm md:text-base shrink-0">
                      {LABELS[oi]}
                    </span>
                    <span className="grow">{opt}</span>
                    {selected && (
                      <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase">
                        Dipilih
                      </Badge>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-4 mt-6 rounded-none">
          <Text className="text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}

      <div className="mt-8 md:mt-10 flex justify-center">
        <Button
          onClick={handleClick}
          disabled={!allAnswered && !isChecked}
          variant="default"
          size="lg"
          className="font-black uppercase tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)] !rounded-none"
        >
          {isChecked ? "Periksa Lagi" : "Submit Jawaban"}
        </Button>
      </div>
    </section>
  )
}
