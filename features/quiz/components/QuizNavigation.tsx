"use client"

import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"

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
        <MaterialIcon className="size-6" name="chevron_left" />
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
        <MaterialIcon className="size-6" name="chevron_left" />
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
        <MaterialIcon className="size-6" name="chevron_right" />
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
        <MaterialIcon className="size-6" name="chevron_right" />
      </Button>
    </Link>
  )
}
