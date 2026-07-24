import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { hasModuleAttempt } from "@/features/modules/services/quiz"
import { LockOverlay } from "./LockOverlay"

/** Server component that guards Refleksi routes — renders children with a fullScreen LockOverlay on top if Translasi quiz not yet attempted, or if the user is not authenticated. Content is still visible underneath for preview. */
export async function RefleksiLockGuard({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    return (
      <div className="relative">
        {children}
        <LockOverlay title="Akses Ditolak" description="Silakan login terlebih dahulu." fullScreen />
      </div>
    )
  }

  const translasiDone = await hasModuleAttempt(session.user.id, "translasi")
  if (!translasiDone) {
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
