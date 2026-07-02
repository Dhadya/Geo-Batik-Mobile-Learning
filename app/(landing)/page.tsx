import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/retroui/Button";
import { KawungStamp } from "@/components/batik/KawungStamp";
import { BatikWatermark } from "@/components/batik/BatikWatermark";
import { LandingFooter } from "@/components/batik/LandingFooter";
import { AmbientCircles } from "@/components/common/AmbientCircles";
import { SignedIn, SignedOut } from "@/components/auth";

/* Landing page — hero with Kawung stamp, GEMATRI branding, and MASUK CTA */
export default function LandingPage() {
  return (
    <div className="relative min-h-full flex items-center justify-center p-16 overflow-hidden bg-background">
      <BatikWatermark />
      <AmbientCircles />

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <div className="mb-12 animate-float">
          <KawungStamp />
        </div>

        <div className="space-y-4">
          <div className="inline-block border-4 border-black px-6 py-2 bg-card">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground">
              PLATFORM BELAJAR GEOMETRI
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-[84px] leading-none font-black uppercase tracking-[-0.04em]">
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

        <div className="mt-12 w-full flex justify-center">
          <SignedOut>
            <Link href="/login">
              <Button
                variant="default"
                size="lg"
                className="!px-16 !py-4 !text-3xl font-bold neubrutal-shadow hover-shift active-shift flex items-center gap-6 !rounded-none"
              >
                MASUK
                <ArrowRight className="!size-10 group-hover:translate-x-3 transition-transform" />
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/menu">
              <Button
                variant="default"
                size="lg"
                className="!px-16 !py-4 !text-3xl font-bold neubrutal-shadow hover-shift active-shift flex items-center gap-6 !rounded-none"
              >
                MENU
                <ArrowRight className="!size-10 group-hover:translate-x-3 transition-transform" />
              </Button>
            </Link>
          </SignedIn>
        </div>

        <div className="mt-16 flex gap-6 opacity-40">
          <div className="w-10 h-10 bg-foreground border-4 border-foreground" />
          <div className="w-10 h-10 bg-tertiary border-4 border-foreground rotate-45" />
          <div className="w-10 h-10 bg-secondary border-4 border-foreground rounded-full" />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
