import type { ReactNode } from "react"
import Link from "next/link"
import { ProfileDropdown } from "@/components/layout/ProfileDropdown"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b-4 border-black bg-primary text-primary-foreground">
        <div className="max-w-8xlxl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-black text-lg uppercase tracking-tight">
            GEMATRI
          </Link>
          <nav className="flex items-center gap-6 text-sm font-bold uppercase">
            <Link href="/menu">Menu</Link>
            <Link href="/lab">Lab</Link>
            <ProfileDropdown />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
