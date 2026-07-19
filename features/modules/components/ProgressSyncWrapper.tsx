"use client"

import { useEffect } from "react"
import { syncTabProgress } from "../lib/progressSync"

/** Client wrapper that fetches tab progress from the server on mount. */
export function ProgressSyncWrapper({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  useEffect(() => {
    syncTabProgress(slug)
  }, [slug])

  return <>{children}</>
}
