import { notFound } from "next/navigation"
import Link from "next/link"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { getAllQuizResults } from "@/features/modules/services/quiz"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { QuizBreadcrumb, QuizHeader, getQuizModule, PACKAGE_SIZE } from "@/features/quiz"
import { KuisStartButton } from "./KuisStartButton"
import { LockOverlay } from "@/features/modules/components/LockOverlay"
import { getScoreConfig } from "@/features/modules/lib/scoreColors"
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
      return (
        <LockOverlay
          title="Kuis Belum Terbuka"
          description="Selesaikan semua materi terlebih dahulu sebelum mengerjakan kuis."
        />
      )
    }
  }

  // Fetch past attempt history
  const allResults = session?.user
    ? await getAllQuizResults(session.user.id, slug as ModuleSlug)
    : []

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizHeader title={quiz.title} badge={quiz.badge} bgColor={MODULE_BG[slug] ?? "bg-primary"} icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="text-2xl md:text-3xl" />} />

      {allResults.length > 0 && (
        <section className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-6 space-y-3">
          <Text as="h2" className="text-base md:text-lg font-black uppercase">
            Riwayat Percobaan
          </Text>
          <div className="space-y-2">
            {allResults.map((r) => {
              const config = getScoreConfig(r.totalScore)
              return (
                <div key={r.attemptNumber} className="flex items-center justify-between border-4 border-black p-2 md:p-3">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block size-3 md:size-4 rounded-full ${config.bgClass} border-2 border-black shrink-0`} />
                    <span className="font-bold text-xs md:text-sm uppercase">
                      Percobaan Ke-{r.attemptNumber}
                    </span>
                    <span className="font-black text-xs md:text-sm">
                      {r.totalScore}/100
                    </span>
                    {r.attemptNumber === 1 && (
                      <span className="text-[10px] md:text-xs bg-secondary text-white px-1.5 py-0.5 font-bold uppercase">
                        Nilai Akhir
                      </span>
                    )}
                  </div>
                  <Link href={`/modul/${slug}/kuis/hasil?attempt=${r.attemptNumber}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-bold uppercase text-xs gap-1 shadow-[2px_2px_0_0_black]"
                    >
                      Lihat Detail
                      <MaterialIcon className="size-3.5" name="arrow_forward" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      )}

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
