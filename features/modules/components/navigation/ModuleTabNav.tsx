"use client"

import { useRouter } from "next/navigation"
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
  const router = useRouter()
  const progressMap = useTabProgressStore((s) => s.progress[slug])
  const progress = progressMap ?? []

  const handleTabClick = (tabValue: string) => {
    router.push(`/modul/${slug}/${tabValue}`)
  }

  return (
    <section className="flex flex-wrap gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-4 pr-1 md:pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      {tabs.map((t, idx) => {
        const tabProgress = progress.find((p) => p.tab === t.value)
        const unlocked = tabProgress ? tabProgress.unlocked : (idx === 0)
        const completed = tabProgress?.completed ?? false

        return (
          <Button
            key={t.value}
            variant={t.value === currentTab ? "default" : "outline"}
            size="sm"
            className={cn(
              "font-bold uppercase whitespace-nowrap flex-1 min-w-fit text-xs md:text-sm lg:text-base p-1.5 md:p-3 flex items-center justify-center gap-1 md:gap-1.5",
              t.value !== currentTab && "bg-white",
            )}
            onClick={() => handleTabClick(t.value)}
          >
            {!unlocked && <MaterialIcon className="size-5" name="lock" />}
            <span>{slug === "translasi" ? `TRANSLASI ${t.label}` : t.label}</span>
            {completed && <MaterialIcon className="size-5" name="check" />}
          </Button>
        )
      })}
    </section>
  )
}
