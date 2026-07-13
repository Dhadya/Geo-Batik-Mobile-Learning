"use client"

import { useCallback, useMemo } from "react"
import { CheckCircle } from "lucide-react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Badge } from "@/components/retroui/Badge"
import { Card } from "@/components/retroui/Card"
import { useAnswerStore } from "../store/answerStore"
import type { AssessmentQuestion } from "../types"

const LABELS = ["A", "B", "C", "D"]

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
  onSelect,
  matrix,
}: {
  index: number
  text: string
  isSelected: boolean
  onSelect: () => void
  matrix?: boolean
}) {
  const parsed = matrix ? text.match(/\(([^,]+),\s*([^)]+)\)/) : null

  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className="w-full justify-start gap-1.5 md:gap-2 p-2 md:p-3 text-left font-semibold text-xs md:text-base relative"
      onClick={onSelect}
    >
      <span className="w-5 h-5 md:w-7 md:h-7 border-2 border-black bg-foreground text-background flex items-center justify-center text-[10px] md:text-sm shrink-0">
        {LABELS[index]}
      </span>
      {parsed ? (
        <span className="flex items-center justify-center gap-0.5">
          <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
          <span className="flex flex-col items-center gap-0.5 text-[10px] md:text-xs font-black">
            <span className="px-1 md:px-2 select-none text-center">{parsed[1].trim()}</span>
            <span className="px-1 md:px-2 select-none text-center">{parsed[2].trim()}</span>
          </span>
          <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
        </span>
      ) : (
        <span className="grow truncate">{text}</span>
      )}
      {isSelected && (
        <Badge variant="solid" size="sm" className="absolute -top-2 -right-2 uppercase">
          Dipilih
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
    <section className="border-4 border-black bg-white shadow-lg p-3 md:p-6">
      <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
        <div className="w-8 h-8 md:w-12 md:h-12 border-3 border-black bg-white flex items-center justify-center shrink-0">
          <CheckCircle className="size-4 md:size-6" />
        </div>
        <Text as="h2" className="text-lg md:text-2xl font-black uppercase">
          Cek Pemahaman
        </Text>
      </div>

      <div className="space-y-4 md:space-y-6">
        {questions.map((q, qi) => (
          <Card key={q.id} className="block w-full border-4 border-black shadow-md">
            <Card.Content className="space-y-2 md:space-y-3">
              <div className="flex justify-center">
                <Badge variant="solid" size="sm">Soal {qi + 1}</Badge>
              </div>

              <div className="w-full px-1 md:px-2 text-center">
                <Text as="p" className="text-xs md:text-base font-semibold leading-relaxed">
                  {q.question}
                </Text>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {q.options.map((opt, oi) => (
                  <ModuleAnswerButton
                    key={oi}
                    index={oi}
                    text={opt}
                    isSelected={selections[qi] === oi}
                    onSelect={() => handleSelect(qi, oi)}
                    matrix={q.optionFormat === "matrix"}
                  />
                ))}
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 mt-4 md:mt-6 rounded-none">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}

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
