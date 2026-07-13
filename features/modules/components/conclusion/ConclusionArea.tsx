"use client"

import { useCallback, useState } from "react"
import { Lightbulb } from "lucide-react"
import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { useSection } from "../../hooks/useObservation"
import type { UraianItem } from "../../types"

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

  const [item11Err, setItem11Err] = useState<string>("")

  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(false)
      setErrors({})
      setItem11Err("")
    } else {
      handleSubmit()
    }
  }, [isChecked, setChecked, setErrors, handleSubmit])

  const validateItem11 = (aVal: string, bVal: string) => {
    if (!aVal.trim() && !bVal.trim()) {
      setItem11Err("")
      return
    }
    if (aVal.trim().toLowerCase() === "a" && bVal.trim().toLowerCase() === "b") {
      setItem11Err("")
    } else {
      setItem11Err("Jawaban kurang tepat")
    }
  }

  return (
    <section className="border-4 border-black bg-white shadow-lg p-3 md:p-6">
      <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
        <div className="w-8 h-8 md:w-12 md:h-12 border-3 border-black bg-white flex items-center justify-center shrink-0">
          <Lightbulb className="size-4 md:size-6" />
        </div>
        <Text as="h2" className="text-lg md:text-2xl font-black uppercase">
          Penyimpulan
        </Text>
      </div>

      <div className="space-y-4 md:space-y-6">

        {items.map((item) => {
          if (item.type !== "uraian") return null
          const u = item as UraianItem

          // Item 11: Matriks input (fill in the translation vector)
          if (u.id === 11) {
            const aVal = fields["11"]?.a_val ?? ""
            const bVal = fields["11"]?.b_val ?? ""

            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5">-</span>
                <div className="grow space-y-2 md:space-y-3">
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    Jika salah satu titik sebuah bangun ditranslasikan oleh
                  </Text>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                      <div className="px-1 md:px-2 italic select-none">a</div>
                      <div className="px-1 md:px-2 italic select-none">b</div>
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <Text as="p" className="text-xs md:text-sm font-medium text-center">
                    maka seluruh titik lainnya ditranslasikan oleh
                  </Text>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                      <Input
                        type="text"
                        value={aVal}
                        onChange={(e) => {
                          setField("11", "a_val", e.target.value)
                          validateItem11(e.target.value, bVal)
                        }}
                        disabled={isChecked}
                        placeholder="..."
                        className={`w-12 md:w-14 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${item11Err ? "border-destructive" : "border-black"}`}
                      />
                      <Input
                        type="text"
                        value={bVal}
                        onChange={(e) => {
                          setField("11", "b_val", e.target.value)
                          validateItem11(aVal, e.target.value)
                        }}
                        disabled={isChecked}
                        placeholder="..."
                        className={`w-12 md:w-14 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${item11Err ? "border-destructive" : "border-black"}`}
                      />
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  {isChecked && item11Err && <Text className="text-destructive text-[10px] md:text-xs font-bold text-center">{item11Err}</Text>}
                </div>
              </div>
            )
          }

          // Item 7: Matrix display (2/1) with textarea
          if (u.id === 7) {
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5">-</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    Apa arti dari translasi berikut
                  </Text>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                      <div className="px-2 md:px-3 py-0.5 select-none">2</div>
                      <div className="px-2 md:px-3 py-0.5 select-none">1</div>
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                    disabled={isChecked}
                    rows={3}
                    placeholder="Tuliskan penjelasanmu..."
                    className={`border-4 border-black font-medium resize-none text-xs md:text-sm ${err ? "border-destructive" : ""}`}
                  />
                  {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
                </div>
              </div>
            )
          }

          // Item 8: Table with formula input
          if (u.id === 8) {
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5">-</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    Amati percobaanmu.
                  </Text>
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    Jika titik awal (<span className="italic">x, y</span>) ditranslasikan oleh
                  </Text>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                      <div className="px-1 select-none italic">a</div>
                      <div className="px-1 select-none italic">b</div>
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <Text as="p" className="text-xs md:text-sm font-medium">
                    , tentukan titik bayangannya dengan mengisi tabel berikut
                  </Text>
                  <div className="border-4 border-black overflow-hidden bg-background">
                    <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
                      <div>Titik Awal</div>
                      <div>Translasi oleh</div>
                      <div>Titik Bayangan</div>
                    </div>
                    <div className="grid grid-cols-3 items-center py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">
                      <div className="italic font-bold">x, y</div>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                        <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                          <div className="px-1 select-none italic">a</div>
                          <div className="px-1 select-none italic">b</div>
                        </div>
                        <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                      </div>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-xs md:text-sm font-bold select-none">(</span>
                        <Input
                          type="text"
                          value={val}
                          onChange={(e) => setField(String(u.id), "text", e.target.value)}
                          disabled={isChecked}
                          placeholder="...,..."
                          className={`w-16 md:w-20 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${err ? "border-destructive bg-destructive-container" : "border-black"}`}
                        />
                        <span className="text-xs md:text-sm font-bold select-none">)</span>
                      </div>
                    </div>
                  </div>
                  {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
                </div>
              </div>
            )
          }

          // Items 9, 10 and other standard uraian items
          const val = fields[String(u.id)]?.text ?? ""
          const err = errors[`${u.id}_text`]

          return (
            <div key={u.id} className="flex gap-1.5 md:gap-2">
              <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-0.5">-</span>
              <div className="grow space-y-1">
                <Text as="p" className="text-xs md:text-sm font-medium">
                  {u.question}
                </Text>
                <Textarea
                  value={val}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                  disabled={isChecked}
                  rows={3}
                  placeholder="Tuliskan jawabanmu..."
                  className={`border-4 border-black font-medium resize-none text-xs md:text-sm ${err ? "border-destructive" : ""}`}
                />
                {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
              </div>
            </div>
          )
        })}

        {isChecked && aiFeedback && (
          <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 rounded-none">
            <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
          </div>
        )}

        <Button
          onClick={handleClick}
          disabled={!isFilled && !isChecked}
          variant={isChecked ? "secondary" : "default"}
          className="w-full font-bold py-2 md:py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
        >
          {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
        </Button>
      </div>
    </section>
  )
}
