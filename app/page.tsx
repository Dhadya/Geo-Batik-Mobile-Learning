import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { KawungStamp } from "@/components/batik/KawungStamp"
import { BatikWatermark } from "@/components/batik/BatikWatermark"
import { LandingFooter } from "@/components/batik/LandingFooter"

function AmbientCircles() {
  const positions = [
    { left: "5vw", top: "10vh", scale: 1.2 },
    { left: "80vw", top: "5vh", scale: 0.8 },
    { left: "60vw", top: "80vh", scale: 1.5 },
    { left: "20vw", top: "70vh", scale: 0.6 },
    { left: "90vw", top: "50vh", scale: 1.0 },
    { left: "40vw", top: "90vh", scale: 1.3 },
    { left: "70vw", top: "30vh", scale: 0.7 },
    { left: "10vw", top: "40vh", scale: 0.9 },
  ]

  return (
    <>
      {positions.map((p, i) => (
        <div
          key={i}
          className="fixed pointer-events-none opacity-[0.03]"
          style={{
            left: p.left,
            top: p.top,
            width: "300px",
            height: "300px",
            border: "8px solid black",
            borderRadius: "50%",
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </>
  )
}

export default function LandingPage() {
  return (
    <div className="relative min-h-full flex items-center justify-center p-4 overflow-hidden bg-background">
      <BatikWatermark />
      <AmbientCircles />

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <div className="mb-12 animate-float">
          <KawungStamp />
        </div>

        <div className="space-y-4">
          <div className="inline-block border-4 border-black px-6 py-2 bg-card">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-foreground">
              PLATFORM BELAJAR GEOMETRI
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-[84px] leading-none font-black uppercase tracking-[-0.04em]">
              <span className="block text-foreground">BATIK</span>
              <span className="block bg-primary text-primary-foreground border-4 border-black px-8 py-2 neubrutal-shadow my-4 -rotate-1">
                GEMATRI
              </span>
            </h1>
          </div>

          <p className="text-xl font-medium max-w-xl mx-auto text-foreground mt-8">
            Kuasai Transformasi Geometri lewat Seni Batik Nusantara.
            <br />
            <span className="bg-secondary-container px-2">
              Setiap motif menyimpan rumus, temukan rahasianya!
            </span>
          </p>
        </div>

        <div className="mt-20 w-full flex justify-center">
          <Link href="/login">
            <Button
              variant="default"
              size="lg"
              className="!px-24 !py-8 !text-3xl font-bold neubrutal-shadow hover-shift active-shift flex items-center gap-6 !rounded-none"
            >
              MASUK
              <ArrowRight className="!size-10 group-hover:translate-x-3 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex gap-6 opacity-40">
          <div className="w-10 h-10 bg-foreground border-4 border-foreground" />
          <div className="w-10 h-10 bg-tertiary border-4 border-foreground rotate-45" />
          <div className="w-10 h-10 bg-secondary border-4 border-foreground rounded-full" />
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
