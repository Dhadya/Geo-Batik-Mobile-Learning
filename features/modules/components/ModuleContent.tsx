"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/retroui/Button"
import { Text } from "@/components/retroui/Text"
import { Badge } from "@/components/retroui/Badge"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { QuizBreadcrumb } from "@/features/quiz"
import { InteractiveWorkspace } from "./workspace/InteractiveWorkspace"
import { ObservationPanel } from "./sections/pengamatan/ObservationPanel"
import { ConclusionArea } from "./sections/penyimpulan/ConclusionArea"
import { AssessmentSection } from "./sections/cek-pemahaman/AssessmentSection"
import { ModuleTabNav } from "./navigation/ModuleTabNav"
import { ForwardButton } from "./navigation/ForwardButton"
import { ResetButton } from "./shared/ResetButton"
import { LockOverlay } from "./LockOverlay"
import { getModuleTabs, getModuleTab, getSectionsForTab } from "../data"
import { useSectionProgress } from "../hooks/useSectionSubmission"
import { useAnswerStore } from "../store/answerStore"
import { useTabProgressStore } from "../store/tabProgressStore"
import type { PilihanGandaItem } from "../types"

type SectionStatus = "unsubmitted" | "correct" | "wrong_attempt1" | "wrong_attempt2"
type SectionStatusWithLock = SectionStatus | "locked"

function narrowSectionStatus(raw: string | null | undefined): SectionStatus {
  const valid: SectionStatus[] = ["unsubmitted", "correct", "wrong_attempt1", "wrong_attempt2"]
  return valid.includes(raw as SectionStatus) ? (raw as SectionStatus) : "unsubmitted"
}

function narrowSectionStatusWithLock(raw: string | null | undefined): SectionStatusWithLock {
  const valid: SectionStatusWithLock[] = ["unsubmitted", "correct", "wrong_attempt1", "wrong_attempt2", "locked"]
  return valid.includes(raw as SectionStatusWithLock) ? (raw as SectionStatusWithLock) : "unsubmitted"
}

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
  const cekPemahamanQuestions =
    (tabConfig.sections?.cekPemahaman.items ?? [])
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
  const questions =
    cekPemahamanQuestions.length > 0
      ? cekPemahamanQuestions
      : tabConfig.assessment

  // Sync server progress into stores via TanStack Query
  const { data: sections } = useSectionProgress(slug, { tab: decodedTab })

  useEffect(() => {
    if (!sections) return
    const store = useAnswerStore.getState()
    for (const s of sections) {
      const sectionKey =
        s.sectionType === "cek-pemahaman" ? "cekPemahaman" : s.sectionType
      if (s.status === "unsubmitted" || s.status === "locked") continue
      if (!s.attempt1Answer) continue

      const finalScore = s.finalScore ?? null

      if (s.sectionType === "cek-pemahaman") {
        try {
          const parsed = JSON.parse(s.attempt1Answer)
          if (Array.isArray(parsed.selections)) {
            store.setSelections(slug, decodedTab, parsed.selections)
          }
          store.setCekPemahamanStatus(slug, decodedTab, narrowSectionStatus(s.status), 1)
          store.setCekPemahamanScore(slug, decodedTab, finalScore)
        } catch {
          continue
        }
      } else {
        try {
          const isAttempt2 = !!s.attempt2Answer
          const parsed = JSON.parse(
            isAttempt2 ? s.attempt2Answer! : s.attempt1Answer,
          ) as Record<string, Record<string, string>>
          for (const [itemId, fields] of Object.entries(parsed)) {
            for (const [fieldKey, value] of Object.entries(fields)) {
              store.setField(
                slug,
                decodedTab,
                sectionKey as "percobaan",
                itemId,
                fieldKey,
                value,
              )
            }
          }
          store.setSectionStatus(
            slug,
            decodedTab,
            sectionKey as "percobaan",
            narrowSectionStatusWithLock(s.status),
            isAttempt2 ? 2 : 1,
          )
        store.setSectionScore(
          slug,
          decodedTab,
          sectionKey as "percobaan",
          finalScore,
        )
        const feedback = isAttempt2 ? s.attempt2Feedback : s.attempt1Feedback
        if (feedback) {
          store.setAIFeedback(
            slug,
            decodedTab,
            sectionKey as "percobaan",
            feedback,
          )
        }
        // Don't set isChecked here — let the user check answers again on second attempt
        } catch {
          continue
        }
      }
    }
  }, [sections, slug, decodedTab])

  // Calculate section progress for this tab
  const tabAnswers = useAnswerStore(
    (s) => s.answers[`${slug}-${decodedTab}`],
  )
  const activeSections = getSectionsForTab(slug, decodedTab)
  const completedCount = activeSections.filter((sec) => {
    if (sec === "cekPemahaman") {
      const cpStatus = tabAnswers?.cekPemahaman?.status
      return cpStatus === "correct" || cpStatus === "wrong_attempt2"
    }
    const s = tabAnswers?.[sec as "percobaan"]
    return s?.status === "correct" || s?.status === "wrong_attempt2"
  }).length

  // Check if this tab is locked for preview-only mode
  const tabProgressList = useTabProgressStore((s) => s.progress[slug])
  const thisTabProgress = tabProgressList?.find((p) => p.tab === decodedTab)
  const tabIndex = tabs.findIndex((t) => t.value === decodedTab)
  const isTabLocked = thisTabProgress
    ? !thisTabProgress.unlocked
    : tabIndex > 0

  // Compute backHref: navigate to latest unlocked tab
  const latestUnlockedTab = tabProgressList
    ? [...tabProgressList].reverse().find((p) => p.unlocked)
    : null
  const backHref = `/modul/${slug}/${latestUnlockedTab?.tab ?? tabs[0].value}`

  return (
    <div className="space-y-3 md:space-y-6">
      {/* Breadcrumb navigation */}
      <QuizBreadcrumb slug={slug} label={label} path="modul" />

      {/* Module title banner */}
      <div className="bg-white border-4 border-black p-3 md:p-4 text-center shadow-[4px_4px_0_0_black] uppercase flex flex-col sm:flex-row items-center justify-between gap-2">
        <Text as="h2" className="text-lg md:text-xl font-black text-black">
          {tabConfig.title.toUpperCase()}
        </Text>
        <Badge
          variant="solid"
          size="sm"
          className="bg-secondary text-white font-black text-xs md:text-sm"
        >
          SELESAI {completedCount}/{activeSections.length} BAGIAN
        </Badge>
      </div>

      {/* Tab navigation bar */}
      <ModuleTabNav slug={slug} tabs={tabs} currentTab={decodedTab} />

      {/* Content area — LockOverlay covers full viewport below navbar when tab is locked */}
      <div className="relative">
        {isTabLocked && (
          <LockOverlay
            title="Tab Belum Terbuka"
            description={`Selesaikan tab ${tabs[tabIndex - 1]?.label ?? "sebelumnya"} terlebih dahulu untuk mulai mengerjakan bagian ini.`}
            fullScreen
            backHref={backHref}
          />
        )}

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
          <ObservationPanel slug={slug} tab={decodedTab} />
        </div>
      </div>

      {/* Penyimpulan: shown on mobile below observation panel, hidden on lg+ (rendered inside left col) */}
      {!(slug === "refleksi" && decodedTab === "bangun") && (
        <div className="lg:hidden">
          <ConclusionArea slug={slug} tab={decodedTab} />
        </div>
      )}

      {/* Assessment section with multiple choice questions */}
      <AssessmentSection
        slug={slug}
        tab={decodedTab}
        questions={questions}
      />

      {/* Navigation buttons — back to apersepsi or forward to next tab / quiz */}
      <div className="flex justify-center gap-3 md:gap-4 pt-3 md:pt-4">
        <Link href={`/apersepsi/${slug}`}>
          <Button
            variant="outline"
            size="lg"
            className="px-4 md:px-8 py-3 md:py-4 text-sm md:text-lg font-black uppercase gap-1.5 md:gap-2"
          >
            <MaterialIcon className="size-4 md:size-6" name="arrow_back" />
            KEMBALI
          </Button>
        </Link>
        <ForwardButton
          slug={slug}
          tab={decodedTab}
          tabs={tabs}
          completedCount={completedCount}
          activeSections={activeSections}
        />
      </div>

      {/* Reset FAB */}
      <ResetButton slug={slug} />
      </div>{/* end relative container */}
    </div>
  )
}

