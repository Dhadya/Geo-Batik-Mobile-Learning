import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { ArrowRight } from "lucide-react"
import { QuizBreadcrumb, QuizHeader, getQuizModule } from "@/features/quiz"

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

export default async function KuisIntroPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const quiz = getQuizModule(slug)
  if (!quiz) notFound()

  const label = MODULE_LABELS[slug] ?? slug

  // Enforce quiz access guard: all tabs must be completed
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) {
    const tabs = await getTabProgress(session.user.id, slug as "translasi" | "refleksi")
    const allCompleted = tabs.length > 0 && tabs.every((t) => t.completed)

    if (!allCompleted) {
      const firstIncomplete = tabs.find((t) => !t.completed)
      if (firstIncomplete) {
        redirect(`/modul/${slug}/${firstIncomplete.tab}`)
      }
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizHeader title={quiz.title} badge={quiz.badge} bgColor={MODULE_BG[slug] ?? "bg-primary"} icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="text-2xl md:text-3xl" />} />

      <section className="border-4 border-black bg-white shadow-lg p-6 md:p-8 space-y-4">
        <Text as="h2" className="text-lg md:text-xl font-black uppercase">
          Petunjuk Kuis
        </Text>
        <ul className="space-y-2 text-sm md:text-base list-disc list-inside">
          <li>
            Kuis ini terdiri dari <span className="font-bold">{quiz.questions.length} soal</span> dengan berbagai tipe (pilihan ganda, uraian, angka).
          </li>
          <li>
            Setiap soal memiliki <span className="font-bold">2 kesempatan</span> menjawab.
          </li>
          <li>
            Pada kesempatan pertama, kamu akan mendapat petunjuk jika jawaban kurang tepat.
          </li>
          <li>
            Pada kesempatan kedua, kamu akan mendapat feedback lengkap dan nilai akhir.
          </li>
          <li>
            Jawaban akan dinilai oleh <span className="font-bold">AI</span> secara otomatis.
          </li>
        </ul>
      </section>

      <div className="flex justify-center pt-4 md:pt-6">
        <Link href={`/modul/${slug}/kuis/1`}>
          <Button
            variant="default"
            size="lg"
            className="px-10 md:px-16 py-5 md:py-8 text-xl md:text-2xl font-black uppercase gap-4 md:gap-5"
          >
            Mulai Kuis
            <ArrowRight className="size-7 md:size-8" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
