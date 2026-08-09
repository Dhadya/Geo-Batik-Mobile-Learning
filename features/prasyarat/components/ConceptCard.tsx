import { MaterialIcon } from "@/components/common/MaterialIcon"
import { AxisIcon } from "./AxisIcon"
import { LineIcon } from "./LineIcon"

/* Props for a prerequisite concept card. */
interface ConceptCardProps {
  /** Concept title, e.g. "Titik" */
  title: string
  /** Concept description */
  description: string
  /** Material Symbol name or custom icon key for the icon badge */
  icon: string
}

function ConceptIcon({ icon, className }: { icon: string; className?: string }) {
  if (icon === "axis_horizontal") return <AxisIcon axis="horizontal" className={className} />
  if (icon === "axis_vertical") return <AxisIcon axis="vertical" className={className} />
  if (icon === "line_garis") return <LineIcon variant="garis" className={className} />
  if (icon === "line_ruas_garis") return <LineIcon variant="ruas_garis" className={className} />
  return <MaterialIcon name={icon} className={className} />
}

/* Concept card — icon badge + title + description for prerequisite material. */
export function ConceptCard({ title, description, icon }: ConceptCardProps) {
  return (
    <div className="bg-card border-4 border-black p-4 md:p-6 shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all flex gap-3 md:gap-5">
      {/* Icon badge */}
      <div className="shrink-0 size-9 md:size-12 bg-primary border-4 border-black flex items-center justify-center shadow-sm">
        <ConceptIcon icon={icon} className="text-xl md:text-2xl text-primary-foreground" />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="font-black uppercase text-base md:text-lg mb-1">{title}</h3>
        <div className="text-xs md:text-sm leading-relaxed">
          {description.split("\n").map((line, i) => {
            const isNumberedItem = /^\d+\.\s/.test(line)
            const isSubItem = /^[a-d]\.\s/.test(line)

            const style: React.CSSProperties = {}
            if (isNumberedItem) {
              style.paddingLeft = "1.5rem"
              style.textIndent = "-1rem"
            } else if (isSubItem) {
              style.paddingLeft = "2.5rem"
              style.textIndent = "-1rem"
            }

            return (
              <span key={i} className="block" style={style}>
                {line}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
