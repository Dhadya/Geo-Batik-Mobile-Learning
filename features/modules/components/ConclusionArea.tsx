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
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-black bg-white flex items-center justify-center shrink-0">
          <Lightbulb className="size-6 md:size-8" />
        </div>
        <div className="grow space-y-6">
          <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
            Penyimpulan
          </Text>

          {items.map((item) => {
            if (item.type !== "uraian") return null
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            // Item 7: Matrix display (2/1) + textarea
            if (u.id === 7) {
              return (
                <div key={u.id} className="flex gap-2">
                  <span className="text-lg font-black shrink-0 w-4 text-right -mt-0.5">•</span>
                  <div className="grow space-y-2">
                    <Text as="p" className="font-medium">
                      Apa arti dari translasi berikut
                    </Text>
                    <div className="flex justify-center">
                      <div className="text-center text-2xl font-bold leading-tight">
                        <div className="border-t-2 border-b-2 border-l-2 border-r-0 border-black px-3 py-1 inline-block">
                          <div className="px-2">2</div>
                          <div className="px-2">1</div>
                        </div>
                      </div>
                    </div>
                    <Textarea
                      value={val}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                      disabled={isChecked}
                      rows={3}
                      className={`border-4 border-black font-semibold resize-none ${err ? "border-destructive" : ""}`}
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
                    <Text as="p" className="font-medium">
                      Amati percobaanmu.
                    </Text>
                    <Text as="p" className="font-medium">
                      Jika titik awal (<span className="italic">x, y</span>) ditranslasikan oleh
                    </Text>
                    <div className="flex justify-center">
                      <div className="text-center text-2xl font-bold leading-tight">
                        <div className="border-t-2 border-b-2 border-l-2 border-r-0 border-black px-3 py-1 inline-block">
                          <div className="px-2 italic">a</div>
                          <div className="px-2 italic">b</div>
                        </div>
                      </div>
                    </div>
                    <Text as="p" className="font-medium">
                      , tentukan titik bayangannya dengan mengisi tabel berikut
                    </Text>
                    <div className="border-4 border-black overflow-hidden">
                      <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-xs font-black p-2 uppercase">
                        <div>Titik Awal</div>
                        <div>Translasi oleh</div>
                        <div>Titik Bayangan</div>
                      </div>
                      <div className="grid grid-cols-3 items-center py-3 px-4 text-center text-lg">
                        <div className="italic font-bold">x, y</div>
                        <div className="flex justify-center">
                          <div className="text-center text-xl font-bold leading-tight">
                            <div className="border-t-2 border-b-2 border-l-2 border-r-0 border-black px-2 py-0.5 inline-block">
                              <div className="px-1 italic">a</div>
                              <div className="px-1 italic">b</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Input
                            type="text"
                            value={val}
                            onChange={(e) => setField(String(u.id), "text", e.target.value)}
                            disabled={isChecked}
                            placeholder="(...,...)"
                            className={`w-32 text-center font-bold border-4 border-black ${err ? "border-destructive" : ""}`}
                          />
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
                  <Text as="p" className="font-medium">
                    {u.question}
                  </Text>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                    disabled={isChecked}
                    rows={3}
                    className={`border-4 border-black font-semibold resize-none ${err ? "border-destructive" : ""}`}
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
            className="w-full font-bold py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] !rounded-none"
          >
            {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
          </Button>
        </div>
      </div>
    </section>
  )
}
