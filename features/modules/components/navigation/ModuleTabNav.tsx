"use client"

import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { cn } from "@/lib/utils"
import type { ModuleTab } from "../../types"

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
    <section className="flex flex-wrap gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-4 pr-1 md:pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">{/* Scrollable tab bar */}
      {tabs.map((t) => (
        <Link key={t.value} href={`/modul/${slug}/${t.value}`} className="flex-1 min-w-fit">
          <Button
            variant={t.value === currentTab ? "default" : "outline"}
            size="sm"
            className={cn(
              "font-bold uppercase whitespace-nowrap w-full text-xs md:text-sm lg:text-base p-1.5 md:p-3",
              t.value !== currentTab && "bg-white!"
            )}
          >
            {slug === "translasi" ? `TRANSLASI ${t.label}` : t.label}
          </Button>
        </Link>
      ))}
    </section>
  )
}
