"use client"

import { useRouter } from "next/navigation"
import {
  QuizBreadcrumb,
  QuizHeader,
  NumberIndicator,
  QuestionBox,
  AnswerButton,
  QuizNavigation,
  useQuiz,
} from "@/features/quiz"

const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
}

/** Client-side quiz question page — all interactive logic lives here. */
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
    allAnswered,
    isLast,
    isFirst,
    selectAnswer,
  } = useQuiz(slug, nomor)

  const label = MODULE_LABELS[slug] ?? slug

  const handleNumberSelect = (n: number) => {
    router.push(`/modul/${slug}/kuis/${n}`)
  }

  if (!quiz || !question) {
    return (
      <div className="max-w-[96rem] mx-auto p-4 md:p-6 lg:p-8">
        <p>Soal tidak ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="max-w-[96rem] mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizHeader title={quiz.title} badge={quiz.badge} />

      <div className="bg-surface-container-high border-4 border-black shadow-lg">
        <NumberIndicator
          total={total}
          current={nomor}
          onSelect={handleNumberSelect}
        />

        <div className="p-6 md:p-10 lg:p-12 flex flex-col items-center gap-6 md:gap-8">
          <QuestionBox question={question.question} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
            {question.options.map((opt, i) => (
              <AnswerButton
                key={i}
                index={i}
                text={opt}
                isSelected={selectedOption === i}
                onSelect={() => selectAnswer(question.id, i)}
              />
            ))}
          </div>

          <QuizNavigation
            slug={slug}
            isFirst={isFirst}
            isLast={isLast}
            allAnswered={allAnswered}
            current={nomor}
          />
        </div>
      </div>
    </div>
  )
}
