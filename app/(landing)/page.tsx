"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { KawungStamp } from "@/components/batik/KawungStamp"
import { BatikWatermark } from "@/components/batik/BatikWatermark"
import { LandingFooter } from "@/components/layout/LandingFooter"
import { AmbientCircles } from "@/components/common/AmbientCircles"

/* Landing page — hero with Kawung stamp, GEMATRI branding, and MASUK CTA */
export default function LandingPage() {

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 md:p-16 overflow-hidden bg-background">
      <BatikWatermark />
      <AmbientCircles />

      <main className="relative z-10 w-full max-w-[96rem] flex flex-col items-center text-center">
        <div className="mb-8 md:mb-12 animate-float">
          <KawungStamp />
        </div>

        <div className="space-y-4">
          <div className="inline-block border-4 border-black px-4 py-1.5 md:px-6 md:py-2 bg-card">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground">
              PLATFORM BELAJAR GEOMETRI
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-[44px] md:text-[84px] leading-none font-black uppercase tracking-[-0.04em]">
              <span className="block bg-primary text-primary-foreground border-4 border-black px-6 py-1.5 md:px-8 md:py-2 neubrutal-shadow my-2 md:my-4 -rotate-1">
                GEMATRI
              </span>
            </h1>
          </div>

          <p className="text-base md:text-xl font-medium max-w-xl mx-auto text-foreground mt-4 md:mt-8">
            Kuasai Transformasi Geometri lewat Seni Batik Nusantara.
            <br />
            <span className="bg-secondary-container px-2">
              Setiap motif menyimpan rumus, temukan rahasianya!
            </span>
          </p>
        </div>

        <div className="mt-8 md:mt-12 w-full flex justify-center">
          <Link href="/login">
            <Button
              variant="default"
              size="lg"
              className="px-8 py-3 text-xl md:px-16 md:py-4 md:text-3xl font-bold neubrutal-shadow hover-shift active-shift flex items-center gap-4 md:gap-6"
            >
              MASUK
              <ArrowRight className="size-6 md:size-10 group-hover:translate-x-3 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 md:mt-16 flex gap-4 md:gap-6 opacity-40">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-foreground border-4 border-foreground" />
          <div className="w-8 h-8 md:w-10 md:h-10 bg-tertiary border-4 border-foreground rotate-45" />
          <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary border-4 border-foreground rounded-full" />
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
