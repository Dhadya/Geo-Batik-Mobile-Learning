import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getTabProgress } from "@/features/modules/services/progress"
import { ModuleContent } from "@/features/modules"

export default async function ModulTabPage(props: {
  params: Promise<{ slug: string; tab: string }>
}) {
  const { slug, tab } = await props.params

  // Seed tab progress for authenticated users (no redirect — locked tabs show LockOverlay in ModuleContent)
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) {
    await getTabProgress(session.user.id, slug as "translasi" | "refleksi")
  }

  return <ModuleContent slug={slug} tab={tab} />
}
