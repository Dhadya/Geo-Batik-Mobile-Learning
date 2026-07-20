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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
      {question.options.map((opt, i) => (
        <AnswerButton
          key={i}
          index={i}
          text={opt}
          isSelected={selectedAnswer === i}
          onSelect={() => onAnswer(i)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
