import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/retroui/Button"
import { ArrowRight } from "lucide-react"
import { ApersepsiHeader, RichParagraph, ShapeStamps, apersepsiData } from "@/features/apersepsi"
import { QuizBreadcrumb } from "@/features/quiz"
import type { ApersepsiSlug } from "@/features/apersepsi"

export default async function ApersepsiPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const data = apersepsiData[slug as ApersepsiSlug]
  if (!data) notFound()

  const beforeParagraphs = data.contentBeforeImage.split("\n\n")
  const afterParagraphs = data.contentAfterImage.split("\n\n")
  const firstTab = data.slug === "translasi" ? "titik" : "sumbu-x"
  const label = data.slug === "translasi" ? "Translasi" : "Refleksi"

  return (
    <div className="max-w-[96rem] mx-auto px-4 md:px-12 pt-4 md:pt-6 pb-8 md:pb-12 space-y-6 md:space-y-8">
      <QuizBreadcrumb slug={data.slug} label={label} path="apersepsi" />

      <ApersepsiHeader
        label={data.label}
        title={data.title}
        icon={data.icon}
        bgColor={data.bgColor}
      />

      <div className="border-4 border-black bg-card shadow-lg transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-md">
        <div className="p-6 md:p-8 space-y-4 md:space-y-6">
          {beforeParagraphs.map((paragraph, i) => (
            <RichParagraph key={`before-${i}`} text={paragraph} />
          ))}

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

      <div className="flex flex-col items-center gap-4 md:gap-6 pt-4 md:pt-6">
        <Link href={`/modul/${data.slug}/${firstTab}`}>
          <Button
            variant="default"
            size="lg"
            className="!rounded-none px-10 md:px-16 py-5 md:py-8 text-xl md:text-2xl font-black uppercase gap-4 md:gap-5"
          >
            Baik, Ayo Belajar
            <ArrowRight className="size-7 md:size-8" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
