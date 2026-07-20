"use client"

import { useEffect, useState } from "react"
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
  const [prevSlug, setPrevSlug] = useState<string | null>(null)

  // Seed synchronously during render to avoid layout/hydration flash of locked tabs
  if (serverProgress && prevSlug !== slug) {
    setPrevSlug(slug)
    useTabProgressStore.getState().setProgress(slug, serverProgress)
  }

  useEffect(() => {
    // Only fetch client-side if serverProgress is undefined (unknown/not loaded)
    if (serverProgress === undefined) {
      import("../lib/progressSync").then(({ syncTabProgress }) => syncTabProgress(slug))
    }
  }, [slug, serverProgress])

  return <>{children}</>
}
