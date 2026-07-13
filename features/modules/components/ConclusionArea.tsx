"use client"

import { useCallback } from "react"
import { Lightbulb } from "lucide-react"
import { Text } from "@/components/retroui/Text"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { useSection } from "../hooks/useObservation"
import type { UraianItem } from "../types"

interface ConclusionAreaProps {
  slug: string
  tab: string
}

/** Penyimpulan section — renders uraian items with validation + AI feedback. */
export function ConclusionArea({ slug, tab }: ConclusionAreaProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, setChecked, setErrors,
  } = useSection(slug, tab, "penyimpulan")

  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(false)
      setErrors({})
    } else {
      handleSubmit()
    }
  }, [isChecked, setChecked, setErrors, handleSubmit])

  return (
    <section className="border-4 border-black bg-white shadow-lg p-4 md:p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-black bg-white flex items-center justify-center shrink-0">
          <Lightbulb className="size-6 md:size-8" />
        </div>
        <div className="grow space-y-3">
          <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
            Penyimpulan
          </Text>

          {items.map((item) => {
            if (item.type !== "uraian") return null
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            return (
              <div key={u.id} className="flex gap-3">
                <span className="text-lg font-black shrink-0 w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-1">
                  <Text as="p" className="whitespace-pre-wrap font-medium">
                    {u.question}
                  </Text>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                    disabled={isChecked}
                    rows={2}
                    className={`border-4 border-black font-semibold resize-none ${err ? "border-destructive" : ""}`}
                  />
                  {err && <Text className="text-destructive text-sm">{err}</Text>}
                </div>
              </div>
            )
          })}

          {isChecked && aiFeedback && (
            <div className="border-4 border-primary bg-primary/5 p-4 rounded-none">
              <Text className="text-sm font-semibold whitespace-pre-wrap">
                {aiFeedback}
              </Text>
            </div>
          )}

          <Button
            onClick={handleClick}
            disabled={!isFilled && !isChecked}
            variant={isChecked ? "secondary" : "default"}
            className="w-full font-bold py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          >
            {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
          </Button>
        </div>
      </div>
    </section>
  )
}
