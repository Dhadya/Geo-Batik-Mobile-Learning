/* Static module data for the menu page cards.
   Future: extend with progress data from Zustand store or Supabase. */
export interface MenuModule {
  slug: string
  label: string
  title: string
  description: string
  /** Material Symbol name for the top-right icon badge */
  icon: string
  bgColor: string
  ctaText: string
  ctaBgColor: string
  imageSrc?: string
  imageAlt?: string
}

export const menuModules: MenuModule[] = [
  {
    slug: "translasi",
    label: "MODUL 1",
    title: "TRANSLASI",
    icon: "transform",
    description:
      "Pelajari bagaimana sebuah titik, garis, atau bangun dapat bergeser pada bidang koordinat.",
    bgColor: "bg-module-translasi",
    ctaText: "MULAI BELAJAR",
    ctaBgColor: "bg-primary",
  },
  {
    slug: "refleksi",
    label: "MODUL 2",
    title: "REFLEKSI",
    icon: "flip",
    description:
      "Pelajari bagaimana sebuah objek geometri menghasilkan bayangan yang berbeda bergantung dengan cerminnya.",
    bgColor: "bg-module-refleksi",
    ctaText: "MULAI BELAJAR",
    ctaBgColor: "bg-secondary-container",
  },
]
