"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Text } from "@/components/retroui/Text"

/** Full-screen overlay shown when a module is locked. Blocks all interaction and provides a "Ke Menu" button. */
export function LockOverlay({
  title = "Modul Belum Terbuka",
  description = "Selesaikan dulu Kuis Translasi untuk membuka modul ini.",
}: {
  title?: string
  description?: string
}) {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-8 md:p-12 max-w-sm w-full mx-4 text-center space-y-6">
        <div className="flex justify-center">
          <MaterialIcon
            className="text-black leading-none"
            style={{ fontSize: "3rem" }}
            name="lock"
          />
        </div>
        <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
          {title}
        </Text>
        <Text className="text-sm md:text-base font-medium">
          {description}
        </Text>
        <Button
          variant="default"
          size="lg"
          className="w-full font-black uppercase gap-2"
          onClick={() => router.push("/menu")}
        >
          <MaterialIcon className="size-6" name="home" />
          Ke Menu
        </Button>
      </div>
    </div>
  )
}
