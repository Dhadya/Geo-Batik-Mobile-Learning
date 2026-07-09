import Link from "next/link"
import { MaterialIcon } from "@/components/common/MaterialIcon"

/** Back navigation link to prasyarat page. */
export function BackLink() {
  return (
    <div className="flex justify-center pb-8 md:pb-12">
      <Link
        href="/prasyarat"
        className="inline-flex items-center gap-3 md:gap-4 bg-tertiary-container text-foreground border-4 border-black px-8 py-3 md:px-12 md:py-4 font-black text-lg md:text-2xl shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all uppercase !rounded-none"
      >
        <MaterialIcon name="arrow_back" className="!text-2xl md:!text-3xl" />
        KEMBALI KE PRASYARAT
      </Link>
    </div>
  )
}
