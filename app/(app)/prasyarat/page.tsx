import Link from "next/link"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Text } from "@/components/retroui/Text"
import { ConceptCard, VideoEmbed, InteractiveCanvas, prerequisiteConcepts } from "@/features/prasyarat"

/* Prasyarat (prerequisites) — Cartesian coordinate recap before module lessons. */
export default function PrasyaratPage() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      {/* Header — badge + title + description */}
      <header className="space-y-3 md:space-y-4">
        <div className="inline-block bg-primary border-4 border-black p-1 md:p-1.5 shadow-md">
          <span className="font-bold text-primary-foreground uppercase px-2 text-xs md:text-sm">
            Materi Prasyarat
          </span>
        </div>
        <Text
          as="h1"
          className="text-3xl md:text-4xl lg:text-5xl font-black uppercase"
        >
          Elemen Dasar Geometri
        </Text>
        <p className="font-medium text-sm md:text-base lg:text-lg">
          Sebelum lebih dalam memasuki media GEMATRI, mari kita ingat kembali
          tentang sistem koordinat kartesius.
        </p>
      </header>

      {/* Video embed — YouTube */}
      <div className="w-full max-w-5xl mx-auto">
        <VideoEmbed
          label="Video Penjelasan"
          src="https://www.youtube.com/embed/pcoG-VM2sq4"
          alt="Video — Elemen Dasar Geometri"
        />
      </div>

      {/* Interactive canvas — GeoGebra embed with concept controls */}
      <InteractiveCanvas
        materialId="n3upyysb"
        alt="GeoGebra — Elemen Dasar Geometri"
      />

      {/* Concept cards grid */}
      <section className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="size-10 md:size-14 bg-secondary border-4 border-black shadow-md flex items-center justify-center">
            <MaterialIcon name="library_books" className="text-2xl md:text-3xl text-secondary-foreground" />
          </div>
          <h2 className="text-lg md:text-2xl font-black uppercase">Konsep Dasar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {prerequisiteConcepts.map((concept) => (
            <ConceptCard
              key={concept.title}
              title={concept.title}
              description={concept.description}
              icon={concept.icon}
            />
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-4 md:py-6 flex justify-center">
        {/* LANJUT — links to menu */}
        <Link
          href="/menu"
          className="group relative inline-flex items-center gap-3 md:gap-4 bg-secondary-container border-4 border-black px-8 py-3 md:px-12 md:py-4 font-black text-lg md:text-2xl shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-md transition-all uppercase"
        >
          <span>LANJUT KE MENU</span>
          <MaterialIcon
            name="arrow_forward"
            className="text-2xl md:text-3xl group-hover:translate-x-2 transition-transform"
          />
          {/* Decorative stamp */}
          <div className="absolute -top-5 -left-5 md:-top-7 md:-left-7 size-10 md:size-14 bg-primary border-4 border-black flex items-center justify-center shadow-md">
            <MaterialIcon name="star_rate" className="text-xl md:text-2xl text-primary-foreground" />
          </div>
        </Link>
      </section>
    </div>
  )
}
