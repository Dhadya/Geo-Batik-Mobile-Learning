import { notFound } from "next/navigation"
import { MODULE_TABS } from "@/features/modules"
import type { ReactNode } from "react"

export default async function ModulLayout(props: {
  params: Promise<{ slug: string }>
  children: ReactNode
}) {
  const { slug } = await props.params
  const tabs = MODULE_TABS[slug as keyof typeof MODULE_TABS]
  if (!tabs) notFound()

  return (
    <div className="max-w-[96rem] mx-auto p-4 md:p-6 space-y-6">
      {props.children}
    </div>
  )
}
