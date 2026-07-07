import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Card } from "@/components/retroui/Card"
import { Progress } from "@/components/retroui/Progress"
import { QuizBreadcrumb, QuizHeader, getQuizModule } from "@/features/quiz"

const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
}

export default async function KuisHasilPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const quiz = getQuizModule(slug)
  if (!quiz) notFound()

  const label = MODULE_LABELS[slug] ?? slug

  return (
    <div className="max-w-[96rem] mx-auto px-4 md:px-6 pb-4 md:pb-6 pt-2 md:pt-3 space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} />

      <QuizHeader title={quiz.title} badge={quiz.badge} />

      <Card className="w-full border-4 border-black shadow-lg">
        <Card.Header className="bg-primary-container border-b-4 border-black">
          <Card.Title>Skor Anda</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4 p-6">
          <Progress value={0} className="w-full" />
          <Text as="p" className="text-sm md:text-base font-medium">
            Skor akan ditampilkan setelah kuis diselesaikan.
          </Text>
          <Text as="p" className="text-xs md:text-sm text-muted-foreground">
            Pembahasan setiap soal akan tersedia di sini.
          </Text>
        </Card.Content>
      </Card>

      <div className="flex justify-between">
        <Link href={`/modul/${slug}/kuis/1`}>
          <Button variant="outline" size="lg" className="!rounded-none">
            Ulangi
          </Button>
        </Link>
        <Link href="/menu">
          <Button variant="default" size="lg" className="!rounded-none">
            Kembali ke Menu
          </Button>
        </Link>
      </div>
    </div>
  )
}
