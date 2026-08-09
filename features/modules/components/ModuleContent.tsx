"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { useEffect, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
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
  // Memoized so the useEffect that uses questions for index lookup doesn't capture a stale reference.
  const questions = useMemo(() => {
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
        hint: i.hint,
        explanation: i.explanation,
      }))
    // Fallback to legacy assessment prop if no sections defined
    return cekPemahamanQuestions.length > 0 ? cekPemahamanQuestions : tabConfig.assessment
  }, [tabConfig])

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
          const isAttempt2 = !!s.attempt2Answer

          // Guard against optimistic-update flash: the onMutate cache snapshot for attempt 2
          // has no attempt2Answer yet, so without this guard the effect would hydrate selections
          // from attempt1Answer, causing a brief flash of the old wrong answer.
          // If the server data has no attempt2Answer but the store already holds correct or wrong_attempt2
          // (written moments ago by doSubmit), skip this stale cache entry — the real refetch
          // will arrive shortly with the correct attempt2Answer.
          const currentStoreStatus = store.getTabAnswers(slug, decodedTab).cekPemahaman.status
          if (!isAttempt2 && (currentStoreStatus === "correct" || currentStoreStatus === "wrong_attempt2")) continue

          const rawAnswer = isAttempt2 ? s.attempt2Answer! : s.attempt1Answer
          const parsed = JSON.parse(rawAnswer)
          if (Array.isArray(parsed.selections)) {
            store.setSelections(slug, decodedTab, parsed.selections)
          } else if (typeof parsed === "object" && parsed !== null) {
            // Answer was saved as fields format: { "1": { selected: "0" }, "2": { selected: "1" } }
            const selMap: Record<number, number> = {}
            for (const [id, fieldObj] of Object.entries(parsed)) {
              const selectedVal = (fieldObj as Record<string, string>)?.selected
              if (selectedVal != null) {
                const qIdx = questions.findIndex((q) => String(q.id) === id)
                if (qIdx !== -1) {
                  selMap[qIdx] = Number(selectedVal)
                }
              }
            }
            // Build a full array matching the number of questions, filling missing entries with null
            const fullSelArray: (number | null)[] = new Array(questions.length).fill(null)
            for (const [idxStr, val] of Object.entries(selMap)) {
              const idx = Number(idxStr)
              if (idx >= 0 && idx < fullSelArray.length) {
                fullSelArray[idx] = val
              }
            }
            store.setSelections(slug, decodedTab, fullSelArray)
          }
          const status = narrowSectionStatus(s.status)
          store.setCekPemahamanStatus(slug, decodedTab, status, isAttempt2 ? 2 : 1)
          store.setCekPemahamanScore(slug, decodedTab, finalScore)

          const feedback = isAttempt2 ? s.attempt2Feedback : s.attempt1Feedback
          if (feedback) {
            store.setCekPemahamanFeedback(slug, decodedTab, feedback)
          }
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
          const status = narrowSectionStatusWithLock(s.status)
          store.setSectionStatus(
            slug,
            decodedTab,
            sectionKey as "percobaan",
            status,
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

          // Hydrate isChecked & fieldColors so previous answers show colored inputs & lock buttons correctly
          const currentTabConfig = getModuleTab(slug, decodedTab)
          const block = currentTabConfig?.sections?.[sectionKey as keyof typeof currentTabConfig.sections]
          if (block?.items) {
            const hasPilihanRefleksi = block.items.some((item) => item.type === "pilihan_refleksi")
            const evalItems = hasPilihanRefleksi
              ? block.items.filter((item) => item.type !== "koordinat")
              : block.items
            import("../lib/validation").then(({ validateSection }) => {
              const localRes = validateSection(evalItems, parsed, undefined)
              store.setSectionFieldColors(
                slug,
                decodedTab,
                sectionKey as "percobaan",
                localRes.fieldColors,
              )
            })
          }

          if (status === "correct" || status === "wrong_attempt2" || status === "wrong_attempt1") {
            store.setChecked(
              slug,
              decodedTab,
              sectionKey as "percobaan",
              true,
            )
          }
        } catch {
          continue
        }
      }
    }
  }, [sections, slug, decodedTab, questions])

  // Mount-time self-heal: if the client store says this tab is complete but the server
  // hasn't unlocked the next one yet (e.g. a persist failed mid-flow), reconcile + unlock.
  useEffect(() => {
    const tabProgressList = useTabProgressStore.getState().getProgress(slug)
    const tabRow = tabProgressList?.find((p) => p.tab === decodedTab)
    if (tabRow?.completed) return
    import("../lib/progressSync").then(({ triggerTabUnlockIfComplete }) =>
      triggerTabUnlockIfComplete(slug, decodedTab),
    )
  }, [sections, slug, decodedTab, tabConfig])

  // Prefetch the next tab's section progress so navigating forward is instant
  const queryClient = useQueryClient()
  const currentTabIndex = tabs.findIndex((t) => t.value === decodedTab)
  const nextTabValue = tabs[currentTabIndex + 1]?.value
  useEffect(() => {
    if (!nextTabValue) return
    queryClient.prefetchQuery({
      queryKey: ["section-progress", slug, nextTabValue, undefined],
      queryFn: async () => {
        const response = await fetch(
          `/api/modul/${slug}/section?tab=${encodeURIComponent(nextTabValue)}`,
          { cache: "no-store" },
        )
        const body = await response.json()
        if (!body.ok) return []
        return body.data?.sections ?? []
      },
      staleTime: 30 * 1000,
    })
  }, [slug, nextTabValue, queryClient])

  // Calculate section progress for this tab
  const tabAnswers = useAnswerStore(
    (s) => s.answers[`${slug}-${decodedTab}`],
  )
  const activeSections = getSectionsForTab(slug, decodedTab)
  const incompleteSections = activeSections.filter((sec) => {
    if (sec === "cekPemahaman") {
      const cpStatus = tabAnswers?.cekPemahaman?.status
      return cpStatus !== "correct" && cpStatus !== "wrong_attempt2"
    }
    const s = tabAnswers?.[sec as "percobaan"]
    return s?.status !== "correct" && s?.status !== "wrong_attempt2"
  })
  const completedCount = activeSections.length - incompleteSections.length

  // Check if this tab is locked for preview-only mode
  const tabProgressList = useTabProgressStore((s) => s.progress[slug])
  const thisTabProgress = tabProgressList?.find((p) => p.tab === decodedTab)
  const tabIndex = tabs.findIndex((t) => t.value === decodedTab)
  const isTabLocked = thisTabProgress
    ? !thisTabProgress.unlocked
    : tabIndex > 0

  // Compute backHref: navigate to the last unlocked tab in tab order (rows from the
  // server are unordered, so scan the canonical tabs array instead of reversing the list)
  const backIndex = tabs.reduce((last, t, i) => {
    const p = tabProgressList?.find((x) => x.tab === t.value)
    return p?.unlocked ? i : last
  }, 0)
  const backHref = `/modul/${slug}/${tabs[backIndex].value}`

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
            description={`Tab ini terkunci. Selesaikan seluruh bagian pada tab ${tabs[tabIndex - 1]?.label ?? "sebelumnya"} terlebih dahulu, sampai benar atau setelah 2 kali percobaan, untuk membuka tab ini.`}
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
        <div className="mt-4 md:mt-6 lg:hidden">
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
          incompleteSections={incompleteSections}
        />
      </div>

      {/* Reset FAB */}
      <ResetButton slug={slug} />
      </div>{/* end relative container */}
    </div>
  )
}

