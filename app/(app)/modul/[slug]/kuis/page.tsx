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
import { MODULE_LABELS, MODULE_ICONS, MODULE_BG } from "@/features/modules/data/moduleConfig"
import { KuisStartButton } from "./KuisStartButton"
import { LockOverlay } from "@/features/modules/components/LockOverlay"
import { getScoreConfig } from "@/features/modules/lib/scoreColors"
import type { ModuleSlug } from "@/features/modules/types"

export default async function KuisIntroPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const quiz = getQuizModule(slug)
  if (!quiz) notFound()

  const label = MODULE_LABELS[slug] ?? slug

  // Enforce quiz access guard: all tabs must be completed
  const session = await auth.api.getSession({ headers: await headers() })
  let isLocked = false
  let backHref = ""

  if (session?.user) {
    try {
      const tabs = await getTabProgress(session.user.id, slug as "translasi" | "refleksi")
      const allCompleted = tabs.length > 0 && tabs.every((t) => t.completed)

      if (!allCompleted) {
        isLocked = true
        const latestUnlocked = [...tabs].reverse().find((t) => t.unlocked)
        backHref = `/modul/${slug}/${latestUnlocked?.tab ?? tabs[0]?.tab ?? "titik"}`
      }
    } catch {
      isLocked = true
      backHref = `/modul/${slug}/titik`
    }
  }

  // Fetch past attempt history
  const allResults = session?.user
    ? await getAllQuizResults(session.user.id, slug as ModuleSlug)
    : []

  return (
    <div className="relative space-y-4 md:space-y-6">
      {isLocked && (
        <LockOverlay
          title="Kuis Belum Terbuka"
          description="Selesaikan semua materi terlebih dahulu sebelum mengerjakan kuis."
          fullScreen
          backHref={backHref}
        />
      )}

      <QuizBreadcrumb slug={slug} label={label} />

      <QuizHeader title={quiz.title} badge={quiz.badge} bgColor={MODULE_BG[slug] ?? "bg-primary"} icon={<MaterialIcon name={MODULE_ICONS[slug] ?? "quiz"} className="text-2xl md:text-3xl" />} />

      <section className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-6 md:p-8 space-y-4">
        <Text as="h2" className="text-lg md:text-xl font-black uppercase">
          Petunjuk Kuis
        </Text>
        <ul className="space-y-2 text-sm md:text-base list-disc list-inside">
          <li>
            Kuis terdiri dari <span className="font-bold">{PACKAGE_SIZE} soal pilihan ganda</span> per paket.
          </li>
          <li>
            Pilih jawaban untuk setiap soal, lalu klik <span className="font-bold">Lanjut</span> ke soal berikutnya.
          </li>
          <li>
            Pada soal terakhir, klik <span className="font-bold">Selesai</span> untuk mengirim semua jawaban.
          </li>
          <li>
            Hasil dan pembahasan akan ditampilkan setelah semua jawaban dikirim.
          </li>
          <li>
            Hanya <span className="font-bold">percobaan ke-1</span> yang dihitung sebagai nilai final — percobaan berikutnya untuk latihan.
          </li>
        </ul>
      </section>

      {allResults.length > 0 && (
        <section className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-6 space-y-3">
          <Text as="h2" className="text-base md:text-lg font-black uppercase">
            Riwayat Percobaan ({allResults.length})
          </Text>
          <div className="space-y-2">
            {allResults.slice(-5).reverse().map((r) => {
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
          {allResults.length > 5 && (
            <Text className="text-xs md:text-sm text-muted-foreground text-center pt-1">
              Menampilkan 5 percobaan terakhir dari total {allResults.length}.
            </Text>
          )}
        </section>
      )}

      <div className="flex justify-center pt-4 md:pt-6">
        <KuisStartButton slug={slug} />
      </div>
    </div>
  )
}
