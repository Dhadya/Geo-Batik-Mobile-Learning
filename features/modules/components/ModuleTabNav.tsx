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
    <section className="flex flex-wrap gap-2 overflow-x-auto pb-2">
      {tabs.map((t) => (
        <Link key={t.value} href={`/modul/${slug}/${t.value}`}>
          <Button
            variant={t.value === currentTab ? "default" : "outline"}
            size="md"
            className="!rounded-none font-bold uppercase whitespace-nowrap"
          >
            {t.label}
          </Button>
        </Link>
      ))}
    </section>
  )
}
