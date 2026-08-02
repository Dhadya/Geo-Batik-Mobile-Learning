import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { Text } from "@/components/retroui/Text"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { QuizBreadcrumb, QuizResult, getQuizModule } from "@/features/quiz"
import { MODULE_LABELS, MODULE_ICONS, MODULE_BG } from "@/features/modules/data/moduleConfig"
import { getAllQuizResults } from "@/features/modules/services/quiz"
import type { ModuleSlug } from "@/features/modules/types"

export default async function KuisHasilPage(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ attempt?: string }>
}) {
  const { slug } = await props.params
  const { attempt: attemptParam } = await props.searchParams
  const quiz = getQuizModule(slug)
  if (!quiz) notFound()

  const label = MODULE_LABELS[slug] ?? slug

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return (
      <div className="space-y-4 md:space-y-6">
        <Text>Silakan masuk terlebih dahulu untuk melihat hasil.</Text>
      </div>
    )
  }

  let allResults: Awaited<ReturnType<typeof getAllQuizResults>> = []
  allResults = await getAllQuizResults(session.user.id, slug as ModuleSlug)

  const targetResult = attemptParam
    ? allResults.find((r) => r.attemptNumber === Number(attemptParam)) ?? allResults[allResults.length - 1]
    : allResults.length > 0
      ? allResults[allResults.length - 1]
      : null

  // Convert stored answers array to QuizAnswers record for pembahasan
  const serverAnswers: Record<number, number> = {}
  if (targetResult?.answers && Array.isArray(targetResult.answers)) {
    for (const entry of targetResult.answers as { questionId: number; answer: number }[]) {
      serverAnswers[entry.questionId] = entry.answer
    }
  }

  const activeItem = attemptParam
    ? `Hasil ${attemptParam}`
    : allResults.length > 0
      ? "Hasil Terakhir"
      : undefined

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} activeItem={activeItem} />

      <QuizResult
        slug={slug}
        title={quiz.title}
        icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="text-2xl md:text-3xl" />}
        bgColor={MODULE_BG[slug] ?? "bg-primary"}
        serverScore={targetResult?.totalScore ?? null}
        serverAnswers={Object.keys(serverAnswers).length > 0 ? serverAnswers : undefined}
        attemptNumber={targetResult?.attemptNumber ?? null}
        totalAttempts={allResults.length}
      />
    </div>
  )
}
