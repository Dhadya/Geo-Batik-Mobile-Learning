"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Card } from "@/components/retroui/Card"
import { Text } from "@/components/retroui/Text"
import { Dialog } from "@/components/retroui/Dialog"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { MODULE_LABELS } from "@/features/modules/data/moduleConfig"
import { Skeleton } from "@/components/retroui/Skeleton"
import { toast } from "sonner"
import {
  QuizBreadcrumb,
  NumberIndicator,
  QuestionRenderer,
  QuizArrowNav,
  QuizArrowNext,
  useQuiz,
  useQuizStore,
} from "@/features/quiz"
import { useQuizSubmit } from "./useQuizSubmit"
import { LockOverlay } from "@/features/modules/components/LockOverlay"

/** Client-side quiz question page — user selects answer and navigates forward. Pembahasan shown only on result page after submit. */
export function KuisSoalClient({
  slug,
  nomor,
  isLocked = false,
  backHref = "",
}: {
  slug: string
  nomor: number
  isLocked?: boolean
  backHref?: string
}) {
  const router = useRouter()
  const sessionStarted = useQuizStore((s) => s.sessionStarted)
  const [dialogOpen, setDialogOpen] = useState(false)
  const submittingRef = useRef(false)

  const {
    quiz,
    question,
    total,
    selectedOption,
    isLast,
    isFirst,
    answers,
    selectAnswer,
  } = useQuiz(slug, nomor)

  const submittedAnswers = useQuizStore((s) => s.submittedAnswers)

  // Redirect to hasil if answers were already submitted (browser back from hasil page)
  // Redirect to intro if user navigated directly without starting a quiz session
  useEffect(() => {
    if (Object.keys(submittedAnswers).length > 0 && Object.keys(answers).length === 0) {
      router.replace(`/modul/${slug}/kuis/hasil`)
    } else if (!sessionStarted) {
      router.replace(`/modul/${slug}/kuis`)
    }
  }, [sessionStarted, slug, router, submittedAnswers, answers])

  const { handleSelesai, isSubmitting } = useQuizSubmit(slug)

  // Reset submittingRef when mutation completes (success or error), allowing retry
  useEffect(() => {
    if (!isSubmitting) {
      submittingRef.current = false
    }
  }, [isSubmitting])

  const handleNumberSelect = useCallback(
    (n: number) => router.push(`/modul/${slug}/kuis/${n}`),
    [slug, router],
  )

  const handleSubmitClick = useCallback(() => {
    // Check all questions answered
    const answeredCount = Object.keys(answers).length
    if (total > 0 && answeredCount < total) {
      toast.warning(`Kamu baru menjawab ${answeredCount} dari ${total} soal. Jawab semua soal terlebih dahulu.`)
      return
    }
    // Show confirmation dialog
    setDialogOpen(true)
  }, [answers, total])

  const handleConfirmSubmit = useCallback(() => {
    if (submittingRef.current) return
    submittingRef.current = true
    setDialogOpen(false)
    handleSelesai()
  }, [handleSelesai])

  if (!sessionStarted) {
    return (
      <div className="max-w-384 mx-auto space-y-4 md:space-y-6 pt-6 md:pt-8 px-4 md:px-12">
        <Skeleton className="h-8 md:h-10 w-48" />
        <Skeleton className="h-20 md:h-24 w-full border-4 border-black" />
        <Skeleton className="h-96 w-full border-4 border-black" />
      </div>
    )
  }

  if (!quiz || !question) {
    return (
      <div className="max-w-384 mx-auto space-y-4 md:space-y-6">
        <Text>Soal tidak ditemukan.</Text>
      </div>
    )
  }

  const answeredIds = total > 0
    ? Array.from({ length: total }, (_, i) => i + 1).filter(
        (n) => answers[n] !== undefined,
      )
    : []

  const label = MODULE_LABELS[slug] ?? slug

  return (
    <div className="relative max-w-384 mx-auto space-y-4 md:space-y-6">
      {isLocked && (
        <LockOverlay
          title="Kuis Belum Terbuka"
          description="Selesaikan semua materi terlebih dahulu sebelum mengerjakan kuis."
          fullScreen
          backHref={backHref}
        />
      )}

      <QuizBreadcrumb slug={slug} label={label} />

      <div className="bg-surface-container-high border-4 border-black shadow-[4px_4px_0_0_black]">
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
            <Card className="w-full border-4 border-black shadow-[4px_4px_0_0_black]">
              <Card.Content className="space-y-4 md:space-y-6">
                <div className="font-semibold text-sm md:text-base">
                  <Text as="p" className="inline">
                    {question.question}
                  </Text>
                  {"questionMatrix" in question && question.questionMatrix && (
                    <span className="inline-flex items-center gap-0.5 mx-1 align-middle">
                      <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                      <span className="flex flex-col items-center gap-0 md:gap-0.5 text-xs md:text-sm font-black align-middle">
                        {question.questionMatrix.split(",").map((part, i) => (
                          <span key={i} className="leading-none text-center">{part}</span>
                        ))}
                      </span>
                      <span className="text-lg md:text-xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                    </span>
                  )}
                  {"questionSuffix" in question && question.questionSuffix && (
                    <span> {question.questionSuffix}</span>
                  )}
                </div>

                <QuestionRenderer
                  question={question}
                  selectedAnswer={selectedOption}
                  disabled={false}
                  onAnswer={(answer) => selectAnswer(question.id, answer)}
                />
              </Card.Content>
            </Card>
          </div>

          <div className="hidden md:flex items-center justify-center mx-3 md:mx-4">
            <QuizArrowNext slug={slug} isLast={isLast} current={nomor} />
          </div>
        </div>

        <div className="flex md:hidden justify-between items-center mx-3 md:mx-4 p-4">
          <QuizArrowNav slug={slug} isFirst={isFirst} current={nomor} />
          <QuizArrowNext slug={slug} isLast={isLast} current={nomor} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4 md:pt-6">
        {/* Lanjut — next question */}
        {!isLast && (
          <span title={selectedOption === undefined ? "Pilih jawaban terlebih dahulu" : undefined}>
            <Button
              variant="default"
              size="lg"
              className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black uppercase gap-1.5 md:gap-2"
              disabled={selectedOption === undefined}
              onClick={() => router.push(`/modul/${slug}/kuis/${nomor + 1}`)}
            >
              Lanjut
              <MaterialIcon className="size-6" name="arrow_forward" />
            </Button>
          </span>
        )}

        {/* Selesai — show confirmation before submit */}
        {isLast && (
          <span title={selectedOption === undefined ? "Pilih jawaban terlebih dahulu" : undefined}>
            <Button
              variant="default"
              size="lg"
              className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black uppercase gap-1.5 md:gap-2"
              disabled={selectedOption === undefined || isSubmitting}
              onClick={handleSubmitClick}
            >
              {isSubmitting ? "Menyimpan..." : "Selesai"}
              <MaterialIcon className="size-6" name="check_circle" />
            </Button>
          </span>
        )}

        {/* Kembali — only shown on first question */}
        {isFirst && (
          <Link href={`/modul/${slug}/kuis`}>
            <Button
              variant="default"
              size="lg"
              className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black uppercase gap-1.5 md:gap-2"
            >
              Kembali
            </Button>
          </Link>
        )}
      </div>

      {/* Confirmation dialog before submit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Content size="sm">
          <Dialog.Header asChild>
            <div className="flex items-center justify-between border-b-2 px-3 md:px-4 min-h-10 md:min-h-12 bg-primary text-primary-foreground">
              <span className="font-black uppercase text-xs md:text-sm">Kirim Jawaban</span>
            </div>
          </Dialog.Header>
          <div className="p-4 md:p-6 space-y-2">
            <p className="font-semibold text-sm md:text-base">
              Yakin ingin mengirimkan jawaban?
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              {Object.keys(answers).length}/{total} soal telah dijawab.
            </p>
          </div>
          <Dialog.Footer>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDialogOpen(false)}
              className="shadow-[2px_2px_0_0_black] uppercase font-bold text-xs md:text-sm"
            >
              Batal
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleConfirmSubmit}
              className="shadow-[2px_2px_0_0_black] uppercase font-bold text-xs md:text-sm"
            >
              Kirim
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}
