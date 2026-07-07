"use client"

import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

/** Quiz navigation — arrow buttons + KEMBALI/SELESAI. */
export function QuizNavigation({
  slug,
  isFirst,
  isLast,
  allAnswered,
  current,
}: {
  slug: string
  isFirst: boolean
  isLast: boolean
  allAnswered: boolean
  current: number
}) {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="flex items-center gap-4">
        {isFirst ? (
          <Link href={`/modul/${slug}/kuis`}>
            <Button variant="outline" size="lg" className="!rounded-none gap-2">
              <ChevronLeft className="size-5" />
              Kembali
            </Button>
          </Link>
        ) : (
          <Link href={`/modul/${slug}/kuis/${current - 1}`}>
            <Button variant="outline" size="lg" className="!rounded-none gap-2">
              <ChevronLeft className="size-5" />
            </Button>
          </Link>
        )}

        {isLast && allAnswered ? (
          <Link href={`/modul/${slug}/kuis/hasil`}>
            <Button variant="default" size="lg" className="!rounded-none gap-2">
              Selesai
              <ChevronRight className="size-5" />
            </Button>
          </Link>
        ) : !isLast ? (
          <Link href={`/modul/${slug}/kuis/${current + 1}`}>
            <Button variant="default" size="lg" className="!rounded-none gap-2">
              <ChevronRight className="size-5" />
            </Button>
          </Link>
        ) : null}
      </div>

      {!allAnswered && isLast && (
        <Button variant="outline" size="md" className="!rounded-none" disabled>
          Jawab semua soal terlebih dahulu
        </Button>
      )}
    </div>
  )
}
