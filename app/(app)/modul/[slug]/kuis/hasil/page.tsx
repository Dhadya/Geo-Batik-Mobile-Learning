import { notFound } from "next/navigation"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { QuizBreadcrumb, QuizResult, getQuizModule } from "@/features/quiz"

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

  return (
    <div className="max-w-[96rem] mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizResult
        slug={slug}
        title={quiz.title}
        badge={quiz.badge}
        icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="!text-2xl md:!text-3xl" />}
        bgColor={MODULE_BG[slug] ?? "bg-primary"}
      />
    </div>
  )
}
