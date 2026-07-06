import type { ReactNode } from "react"
import { Navbar } from "@/components/layout/NavbarClient"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
