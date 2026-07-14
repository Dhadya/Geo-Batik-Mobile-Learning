"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { CoordStack } from "./CoordStack"
import { useSection, allowOnlyNumbers } from "@/features/modules/hooks/useObservation"
import type { MatriksItem, KoordinatItem, UraianItem } from "@/features/modules/types"

interface PercobaanFormProps {
  slug: string
  tab: string
}

/** Percobaan form — renders matriks/koordinat items in a table + uraian items below. */
export function PercobaanForm({ slug, tab }: PercobaanFormProps) {
  const {
    items, fields, errors, isChecked, isFilled, aiFeedback,
    setField, handleSubmit, setChecked, setErrors, block,
  } = useSection(slug, tab, "percobaan")

  const handleClick = useCallback(() => {
    if (isChecked) {
      setChecked(false)
      setErrors({})
    } else {
      handleSubmit()
    }
  }, [isChecked, setChecked, setErrors, handleSubmit])

  if (items.length === 0) return null

  const isGaris = tab === "garis"
  const gtTable = isGaris ? block?.garisTranslasiTable : undefined
  const tableItems = items.filter((i) => i.type === "matriks" || i.type === "koordinat")
  const uraianItems = items.filter((i) => i.type === "uraian")

  if (isGaris && gtTable) {
    const srcIds = gtTable.sourceItemIds
    const tgtIds = gtTable.targetItemIds
    const [mt, mb] = gtTable.matrix.split(",")
    const srcItems = srcIds.map((id) => items.find((i) => i.id === id) as KoordinatItem)
    const tgtItems = tgtIds.map((id) => items.find((i) => i.id === id) as KoordinatItem)

    return (
      <div className="space-y-3 md:space-y-4">
        {block?.instruction && (
          <Text as="p" className="text-xs md:text-sm text-black font-semibold leading-relaxed">
            {block.instruction}
            {block.instructionMatrix && (() => {
              const [top, bottom] = block.instructionMatrix!.split(",")
              return (
                <>
                  <span className="inline-flex items-center gap-0.5 mx-1 align-middle">
                    <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                    <span className="flex flex-col items-center gap-0.5 text-xs md:text-sm font-black text-black">
                      <span className="text-center leading-none select-none">{top}</span>
                      <span className="text-center leading-none select-none">{bottom}</span>
                    </span>
                    <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                  </span>
                  <span>. Ikuti langkah-langkah berikut untuk menentukan bayangan garis k:</span>
                </>
              )
            })()}
          </Text>
        )}

        <Text as="p" className="text-xs md:text-sm font-medium text-black">Tentukan dua titik yang dilewati garis k</Text>

        {srcItems.map((k, idx) => {
          const label = idx === 0 ? "Titik potong sumbu x" : "Titik potong sumbu y"
          return (
            <div key={k.id} className="flex gap-1.5 md:gap-2">
              <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
              <div className="grow space-y-0.5 md:space-y-1">
                <Text as="p" className="text-xs md:text-sm font-medium text-black">{label}</Text>
                <div className="flex items-center gap-1">
                  <Text as="p" className="text-xs md:text-sm font-bold text-black">{idx === 0 ? "A" : "B"}(</Text>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="x"
                    value={fields[String(k.id)]?.x ?? ""}
                    onKeyDown={allowOnlyNumbers}
                    onChange={(e) => setField(String(k.id), "x", e.target.value)}
                    className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                  />
                  <Text as="p" className="text-xs md:text-sm font-bold text-black">,</Text>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="y"
                    value={fields[String(k.id)]?.y ?? ""}
                    onKeyDown={allowOnlyNumbers}
                    onChange={(e) => setField(String(k.id), "y", e.target.value)}
                    className={`w-10 md:w-12 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                  />
                  <Text as="p" className="text-xs md:text-sm font-bold text-black">)</Text>
                </div>
                {errors[`${k.id}_coord`] && <Text className="text-destructive text-[10px] md:text-xs font-medium">{errors[`${k.id}_coord`]}</Text>}
              </div>
            </div>
          )
        })}

        <div className="space-y-1 md:space-y-2">
          <div className="flex gap-1.5 md:gap-2">
            <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
            <Text as="p" className="text-xs md:text-sm font-medium text-black">Translasikan kedua titik</Text>
          </div>
          <div className="border-4 border-black overflow-hidden bg-background">
            <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
              <div>Titik Awal</div>
              <div>Translasi</div>
              <div>Titik Bayangan</div>
            </div>
            <div className="divide-y-2 divide-black text-xs md:text-sm">
              {tgtItems.map((k, idx) => {
                const srcK = srcItems[idx]
                const srcX = fields[String(srcK.id)]?.x ?? ""
                const srcY = fields[String(srcK.id)]?.y ?? ""
                const pointLabel = idx === 0 ? "A" : "B"
                return (
                  <div key={k.id} className="grid grid-cols-3 items-center py-2 md:py-3 text-center">
                    <div className="font-bold">{pointLabel}({srcX || "..."}, {srcY || "..."})</div>
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                      <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                        <div className="px-0.5 md:px-1 select-none">{mt}</div>
                        <div className="px-0.5 md:px-1 select-none">{mb}</div>
                      </div>
                      <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                    </div>
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="font-bold text-xs md:text-sm">{pointLabel}&apos;(</span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="x'"
                        value={fields[String(k.id)]?.x ?? ""}
                        onKeyDown={allowOnlyNumbers}
                        onChange={(e) => setField(String(k.id), "x", e.target.value)}
                        className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                      />
                      <span className="font-bold text-xs md:text-sm">,</span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="y'"
                        value={fields[String(k.id)]?.y ?? ""}
                        onKeyDown={allowOnlyNumbers}
                        onChange={(e) => setField(String(k.id), "y", e.target.value)}
                        className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                      />
                      <span className="font-bold text-xs md:text-sm">)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {uraianItems.length > 0 && (
          <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
            {tgtItems.length === 2 && (() => {
              const [t0, t1] = tgtItems
              const t0x = fields[String(t0.id)]?.x ?? ""
              const t0y = fields[String(t0.id)]?.y ?? ""
              const t1x = fields[String(t1.id)]?.x ?? ""
              const t1y = fields[String(t1.id)]?.y ?? ""
              return (
                <Text as="p" className="text-xs md:text-sm font-medium text-black">
                  {`Tentukan persamaan garis yang melalui 2 titik A'(${t0x || "..."}, ${t0y || "..."}) dan B'(${t1x || "..."}, ${t1y || "..."})`}
                </Text>
              )
            })()}
            {uraianItems.map((item) => {
              const u = item as UraianItem
              const val = fields[String(u.id)]?.text ?? ""
              const err = errors[`${u.id}_text`]

              return (
                <div key={u.id} className="flex gap-1.5 md:gap-2">
                  <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                  <div className="grow space-y-0.5 md:space-y-1">
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
                    {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {isChecked && aiFeedback && (
          <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 rounded-none">
            <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
          </div>
        )}

        <Button
          onClick={handleClick}
          disabled={!isFilled && !isChecked}
          variant={isChecked ? "secondary" : "default"}
          className="w-full font-bold py-2 md:py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] rounded-none"
        >
          {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {block?.instruction && (
        <Text as="p" className="text-xs md:text-sm text-black font-semibold leading-relaxed">
          {block.instruction}
          {block.instructionMatrix && (() => {
            const [top, bottom] = block.instructionMatrix!.split(",")
            return (
              <>
                <span className="inline-flex items-center gap-0.5 mx-1 align-middle">
                  <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                  <span className="flex flex-col items-center gap-0.5 text-xs md:text-sm font-black text-black">
                    <span className="text-center leading-none select-none">{top}</span>
                    <span className="text-center leading-none select-none">{bottom}</span>
                  </span>
                  <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                </span>
                <span>. Ikuti langkah-langkah berikut untuk menentukan bayangan garis k:</span>
              </>
            )
          })()}
        </Text>
      )}

      {slug === "translasi" && tab === "bangun" && !block?.instructionMatrix && (
        <div className="flex items-center justify-center gap-0.5 pt-1">
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
          <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black text-black">
            <div className="px-1 md:px-2 select-none">6</div>
            <div className="px-1 md:px-2 select-none">-4</div>
          </div>
          <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
        </div>
      )}

      {tableItems.length > 0 && slug === "refleksi" && (() => {
        const reflectionLabels: Record<string, string> = {
          "sumbu-x": "Sumbu X",
          "sumbu-y": "Sumbu Y",
          "titik": "Titik (0,0)",
          "garis-x=y": "Garis x=y",
          "garis-x=-y": "Garis x=-y",
          "garis-x=h": "Garis x=h",
          "garis-y=h": "Garis y=h",
        }
        const reflectText = `Refleksi terhadap ${reflectionLabels[tab] ?? tab}`

        return (
          <table className="w-full border-4 border-black border-collapse bg-background text-xs md:text-sm">
            <thead>
              <tr className="bg-muted border-b-4 border-black text-center font-black">
                <th className="p-1.5 md:p-2 border-r-2 border-black">Titik Awal <span>(A)</span></th>
                <th className="p-1.5 md:p-2 border-r-2 border-black">Refleksi</th>
                <th className="p-1.5 md:p-2">Titik Bayangan <span>(A&apos;)</span></th>
              </tr>
            </thead>
            <tbody>
              {tableItems.map((item, idx) => {
                if (item.type !== "koordinat") return null
                const k = item as KoordinatItem
                return (
                  <tr key={k.id} className="text-center">
                    <td className="py-2 md:py-3 font-bold border-r-2 border-black border-b-2">
                      {k.bayangan ? `(${k.bayangan.x}, ${k.bayangan.y})` : k.label}
                    </td>
                    {idx === 0 && (
                      <td rowSpan={tableItems.length} className="py-2 md:py-3 font-bold border-r-2 border-black align-middle text-[10px] md:text-xs">
                        {reflectText}
                      </td>
                    )}
                    <td className="py-2 md:py-3 border-b-2 border-black">
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="font-bold text-xs md:text-sm">(</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="x'"
                          value={fields[String(k.id)]?.x ?? ""}
                          onKeyDown={allowOnlyNumbers}
                          onChange={(e) => setField(String(k.id), "x", e.target.value)}
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                        />
                        <span className="font-bold text-xs md:text-sm">,</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="y'"
                          value={fields[String(k.id)]?.y ?? ""}
                          onKeyDown={allowOnlyNumbers}
                          onChange={(e) => setField(String(k.id), "y", e.target.value)}
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                        />
                        <span className="font-bold text-xs md:text-sm">)</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )
      })()}

      {tableItems.length > 0 && slug !== "refleksi" && (
        <div className="border-4 border-black overflow-hidden bg-background">
          <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-[10px] md:text-sm font-black p-1.5 md:p-2">
            <div>Titik Awal</div>
            <div>Translasi</div>
            <div>Titik Bayangan</div>
          </div>
          <div className="divide-y-2 divide-black text-xs md:text-sm">
            {tableItems.map((item, idx) => {
              const pointLetter = ["A", "B", "C", "D"][idx] ?? ""
              switch (item.type) {
                case "matriks": {
                  const m = item as MatriksItem
                  return (
                    <div key={m.id} className="grid grid-cols-3 items-center py-2 md:py-3 text-center">
                      <div className="font-bold">{m.label}</div>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">(</span>
                        <CoordStack
                          a={fields[String(m.id)]?.a ?? ""}
                          b={fields[String(m.id)]?.b ?? ""}
                          aError={errors[`${m.id}_a`]}
                          bError={errors[`${m.id}_b`]}
                          onAChange={(val) => setField(String(m.id), "a", val)}
                          onBChange={(val) => setField(String(m.id), "b", val)}
                        />
                        <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.7] origin-center">)</span>
                      </div>
                      <div className="font-bold">{m.targetBayangan}</div>
                    </div>
                  )
                }
                case "koordinat": {
                  const k = item as KoordinatItem
                  const bayanganVal = k.bayangan || ""
                  const match = bayanganVal.match(/\((-?\d+),\s*(-?\d+)\)/)
                  const bx = match?.[1] ?? ""
                  const by = match?.[2] ?? ""

                  return (
                    <div key={k.id} className="grid grid-cols-3 items-center py-2 md:py-3 text-center">
                      <div className="font-bold">{k.label}</div>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                        <div className="flex flex-col gap-0.5 md:gap-1 text-xs md:text-sm font-black">
                          <div className="px-0.5 md:px-1 select-none">{bx}</div>
                          <div className="px-0.5 md:px-1 select-none">{by}</div>
                        </div>
                        <span className="text-2xl md:text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                      </div>
                      <div className="flex items-center justify-center gap-0.5">
                        {tab === "bangun" && <span className="font-bold text-xs md:text-sm">{pointLetter}&apos;</span>}
                        <span className="font-bold text-xs md:text-sm">(</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="x'"
                          value={fields[String(k.id)]?.x ?? ""}
                          onKeyDown={allowOnlyNumbers}
                          onChange={(e) => setField(String(k.id), "x", e.target.value)}
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                        />
                        <span className="font-bold text-xs md:text-sm">,</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="y'"
                          value={fields[String(k.id)]?.y ?? ""}
                          onKeyDown={allowOnlyNumbers}
                          onChange={(e) => setField(String(k.id), "y", e.target.value)}
                          className={`w-8 md:w-10 text-center p-0.5 md:p-1 font-black border-2 text-[10px] md:text-xs h-6 md:h-7 shadow-none ${errors[`${k.id}_coord`] ? "border-destructive" : "border-black"}`}
                        />
                        <span className="font-bold text-xs md:text-sm">)</span>
                      </div>
                    </div>
                  )
                }
                default:
                  return null
              }
            })}
          </div>
        </div>
      )}

      {uraianItems.length > 0 && (
        <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
          {uraianItems.map((item) => {
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            return (
              <div key={u.id} className="flex gap-1.5 md:gap-2">
                <span className="text-base md:text-lg shrink-0 w-3 md:w-4 text-right -mt-1">•</span>
                <div className="grow space-y-0.5 md:space-y-1">
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
                  {err && <Text className="text-destructive text-[10px] md:text-xs font-medium">{err}</Text>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {isChecked && aiFeedback && (
        <div className="border-4 border-primary bg-primary/5 p-3 md:p-4 rounded-none">
          <Text className="text-xs md:text-sm font-semibold whitespace-pre-wrap">{aiFeedback}</Text>
        </div>
      )}

      <Button
        onClick={handleClick}
        disabled={!isFilled && !isChecked}
        variant={isChecked ? "secondary" : "default"}
        className="w-full font-bold py-2 md:py-3 uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] rounded-none"
      >
        {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
      </Button>
    </div>
  )
}
