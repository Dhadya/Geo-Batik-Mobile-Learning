"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Text } from "@/components/retroui/Text"

/**
 * Overlay shown when content is locked.
 * - Default (`fixed inset-0 z-30`): full-screen below navbar — used for
 *   module-level locks (RefleksiLockGuard, quiz access guard).
 * - `fullScreen` (`fixed inset-0 z-30`): same positioning, but shows a
 *   "Kembali" button that navigates to `backHref`.
 * - `containerRelative` (`absolute inset-0 z-10`): per-tab locks inside a
 *   relative parent — content can be previewed underneath the overlay.
 */
export function LockOverlay({
  title = "Modul Belum Terbuka",
  description = "Selesaikan dulu Kuis Translasi untuk membuka modul ini.",
  containerRelative = false,
  fullScreen = false,
  backHref,
}: {
  title?: string
  description?: string
  containerRelative?: boolean
  fullScreen?: boolean
  backHref?: string
}) {
  const router = useRouter()

  return (
    <div
      className={
        containerRelative
          ? "absolute inset-0 z-10 flex items-center justify-center bg-black/40"
          : "fixed top-16 lg:top-20 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black/60"
      }
    >
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-6 md:p-8 max-w-sm w-full mx-4 text-center space-y-4">
        <div className="flex justify-center">
          <MaterialIcon
            className="text-black leading-none"
            style={{ fontSize: "2.5rem" }}
            name="lock"
          />
        </div>
        <Text as="h2" className="text-lg md:text-xl font-black uppercase">
          {title}
        </Text>
        <Text className="text-sm md:text-base font-medium">
          {description}
        </Text>
        {!containerRelative && (
          fullScreen && backHref ? (
            <Button
              variant="default"
              size="lg"
              className="w-full font-black uppercase gap-2"
              onClick={() => router.push(backHref)}
            >
              <MaterialIcon className="size-6" name="arrow_back" />
              Kembali
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              className="w-full font-black uppercase gap-2"
              onClick={() => router.push("/menu")}
            >
              <MaterialIcon className="size-6" name="home" />
              Ke Menu
            </Button>
          )
        )}
      </div>
    </div>
  )
}
