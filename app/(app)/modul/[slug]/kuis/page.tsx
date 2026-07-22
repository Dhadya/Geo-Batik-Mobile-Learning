import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { Text } from "@/components/retroui/Text"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { QuizBreadcrumb, QuizHeader, getQuizModule, PACKAGE_SIZE } from "@/features/quiz"
import { KuisStartButton } from "./KuisStartButton"

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
      redirect(firstIncomplete ? `/modul/${slug}/${firstIncomplete.tab}` : `/modul/${slug}`)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizHeader title={quiz.title} badge={quiz.badge} bgColor={MODULE_BG[slug] ?? "bg-primary"} icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="text-2xl md:text-3xl" />} />

      <section className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-6 md:p-8 space-y-4">
        <Text as="h2" className="text-lg md:text-xl font-black uppercase">
          Petunjuk Kuis
        </Text>
        <ul className="space-y-2 text-sm md:text-base list-disc list-inside">
          <li>
            Kuis terdiri dari <span className="font-bold">{PACKAGE_SIZE} soal per paket</span> dengan berbagai tipe (pilihan ganda, uraian, angka).
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
          <li>
            Hanya <span className="font-bold">percobaan ke-1</span> yang dihitung sebagai nilai final — percobaan berikutnya untuk latihan.
          </li>
        </ul>
      </section>

      <div className="flex justify-center pt-4 md:pt-6">
        <KuisStartButton slug={slug} />
      </div>
    </div>
  )
}
