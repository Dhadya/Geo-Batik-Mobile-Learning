import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { MODULE_TABS } from "@/features/modules/data"
import { ModuleContent } from "@/features/modules"

export default async function ModulTabPage(props: {
  params: Promise<{ slug: string; tab: string }>
}) {
  const { slug, tab } = await props.params
  const decodedTab = decodeURIComponent(tab)

  // Only enforce tab locking for authenticated users
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) {
    const progress = await getTabProgress(session.user.id, slug as "translasi" | "refleksi")
    const tabProg = progress.find((p) => p.tab === decodedTab)
    if (tabProg && !tabProg.unlocked) {
      const tabs = MODULE_TABS[slug as "translasi" | "refleksi"] ?? []
      const firstUnlocked = progress.find((p) => p.unlocked) ?? { tab: tabs[0]?.value ?? "" }
      redirect(firstUnlocked.tab ? `/modul/${slug}/${firstUnlocked.tab}` : `/modul/${slug}`)
    }
  }

  return <ModuleContent slug={slug} tab={tab} />
}
