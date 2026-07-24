"use client"

import { Text } from "@/components/retroui/Text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/retroui/Accordion"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import type { PilihanGandaQuestion, QuizAnswers } from "../types"

const LABELS = ["A", "B", "C", "D", "E", "F"]

export function QuizResultExplanation({
  questions,
  answers,
  aiFeedback,
}: {
  questions: PilihanGandaQuestion[]
  answers: QuizAnswers
  aiFeedback?: Record<number, string>
}) {
  return (
    <section className="space-y-3 md:space-y-4">
      <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
        Pembahasan
      </Text>

      <Accordion multiple>
        {questions.map((q, i) => {
          const userAnswer = answers[q.id]
          const isCorrect = userAnswer === q.correctIndex
          const isAnswered = userAnswer !== undefined

          let statusIcon = null
          if (isAnswered) {
            statusIcon = isCorrect
              ? <MaterialIcon className="size-6 shrink-0 text-green-600" name="check_circle" />
              : <MaterialIcon className="size-6 shrink-0 text-red-600" name="cancel" />
          }

          return (
            <AccordionItem key={q.id} value={`q-${q.id}`} className="border-4 border-black">
              <AccordionTrigger className="px-4 py-3">
                <span className="flex items-center gap-3 text-left">
                  {statusIcon}
                  <span className="flex flex-col gap-0.5">
                    <span className="font-black text-base md:text-lg">Soal {i + 1}</span>
                    <span className="font-medium text-sm md:text-base text-muted-foreground line-clamp-2">{q.question}</span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 p-4 border-t-2 border-black">
                  {q.options.map((opt, optIdx) => {
                    const isUserAnswer = userAnswer === optIdx
                    const isCorrectAnswer = q.correctIndex === optIdx
                    let className = "border-4 border-black px-3 py-2 font-medium "

                    if (isCorrectAnswer) {
                      className += " bg-secondary text-secondary-foreground"
                    } else if (isUserAnswer && !isCorrectAnswer) {
                      className += " bg-destructive text-destructive-foreground"
                    } else {
                      className += " bg-muted text-muted-foreground"
                    }

                    return (
                      <div key={optIdx} className={`${className} flex items-center`}>
                        <span className="font-bold mr-2">{LABELS[optIdx]}.</span>
                        <span className="flex-1">{opt}</span>
                        {isCorrectAnswer && <MaterialIcon className="size-4 shrink-0" name="check" />}
                        {isUserAnswer && !isCorrectAnswer && <MaterialIcon className="size-4 shrink-0" name="close" />}
                      </div>
                    )
                  })}

                  {(aiFeedback?.[q.id] ?? q.explanation) && (
                    <div className="border-t-2 border-black pt-3">
                      <Text as="p" className="font-medium text-sm whitespace-pre-wrap">
                        <span className="font-bold">Pembahasan: </span>
                        {aiFeedback?.[q.id] ?? q.explanation}
                      </Text>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
