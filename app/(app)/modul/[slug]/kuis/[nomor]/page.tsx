import { notFound } from "next/navigation"
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

  return <KuisSoalClient slug={slug} nomor={nomorNum} />
}
