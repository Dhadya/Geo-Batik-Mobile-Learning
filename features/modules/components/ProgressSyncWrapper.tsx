"use client"

import { useEffect } from "react"
import { useTabProgressStore, type TabProgressEntry } from "../store/tabProgressStore"

/**
 * Seeds the client-side tab progress store.
 * If `serverProgress` is provided (from SSR), the store is populated synchronously.
 * Otherwise, falls back to fetching from the server on mount.
 */
export function ProgressSyncWrapper({
  slug,
  serverProgress,
  children,
}: {
  slug: string
  serverProgress?: TabProgressEntry[] | null
  children: React.ReactNode
}) {
  useEffect(() => {
    if (serverProgress) {
      useTabProgressStore.getState().setProgress(slug, serverProgress)
    } else if (serverProgress === undefined) {
      import("../lib/progressSync").then(({ syncTabProgress }) => syncTabProgress(slug))
    }
  }, [slug, serverProgress])

  return <>{children}</>
}
