import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-8 md:p-12 max-w-md w-full text-center space-y-6">
        <MaterialIcon className="text-6xl text-black mx-auto" name="search_off" />
        <h1 className="text-2xl md:text-3xl font-black uppercase">Halaman Tidak Ditemukan</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Halaman yang kamu cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link href="/menu">
          <Button
            variant="default"
            size="lg"
            className="w-full font-black uppercase gap-2"
          >
            <MaterialIcon className="size-5" name="home" />
            Ke Menu
          </Button>
        </Link>
      </div>
    </div>
  )
}
