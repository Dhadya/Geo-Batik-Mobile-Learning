import { notFound } from "next/navigation"
import { MODULE_TABS, ProgressSyncWrapper } from "@/features/modules"
import type { ReactNode } from "react"

export default async function ModulLayout(props: {
  params: Promise<{ slug: string }>
  children: ReactNode
}) {
  const { slug } = await props.params
  const tabs = MODULE_TABS[slug as keyof typeof MODULE_TABS]
  if (!tabs) notFound()

  return (
    <ProgressSyncWrapper slug={slug}>
      <div className="max-w-384 mx-auto px-4 md:px-12 py-6 md:py-8 space-y-6">
        {props.children}
      </div>
    </ProgressSyncWrapper>
  )
}
