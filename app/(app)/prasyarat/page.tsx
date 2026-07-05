import Link from "next/link"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Text } from "@/components/retroui/Text"
import { ConceptCard, VideoEmbed, InteractiveCanvas, prerequisiteConcepts } from "@/features/prasyarat"

/* Prasyarat (prerequisites) — Cartesian coordinate recap before module lessons. */
export default function PrasyaratPage() {
  return (
    <div className="max-w-[96rem] mx-auto px-4 md:px-8 py-9 md:py-12 space-y-9 md:space-y-12">
      {/* Header — badge + title + description */}
      <header className="space-y-3 md:space-y-4">
        <div className="inline-block bg-primary border-4 border-black p-2 shadow-md">
          <span className="font-bold text-primary-foreground uppercase px-2 text-xs md:text-sm">
            Materi Prasyarat
          </span>
        </div>
        <Text
          as="h1"
          className="!text-3xl md:!text-5xl lg:!text-6xl !font-black uppercase"
        >
          Elemen Dasar Geometri
        </Text>
        <p className="text-sm md:text-lg max-w-3xl">
          Sebelum lebih dalam memasuki media GEMATRI, mari kita ingat kembali
          tentang sistem koordinat kartesius.
        </p>
      </header>

      {/* Video embed — YouTube */}
      <VideoEmbed
        label="Video Penjelasan"
        src="https://www.youtube.com/embed/pcoG-VM2sq4"
        alt="Video — Elemen Dasar Geometri"
      />

      {/* Interactive canvas — GeoGebra embed with concept controls */}
      <InteractiveCanvas
        materialId="n3upyysb"
        alt="GeoGebra — Elemen Dasar Geometri"
      />

      {/* Concept cards grid */}
      <section className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="size-10 md:size-14 bg-secondary border-4 border-black shadow-md flex items-center justify-center">
            <MaterialIcon name="library_books" className="!text-2xl md:!text-3xl text-secondary-foreground" />
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
      <section className="py-4 md:py-6 flex flex-col items-center gap-6 md:gap-8">
        <div className="w-full border-t-4 border-black" />

        <div className="w-full flex flex-col items-center gap-4 md:gap-6">
          {/* LANJUT — links to menu */}
          <Link
            href="/menu"
            className="group relative w-full md:w-3/4 bg-secondary-container border-4 border-black py-4 px-8 md:py-8 md:px-12 shadow-xl hover:translate-x-2 hover:translate-y-2 hover:shadow-lg active:translate-x-4 active:translate-y-4 active:shadow-none transition-all"
          >
            <span className="flex items-center justify-center gap-4 md:gap-8 text-xl md:text-3xl lg:text-4xl font-black uppercase">
              LANJUT KE MENU
              <MaterialIcon
                name="arrow_forward"
                className="!text-3xl md:!text-5xl group-hover:translate-x-4 transition-transform"
              />
            </span>
            {/* Decorative stamp */}
            <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 size-12 md:size-16 bg-primary border-4 border-black flex items-center justify-center shadow-md">
              <MaterialIcon name="star_rate" className="!text-2xl md:!text-3xl text-primary-foreground" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
