import { MaterialIcon } from "@/components/common/MaterialIcon"
import { ModuleGrid, MenuHeader, BackLink, LabCard } from "@/features/menu"

/* Main menu — bento grid of module cards + Lab Batik + back navigation. */
export default function MenuPage() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      <MenuHeader />
      <ModuleGrid />

      {/* Lab Batik — horizontal entry card */}
      <LabCard
        title="LAB BATIK"
        description="Eksperimen membuat motif batik dengan transformasi geometri."
        icon={<MaterialIcon name="draw" className="text-3xl md:text-5xl" />}
        href="/lab"
      />

      <BackLink />
    </div>
  )
}
