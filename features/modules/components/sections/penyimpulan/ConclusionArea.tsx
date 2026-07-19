"use client"

import { useCallback, useState } from "react"
import { Lightbulb } from "lucide-react"
import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { UrutkanInput } from "../../shared/UrutkanInput"
import { useSection } from "../../../hooks/useObservation"
import type { UraianItem, UrutkanItem as UrutkanItemType } from "../../../types"

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

  // Map tab to reflection label for conclusion table
  const reflectionLabels: Record<string, string> = {
    "sumbu-x": "Sumbu x",
    "sumbu-y": "Sumbu y",
    "titik": "Titik (0,0)",
    "garis-x=y": "Garis x=y",
    "garis-x=-y": "Garis x=-y",
    "garis-x=h": "Garis x=h",
    "garis-y=h": "Garis y=h",
    "garis": "Ruas Garis",
  }
  const reflectLabel = reflectionLabels[tab] ?? tab

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
          // Urutkan type: drag-and-drop sorting
          if (item.type === "urutkan") {
            const ur = item as UrutkanItemType
            const val = fields[String(ur.id)]?.order ?? ""
            const err = errors[`${ur.id}_order`]

            return (
              <div key={ur.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <Text as="p" className="text-xs md:text-sm font-medium text-black">
                    {ur.question}
                  </Text>
                  <UrutkanInput
                    items={ur.items}
                    value={val}
                    onChange={(order) => setField(String(ur.id), "order", order)}
                    disabled={isChecked}
                  />
                  {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
                </div>
              </div>
            )
          }

          if (item.type !== "uraian") return null
          const u = item as UraianItem

          // Item 11: Matriks input (fill in the translation vector)
          if (u.id === 11) {
            const aVal = fields["11"]?.a_val ?? ""
            const bVal = fields["11"]?.b_val ?? ""

            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-2 md:space-y-3">
                  <div className="flex items-center gap-0.5">
                    <p className="text-xs md:text-sm text-black">
                      Jika salah satu titik sebuah bangun ditranslasikan oleh
                    </p>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
                      <div className="px-1 italic select-none">a</div>
                      <div className="px-1 italic select-none">b</div>
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <p className="text-xs md:text-sm font-medium text-black">
                      maka seluruh titik lainnya ditranslasikan oleh
                    </p>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
                      <Input
                        type="text"
                        value={aVal}
                        onChange={(e) => {
                          setField("11", "a_val", e.target.value)
                          validateItem11(e.target.value, bVal)
                        }}
                        disabled={isChecked}
                        placeholder="..."
                        className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${item11Err ? "border-destructive" : "border-black"}`}
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
                        className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${item11Err ? "border-destructive" : "border-black"}`}
                      />
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  {isChecked && item11Err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{item11Err}</Text>}
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
                <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-0.5">
                    <Text as="p" className="text-xs md:text-sm font-medium text-black">
                      Apa arti dari translasi berikut.
                    </Text>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                    <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
                      <div className="px-1 select-none">2</div>
                      <div className="px-1 select-none">1</div>
                    </div>
                    <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                  </div>
                  <Textarea
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                    disabled={isChecked}
                    rows={2}
                    placeholder="Tuliskan penjelasanmu..."
                    className={`border-4 border-black font-medium resize-none text-xs md:text-sm text-black ${err ? "border-destructive" : ""}`}
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
                <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-1.5 md:space-y-2">
                  <Text as="p" className="text-xs md:text-sm font-medium text-black">
                    Amati percobaanmu.
                  </Text>
                  {slug === "refleksi" ? (
                    <div className="flex items-center gap-0.5">
                      <Text as="p" className="text-xs md:text-sm font-medium text-black">
                        Jika titik awal (<span className="italic">x, y</span>) direfleksikan terhadap {reflectLabel}
                      </Text>
                      <Text as="p" className="text-xs md:text-sm font-medium text-black">
                        , tentukan titik bayangannya dengan mengisi tabel berikut.
                      </Text>
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5">
                      <Text as="p" className="text-xs md:text-sm font-medium text-black">
                        Jika titik awal (<span className="italic">x, y</span>) ditranslasikan oleh
                      </Text>
                      <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                      <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
                        <div className="px-1 select-none italic">a</div>
                        <div className="px-1 select-none italic">b</div>
                      </div>
                      <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                      <Text as="p" className="text-xs md:text-sm font-medium text-black">
                        , tentukan titik bayangannya dengan mengisi tabel berikut.
                      </Text>
                    </div>
                  )}
                  <div className="border-4 border-black overflow-hidden bg-background">
                    <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
                      <div>Titik Awal</div>
                      <div>{slug === "refleksi" ? "Refleksi terhadap" : "Translasi oleh"}</div>
                      <div>Titik Bayangan</div>
                    </div>
                    <div className="grid grid-cols-3 items-center py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">
                      <div className="italic font-bold">(x, y)</div>
                      {slug === "refleksi" ? (
                        <div className="text-xs md:text-sm font-semibold">{reflectLabel}</div>
                      ) : (
                        <div className="flex items-center justify-center gap-0.5">
                          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                          <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                            <div className="px-1 select-none italic">a</div>
                            <div className="px-1 select-none italic">b</div>
                          </div>
                          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-xs md:text-sm font-bold select-none">(</span>
                        <Input
                          type="text"
                          value={val}
                          onChange={(e) => setField(String(u.id), "text", e.target.value)}
                          disabled={isChecked}
                          placeholder="..., ..."
                          className={`w-16 md:w-20 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${err ? "border-destructive" : "border-black"}`}
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
              <span className="text-base md:text-lg font-black shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
              <div className="grow space-y-1">
                <Text as="p" className="text-xs md:text-sm font-medium text-black">
                  {u.question}
                </Text>
                <Textarea
                  value={val}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                  disabled={isChecked}
                  rows={2}
                  placeholder="Tuliskan jawabanmu..."
                  className={`border-4 border-black font-medium resize-none text-xs md:text-sm text-black ${err ? "border-destructive" : ""}`}
                />
                {err && <Text className="text-destructive text-[10px] md:text-xs">{err}</Text>}
              </div>
            </div>
          )
        })}

        {isChecked && aiFeedback && (
          <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 ">
            <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
          </div>
        )}

        <Button
          onClick={handleClick}
          disabled={!isFilled && !isChecked}
          variant={isChecked ? "secondary" : "default"}
          className="w-full font-bold text-xs md:text-base py-1.5 md:py-3 uppercase shadow-[2px_2px_0_0_black]"
        >
          {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
        </Button>
      </div>
    </section>
  )
}
