import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { MODULE_TABS, ProgressSyncWrapper } from "@/features/modules"
import { getTabProgress } from "@/features/modules/services/progress"
import { RefleksiLockGuard } from "@/features/modules/components/RefleksiLockGuard"
import type { ReactNode } from "react"

export default async function ModulLayout(props: {
  params: Promise<{ slug: string }>
  children: ReactNode
}) {
  const { slug } = await props.params
  const tabs = MODULE_TABS[slug as keyof typeof MODULE_TABS]
  if (!tabs) notFound()

  const session = await auth.api.getSession({ headers: await headers() })
  let serverProgress = null
  if (session?.user?.id) {
    try {
      serverProgress = await getTabProgress(session.user.id, slug as keyof typeof MODULE_TABS)
    } catch {
      serverProgress = null
    }
  }

  const content = (
    <ProgressSyncWrapper slug={slug} serverProgress={serverProgress}>
      <div className="max-w-384 mx-auto px-4 md:px-12 py-6 md:py-8 space-y-6">
        {props.children}
      </div>
    </ProgressSyncWrapper>
  )

  return slug === "refleksi" ? (
    <RefleksiLockGuard>{content}</RefleksiLockGuard>
  ) : (
    content
  )
}
