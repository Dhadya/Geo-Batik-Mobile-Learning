import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Badge } from "@/components/retroui/Badge"
import { Text } from "@/components/retroui/Text"

/* Props for the large bento-style module card used on the menu page. */
interface ModuleCardProps {
  /** Badge label shown above the title, e.g. "MODUL 01" */
  label: string
  /** Large uppercase title, e.g. "TRANSLASI" */
  title: string
  /** Short description of the module */
  description: string
  /** Icon rendered in the top-right badge */
  icon: ReactNode
  /** Tailwind bg class for the card background (e.g. "bg-module-translasi") */
  bgColor: string
  /** Image source URL for the preview strip (optional — shows pattern fallback if missing) */
  imageSrc?: string
  /** Image alt text */
  imageAlt?: string
  /** CTA button text, e.g. "MULAI BELAJAR" */
  ctaText: string
  /** CTA button background class (e.g. "bg-primary") */
  ctaBgColor: string
  /** Navigation href for the CTA */
  href: string
}

/* Large module card — bento grid item with icon badge, preview image, and CTA. */
export function ModuleCard({
  label,
  title,
  description,
  icon,
  bgColor,
  imageSrc,
  imageAlt,
  ctaText,
  ctaBgColor,
  href,
}: ModuleCardProps) {
  return (
    <div
      className={`group relative border-4 border-black p-6 md:p-8 shadow-lg transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-md kawung-pattern min-h-[450px] md:min-h-[550px] flex flex-col justify-between overflow-hidden ${bgColor}`}
    >
      {/* Icon badge — top-right corner */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-12 border-4 border-black flex items-center justify-center bg-card shadow-md">
        {icon}
      </div>

      {/* Header — label + title + description */}
      <div>
        <Badge
          variant="surface"
          className="border-4 border-black bg-card shadow-md font-black uppercase text-xs md:text-sm mb-4 md:mb-6"
        >
          {label}
        </Badge>
        <Text
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-black leading-none tracking-tighter uppercase mb-3 md:mb-4"
        >
          {title}
        </Text>
        <p className="text-base md:text-lg font-semibold">{description}</p>
      </div>

      {/* Footer — preview image + CTA button */}
      <div className="space-y-4 md:space-y-6">
        {/* Image preview strip — shows batik pattern fallback if no image */}
        <div className="h-36 md:h-48 w-full border-4 border-black bg-card relative overflow-hidden shadow-md">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover brightness-110 transition-all duration-500"
              priority
            />
          ) : (
            <div className="w-full h-full kawung-pattern bg-muted flex items-center justify-center">
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-wide">Preview Segera</span>
            </div>
          )}
        </div>

        {/* CTA button — navigates to module apersepsi */}
        <Link
          href={href}
          className={`w-full border-4 border-black py-2.5 md:py-4 shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all flex items-center justify-center gap-2 md:gap-3 uppercase font-black text-base md:text-lg ${ctaBgColor}`}
        >
          {ctaText}
          <MaterialIcon name="arrow_forward" className="text-xl md:text-2xl" />
        </Link>
      </div>
    </div>
  )
}
