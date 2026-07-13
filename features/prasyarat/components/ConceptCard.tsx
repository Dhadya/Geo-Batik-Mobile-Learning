import { MaterialIcon } from "@/components/common/MaterialIcon"

/* Props for a prerequisite concept card. */
interface ConceptCardProps {
  /** Concept title, e.g. "Titik" */
  title: string
  /** Concept description */
  description: string
  /** Material Symbol name for the icon badge */
  icon: string
}

/* Concept card — icon badge + title + description for prerequisite material. */
export function ConceptCard({ title, description, icon }: ConceptCardProps) {
  return (
    <div className="bg-card border-4 border-black p-4 md:p-6 shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all flex gap-3 md:gap-5">
      {/* Icon badge */}
      <div className="shrink-0 size-9 md:size-12 bg-primary border-4 border-black flex items-center justify-center shadow-sm">
        <MaterialIcon name={icon} className="text-xl md:text-2xl text-primary-foreground" />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="font-black uppercase text-base md:text-lg mb-1">{title}</h3>
        <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">{description}</p>
      </div>
    </div>
  )
}
