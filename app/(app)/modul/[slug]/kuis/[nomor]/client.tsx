"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Card } from "@/components/retroui/Card"
import {
  QuizBreadcrumb,
  NumberIndicator,
  QuestionBox,
  AnswerButton,
  QuizArrowNav,
  QuizArrowNext,
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
    answers,
    selectAnswer,
  } = useQuiz(slug, nomor)

  const label = MODULE_LABELS[slug] ?? slug

  const handleNumberSelect = (n: number) => {
    router.push(`/modul/${slug}/kuis/${n}`)
  }

  if (!quiz || !question) {
    return (
      <div className="max-w-[96rem] mx-auto p-4 md:p-6">
        <p>Soal tidak ditemukan.</p>
      </div>
    )
  }

  const answeredIds = Array.from({ length: total }, (_, i) => i + 1).filter(
    (n) => {
      const q = quiz.questions[n - 1]
      return q && answers[q.id] !== undefined
    }
  )

  return (
    <div className="max-w-[96rem] mx-auto px-4 md:px-6 pb-4 md:pb-6 pt-2 md:pt-3 space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} />

      <div className="bg-surface-container-high border-4 border-black shadow-lg">
        <NumberIndicator
          total={total}
          current={nomor}
          answeredIds={answeredIds}
          onSelect={handleNumberSelect}
        />

        <div className="flex flex-col md:flex-row items-stretch">
          <div className="hidden md:flex items-center justify-center px-2">
            <QuizArrowNav slug={slug} isFirst={isFirst} current={nomor} />
          </div>

          <div className="flex-grow p-3 md:p-4">
            <Card className="w-full border-4 border-black shadow-md">
              <Card.Content className="space-y-4 md:space-y-6">
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
              </Card.Content>
            </Card>
          </div>

          <div className="hidden md:flex items-center justify-center px-2">
            <QuizArrowNext
              slug={slug}
              isLast={isLast}
              current={nomor}
            />
          </div>
        </div>

        <div className="flex md:hidden justify-between items-center p-4 border-t-2 border-black">
          <QuizArrowNav slug={slug} isFirst={isFirst} current={nomor} />
          <QuizArrowNext
            slug={slug}
            isLast={isLast}
            current={nomor}
          />
        </div>
      </div>

      <div className="flex justify-center pt-4 md:pt-6">
        {isFirst ? (
          <Link href={`/modul/${slug}/kuis`}>
            <Button
              variant="default"
              size="lg"
              className="!rounded-none px-8 py-4 text-lg font-black uppercase gap-2"
            >
              Kembali
            </Button>
          </Link>
        ) : isLast && allAnswered ? (
          <Link href={`/modul/${slug}/kuis/hasil`}>
            <Button
              variant="default"
              size="lg"
              className="!rounded-none px-8 py-4 text-lg font-black uppercase gap-2"
            >
              Selesai
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className="!rounded-none px-8 py-4 text-lg font-black uppercase"
            disabled
          >
            Jawab semua soal terlebih dahulu
          </Button>
        )}
      </div>
    </div>
  )
}
