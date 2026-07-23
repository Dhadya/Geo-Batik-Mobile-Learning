import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { hasModuleAttempt } from "@/features/modules/services/quiz"
import { LockOverlay } from "./LockOverlay"

/** Server component that guards Refleksi routes — shows LockOverlay if Translasi quiz not yet attempted, or if the user is not authenticated. */
export async function RefleksiLockGuard({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    return <LockOverlay title="Akses Ditolak" description="Silakan login terlebih dahulu." />
  }

  const translasiDone = await hasModuleAttempt(session.user.id, "translasi")
  if (!translasiDone) {
    return <LockOverlay />
  }

  return <>{children}</>
}
