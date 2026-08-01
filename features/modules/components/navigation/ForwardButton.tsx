"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"

/** Human-readable labels for section keys, shown in the block toast message. */
const SECTION_LABELS: Record<string, string> = {
  pengamatan: "Pengamatan",
  percobaan: "Percobaan",
  penyimpulan: "Penyimpulan",
  cekPemahaman: "Cek Pemahaman",
}

/** Join a list into Indonesian phrasing: "Pengamatan dan Percobaan" or "Pengamatan, Percobaan, dan Cek Pemahaman". */
function joinIncomplete(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ""
  if (items.length === 2) return `${items[0]} dan ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, dan ${items[items.length - 1]}`
}

/** Forward button: shows "MATERI SELANJUTNYA" (non-last tab) or "KERJAKAN KUIS" (last tab). Blocks navigation if sections incomplete. */
export function ForwardButton({
  slug,
  tab,
  tabs,
  incompleteSections,
}: {
  slug: string
  tab: string
  tabs: { label: string; value: string }[]
  incompleteSections: readonly string[]
}) {
  const router = useRouter()
  const isLastTab = tabs[tabs.length - 1].value === tab
  const allDone = incompleteSections.length === 0

  const handleClick = () => {
    if (!allDone) {
      const names = joinIncomplete(incompleteSections.map((s) => SECTION_LABELS[s] ?? s))
      toast.warning("Bagian belum selesai", {
        description: `Selesaikan dulu bagian ${names}. Setiap bagian harus selesai hingga benar, atau setelah 2 kali percobaan, sebelum lanjut ke materi berikutnya.`,
      })
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

  const buttonLabel = isLastTab ? "KERJAKAN KUIS" : "MATERI SELANJUTNYA"

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
