"use client"

import { Text } from "@/components/retroui/Text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/retroui/Accordion"
import { Check, X } from "lucide-react"
import type { QuizQuestion, QuizAnswers, QuizQuestionAttempt } from "../types"

const LABELS = ["A", "B", "C", "D", "E", "F"]

function renderAnswerComparison(
  question: QuizQuestion,
  userAnswer: unknown,
) {
  switch (question.type) {
    case "pilihan_ganda":
      return (
        <div className="space-y-2">
          {question.options.map((opt, optIdx) => {
            const isUserAnswer = userAnswer === optIdx
            const isCorrectAnswer = question.correctIndex === optIdx
            let className = "border-2 border-black px-3 py-2 font-medium "

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
                {isCorrectAnswer && <Check className="inline size-4 ml-2" />}
                {isUserAnswer && !isCorrectAnswer && <X className="inline size-4 ml-2" />}
              </div>
            )
          })}
        </div>
      )

    case "uraian":
      return (
        <div className="space-y-2">
          <div className="border-2 border-black px-3 py-2 bg-muted">
            <span className="font-bold">Jawaban kamu: </span>
            <span>{(userAnswer as string) ?? "(tidak dijawab)"}</span>
          </div>
          <div className="border-2 border-black px-3 py-2 bg-secondary/10">
            <span className="font-bold">Jawaban benar: </span>
            <span>{question.answer}</span>
          </div>
        </div>
      )

    case "angka":
      return (
        <div className="space-y-2">
          <div className="border-2 border-black px-3 py-2 bg-muted">
            <span className="font-bold">Jawaban kamu: </span>
            <span>{userAnswer != null ? JSON.stringify(userAnswer) : "(tidak dijawab)"}</span>
          </div>
          <div className="border-2 border-black px-3 py-2 bg-secondary/10">
            <span className="font-bold">Jawaban benar: </span>
            <span>{JSON.stringify(question.answer)}</span>
          </div>
        </div>
      )

    case "campuran":
      return (
        <Text className="text-sm text-muted-foreground">
          Soal campuran — lihat rincian per sub-soal.
        </Text>
      )

    default:
      return null
  }
}

export function QuizResultExplanation({
  questions,
  answers,
  attempts,
}: {
  questions: QuizQuestion[]
  answers: QuizAnswers
  attempts?: Record<number, QuizQuestionAttempt>
}) {
  return (
    <section className="space-y-3 md:space-y-4">
      <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
        Pembahasan
      </Text>

      <Accordion multiple defaultValue={questions.map((q) => `q-${q.id}`)}>
        {questions.map((q, i) => {
          const userAnswer = answers[q.id]
          const attempt = attempts?.[q.id]
          const isCorrect = q.type === "pilihan_ganda"
            ? userAnswer === q.correctIndex
            : attempt?.status === "correct_attempt1"
          const isAnswered = userAnswer !== undefined || attempt != null

          // Determine status color
          let statusClass = ""
          let statusIcon = null
          if (isAnswered) {
            if (isCorrect) {
              statusClass = "data-[open]:bg-secondary data-[open]:text-secondary-foreground"
              statusIcon = <Check className="size-4 shrink-0 text-secondary" />
            } else {
              statusClass = "data-[open]:bg-destructive data-[open]:text-destructive-foreground"
              statusIcon = <X className="size-4 shrink-0 text-destructive" />
            }
          }

          return (
            <AccordionItem key={q.id} value={`q-${q.id}`}>
              <AccordionTrigger className={`px-4 py-3 ${statusClass}`}>
                <span className="flex items-center gap-3">
                  {statusIcon}
                  <span className="font-bold">Soal {i + 1}</span>
                  {attempt?.status === "wrong_attempt1" && (
                    <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 font-bold">
                      ATTEMPT 1
                    </span>
                  )}
                  {attempt?.status === "wrong_attempt2" && (
                    <span className="text-xs bg-destructive text-white px-2 py-0.5 font-bold">
                      ATTEMPT 2
                    </span>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  <Text as="p" className="font-medium text-foreground text-base">
                    {q.question}
                  </Text>

                  {/* Answer comparison based on type */}
                  {renderAnswerComparison(q, userAnswer)}

                  {/* AI feedback from attempts */}
                  {attempt?.attempt1Feedback && (
                    <div className="border-t-2 border-black pt-3 mt-3">
                      {attempt.attempt2Feedback ? (
                        <>
                          <div className="mb-2">
                            <Text className="font-bold text-sm text-muted-foreground">
                              Feedback Percobaan 1:
                            </Text>
                            <Text className="text-sm">{attempt.attempt1Feedback}</Text>
                          </div>
                          <div>
                            <Text className="font-bold text-sm text-muted-foreground">
                              Feedback Percobaan 2:
                            </Text>
                            <Text className="text-sm">{attempt.attempt2Feedback}</Text>
                          </div>
                        </>
                      ) : (
                        <Text className="text-sm">
                          <span className="font-bold">Feedback: </span>
                          {attempt.attempt1Feedback}
                        </Text>
                      )}
                    </div>
                  )}

                  {/* Static explanation */}
                  {"explanation" in q && q.explanation && (
                    <div className="border-t-2 border-black pt-3 mt-3">
                      <Text as="p" className="font-medium">
                        <span className="font-bold">Penjelasan: </span>
                        {q.explanation}
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
