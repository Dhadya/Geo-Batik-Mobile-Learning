import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { getQuizModule } from "@/features/quiz"
import { KuisSoalClient } from "./client"

export default async function KuisSoalPage(props: {
  params: Promise<{ slug: string; nomor: string }>
}) {
  const { slug, nomor } = await props.params
  const nomorNum = Number.parseInt(nomor)
  if (Number.isNaN(nomorNum) || nomorNum < 1) notFound()

  const quiz = getQuizModule(slug)
  if (!quiz) notFound()
  if (nomorNum > quiz.questions.length) notFound()

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

  return <KuisSoalClient slug={slug} nomor={nomorNum} />
}
