"use client"

import { Text } from "@/components/retroui/Text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/retroui/Accordion"
import { Check, X } from "lucide-react"
import type { QuizQuestion } from "../types"
import type { QuizAnswers } from "../types"

const LABELS = ["A", "B", "C", "D"]

export function QuizResultExplanation({
  questions,
  answers,
}: {
  questions: QuizQuestion[]
  answers: QuizAnswers
}) {
  return (
    <section className="space-y-3 md:space-y-4">
      <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
        Pembahasan
      </Text>

      <Accordion multiple defaultValue={questions.map((q) => `q-${q.id}`)}>
        {questions.map((q, i) => {
          const userAnswer = answers[q.id]
          const isCorrect = userAnswer === q.correctIndex
          const isAnswered = userAnswer !== undefined

          return (
            <AccordionItem key={q.id} value={`q-${q.id}`}>
              <AccordionTrigger
                className={`px-4 py-3 ${
                  isAnswered
                    ? isCorrect
                      ? "data-[open]:bg-secondary data-[open]:text-secondary-foreground"
                      : "data-[open]:bg-destructive data-[open]:text-destructive-foreground"
                    : ""
                }`}
              >
                <span className="flex items-center gap-3">
                  {isAnswered ? (
                    isCorrect ? (
                      <Check className="size-4 shrink-0 text-secondary" />
                    ) : (
                      <X className="size-4 shrink-0 text-destructive" />
                    )
                  ) : null}
                  <span className="font-bold">Soal {i + 1}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  <Text as="p" className="font-medium text-foreground text-base">
                    {q.question}
                  </Text>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isUserAnswer = userAnswer === optIdx
                      const isCorrectAnswer = q.correctIndex === optIdx
                      let className = "border-2 border-black px-3 py-2 font-medium "

                      if (isCorrectAnswer) {
                        className += " bg-secondary text-secondary-foreground"
                      } else if (isUserAnswer && !isCorrect) {
                        className += " bg-destructive text-destructive-foreground"
                      } else {
                        className += " bg-muted text-muted-foreground"
                      }

                      return (
                        <div key={optIdx} className={className}>
                          <span className="font-bold mr-2">{LABELS[optIdx]}.</span>
                          {opt}
                          {isCorrectAnswer && <Check className="inline size-4 ml-2" />}
                          {isUserAnswer && !isCorrect && <X className="inline size-4 ml-2" />}
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t-2 border-black pt-3 mt-3">
                    <Text as="p" className="font-medium">
                      <span className="font-bold">Penjelasan: </span>
                      {q.explanation}
                    </Text>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
