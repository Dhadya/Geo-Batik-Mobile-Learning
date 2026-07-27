"use client"

import { AnswerButton } from "./AnswerButton"
import type { PilihanGandaQuestion } from "../types"

interface QuestionRendererProps {
  question: PilihanGandaQuestion
  selectedAnswer: number | undefined
  disabled: boolean
  onAnswer: (answer: number) => void
}

/** Renders MCQ answer options grid. */
export function QuestionRenderer({
  question,
  selectedAnswer,
  disabled,
  onAnswer,
}: QuestionRendererProps) {
  return (
    <div className={`grid gap-3 md:gap-4 w-full ${question.options.length >= 5 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : question.options.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
      {question.options.map((opt, i) => (
        <AnswerButton
          key={i}
          index={i}
          text={opt}
          matrix={question.optionMatrices?.[i]}
          isSelected={selectedAnswer === i}
          onSelect={() => onAnswer(i)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
