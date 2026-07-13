"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { Select } from "@/components/retroui/Select"
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
              <div key={u.id} className="flex gap-2">
                <span className="text-lg font-black shrink-0 w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-1">
                  <Text as="p" className="text-sm font-medium">
                    {u.question}
                  </Text>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setField(String(u.id), "text", e.target.value)
                    }
                    disabled={isChecked}
                    rows={5}
                    className={`border-4 border-black font-medium resize-none min-h-28 ${err ? "border-destructive" : ""}`}
                  />
                  {err && <Text className="text-destructive text-xs">{err}</Text>}
                </div>
              </div>
            )
          }
          case "memasangkan": {
            const m = item as MemasangkanItem
            return (
              <div key={m.id} className="flex gap-2">
                <span className="text-lg font-black shrink-0 w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-3">
                  <Text as="p" className="text-sm font-medium">
                    {m.question}
                  </Text>
                  <div className="space-y-2">
                    {m.leftItems.map((left) => {
                      const selected = fields[String(m.id)]?.[left.id] ?? ""
                      const err = errors[`${m.id}_${left.id}`]
                      return (
                        <div key={left.id} className="flex items-center gap-2">
                          <div className="border-2 border-black px-8 py-1 font-bold text-sm shrink-0 text-center min-w-12">
                            {left.label}
                          </div>
                          <span className="text-lg font-bold">→</span>
                          <Select
                            value={selected || null}
                            onValueChange={(val) => setField(String(m.id), left.id, val ?? "")}
                          >
                            <Select.Trigger
                              disabled={isChecked}
                              className={`h-8 border-2 border-black font-semibold text-xs bg-white min-w-32 shadow-none ${err ? "border-destructive" : ""}`}
                            >
                              <Select.Value placeholder="Pilih..." />
                            </Select.Trigger>
                            <Select.Content className="bg-white">
                              {m.rightItems.map((right) => (
                                <Select.Item key={right.id} value={right.id} className="text-xs">
                                  {right.label}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
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
