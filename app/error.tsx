"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-8 md:p-12 max-w-md w-full text-center space-y-6">
        <MaterialIcon
            className="text-black leading-none mx-auto"
            style={{ fontSize: "2.5rem" }}
            name="error"
          />
        <h1 className="text-2xl md:text-3xl font-black uppercase">Terjadi Kesalahan</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
        </p>
        <div className="flex flex-col gap-3">
          <Button
            variant="default"
            size="lg"
            className="w-full font-black uppercase gap-2"
            onClick={() => window.location.reload()}
          >
            <MaterialIcon className="size-5" name="refresh" />
            Coba Lagi
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full font-black uppercase gap-2"
            onClick={() => router.push("/menu")}
          >
            <MaterialIcon className="size-5" name="home" />
            Ke Menu
          </Button>
        </div>
      </div>
    </div>
  )
}
