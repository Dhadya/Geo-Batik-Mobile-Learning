import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { QuizBreadcrumb, QuizHeader } from "@/features/quiz"
import { getQuizModule } from "@/features/quiz"

const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
}

export default async function KuisIntroPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const quiz = getQuizModule(slug)
  if (!quiz) notFound()

  const label = MODULE_LABELS[slug] ?? slug

  return (
    <div className="max-w-[96rem] mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizHeader title={quiz.title} badge={quiz.badge} />

      <section className="border-4 border-black bg-white shadow-lg p-6 md:p-8 space-y-4">
        <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
          Petunjuk Kuis
        </Text>
        <div className="space-y-2 text-sm md:text-base">
          <Text as="p">
            Kuis ini terdiri dari <span className="font-bold">{quiz.questions.length} soal</span> pilihan ganda.
          </Text>
          <Text as="p">
            Pilih satu jawaban yang paling tepat untuk setiap soal.
          </Text>
          <Text as="p">
            Jawaban akan ditandai <span className="font-bold">&quot;Dipilih&quot;</span> saat kamu memilihnya.
          </Text>
          <Text as="p">
            Setelah menjawab semua soal, tombol <span className="font-bold">&quot;Selesai&quot;</span> akan muncul.
          </Text>
        </div>
      </section>

      <div className="flex justify-between">
        <Link href={`/modul/${slug}`}>
          <Button variant="outline" size="lg" className="!rounded-none">
            Kembali
          </Button>
        </Link>
        <Link href={`/modul/${slug}/kuis/1`}>
          <Button variant="default" size="lg" className="!rounded-none">
            Mulai Kuis
          </Button>
        </Link>
      </div>
    </div>
  )
}
