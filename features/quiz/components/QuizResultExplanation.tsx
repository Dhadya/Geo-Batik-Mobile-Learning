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

          let statusClass = ""
          let statusIcon = null
          if (isAnswered) {
            if (isCorrect) {
              statusClass = "data-[open]:bg-secondary data-[open]:text-secondary-foreground"
              statusIcon = <MaterialIcon className="size-4 shrink-0 text-secondary" name="check" />
            } else {
              statusClass = "data-[open]:bg-destructive data-[open]:text-destructive-foreground"
              statusIcon = <MaterialIcon className="size-4 shrink-0 text-destructive" name="close" />
            }
          }

          return (
            <AccordionItem key={q.id} value={`q-${q.id}`}>
              <AccordionTrigger className={`px-4 py-3 ${statusClass}`}>
                <span className="flex items-center gap-3">
                  {statusIcon}
                  <span className="font-bold">Soal {i + 1}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  <Text as="p" className="font-medium text-foreground text-base">
                    {q.question}
                  </Text>

                  {/* MCQ options with highlights */}
                  <div className="space-y-2">
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
                        <div key={optIdx} className={className}>
                          <span className="font-bold mr-2">{LABELS[optIdx]}.</span>
                          {opt}
                          {isCorrectAnswer && <MaterialIcon className="size-4 ml-2" name="check" />}
                          {isUserAnswer && !isCorrectAnswer && <MaterialIcon className="size-4 ml-2" name="close" />}
                        </div>
                      )
                    })}
                  </div>

                  {/* Pembahasan — AI-generated or static explanation */}
                  {(aiFeedback?.[q.id] ?? q.explanation) && (
                    <div className="border-t-2 border-black pt-3 mt-3">
                      <Text as="p" className="font-medium whitespace-pre-wrap">
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
