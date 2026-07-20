"use client"

import { useCallback } from "react"
import { Input } from "@/components/retroui/Input"
import { Text } from "@/components/retroui/Text"
import { AnswerButton } from "./AnswerButton"
import type { QuizQuestion, PilihanGandaQuestion, AngkaQuestion, CampuranQuestion } from "../types"

interface QuestionRendererProps {
  question: QuizQuestion
  selectedAnswer: unknown
  isChecked: boolean
  showCobaLagi: boolean
  onAnswer: (answer: unknown) => void
}

/** Renders the appropriate input UI based on question type. */
export function QuestionRenderer({
  question,
  selectedAnswer,
  isChecked,
  showCobaLagi,
  onAnswer,
}: QuestionRendererProps) {
  switch (question.type) {
    case "pilihan_ganda":
      return <PilihanGandaRenderer question={question} selectedAnswer={selectedAnswer as number | undefined} onAnswer={onAnswer} disabled={isChecked && !showCobaLagi} />
    case "uraian":
      return <UraianRenderer selectedAnswer={selectedAnswer as string | undefined} onAnswer={onAnswer} disabled={isChecked && !showCobaLagi} />
    case "angka":
      return <AngkaRenderer question={question} selectedAnswer={selectedAnswer as Record<string, string> | undefined} onAnswer={onAnswer} disabled={isChecked && !showCobaLagi} />
    case "campuran":
      return <CampuranRenderer question={question} selectedAnswer={selectedAnswer as Record<number, unknown> | undefined} isChecked={isChecked} showCobaLagi={showCobaLagi} onAnswer={onAnswer} />
    default:
      return <Text className="text-destructive">Tipe soal tidak dikenal</Text>
  }
}

function PilihanGandaRenderer({
  question,
  selectedAnswer,
  onAnswer,
  disabled,
}: {
  question: PilihanGandaQuestion
  selectedAnswer: number | undefined
  onAnswer: (answer: unknown) => void
  disabled: boolean
}) {
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

function UraianRenderer({
  selectedAnswer,
  onAnswer,
  disabled,
}: {
  selectedAnswer: string | undefined
  onAnswer: (answer: unknown) => void
  disabled: boolean
}) {
  const maxLength = 500
  const currentLength = selectedAnswer?.length ?? 0

  return (
    <div className="space-y-2">
      <textarea
        className="w-full min-h-[120px] border-4 border-black p-3 font-medium text-sm resize-y bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Tulis jawabanmu di sini..."
        value={selectedAnswer ?? ""}
        onChange={(e) => onAnswer(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
      />
      <Text className="text-xs text-muted-foreground text-right">
        {currentLength}/{maxLength}
      </Text>
    </div>
  )
}

function AngkaRenderer({
  question,
  selectedAnswer,
  onAnswer,
  disabled,
}: {
  question: AngkaQuestion
  selectedAnswer: Record<string, string> | undefined
  onAnswer: (answer: unknown) => void
  disabled: boolean
}) {
  const hasXY = question.answer.x !== undefined || question.answer.y !== undefined
  const xVal = selectedAnswer?.x ?? ""
  const yVal = selectedAnswer?.y ?? ""
  const val = selectedAnswer?.value ?? ""

  const setValue = useCallback((field: string, v: string) => {
    onAnswer({ ...(selectedAnswer ?? {}), [field]: v })
  }, [selectedAnswer, onAnswer])

  if (hasXY) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-2xl font-light">(</span>
        <div className="flex flex-col gap-1">
          <Input
            type="number"
            value={xVal}
            onChange={(e) => setValue("x", e.target.value)}
            disabled={disabled}
            className="w-20 text-center"
            placeholder="x"
          />
          <Input
            type="number"
            value={yVal}
            onChange={(e) => setValue("y", e.target.value)}
            disabled={disabled}
            className="w-20 text-center"
            placeholder="y"
          />
        </div>
        <span className="text-2xl font-light">)</span>
      </div>
    )
  }

  return (
    <Input
      type="number"
      value={val}
      onChange={(e) => setValue("value", e.target.value)}
      disabled={disabled}
      className="w-32 text-center"
      placeholder="0"
    />
  )
}

function CampuranRenderer({
  question,
  selectedAnswer,
  isChecked,
  showCobaLagi,
  onAnswer,
}: {
  question: CampuranQuestion
  selectedAnswer: Record<number, unknown> | undefined
  isChecked: boolean
  showCobaLagi: boolean
  onAnswer: (answer: unknown) => void
}) {
  const setSubAnswer = useCallback((subIdx: number, answer: unknown) => {
    onAnswer({ ...(selectedAnswer ?? {}), [subIdx]: answer })
  }, [selectedAnswer, onAnswer])

  return (
    <div className="space-y-6">
      {question.subQuestions.map((sq, idx) => (
        <div key={idx} className="border-2 border-black p-3">
          <Text className="font-bold text-sm mb-2">Sub-soal {idx + 1}</Text>
          <Text className="text-sm mb-3">{sq.question}</Text>
          <QuestionRenderer
            question={sq}
            selectedAnswer={(selectedAnswer ?? {})[idx]}
            isChecked={isChecked}
            showCobaLagi={showCobaLagi}
            onAnswer={(ans) => setSubAnswer(idx, ans)}
          />
        </div>
      ))}
    </div>
  )
}
