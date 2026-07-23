"use client"

import { useEffect } from "react"
import { authClient } from "@/lib/auth-client"
import { setGlobalUserId } from "@/lib/user-scoped-storage"

/**
 * Syncs the BetterAuth session userId to the user-scoped storage module.
 * Must be rendered inside the root layout (client component) so that
 * Zustand stores can namespace localStorage keys by userId.
 */
export function SessionSync() {
  const { data: session } = authClient.useSession()

  useEffect(() => {
    setGlobalUserId(session?.user?.id ?? null)
  }, [session?.user?.id])

  return null
}
