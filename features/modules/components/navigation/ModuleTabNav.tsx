"use client"

import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { cn } from "@/lib/utils"
import type { ModuleTab } from "../../types"
import { useTabProgressStore } from "../../store/tabProgressStore"
import { MaterialIcon } from "@/components/common/MaterialIcon"

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
  const progressMap = useTabProgressStore((s) => s.progress[slug])
  const progress = progressMap ?? []

  return (
    <section className="flex flex-wrap gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-4 pr-1 md:pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">{/* Scrollable tab bar */}
      {tabs.map((t, idx) => {
        const tabProgress = progress.find((p) => p.tab === t.value)
        const unlocked = tabProgress ? tabProgress.unlocked : (idx === 0)
        const completed = tabProgress?.completed ?? false

        if (!unlocked) {
          return (
            <div key={t.value} className="flex-1 min-w-fit" title="Selesaikan tab sebelumnya terlebih dahulu">
              <Button
                variant="outline"
                disabled
                size="sm"
                className="opacity-40 cursor-not-allowed font-bold uppercase whitespace-nowrap w-full text-xs md:text-sm lg:text-base p-1.5 md:p-3 bg-white flex items-center justify-center gap-1 md:gap-1.5"
              >
                <MaterialIcon className="size-5" name="lock" />
                {slug === "translasi" ? `TRANSLASI ${t.label}` : t.label}
              </Button>
            </div>
          )
        }

        return (
          <Link key={t.value} href={`/modul/${slug}/${t.value}`} className="flex-1 min-w-fit">
            <Button
              variant={t.value === currentTab ? "default" : "outline"}
              size="sm"
              className={cn(
                "font-bold uppercase whitespace-nowrap w-full text-xs md:text-sm lg:text-base p-1.5 md:p-3 flex items-center justify-center gap-1 md:gap-1.5",
                t.value !== currentTab && "bg-white"
              )}
            >
              <span>{slug === "translasi" ? `TRANSLASI ${t.label}` : t.label}</span>
              {completed && <MaterialIcon className="size-5" name="check" />}
            </Button>
          </Link>
        )
      })}
    </section>
  )
}
