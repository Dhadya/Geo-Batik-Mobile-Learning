import { useCallback, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { useAnswerStore, emptyTab } from "../store/answerStore"
import { getModuleTab } from "../data"
import { evaluateSection } from "../lib/evaluateSection"
import { persistSectionAttempt } from "../lib/persistSectionAttempt"
import { triggerTabUnlockIfComplete } from "../lib/progressSync"
import type { SectionItem, SectionBlock } from "../types"

type SectionName = "percobaan" | "pengamatan" | "penyimpulan"

/** Check whether all fields for a set of items are filled. */
function isSectionFilled(items: SectionItem[], fields: Record<string, Record<string, string>>): boolean {
  return items.every((item) => {
    const f = fields[String(item.id)] ?? {}
    if (item.type === "matriks") return f.a !== "" && f.a !== undefined && f.b !== "" && f.b !== undefined
    if (item.type === "koordinat") return f.x !== "" && f.x !== undefined && f.y !== "" && f.y !== undefined
    if (item.type === "uraian") {
      if (item.id === 11) return (f.a_val ?? "").trim() !== "" && (f.b_val ?? "").trim() !== ""
      return (f.text ?? "").trim() !== ""
    }
    if (item.type === "memasangkan") {
      const m = item as import("../types").MemasangkanItem
      return m.leftItems.every((l) => (f[l.id] ?? "") !== "")
    }
    if (item.type === "pilihan_ganda") return (f.selected ?? "") !== ""
    if (item.type === "urutkan") return (f.order ?? "").trim() !== ""
    if (item.type === "pilihan_refleksi") {
      const selected = f.selected ?? ""
      if (!selected) return false
      const pr = item as import("../types").PilihanRefleksiItem
      const correctAnswers = pr.correctAnswers[selected]
      if (!correctAnswers) return false
      return correctAnswers.every((_, idx) => (f[`x${idx}`] ?? "") !== "" && (f[`y${idx}`] ?? "") !== "")
    }
    if (item.type === "checklist_table") {
      const ct = item as import("../types").ChecklistTableItem
      return ct.statements.every((_, idx) => (f[`statement_${idx}`] ?? "") !== "")
    }
    return false
  })
}

/** Generic hook for reading/writing/validating any section from answerStore with two-attempt AI flow. */
export function useSection(slug: string, tab: string, section: SectionName) {
  const tabConfig = getModuleTab(slug, tab)

  const tabKey = useMemo(() => `${slug}-${tab}`, [slug, tab])
  const rawTab = useAnswerStore((s) => s.answers[tabKey])
  const answers = useMemo(() => rawTab ?? emptyTab(slug, tab), [rawTab, slug, tab])

  const setField = useAnswerStore((s) => s.setField)
  const setChecked = useAnswerStore((s) => s.setChecked)
  const setAIFeedback = useAnswerStore((s) => s.setAIFeedback)

  const block = tabConfig?.sections?.[section] as SectionBlock | undefined
  const items = useMemo(() => block?.items ?? [], [block])
  const sectionAnswers = answers[section]
  const fields = useMemo(() => sectionAnswers?.fields ?? {}, [sectionAnswers])
  const isChecked = sectionAnswers?.isChecked ?? false
  const aiFeedback = sectionAnswers?.aiFeedback

  const [errors, setErrors_] = useState<Record<string, string>>({})
  const submittingRef = useRef(false)

  // Derive evaluation state directly from the persisted store state
  const storedAttempt = sectionAnswers?.attempt ?? 1
  const { isLocked, attempt, showCobaLagi, isCorrectEvaluation } = useMemo(() => {
    const status = sectionAnswers?.status
    if (status === "correct") {
      return {
        isLocked: true,
        attempt: (sectionAnswers.attempt ?? 1) as 1 | 2,
        showCobaLagi: false,
        isCorrectEvaluation: true as boolean | null,
      }
    }
    if (status === "wrong_attempt2") {
      return {
        isLocked: true,
        attempt: 2 as 1 | 2,
        showCobaLagi: false,
        isCorrectEvaluation: false as boolean | null,
      }
    }
    if (status === "wrong_attempt1") {
      return {
        isLocked: false,
        attempt: 1 as 1 | 2,
        showCobaLagi: true,
        isCorrectEvaluation: false as boolean | null,
      }
    }
    return {
      isLocked: false,
      attempt: storedAttempt as 1 | 2,
      showCobaLagi: false,
      isCorrectEvaluation: null as boolean | null,
    }
  }, [sectionAnswers, storedAttempt])

  const boundSetField = useCallback(
    (itemId: string, fieldKey: string, value: string) => {
      setField(slug, tab, section, itemId, fieldKey, value)
    },
    [setField, slug, tab, section],
  )

  // setChecked is a stable Zustand function — safe in deps
  const boundSetChecked = useCallback(
    (checked: boolean) => setChecked(slug, tab, section, checked),
    [setChecked, slug, tab, section],
  )

  const boundSetAIFeedback = useCallback(
    (feedback: string) => setAIFeedback(slug, tab, section, feedback),
    [setAIFeedback, slug, tab, section],
  )

  const isFilled = isSectionFilled(items, fields)

  /** Reset evaluation state — called when user clicks "Periksa Jawaban Lagi" (attempt 2). */
  const handleCobaLagi = useCallback(() => {
    useAnswerStore.getState().setSectionStatus(slug, tab, section, "unsubmitted", 2)
    boundSetChecked(false)
    setErrors_({})
  }, [slug, tab, section, boundSetChecked])

  const handleSubmit = useCallback(async () => {
    if (isLocked || submittingRef.current) return
    submittingRef.current = true

    try {
      const result = await evaluateSection(slug, tab, section, items, fields, attempt)
      setErrors_(result.errors)
      boundSetAIFeedback(result.feedback)

      useAnswerStore.getState().setSectionScore(slug, tab, section, result.score)

      if (result.isCorrect) {
        boundSetChecked(true)
        useAnswerStore.getState().setSectionStatus(slug, tab, section, "correct", attempt)
        toast.success("Jawaban kamu benar, selamat!")
        await persistSectionAttempt({
          slug, tab, sectionType: section, attempt,
          answer: fields, feedback: result.feedback, score: result.score,
          status: "correct",
        })
        await triggerTabUnlockIfComplete(slug, tab)
      } else if (attempt === 1) {
        boundSetChecked(true)
        useAnswerStore.getState().setSectionStatus(slug, tab, section, "wrong_attempt1", 2)
        toast.error("Jawaban kamu kurang tepat, tersisa satu kesempatan lagi")
        await persistSectionAttempt({
          slug, tab, sectionType: section, attempt,
          answer: fields, feedback: result.feedback, score: result.score,
          status: "wrong_attempt1",
        })
      } else {
        boundSetChecked(true)
        useAnswerStore.getState().setSectionStatus(slug, tab, section, "wrong_attempt2", 2)
        toast.error("Jawaban kamu masih kurang tepat, kesempatan habis")
        await persistSectionAttempt({
          slug, tab, sectionType: section, attempt,
          answer: fields, feedback: result.feedback, score: result.score,
          status: "wrong_attempt2",
        })
        await triggerTabUnlockIfComplete(slug, tab)
      }
    } finally {
      submittingRef.current = false
    }
  }, [attempt, isLocked, slug, tab, section, items, fields, boundSetChecked, boundSetAIFeedback, setErrors_])

  return {
    items,
    fields,
    errors: isChecked ? errors : {},
    isChecked,
    isFilled,
    aiFeedback,
    attempt,
    isLocked,
    showCobaLagi,
    isCorrectEvaluation,
    handleCobaLagi,
    setField: boundSetField,
    setAIFeedback,
    setChecked: boundSetChecked,
    setErrors: setErrors_,
    handleSubmit,
    block,
  }
}
