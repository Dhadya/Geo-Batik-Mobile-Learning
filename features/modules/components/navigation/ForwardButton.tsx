"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { useQuizStatus } from "@/features/modules/hooks/useQuizStatus"

/** Forward button: shows "MATERI SELANJUTNYA" (non-last tab) or "KERJAKAN KUIS"/"ULANGI KUIS" (last tab). Blocks navigation if sections incomplete. */
export function ForwardButton({
  slug,
  tab,
  tabs,
  completedCount,
  activeSections,
}: {
  slug: string
  tab: string
  tabs: { label: string; value: string }[]
  completedCount: number
  activeSections: readonly string[]
}) {
  const router = useRouter()
  const isLastTab = tabs[tabs.length - 1].value === tab
  const allDone = completedCount === activeSections.length
  const { data: quizStatus } = useQuizStatus(slug)

  const handleClick = () => {
    if (!allDone) {
      toast.warning(`Selesaikan semua bagian (${completedCount}/${activeSections.length}) terlebih dahulu`)
      return
    }
    if (isLastTab) {
      router.push(`/modul/${slug}/kuis`)
    } else {
      const currentIndex = tabs.findIndex((t) => t.value === tab)
      const nextTab = tabs[currentIndex + 1]
      if (nextTab) router.push(`/modul/${slug}/${nextTab.value}`)
    }
  }

  const buttonLabel = isLastTab
    ? quizStatus?.hasAttempt
      ? "ULANGI KUIS"
      : "KERJAKAN KUIS"
    : "MATERI SELANJUTNYA"

  return (
    <Button
      variant="default"
      size="lg"
      className="px-4 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black uppercase gap-1.5 md:gap-2"
      onClick={handleClick}
    >
      {buttonLabel}
      <MaterialIcon className="size-4 md:size-6" name="arrow_forward" />
    </Button>
  )
}
