import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { QuizBreadcrumb } from "@/features/quiz"
import { InteractiveWorkspace } from "./InteractiveWorkspace"
import { ObservationPanel } from "./ObservationPanel"
import { ConclusionArea } from "./ConclusionArea"
import { AssessmentSection } from "./AssessmentSection"
import { getModuleTabs, getModuleTab } from "../data"

/** Main module content orchestrator — composes all sections for a given slug and tab. */
export function ModuleContent({
  slug,
  tab,
}: {
  slug: string
  tab: string
}) {
  const tabs = getModuleTabs(slug)
  if (!tabs) notFound()

  const tabConfig = getModuleTab(slug, tab)
  if (!tabConfig) notFound()

  const label = slug === "translasi" ? "Translasi" : "Refleksi"

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizBreadcrumb slug={slug} label={label} path="modul" />

      <Text as="h1" className="text-2xl md:text-3xl font-black uppercase">
        {tabConfig.title}
      </Text>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-8">
          <InteractiveWorkspace />
        </div>
        <div className="lg:col-span-4">
          <ObservationPanel instruction={tabConfig.instruction} />
        </div>
      </div>

      <ConclusionArea formula={tabConfig.formula} />

      <AssessmentSection questions={tabConfig.assessment} />

      <div className="flex justify-center gap-4 pt-4">
        <Link href={`/apersepsi/${slug}`}>
          <Button variant="outline" size="lg" className="!rounded-none px-8 py-4 text-lg font-black uppercase gap-2">
            <ArrowLeft className="size-6" />
            KEMBALI
          </Button>
        </Link>
        <Link href={`/modul/${slug}/kuis`}>
          <Button variant="default" size="lg" className="!rounded-none px-8 py-4 text-lg font-black uppercase gap-2">
            KERJAKAN KUIS
            <ArrowRight className="size-6" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
