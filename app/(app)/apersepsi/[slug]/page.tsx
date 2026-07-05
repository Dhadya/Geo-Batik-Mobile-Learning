import { notFound } from "next/navigation"
import {
  ApersepsiHeader,
  ApersepsiContentSection,
  ApersepsiExplanation,
  ApersepsiCTA,
  apersepsiData,
} from "@/features/apersepsi"
import type { ApersepsiSlug } from "@/features/apersepsi"

export default async function ApersepsiPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const data = apersepsiData[slug as ApersepsiSlug]
  if (!data) notFound()

  return (
    <div className="max-w-[96rem] mx-auto px-4 md:px-8 py-9 md:py-12 space-y-9 md:space-y-12">
      <ApersepsiHeader
        label={data.label}
        title={data.title}
        icon={data.icon}
        bgColor={data.bgColor}
      />

      <ApersepsiContentSection
        hook={data.hook}
        explanation={data.explanation}
      />

      <ApersepsiExplanation
        visualTitle={data.visualTitle}
        visualDescription={data.visualDescription}
        type={data.slug}
      />

      <ApersepsiCTA
        ctaText={data.ctaText}
        href={`/modul/${data.slug}/${data.firstTab}`}
      />
    </div>
  )
}
