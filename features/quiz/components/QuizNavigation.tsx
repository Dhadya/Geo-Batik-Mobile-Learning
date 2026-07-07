"use client"

import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

/** Arrow navigation buttons — white bg with border and shadow for back/next. */
export function QuizArrowNav({
  slug,
  isFirst,
  current,
}: {
  slug: string
  isFirst: boolean
  current: number
}) {
  if (isFirst) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 md:w-14 md:h-14 bg-white"
        disabled
      >
        <ChevronLeft className="size-6 md:size-7" />
      </Button>
    )
  }

  return (
    <Link href={`/modul/${slug}/kuis/${current - 1}`}>
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 md:w-14 md:h-14 bg-white"
      >
        <ChevronLeft className="size-6 md:size-7" />
      </Button>
    </Link>
  )
}

/** Arrow navigation button — white bg with border and shadow for next/finish. */
export function QuizArrowNext({
  slug,
  isLast,
  current,
}: {
  slug: string
  isLast: boolean
  current: number
}) {
  if (isLast) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 md:w-14 md:h-14 bg-white"
        disabled
      >
        <ChevronRight className="size-6 md:size-7" />
      </Button>
    )
  }

  return (
    <Link href={`/modul/${slug}/kuis/${current + 1}`}>
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 md:w-14 md:h-14 bg-white"
      >
        <ChevronRight className="size-6 md:size-7" />
      </Button>
    </Link>
  )
}
