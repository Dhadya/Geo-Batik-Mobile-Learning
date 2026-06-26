import type { ReactNode } from "react"
import { UserCircle } from "lucide-react"
import { Card } from "@/components/retroui/Card"

/* Full-page auth shell: GEMATRI branding card, watermark, decorative stamps, version footer.
   Server-safe (no state, no event handlers). */
interface AuthLayoutProps {
  children: ReactNode
  subtitle?: string
}

export function AuthLayout({ children, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative flex items-center justify-center min-h-full bg-background p-4 md:p-12 overflow-hidden">
      <div className="absolute inset-0 z-0 batik-watermark pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 opacity-10 rotate-12 border-[16px] border-black rounded-full pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] opacity-5 border-[32px] border-black rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-md">
        <Card className="w-full border-4 border-black neubrutal-shadow relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none border-t-4 border-l-4 border-black" />

          <Card.Header className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent border-4 border-black mb-6 neubrutal-shadow-sm mx-auto">
              <UserCircle className="size-10 text-foreground" />
            </div>
            <Card.Title className="font-black text-3xl uppercase tracking-tight mb-2">
              GEMATRI
            </Card.Title>
            {subtitle && (
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                {subtitle}
              </p>
            )}
          </Card.Header>

          <Card.Content>{children}</Card.Content>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <div className="px-4 py-2 border-2 border-black bg-muted text-[10px] font-bold uppercase flex items-center gap-2">
            <span>Ver: 1.0.0-KAWUNG</span>
            <span className="size-2 bg-secondary rounded-full" />
          </div>
          <div className="px-4 py-2 border-2 border-black bg-muted text-[10px] font-bold uppercase">
            2026 GEMATRI
          </div>
        </div>
      </main>

      <div className="fixed top-10 right-10 hidden lg:block">
        <div className="grid grid-cols-2 gap-2">
          <div className="size-8 border-4 border-black bg-primary" />
          <div className="size-8 border-4 border-black" />
          <div className="size-8 border-4 border-black" />
          <div className="size-8 border-4 border-black bg-secondary" />
        </div>
      </div>
      <div className="fixed bottom-10 left-10 hidden lg:block">
        <div className="size-16 border-4 border-black rotate-45 flex items-center justify-center">
          <div className="size-8 bg-tertiary border-2 border-black" />
        </div>
      </div>
    </div>
  )
}
