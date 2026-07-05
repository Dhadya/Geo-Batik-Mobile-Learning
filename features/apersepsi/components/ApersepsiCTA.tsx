"use client"

import Link from "next/link"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Button } from "@/components/retroui/Button"

interface ApersepsiCTAProps {
  ctaText: string
  href: string
  backHref?: string
}

/** CTA section with primary action button and optional back link. */
export function ApersepsiCTA({ ctaText, href, backHref = "/menu" }: ApersepsiCTAProps) {
  return (
    <section className="py-6 md:py-8 flex flex-col items-center gap-6 md:gap-8">
      <div className="w-full border-t-4 border-black" />

      <div className="w-full flex flex-col items-center gap-4 md:gap-6">
        {/* Primary CTA — navigate to first module tab */}
        <Link
          href={href}
          className="group relative w-full md:w-3/4 bg-secondary-container border-4 border-black py-4 px-8 md:py-8 md:px-12 shadow-xl hover:translate-x-2 hover:translate-y-2 hover:shadow-lg active:translate-x-4 active:translate-y-4 active:shadow-none transition-all"
        >
          <span className="flex items-center justify-center gap-4 md:gap-8 text-xl md:text-3xl lg:text-4xl font-black uppercase">
            {ctaText}
            <MaterialIcon
              name="arrow_forward"
              className="!text-3xl md:!text-5xl group-hover:translate-x-4 transition-transform"
            />
          </span>
          {/* Decorative stamp */}
          <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 size-12 md:size-16 bg-primary border-4 border-black flex items-center justify-center shadow-md">
            <MaterialIcon name="star_rate" className="!text-2xl md:!text-3xl text-primary-foreground" />
          </div>
        </Link>

        {/* Back button */}
        <Link href={backHref}>
          <Button variant="outline" size="lg" className="!rounded-none">
            KEMBALI
          </Button>
        </Link>
      </div>
    </section>
  )
}
