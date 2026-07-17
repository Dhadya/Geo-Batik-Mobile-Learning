import { useCallback, useMemo, useState } from "react"
import { toast } from "sonner"
import { useAnswerStore, emptyTab } from "../store/answerStore"
import { getModuleTab } from "../data"
import { validateSection } from "../lib/validation"
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

/** Generic hook for reading/writing/validating any section from answerStore. */
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

  const boundSetField = useCallback(
    (itemId: string, fieldKey: string, value: string) => {
      setField(slug, tab, section, itemId, fieldKey, value)
    },
    [setField, slug, tab, section],
  )

  const boundSetChecked = useCallback(
    (checked: boolean) => setChecked(slug, tab, section, checked),
    [setChecked, slug, tab, section],
  )

  const isFilled = isSectionFilled(items, fields)

  const handleSubmit = useCallback(async () => {
    const result = validateSection(items, fields, undefined)
    setErrors_(result.errors)
    boundSetChecked(true)

    if (result.isCorrect) {
      toast.success(result.summary)
    } else {
      toast.error(result.summary)
    }
  }, [items, fields, boundSetChecked])

  return {
    items,
    fields,
    errors: isChecked ? errors : {},
    isChecked,
    isFilled,
    aiFeedback,
    setField: boundSetField,
    setAIFeedback,
    setChecked: boundSetChecked,
    setErrors: setErrors_,
    handleSubmit,
    block,
  }
}
