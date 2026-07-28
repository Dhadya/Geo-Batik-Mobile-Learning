"use client"

import { handleAuthError } from "@/lib/api/auth-error"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useQuizStore } from "@/features/quiz"
import { getQuizModule } from "@/features/quiz"

const PACKAGE_SIZE = 10

/**
 * Orchestrates all-answers submission for the entire quiz when the user presses "Selesai".
 * Takes answers directly from the component (reactive) to avoid store rehydration race conditions.
 */
export function useQuizSubmit(slug: string) {
  const submitMutation = useMutation({
    mutationFn: async (input: {
      answers: { questionId: number; answer: number; isCorrect: boolean }[]
      totalScore: number
      attemptNumber: number
      packageId: number
    }) => {
      const response = await fetch(`/api/modul/${slug}/quiz/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal menyimpan kuis")
      return body.data
    },
  })
  const router = useRouter()

  const handleSelesai = (currentAnswers: Record<number, number>) => {
    const store = useQuizStore.getState()
    const quiz = getQuizModule(slug)
    if (!quiz) return

    const currentPackage = store.currentPackage
    if (currentPackage < 0 || currentPackage > 1) {
      toast.error("Data paket soal tidak valid, silakan mulai kuis dari awal")
      return
    }

    const packageQuestions = quiz.questions.slice(
      currentPackage * PACKAGE_SIZE,
      currentPackage * PACKAGE_SIZE + PACKAGE_SIZE,
    )

    if (packageQuestions.length !== PACKAGE_SIZE) {
      toast.error("Data soal tidak lengkap, silakan mulai kuis dari awal")
      return
    }

    // Use the component-provided answers (safe from rehydration races)
    const allAnswers = packageQuestions.map((q) => ({
      questionId: q.id,
      answer: currentAnswers[q.id] ?? -1,
      isCorrect: currentAnswers[q.id] === q.correctIndex,
    }))

    const totalScore = Math.round(
      (allAnswers.filter((a) => a.isCorrect).length / Math.max(allAnswers.length, 1)) * 100,
    )

    const { attemptNumber } = store

    submitMutation.mutate(
      {
        answers: allAnswers,
        totalScore,
        attemptNumber,
        packageId: currentPackage,
      },
      {
        onSuccess: () => {
          useQuizStore.getState().submitAnswers()
          router.push(`/modul/${slug}/kuis/hasil`)
        },
        onError: (err) => {
          handleAuthError(err)
          toast.error(err.message || "Gagal menyimpan kuis, silakan coba lagi")
        },
      },
    )
  }

  return { handleSelesai, isSubmitting: submitMutation.isPending }
}
