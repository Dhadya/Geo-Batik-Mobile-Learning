import { MaterialIcon } from "@/components/common/MaterialIcon"
import { ModuleCard } from "./ModuleCard"
import { menuModules } from "../data"

/** Grid of module cards (Translasi + Refleksi). */
export function ModuleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {menuModules.map((mod) => (
        <ModuleCard
          key={mod.slug}
          label={mod.label}
          title={mod.title}
          description={mod.description}
          icon={<MaterialIcon name={mod.icon} className="text-2xl md:text-3xl" />}
          bgColor={mod.bgColor}
          imageSrc={mod.imageSrc}
          imageAlt={mod.imageAlt}
          ctaText={mod.ctaText}
          ctaBgColor={mod.ctaBgColor}
          href={`/apersepsi/${mod.slug}`}
        />
      ))}
    </div>
  )
}
