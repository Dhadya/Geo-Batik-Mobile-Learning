import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { Text } from "@/components/retroui/Text"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { QuizBreadcrumb, QuizResult, getQuizModule, getQuizQuestionsByTab } from "@/features/quiz"
import { MODULE_LABELS, MODULE_ICONS, MODULE_BG } from "@/features/modules/data/moduleConfig"
import { getAllQuizResults } from "@/features/modules/services/quiz"
import { getTabProgress } from "@/features/modules/services/progress"
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

  // Fetch all results — attempt 1 score is final, others are practice
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

  // Show specific attempt if ?attempt= provided, otherwise latest
  const targetResult = attemptParam
    ? allResults.find((r) => r.attemptNumber === Number(attemptParam)) ?? allResults[allResults.length - 1]
    : allResults.length > 0
      ? allResults[allResults.length - 1]
      : null

  // Get tabs for per-tab breakdown
  const tabs = await getTabProgress(session.user.id, slug as ModuleSlug)

  // Build per-tab breakdown
  const activeTabs = tabs.length > 0
    ? tabs.map((t) => ({
        tab: t.tab,
        questions: getQuizQuestionsByTab(slug, t.tab),
      })).filter((t) => t.questions.length > 0)
    : []

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizResult
        slug={slug}
        title={quiz.title}
        badge={quiz.badge}
        icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="text-2xl md:text-3xl" />}
        bgColor={MODULE_BG[slug] ?? "bg-primary"}
        serverScore={targetResult?.totalScore ?? null}
        tabBreakdown={activeTabs}
        attemptNumber={targetResult?.attemptNumber ?? null}
        totalAttempts={allResults.length}
      />
    </div>
  )
}
