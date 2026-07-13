"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { useSection } from "@/features/modules/hooks/useObservation"
import type { UraianItem, MemasangkanItem } from "@/features/modules/types"

interface PengamatanTitikFormProps {
  slug: string
  tab: string
}

/** Pengamatan form for translasi titik — renders uraian + memasangkan items from section data. */
export function PengamatanTitikForm({ slug, tab }: PengamatanTitikFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, setChecked, setErrors, block,
  } = useSection(slug, tab, "pengamatan")

  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(false)
      setErrors({})
    } else {
      handleSubmit()
    }
  }, [isChecked, setChecked, setErrors, handleSubmit])

  return (
    <form className="space-y-4">
      {block?.instruction && (
        <Text as="p" className="text-sm text-muted-foreground font-semibold leading-relaxed">
          {block.instruction}
        </Text>
      )}

      {items.map((item) => {
        switch (item.type) {
          case "uraian": {
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]
            return (
              <div key={u.id} className="space-y-2">
                <Text as="p" className="text-sm font-medium">
                  {u.id}. {u.question}
                </Text>
                <Textarea
                  value={val}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setField(String(u.id), "text", e.target.value)
                  }
                  disabled={isChecked}
                  rows={3}
                  className={`border-4 border-black font-semibold resize-none ${err ? "border-destructive" : ""}`}
                />
                {err && <Text className="text-destructive text-xs mt-1">{err}</Text>}
              </div>
            )
          }
          case "memasangkan": {
            const m = item as MemasangkanItem
            return (
              <div key={m.id} className="space-y-2">
                <Text as="p" className="text-sm font-medium">
                  {m.id}. {m.question}
                </Text>
                <div className="space-y-2">
                  {m.leftItems.map((left) => {
                    const selected = fields[String(m.id)]?.[left.id] ?? ""
                    const err = errors[`${m.id}_${left.id}`]
                    return (
                      <div key={left.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                        <span className="font-bold text-sm text-right">{left.label}</span>
                        <span className="text-lg font-bold">→</span>
                        <select
                          value={selected}
                          onChange={(e) => setField(String(m.id), left.id, e.target.value)}
                          disabled={isChecked}
                          className={`border-4 border-black p-1.5 font-semibold text-sm bg-white ${err ? "border-destructive" : ""}`}
                        >
                          <option value="">Pilih...</option>
                          {m.rightItems.map((right) => (
                            <option key={right.id} value={right.id}>
                              {right.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  })}
                </div>
                {m.leftItems.some((l) => errors[`${m.id}_${l.id}`]) && (
                  <Text className="text-destructive text-xs">
                    Ada pasangan yang belum tepat
                  </Text>
                )}
              </div>
            )
          }
          default:
            return null
        }
      })}

      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-4 rounded-none">
          <Text className="text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}

      <Button
        onClick={handleClick}
        disabled={!isFilled && !isChecked}
        variant={isChecked ? "secondary" : "default"}
        className="w-full font-bold py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] !rounded-none"
      >
        {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
      </Button>
    </form>
  )
}
