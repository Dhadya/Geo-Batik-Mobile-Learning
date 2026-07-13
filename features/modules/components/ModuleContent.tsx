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
import { ModuleTabNav } from "./ModuleTabNav"
import { getModuleTabs, getModuleTab } from "../data"
import type { PilihanGandaItem } from "../types"

/** Main module content orchestrator — composes all sections for a given slug and tab. */
export function ModuleContent({
  slug,
  tab,
}: {
  slug: string
  tab: string
}) {
  // Validate slug has tabs, decode URL-encoded tab param
  const tabs = getModuleTabs(slug)
  if (!tabs) notFound()

  const decodedTab = decodeURIComponent(tab)
  const tabConfig = getModuleTab(slug, decodedTab)
  if (!tabConfig) notFound()

  const label = slug === "translasi" ? "Translasi" : "Refleksi"

  // Derive MCQ questions from cekPemahaman section (backward compat with AssessmentQuestion)
  const cekPemahamanQuestions = (tabConfig.sections?.cekPemahaman.items ?? [])
    .filter((i): i is PilihanGandaItem => i.type === "pilihan_ganda")
    .map((i) => ({ id: i.id, question: i.question, options: i.options, correctIndex: i.correctIndex, optionFormat: i.optionFormat }))

  // Fallback to legacy assessment prop if no sections defined
  const questions = cekPemahamanQuestions.length > 0 ? cekPemahamanQuestions : tabConfig.assessment

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Breadcrumb navigation */}
      <QuizBreadcrumb slug={slug} label={label} path="modul" />

      {/* Module title banner */}
      <div className="bg-white border-4 border-black p-4 text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] uppercase">
        <Text as="h1" className="text-xl md:text-2xl font-black text-black">
          {slug === "translasi" ? "TRANSLASI" : "REFLEKSI TITIK"}
        </Text>
      </div>

      {/* Tab navigation bar */}
      <ModuleTabNav slug={slug} tabs={tabs} currentTab={decodedTab} />

      {/* Main 2-column layout: workspace + observation panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Left column — GeoGebra canvas + conclusion formula */}
        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">
          <InteractiveWorkspace materialId={tabConfig.materialId} />
          <ConclusionArea slug={slug} tab={decodedTab} />
        </div>
        {/* Right column — observation/pengamatan panel */}
        <div className="lg:col-span-4 flex flex-col">
          <ObservationPanel
            slug={slug}
            tab={decodedTab}
          />
        </div>
      </div>

      {/* Assessment section with multiple choice questions */}
      <AssessmentSection slug={slug} tab={decodedTab} questions={questions} />

      {/* Navigation buttons — back to apersepsi or forward to quiz */}
      <div className="flex justify-center gap-4 pt-4">
        <Link href={`/apersepsi/${slug}`}>
          <Button variant="outline" size="lg" className="rounded-none! px-8 py-4 text-lg font-black uppercase gap-2">
            <ArrowLeft className="size-6" />
            KEMBALI
          </Button>
        </Link>
        <Link href={`/modul/${slug}/kuis`}>
          <Button variant="default" size="lg" className="rounded-none! px-8 py-4 text-lg font-black uppercase gap-2">
            KERJAKAN KUIS
            <ArrowRight className="size-6" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
