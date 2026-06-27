import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import type { ReactNode } from "react"

type TabDef = { label: string; value: string }

const MODULE_TABS: Record<string, TabDef[]> = {
  translasi: [
    { label: "TITIK", value: "titik" },
    { label: "GARIS", value: "garis" },
    { label: "BANGUN", value: "bangun" },
  ],
  refleksi: [
    { label: "SUMBU X", value: "sumbu-x" },
    { label: "SUMBU Y", value: "sumbu-y" },
    { label: "GARIS", value: "garis" },
    { label: "BANGUN", value: "bangun" },
  ],
}

export default async function ModulLayout(props: {
  params: Promise<{ slug: string }>
  children: ReactNode
}) {
  const { slug } = await props.params
  const tabs = MODULE_TABS[slug]
  if (!tabs) notFound()

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
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
          <Button variant="outline" size="md">KEMBALI</Button>
        </Link>
        <Link href={`/modul/${slug}/kuis`}>
          <Button variant="default" size="md">KUIS</Button>
        </Link>
      </div>
    </div>
  )
}
