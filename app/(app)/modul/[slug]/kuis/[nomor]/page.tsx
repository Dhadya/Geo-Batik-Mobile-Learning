import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { getQuizModule, PACKAGE_SIZE } from "@/features/quiz"
import { KuisSoalClient } from "./client"

export default async function KuisSoalPage(props: {
  params: Promise<{ slug: string; nomor: string }>
}) {
  const { slug, nomor } = await props.params
  const nomorNum = Number.parseInt(nomor)
  if (Number.isNaN(nomorNum) || nomorNum < 1) notFound()

  const quiz = getQuizModule(slug)
  if (!quiz) notFound()
  if (nomorNum > PACKAGE_SIZE) notFound()

  // Enforce quiz access guard: all tabs must be completed
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect("/login")
  }

  let isLocked = true
  let backHref = `/modul/${slug}/titik`

  try {
    const tabs = await getTabProgress(session.user.id, slug as "translasi" | "refleksi")
    const allCompleted = tabs.length > 0 && tabs.every((t) => t.completed)

    isLocked = !allCompleted
    if (isLocked) {
      const latestUnlocked = [...tabs].reverse().find((t) => t.unlocked)
      backHref = `/modul/${slug}/${latestUnlocked?.tab ?? tabs[0]?.tab ?? "titik"}`
    }
  } catch {
    // DB unavailable — default to locked state
  }

  return <KuisSoalClient slug={slug} nomor={nomorNum} isLocked={isLocked} backHref={backHref} />
}
