import { ModuleGrid, MenuHeader, BackLink } from "@/features/menu"

/* Main menu — bento grid of module cards + back navigation. */
export default function MenuPage() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      <MenuHeader />
      <ModuleGrid />

      <BackLink />
    </div>
  )
}
