"use client"

import { MaterialIcon } from "@/components/common/MaterialIcon"
import Link from "next/link"

export function BottomBar() {
  return (
    <footer className="w-full bg-surface-container-highest border-t-4 border-black px-6 py-4 flex justify-between items-center z-50">
      <div className="flex gap-4">
        <Link
          href="/menu"
          className="bg-white border-4 border-black px-6 py-2 font-black text-sm uppercase neubrutal-shadow-sm hover-shift active-shift flex items-center gap-2"
        >
          <MaterialIcon name="arrow_back" className="text-lg" />
          KEMBALI
        </Link>
      </div>

      {/* Mid Stats */}
      <div className="hidden md:flex items-center gap-8 bg-black text-white px-8 py-2 border-4 border-black neubrutal-shadow-sm">
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold opacity-70">PRESISI MOTIF</span>
          <span className="font-black text-xl text-secondary-container">85%</span>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold opacity-70">WAKTU</span>
          <span className="font-black text-xl">12:45</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="bg-primary-container border-4 border-black px-6 py-2 font-black text-sm uppercase neubrutal-shadow-sm hover-shift active-shift flex items-center gap-2">
          LANJUTKAN
          <MaterialIcon name="arrow_forward" className="text-lg" />
        </button>
        <button className="bg-secondary border-4 border-black text-white px-8 py-2 font-black text-sm uppercase neubrutal-shadow-sm hover-shift active-shift">
          SUBMIT
        </button>
      </div>
    </footer>
  )
}
