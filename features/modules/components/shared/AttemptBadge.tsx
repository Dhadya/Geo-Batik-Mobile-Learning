"use client"

import { Badge } from "@/components/retroui/Badge"

interface AttemptBadgeProps {
  attempt: 1 | 2
  showCobaLagi: boolean
  isLocked: boolean
  hasInput: boolean
}

/** Badge showing PERCOBAAN 1 / PERCOBAAN 2 / SELESAI based on current attempt state. */
export function AttemptBadge({ attempt, showCobaLagi, isLocked, hasInput }: AttemptBadgeProps) {
  let label: string | null = null

  if (isLocked) {
    label = "SELESAI"
  } else if (!isLocked && showCobaLagi) {
    label = "PERCOBAAN 1"
  } else if (!isLocked && !showCobaLagi && attempt === 2) {
    label = "PERCOBAAN 2"
  } else if (!isLocked && !showCobaLagi && attempt === 1 && hasInput) {
    label = "PERCOBAAN 1"
  }

  if (!label) return null

  return (
    <Badge variant="solid" size="sm" className="bg-secondary text-white">
      {label}
    </Badge>
  )
}
