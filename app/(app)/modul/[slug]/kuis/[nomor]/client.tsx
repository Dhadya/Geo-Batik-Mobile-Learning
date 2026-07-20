"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Card } from "@/components/retroui/Card"
import { Text } from "@/components/retroui/Text"
import { Badge } from "@/components/retroui/Badge"
import { CheckCircle, Lock, ArrowRight } from "lucide-react"
import {
  QuizBreadcrumb,
  NumberIndicator,
  QuestionRenderer,
  QuizArrowNav,
  QuizArrowNext,
  useQuiz,
  useQuizStore,
} from "@/features/quiz"

const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
}

/** Client-side quiz question page — two-attempt flow with AI feedback. */
export function KuisSoalClient({
  slug,
  nomor,
}: {
  slug: string
  nomor: number
}) {
  const router = useRouter()
  const {
    quiz,
    question,
    total,
    selectedOption,
    isLast,
    isFirst,
    answers,
    currentAttempt,
    isLocked,
    feedback,
    isCorrectEvaluation,
    showCobaLagi,
    selectAnswer,
    setFreeformAnswer,
  } = useQuiz(slug, nomor)

  const label = MODULE_LABELS[slug] ?? slug
  const [evaluating, setEvaluating] = useState(false)
  const [localFeedback, setLocalFeedback] = useState<string | null>(null)
  const [localIsCorrect, setLocalIsCorrect] = useState<boolean | null>(null)
  const [localAttempt, setLocalAttempt] = useState<1 | 2>(currentAttempt)
  const [localLocked, setLocalLocked] = useState(isLocked)
  const [localShowCobaLagi, setLocalShowCobaLagi] = useState(showCobaLagi)

  // Sync local state with hook state on mount
  const effectiveAttempt = localAttempt
  const effectiveLocked = localLocked || isLocked
  const effectiveFeedback = localFeedback ?? feedback
  const effectiveShowCobaLagi = localShowCobaLagi || showCobaLagi

  const handleNumberSelect = useCallback((n: number) => {
    router.push(`/modul/${slug}/kuis/${n}`)
  }, [slug, router])

  /** Submit current question for AI evaluation. */
  const handleSubmit = useCallback(async () => {
    if (!question || evaluating || effectiveLocked) return
    setEvaluating(true)

    try {
      const response = await fetch("/api/ai/evaluate-quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question,
          answer: answers[question.id],
          attempt: effectiveAttempt,
        }),
      })
      const json = await response.json()
      if (!json.ok) throw new Error(json.error?.message ?? "AI evaluation failed")

      const result = json.data as { isCorrect: boolean; score: number; feedback: string }

      setLocalFeedback(result.feedback)
      setLocalIsCorrect(result.isCorrect)

      // Record attempt in store
      const attemptField = effectiveAttempt === 1 ? "attempt1" : "attempt2"
      useQuizStore.getState().recordAttempt(question.id, {
        [`${attemptField}Answer`]: answers[question.id],
        [`${attemptField}Correct`]: result.isCorrect,
        [`${attemptField}Feedback`]: result.feedback,
        [`${attemptField}Score`]: result.score,
        finalScore: result.isCorrect ? 100 : 0,
        status: result.isCorrect
          ? ("correct_attempt1" as const)
          : effectiveAttempt === 1
            ? ("wrong_attempt1" as const)
            : ("wrong_attempt2" as const),
      })

      if (result.isCorrect) {
        setLocalLocked(true)
        setLocalShowCobaLagi(false)
      } else if (effectiveAttempt === 1) {
        setLocalAttempt(2)
        setLocalShowCobaLagi(true)
      } else {
        setLocalLocked(true)
        setLocalShowCobaLagi(false)
      }
    } catch {
      setLocalFeedback("Gagal mengevaluasi jawaban. Silakan coba lagi.")
    }

    setEvaluating(false)
  }, [question, evaluating, effectiveLocked, answers, effectiveAttempt])

  /** Reset question state for attempt 2. */
  const handleCobaLagi = useCallback(() => {
    setLocalFeedback(null)
    setLocalIsCorrect(null)
    setLocalShowCobaLagi(false)
  }, [])

  /** Submit all quiz answers to the server for persistence. */
  const handleSelesai = useCallback(async () => {
    // Persist all attempts to DB
    const attempts = useQuizStore.getState().attempts
    const allAnswers = Object.entries(attempts).map(([qid, att]) => ({
      questionId: Number(qid),
      type: quiz?.questions.find((q) => q.id === Number(qid))?.type ?? "pilihan_ganda",
      attempt1Answer: att.attempt1Answer,
      attempt1Correct: att.attempt1Correct,
      attempt1Feedback: att.attempt1Feedback,
      attempt1Score: att.attempt1Score,
      attempt2Answer: att.attempt2Answer,
      attempt2Correct: att.attempt2Correct,
      attempt2Feedback: att.attempt2Feedback,
      attempt2Score: att.attempt2Score,
      finalScore: att.finalScore,
      status: att.status,
    }))

    const totalScore = Math.round(
      attempts[1]
        ? Object.values(attempts).reduce((sum, a) => sum + (a.finalScore ?? 0), 0) / Math.max(Object.keys(attempts).length, 1)
        : 0
    )

    try {
      await fetch(`/api/modul/${slug}/quiz/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: allAnswers,
          totalScore,
        }),
      })
    } catch {
      // best-effort — result still shown from local state
    }

    useQuizStore.getState().submitAnswers()
    router.push(`/modul/${slug}/kuis/hasil`)
  }, [slug, quiz, router])

  if (!quiz || !question) {
    return (
      <div className="space-y-4 md:space-y-6">
        <p>Soal tidak ditemukan.</p>
      </div>
    )
  }

  const answeredIds = Array.from({ length: total }, (_, i) => i + 1).filter(
    (n) => answers[n] !== undefined
  )

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} />

      <div className="bg-surface-container-high border-4 border-black shadow-lg">
        <NumberIndicator
          total={total}
          current={nomor}
          answeredIds={answeredIds}
          onSelect={handleNumberSelect}
        />

        <div className="flex flex-col md:flex-row items-stretch">
          <div className="hidden md:flex items-center justify-center mx-3 md:mx-4">
            <QuizArrowNav slug={slug} isFirst={isFirst} current={nomor} />
          </div>

          <div className="grow p-3 md:p-4">
            <Card className="w-full border-4 border-black shadow-md">
              <Card.Content className="space-y-4 md:space-y-6">
                {/* Attempt badge */}
                {effectiveShowCobaLagi && (
                  <Badge variant="solid" size="sm" className="bg-yellow-500 text-white self-start">
                    PERCOBAAN KE-2
                  </Badge>
                )}

                {/* Question text */}
                <Text as="p" className="font-semibold text-sm md:text-base">
                  {question.question}
                </Text>

                {/* Dynamic input based on question type */}
                <QuestionRenderer
                  question={question}
                  selectedAnswer={selectedOption}
                  isChecked={!!(localFeedback || feedback)}
                  showCobaLagi={effectiveShowCobaLagi}
                  onAnswer={(answer) => {
                    if (question.type === "pilihan_ganda") {
                      selectAnswer(question.id, answer as number)
                    } else {
                      setFreeformAnswer(question.id, answer)
                    }
                  }}
                />

                {/* AI feedback display */}
                {effectiveFeedback && (
                  <div className="border-4 border-primary bg-primary/5 p-3 md:p-4">
                    <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">
                      {effectiveFeedback}
                    </Text>
                  </div>
                )}

                {/* Locked state */}
                {effectiveLocked && (
                  <div className="border-4 border-black bg-muted p-3 md:p-4">
                    <Text className="text-xs md:text-sm font-bold uppercase text-muted-foreground flex items-center gap-2">
                      <Lock className="size-4" />
                      {localIsCorrect === true || isCorrectEvaluation === true
                        ? "Jawaban benar"
                        : "Kesempatan habis"}
                    </Text>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>

          <div className="hidden md:flex items-center justify-center mx-3 md:mx-4">
            <QuizArrowNext
              slug={slug}
              isLast={isLast}
              current={nomor}
            />
          </div>
        </div>

        <div className="flex md:hidden justify-between items-center mx-3 md:mx-4 p-4">
          <QuizArrowNav slug={slug} isFirst={isFirst} current={nomor} />
          <QuizArrowNext
            slug={slug}
            isLast={isLast}
            current={nomor}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3 md:gap-4 pt-4 md:pt-6">
        {/* "Periksa Jawaban" / "Coba Lagi" — submit current question */}
        {!effectiveLocked && (
          <Button
            variant={effectiveShowCobaLagi ? "secondary" : "default"}
            size="lg"
            className="px-8 py-4 text-lg font-black uppercase gap-2"
            disabled={selectedOption === undefined || evaluating}
            onClick={effectiveShowCobaLagi ? handleCobaLagi : handleSubmit}
          >
            {evaluating
              ? "Menilai..."
              : effectiveShowCobaLagi
                ? "Periksa Jawaban Lagi"
                : "Periksa Jawaban"}
          </Button>
        )}

        {/* "Lanjut" — move to next question after evaluation */}
        {(effectiveLocked || localFeedback) && !isLast && (
          <Link href={`/modul/${slug}/kuis/${nomor + 1}`}>
            <Button
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg font-black uppercase gap-2"
            >
              Lanjut
              <ArrowRight className="size-6" />
            </Button>
          </Link>
        )}

        {/* "Selesai" — all questions answered and final question done */}
        {(effectiveLocked || localFeedback) && (
          isLast ? (
            <Button
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg font-black uppercase gap-2"
              onClick={handleSelesai}
            >
              Selesai
              <CheckCircle className="size-6" />
            </Button>
          ) : null
        )}

        {/* Fallback when on first question */}
        {!localFeedback && !effectiveLocked && isFirst && (
          <Link href={`/modul/${slug}/kuis`}>
            <Button
              variant="default"
              size="lg"
              className="px-8 py-4 text-lg font-black uppercase gap-2"
            >
              Kembali
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
