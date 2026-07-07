import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
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
    <div className="max-w-8xlxl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap gap-2 border-b-4 border-black pb-2">
        {tabs.map((t) => (
          <Link
            key={t.value}
            href={`/modul/${slug}/${t.value}`}
            className="px-4 py-2 border-2 border-black text-sm font-bold uppercase bg-card hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {t.label}
          </Link>
        ))}
      </div>
      {props.children}
      <div className="flex justify-between pt-4 border-t-2 border-black">
        <Link href={`/apersepsi/${slug}`}>
          <Button variant="outline" size="md">
            KEMBALI
          </Button>
        </Link>
        <Link href={`/modul/${slug}/kuis`}>
          <Button variant="default" size="md">
            KUIS
          </Button>
        </Link>
      </div>
    </div>
  )
}
