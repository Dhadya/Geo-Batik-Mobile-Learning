import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { QuizBreadcrumb, QuizResult, getQuizModule, getQuizQuestionsByTab } from "@/features/quiz"
import { getAllQuizResults } from "@/features/modules/services/quiz"
import { getTabProgress } from "@/features/modules/services/progress"
import type { ModuleSlug } from "@/features/modules/types"

const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
}

const MODULE_ICONS: Record<string, string> = {
  translasi: "transform",
  refleksi: "flip",
}

const MODULE_BG: Record<string, string> = {
  translasi: "bg-module-translasi",
  refleksi: "bg-module-refleksi",
}

export default async function KuisHasilPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const quiz = getQuizModule(slug)
  if (!quiz) notFound()

  const label = MODULE_LABELS[slug] ?? slug

  // Fetch all results — attempt 1 score is final, others are practice
  const session = await auth.api.getSession({ headers: await headers() })
  let allResults: Awaited<ReturnType<typeof getAllQuizResults>> = []
  if (session?.user) {
    allResults = await getAllQuizResults(session.user.id, slug as ModuleSlug)
  }

  const latestResult = allResults.length > 0 ? allResults[allResults.length - 1] : null

  // Get tabs for per-tab breakdown
  const tabs = await getTabProgress(session?.user?.id ?? "", slug as ModuleSlug)

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
        icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="text-2xl! md:text-3xl!" />}
        bgColor={MODULE_BG[slug] ?? "bg-primary"}
        serverScore={latestResult?.totalScore ?? null}
        tabBreakdown={activeTabs}
        attemptNumber={latestResult?.attemptNumber ?? null}
        totalAttempts={allResults.length}
      />
    </div>
  )
}
