"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { useQuizStore } from "../store"
import { getQuizModule } from "../data"
import { useQuizPembahasan } from "../hooks/useQuizPembahasan"
import { QuizHeader } from "./QuizHeader"
import { QuizResultScore } from "./QuizResultScore"
import { QuizResultExplanation } from "./QuizResultExplanation"
import { QuizResultActions } from "./QuizResultActions"
import { Text } from "@/components/retroui/Text"
import { MaterialIcon } from "@/components/common/MaterialIcon"

interface TabBreakdownEntry {
  tab: string
  questions: { id: number }[]
}

export function QuizResult({
  slug,
  title,
  badge,
  icon,
  bgColor,
  serverScore,
  tabBreakdown,
  attemptNumber,
  totalAttempts,
}: {
  slug: string
  title: string
  badge: string
  icon?: ReactNode
  bgColor?: string
  serverScore?: number | null
  tabBreakdown?: TabBreakdownEntry[]
  attemptNumber?: number | null
  totalAttempts?: number
}) {
  const router = useRouter()
  const submittedAnswers = useQuizStore((s) => s.submittedAnswers)
  const quiz = getQuizModule(slug)

  // Fetch AI-generated dynamic pembahasan
  const { data: aiFeedback } = useQuizPembahasan(
    quiz?.questions ?? [],
    submittedAnswers,
    Object.keys(submittedAnswers).length > 0,
  )

  const isEmpty = !quiz || (Object.keys(submittedAnswers).length === 0 && serverScore == null)
  if (isEmpty && typeof window !== "undefined") {
    router.replace(`/modul/${slug}/kuis`)
    return null
  }

  if (!quiz) return null

  const total = quiz.questions.length

  // Calculate correct count from submitted answers
  const correctCount = quiz.questions.filter((q) =>
    submittedAnswers[q.id] === q.correctIndex,
  ).length

  const displayScore = serverScore ?? Math.round((correctCount / Math.max(total, 1)) * 100)

  const ratio = correctCount / Math.max(total, 1)
  let description = `Kamu menjawab ${correctCount} dari ${total} soal dengan benar.`
  if (ratio === 1) {
    description = `Sempurna! ${description} Kamu benar-benar menguasai materi ini!`
  } else if (ratio >= 0.7) {
    description = `Bagus! ${description} Terus tingkatkan pemahamanmu!`
  } else if (ratio >= 0.5) {
    description = `Cukup baik. ${description} Pelajari kembali materi yang masih kurang.`
  } else {
    description = `Ayo semangat! ${description} Jangan menyerah, coba ulangi dan pelajari lagi materinya.`
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <QuizHeader title={title} badge={badge} icon={icon} bgColor={bgColor} description={description} />

      {/* Attempt info banner */}
      {attemptNumber != null && totalAttempts != null && totalAttempts > 0 && (
        <div className="border-4 border-black bg-white p-3 md:p-4 text-center shadow-[4px_4px_0_0_black]">
          <Text className="text-sm md:text-base font-bold uppercase">
            Percobaan Ke-{attemptNumber} — {attemptNumber === 1 ? "Nilai Akhir" : "Latihan"}
          </Text>
        </div>
      )}

      <QuizResultScore correctCount={correctCount} total={total} score={displayScore} />

      {/* Per-tab breakdown — only shown when submittedAnswers has data */}
      {tabBreakdown && tabBreakdown.length > 0 && Object.keys(submittedAnswers).length > 0 && (
        <section className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-6">
          <Text as="h2" className="text-lg md:text-xl font-black uppercase mb-4">
            Rincian Per Tab
          </Text>
          <div className="space-y-2">
            {tabBreakdown.map((tb) => {
              const correctInTab = tb.questions.filter((q) => {
                return submittedAnswers[q.id] === quiz.questions.find((qq) => qq.id === q.id)?.correctIndex
              }).length
              return (
                <div key={tb.tab} className="flex items-center justify-between border-4 border-black p-2 md:p-3">
                  <span className="font-bold uppercase text-xs md:text-sm">{tb.tab}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-black text-sm md:text-base">
                      {correctInTab}/{tb.questions.length}
                    </span>
                    {correctInTab === tb.questions.length && (
                      <MaterialIcon className="size-4 text-green-600" name="check" />
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {Object.keys(submittedAnswers).length > 0 && (
        <QuizResultExplanation questions={quiz.questions} answers={submittedAnswers} aiFeedback={aiFeedback} />
      )}
      <QuizResultActions slug={slug} />
    </div>
  )
}
