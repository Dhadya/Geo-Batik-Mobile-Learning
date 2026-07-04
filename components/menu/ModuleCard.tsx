import type { ReactNode } from "react"
import Link from "next/link"
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
      className={`group relative border-4 border-black p-8 shadow-lg transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-md kawung-pattern min-h-[550px] flex flex-col justify-between overflow-hidden ${bgColor}`}
    >
      {/* Icon badge — top-right corner */}
      <div className="absolute top-4 right-4 size-12 border-4 border-black flex items-center justify-center bg-card shadow-md">
        {icon}
      </div>

      {/* Header — label + title + description */}
      <div>
        <Badge
          variant="surface"
          className="border-4 border-black bg-card shadow-md font-black uppercase text-xs mb-6 !rounded-none"
        >
          {label}
        </Badge>
        <Text
          as="h2"
          className="!text-5xl lg:!text-6xl !font-black leading-none tracking-tighter uppercase mb-4"
        >
          {title}
        </Text>
        <p className="text-base font-semibold max-w-sm mb-4">{description}</p>
      </div>

      {/* Footer — preview image + CTA button */}
      <div className="space-y-6">
        {/* Image preview strip — shows batik pattern fallback if no image */}
        <div className="h-40 w-full border-4 border-black bg-card relative overflow-hidden shadow-md">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || ""}
              className="w-full h-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full kawung-pattern bg-muted flex items-center justify-center">
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Preview Segera</span>
            </div>
          )}
        </div>

        {/* CTA button — navigates to module apersepsi */}
        <Link
          href={href}
          className={`w-full border-4 border-black py-6 shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all flex items-center justify-center gap-4 uppercase font-black text-xl !rounded-none ${ctaBgColor}`}
        >
          {ctaText}
          <MaterialIcon name="arrow_forward" className="!text-3xl" />
        </Link>
      </div>
    </div>
  )
}
