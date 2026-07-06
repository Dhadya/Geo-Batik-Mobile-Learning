import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { ApersepsiHeader, RichParagraph, ShapeStamps, apersepsiData } from "@/features/apersepsi"
import type { ApersepsiSlug } from "@/features/apersepsi"

export default async function ApersepsiPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const data = apersepsiData[slug as ApersepsiSlug]
  if (!data) notFound()

  const beforeParagraphs = data.contentBeforeImage.split("\n\n")
  const afterParagraphs = data.contentAfterImage.split("\n\n")
  const firstTab = data.slug === "translasi" ? "titik" : "sumbu-x"

  return (
    <div className="max-w-[96rem] mx-auto px-4 md:px-12 py-8 md:py-12 space-y-8 md:space-y-12">
      <ApersepsiHeader
        label={data.label}
        title={data.title}
        icon={data.icon}
        bgColor={data.bgColor}
      />

      {/* Content card */}
      <div className="border-4 border-black bg-card shadow-lg transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-md">
        <div className="p-6 md:p-8 space-y-4 md:space-y-6">
          {beforeParagraphs.map((paragraph, i) => (
            <RichParagraph key={`before-${i}`} text={paragraph} />
          ))}

          {/* Image — centered, 3:2 aspect ratio */}
          <div className="relative w-full max-w-2xl mx-auto aspect-[3/2] bg-surface-container border-4 border-black overflow-hidden">
            <Image
              src={data.image}
              alt={`Motif batik ${data.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
            />
          </div>

          {afterParagraphs.map((paragraph, i) => (
            <RichParagraph key={`after-${i}`} text={paragraph} />
          ))}

          <ShapeStamps />
        </div>
      </div>

      {/* CTA — navigate to first module tab */}
      <div className="flex justify-center">
        <Link
          href={`/modul/${data.slug}/${firstTab}`}
          className="group bg-primary border-8 border-black px-8 md:px-12 py-4 md:py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-3 md:gap-4 uppercase font-black text-lg md:text-xl !rounded-none"
        >
          BAIK, AYO BELAJAR
          <MaterialIcon name="arrow_forward" className="!text-2xl md:!text-3xl group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
