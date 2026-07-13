"use client"

import { useCallback, useMemo } from "react"
import { CheckCircle } from "lucide-react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Card } from "@/components/retroui/Card"
import { AnswerButton } from "@/features/quiz/components/AnswerButton"
import { useAnswerStore } from "../store/answerStore"
import type { AssessmentQuestion } from "../types"

interface AssessmentSectionProps {
  slug: string
  tab: string
  questions: AssessmentQuestion[]
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

  const allAnswered = useMemo(() => questions.every((_, i) => selections[i] != null), [questions, selections])

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
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center shrink-0">
          <CheckCircle className="size-4" />
        </div>
        <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
          Cek Pemahaman
        </Text>
      </div>

      <div className="space-y-10 max-w-3xl mx-auto">
        {questions.map((q, qi) => (
          <Card key={q.id} className="border-4 border-black shadow-md">
            <Card.Content className="space-y-4 md:space-y-6">
              <div className="w-full p-6 md:p-8 text-center">
                <Text as="h2" className="text-lg md:text-xl lg:text-2xl font-bold leading-relaxed">
                  {q.question}
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
                {q.options.map((opt, oi) => (
                  <AnswerButton
                    key={oi}
                    index={oi}
                    text={opt}
                    isSelected={selections[qi] === oi}
                    onSelect={() => handleSelect(qi, oi)}
                  />
                ))}
              </div>
            </Card.Content>
          </Card>
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
          className="font-black uppercase tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)] rounded-none"
        >
          {isChecked ? "Periksa Lagi" : "Submit Jawaban"}
        </Button>
      </div>
    </section>
  )
}
