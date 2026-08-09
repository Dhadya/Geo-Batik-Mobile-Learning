"use client"

import { authClient } from "@/lib/auth-client"
import { useQuizStatus } from "@/features/quiz/hooks/useQuizStatus"
import { LockOverlay } from "./LockOverlay"

/**
 * Client-side guard for Refleksi routes — renders children with a fullScreen
 * LockOverlay on top if the Translasi quiz has not been attempted, or if the
 * user is unauthenticated. Content stays visible underneath for preview.
 */
export function RefleksiLockGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: sessionPending } = authClient.useSession()
  const { data: status, isPending: statusPending } = useQuizStatus("translasi")

  const isLoading = sessionPending || statusPending

  if (!isLoading && !session?.user) {
    return (
      <div className="relative">
        {children}
        <LockOverlay title="Akses Ditolak" description="Silakan login terlebih dahulu." fullScreen />
      </div>
    )
  }

  if (!isLoading && status?.hasAttempt === false) {
    return (
      <div className="relative">
        {children}
        <LockOverlay
          title="Modul Belum Terbuka"
          description="Selesaikan dulu Kuis Translasi untuk membuka modul ini."
          fullScreen
          backHref="/modul/translasi/titik"
        />
      </div>
    )
  }

  return <>{children}</>
}
