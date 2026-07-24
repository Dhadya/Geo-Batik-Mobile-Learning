import type { ReactNode } from "react"
import { UserCircle } from "lucide-react"
import { Card } from "@/components/retroui/Card"

/* Full-page auth shell — GEMATRI branding card with watermark and decorative elements.
   Server-safe: no state, no event handlers. */
interface AuthLayoutProps {
  children: ReactNode
  subtitle?: string
}

export function AuthLayout({ children, subtitle }: AuthLayoutProps) {
  return (
    /* Full viewport container with centered content */
    <div className="relative flex items-center justify-center min-h-full bg-background p-4 md:p-12 overflow-hidden">
      {/* Batik watermark background pattern */}
      <div className="absolute inset-0 z-0 batik-watermark pointer-events-none" />
      {/* Decorative circle — top-left */}
      <div className="absolute -top-24 -left-24 w-96 h-96 opacity-10 rotate-12 border-[16px] border-black rounded-full pointer-events-none" />
      {/* Decorative circle — bottom-right */}
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] opacity-5 border-[32px] border-black rounded-full pointer-events-none" />

      {/* Main card container */}
      <main className="relative z-10 w-full max-w-md">
        <Card className="w-full border-4 border-black neubrutal-shadow relative overflow-hidden">
          {/* Corner accent decoration */}
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none border-t-4 border-l-4 border-black" />

          {/* Card header — logo, title, subtitle */}
          <Card.Header className="text-center mb-6">
            {/* Logo icon container */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent border-4 border-black mb-6 neubrutal-shadow-sm mx-auto">
              <UserCircle className="size-10 text-foreground" />
            </div>
            {/* App title */}
            <Card.Title className="font-black text-3xl uppercase tracking-tight mb-2">
              GEMATRI
            </Card.Title>
            {/* Optional subtitle */}
            {subtitle && (
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-wide">
                {subtitle}
              </p>
            )}
          </Card.Header>

          {/* Card content — form or page content */}
          <Card.Content>{children}</Card.Content>
        </Card>

        {/* Version and copyright footer */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="px-4 py-2 border-2 border-black bg-muted text-[10px] md:text-xs font-bold uppercase flex items-center gap-2">
            <span className="size-2 bg-secondary rounded-full" />
            <span>2026 GEMATRI</span>
          </div>
          <div className="px-4 py-2 border-2 border-black bg-muted text-[10px] md:text-xs font-bold uppercase">
            Gemakan Mahir Transformasi Geometri
          </div>
        </div>
      </main>

      {/* Decorative grid — top-right, desktop only */}
      <div className="fixed top-10 right-10 hidden lg:block">
        <div className="grid grid-cols-2 gap-2">
          <div className="size-8 border-4 border-black bg-primary" />
          <div className="size-8 border-4 border-black" />
          <div className="size-8 border-4 border-black" />
          <div className="size-8 border-4 border-black bg-secondary" />
        </div>
      </div>
      {/* Decorative diamond — bottom-left, desktop only */}
      <div className="fixed bottom-10 left-10 hidden lg:block">
        <div className="size-16 border-4 border-black rotate-45 flex items-center justify-center">
          <div className="size-8 bg-tertiary border-2 border-black" />
        </div>
      </div>
    </div>
  )
}
