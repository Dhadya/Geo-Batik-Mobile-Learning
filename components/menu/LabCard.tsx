import type { ReactNode } from "react"
import Link from "next/link"
import { MaterialIcon } from "@/components/common/MaterialIcon"

/* Props for the horizontal Lab Batik card on the menu page. */
interface LabCardProps {
  /** Title, e.g. "LAB BATIK" */
  title: string
  /** Description text */
  description: string
  /** Decorative icon rendered in the left badge box */
  icon: ReactNode
  /** Right-side trailing icon (defaults to ArrowRight) */
  trailingIcon?: ReactNode
  /** Navigation href */
  href: string
}

/* Horizontal full-width card — Lab Batik entry with icon badge and trailing arrow. */
export function LabCard({
  title,
  description,
  icon,
  trailingIcon,
  href,
}: LabCardProps) {
  return (
    <Link
      href={href}
      className="w-full bg-card text-foreground border-4 border-black p-8 shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all flex items-center justify-between group overflow-hidden relative"
    >
      {/* Left side — icon badge + text */}
      <div className="relative z-10 flex items-center gap-6">
        {/* Icon badge — primary colored box */}
        <div className="bg-primary p-4 border-4 border-black shadow-md">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="text-3xl md:text-5xl font-black uppercase leading-none mb-2">
            {title}
          </h3>
          <p className="text-lg">{description}</p>
        </div>
      </div>

      {/* Right side — trailing icon */}
      <div className="relative z-10 group-hover:translate-x-4 transition-transform">
        {trailingIcon ?? <MaterialIcon name="architecture" className="!text-6xl" />}
      </div>

      {/* Decorative skew accent — right edge */}
      <div className="absolute right-0 top-0 h-full w-32 bg-primary/10 -skew-x-12 translate-x-16" />
    </Link>
  )
}
