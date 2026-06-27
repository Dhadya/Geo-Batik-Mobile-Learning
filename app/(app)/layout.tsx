import type { ReactNode } from "react"
import Link from "next/link"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b-4 border-black bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-black text-lg uppercase tracking-tight">
            GEMATRI
          </Link>
          <nav className="flex gap-6 text-sm font-bold uppercase">
            <Link href="/menu">Menu</Link>
            <Link href="/lab">Lab</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
