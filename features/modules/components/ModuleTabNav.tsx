"use client"

import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import type { ModuleTab } from "../types"

/** Horizontal scrollable tab bar for navigating module sub-sections. */
export function ModuleTabNav({
  slug,
  tabs,
  currentTab,
}: {
  slug: string
  tabs: ModuleTab[]
  currentTab: string
}) {
  return (
    <section className="flex flex-wrap gap-2 overflow-x-auto pb-4 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      {tabs.map((t) => (
        <Link key={t.value} href={`/modul/${slug}/${t.value}`} className="flex-1 min-w-fit">
          <Button
            variant={t.value === currentTab ? "default" : "outline"}
            size="lg"
            className="rounded-none! font-bold uppercase whitespace-nowrap w-full"
          >
            {slug === "translasi" ? `TRANSLASI ${t.label}` : t.label}
          </Button>
        </Link>
      ))}
    </section>
  )
}
