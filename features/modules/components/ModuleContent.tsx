import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { QuizBreadcrumb } from "@/features/quiz"
import { InteractiveWorkspace } from "./workspace/InteractiveWorkspace"
import { ObservationPanel } from "./sections/pengamatan/ObservationPanel"
import { ConclusionArea } from "./sections/penyimpulan/ConclusionArea"
import { AssessmentSection } from "./sections/cek-pemahaman/AssessmentSection"
import { ModuleTabNav } from "./navigation/ModuleTabNav"
import { ResetButton } from "./shared/ResetButton"
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
    .map((i) => ({
      id: i.id,
      question: i.question,
      options: i.options,
      correctIndex: i.correctIndex,
      optionFormat: i.optionFormat,
      imageOptions: i.imageOptions,
      multiSelect: i.multiSelect,
      correctIndices: i.correctIndices,
      questionImage: i.questionImage,
      questionMatrix: i.questionMatrix,
      questionSuffix: i.questionSuffix,
    }))

  // Fallback to legacy assessment prop if no sections defined
  const questions = cekPemahamanQuestions.length > 0 ? cekPemahamanQuestions : tabConfig.assessment

  return (
    <div className="space-y-3 md:space-y-6">
      {/* Breadcrumb navigation */}
      <QuizBreadcrumb slug={slug} label={label} path="modul" />

      {/* Module title banner */}
      <div className="bg-white border-4 border-black p-3 md:p-4 text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] uppercase">
        <Text as="h2" className="text-lg md:text-xl font-black text-black">
          {tabConfig.title.toUpperCase()}
        </Text>
      </div>

      {/* Tab navigation bar */}
      <ModuleTabNav slug={slug} tabs={tabs} currentTab={decodedTab} />

      {/* Main 2-column layout: workspace + observation panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 items-start">
        {/* Left column — GeoGebra canvas + conclusion formula (desktop only) */}
        <div className="lg:col-span-8 flex flex-col gap-3 md:gap-6">
          <InteractiveWorkspace materialId={tabConfig.materialId} />
          {/* Penyimpulan: hidden on mobile (shown below grid), visible on lg+ */}
          {!(slug === "refleksi" && decodedTab === "bangun") && (
            <div className="hidden lg:block">
              <ConclusionArea slug={slug} tab={decodedTab} />
            </div>
          )}
        </div>
        {/* Right column — observation/pengamatan panel: sticky on lg+ */}
        <div className="lg:col-span-4 flex flex-col lg:sticky lg:top-24 lg:self-start">
          <ObservationPanel
            slug={slug}
            tab={decodedTab}
          />
        </div>
      </div>

      {/* Penyimpulan: shown on mobile below observation panel, hidden on lg+ (rendered inside left col) */}
      {!(slug === "refleksi" && decodedTab === "bangun") && (
        <div className="lg:hidden">
          <ConclusionArea slug={slug} tab={decodedTab} />
        </div>
      )}

      {/* Assessment section with multiple choice questions */}
      <AssessmentSection slug={slug} tab={decodedTab} questions={questions} />

      {/* Navigation buttons — back to apersepsi or forward to quiz */}
      <div className="flex justify-center gap-3 md:gap-4 pt-3 md:pt-4">
        <Link href={`/apersepsi/${slug}`}>
          <Button variant="outline" size="lg" className="px-4 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black uppercase gap-1.5 md:gap-2">
            <ArrowLeft className="size-4 md:size-6" />
            KEMBALI
          </Button>
        </Link>
        <Link href={`/modul/${slug}/kuis`}>
          <Button variant="default" size="lg" className="px-4 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black uppercase gap-1.5 md:gap-2">
            KERJAKAN KUIS
            <ArrowRight className="size-4 md:size-6" />
          </Button>
        </Link>
      </div>

      {/* Reset FAB */}
      <ResetButton />
    </div>
  )
}
