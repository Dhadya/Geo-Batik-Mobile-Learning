"use client"

import { useCallback } from "react"
import { Lightbulb } from "lucide-react"
import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { useSection } from "../hooks/useObservation"
import type { UraianItem } from "../types"

interface ConclusionAreaProps {
  slug: string
  tab: string
}

/** Penyimpulan section — renders uraian items with special layouts per item. */
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
      <div className="flex items-center gap-4 mb-4">
        <div className="w-8 h-8 md:w-12 md:h-12 border-3 border-black bg-white flex items-center justify-center shrink-0">
          <Lightbulb className="size-4 md:size-6" />
        </div>
        <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
          Penyimpulan
        </Text>
      </div>

      <div className="space-y-6">

        {items.map((item) => {
          if (item.type !== "uraian") return null
          const u = item as UraianItem
          const val = fields[String(u.id)]?.text ?? ""
          const err = errors[`${u.id}_text`]

          // Item 7: Matrix display (2/1) with parentheses + textarea
          if (u.id === 7) {
            return (
              <div key={u.id} className="flex gap-2">
                <span className="text-lg font-black shrink-0 w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-2">
                  <Text as="p" className="text-sm font-medium">
                    Apa arti dari translasi berikut?
                  </Text>
                  <div className="flex items-center justify-center pb-1 gap-0.5">
                    <span className="text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-1 text-sm font-black">
                      <div className="px-1 select-none">2</div>
                      <div className="px-1 select-none">1</div>
                    </div>
                    <span className="text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                    disabled={isChecked}
                    rows={1}
                    placeholder="Tuliskan penjelasanmu..."
                    className={`border-4 border-black font-medium resize-none text-sm ${err ? "border-destructive" : ""}`}
                  />
                  {err && <Text className="text-destructive text-xs">{err}</Text>}
                </div>
              </div>
            )
          }

          // Item 8: Table with formula input
          if (u.id === 8) {
            return (
              <div key={u.id} className="flex gap-2">
                <span className="text-lg font-black shrink-0 w-4 text-right -mt-0.5">•</span>
                <div className="grow space-y-2">
                  <Text as="p" className="text-sm font-medium">
                    Amati percobaanmu.
                  </Text>
                  <Text as="p" className="text-sm font-medium">
                    Jika titik awal (<span className="italic">x, y</span>) ditranslasikan oleh
                  </Text>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-1 text-sm font-black">
                      <div className="px-1 select-none italic">a</div>
                      <div className="px-1 select-none italic">b</div>
                    </div>
                    <span className="text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <Text as="p" className="text-sm font-medium">
                    tentukan titik bayangannya dengan mengisi tabel berikut
                  </Text>
                  <div className="border-4 border-black overflow-hidden bg-background">
                    <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-xs md:text-sm font-black p-2">
                      <div>Titik Awal</div>
                      <div>Translasi oleh</div>
                      <div>Titik Bayangan</div>
                    </div>
                    <div className="grid grid-cols-3 items-center py-3 px-4 text-center text-sm">
                      <div className="italic font-bold">x, y</div>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                        <div className="flex flex-col gap-1 text-sm font-black">
                          <div className="px-1 select-none italic">a</div>
                          <div className="px-1 select-none italic">b</div>
                        </div>
                        <span className="text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                      </div>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-sm font-bold select-none">(</span>
                        <Input
                          type="text"
                          value={val}
                          onChange={(e) => setField(String(u.id), "text", e.target.value)}
                          disabled={isChecked}
                          placeholder="...,..."
                          className={`w-20 text-center p-1 font-black border-2 text-xs h-7 shadow-none ${err ? "border-destructive bg-destructive-container" : "border-black"}`}
                        />
                        <span className="text-sm font-bold select-none">)</span>
                      </div>
                    </div>
                  </div>
                  {err && <Text className="text-destructive text-xs">{err}</Text>}
                </div>
              </div>
            )
          }

          // Item 9 and others: standard uraian
          return (
            <div key={u.id} className="flex gap-2">
              <span className="text-lg font-black shrink-0 w-4 text-right -mt-0.5">•</span>
              <div className="grow space-y-1">
                <Text as="p" className="text-sm font-medium">
                  {u.question}
                </Text>
                <Textarea
                  value={val}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                  disabled={isChecked}
                  rows={1}
                  placeholder="Tuliskan jawabanmu..."
                  className={`border-4 border-black font-medium resize-none text-sm ${err ? "border-destructive" : ""}`}
                />
                {err && <Text className="text-destructive text-xs">{err}</Text>}
              </div>
            </div>
          )
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
          className="w-full font-bold py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
        >
          {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
        </Button>
      </div>
    </section>
  )
}
