import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { getQuizModule, PACKAGE_SIZE } from "@/features/quiz"
import { MODULE_TABS } from "@/features/modules/data"
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
    const tabOrder = MODULE_TABS[slug as keyof typeof MODULE_TABS]?.map((t) => t.value) ?? []
    const tabs = await getTabProgress(session.user.id, slug as "translasi" | "refleksi")
    const sorted = [...tabs].sort((a, b) => tabOrder.indexOf(a.tab) - tabOrder.indexOf(b.tab))
    const allCompleted = sorted.length > 0 && sorted.every((t) => t.completed)

    isLocked = !allCompleted
    if (isLocked) {
      const latestUnlocked = [...sorted].reverse().find((t) => t.unlocked)
      backHref = `/modul/${slug}/${latestUnlocked?.tab ?? sorted[0]?.tab ?? "titik"}`
    }
  } catch {
    // DB unavailable — default to locked state
  }

  return <KuisSoalClient slug={slug} nomor={nomorNum} isLocked={isLocked} backHref={backHref} />
}
