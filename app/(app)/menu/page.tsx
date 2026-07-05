import Link from "next/link"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Text } from "@/components/retroui/Text"
import { ModuleCard } from "@/components/menu/ModuleCard"
import { LabCard } from "@/components/menu/LabCard"
import { menuModules } from "@/data/menuModules"

/* Main menu — bento grid of module cards + Lab Batik + back navigation. */
export default function MenuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-12">
      {/* Header — title + description */}
      <div className="text-center md:text-left">
        <Text
          as="h1"
          className="!text-5xl lg:!text-6xl !font-black uppercase inline-block mb-4"
        >
          Menu Utama
        </Text>
        <p className="text-lg max-w-2xl">
          Selamat datang di GEMATRI! Jelajahi transformasi geometri melalui lensa budaya batik.
          Pilih modul di bawah ini untuk memulai pembelajaran.
        </p>
      </div>

      {/* Bento grid — module cards (Translasi + Refleksi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {menuModules.map((mod) => (
          <ModuleCard
            key={mod.slug}
            label={mod.label}
            title={mod.title}
            description={mod.description}
            icon={<MaterialIcon name={mod.icon} className="!text-3xl" />}
            bgColor={mod.bgColor}
            imageSrc={mod.imageSrc}
            imageAlt={mod.imageAlt}
            ctaText={mod.ctaText}
            ctaBgColor={mod.ctaBgColor}
            href={`/apersepsi/${mod.slug}`}
          />
        ))}
      </div>

      {/* Lab Batik — horizontal entry card */}
      <LabCard
        title="LAB BATIK"
        description="Eksperimen membuat motif batik dengan transformasi geometri."
        icon={<MaterialIcon name="draw" className="!text-5xl" />}
        href="/lab"
      />

      {/* Back link — return to prasyarat */}
      <div className="flex justify-center pb-12">
        <Link
          href="/prasyarat"
          className="inline-flex items-center gap-4 bg-tertiary-container text-foreground border-4 border-black px-12 py-4 font-black text-2xl shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all uppercase !rounded-none"
        >
          <MaterialIcon name="arrow_back" className="!text-3xl" />
          KEMBALI KE PRASYARAT
        </Link>
      </div>
    </div>
  )
}
