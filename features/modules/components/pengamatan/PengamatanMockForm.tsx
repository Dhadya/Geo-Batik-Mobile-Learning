"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { useSection } from "@/features/modules/hooks/useObservation"
import type { KoordinatItem, UraianItem } from "@/features/modules/types"

interface PengamatanMockFormProps {
  slug: string
  tab: string
}

/** Generic pengamatan form — renders koordinat or uraian items by type. */
export function PengamatanMockForm({ slug, tab }: PengamatanMockFormProps) {
  const {
    items, fields, errors, isChecked, isFilled,
    setField, handleSubmit,
  } = useSection(slug, tab, "pengamatan")

  const handleClick = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  return (
    <form onSubmit={handleClick} className="space-y-4">
      <Text as="p" className="text-sm text-muted-foreground font-semibold leading-relaxed">
        Amati visualisasi GeoGebra di samping, lalu jawab pertanyaan berikut.
      </Text>

      <div className="space-y-4 pt-2">
        {items.map((item) => {
          if (item.type === "koordinat") {
            const k = item as KoordinatItem
            const xVal = fields[String(k.id)]?.x ?? ""
            const yVal = fields[String(k.id)]?.y ?? ""
            const xErr = errors[`${k.id}_x`]
            const yErr = errors[`${k.id}_y`]

            return (
              <div key={k.id} className="space-y-1">
                <label className="font-bold text-sm uppercase mb-1 block select-none">
                  Koordinat Bayangan {k.label}
                </label>
                <div className="flex gap-2 items-center">
                  <span className="font-bold text-sm">(</span>
                  <Input
                    type="text"
                    placeholder="x"
                    value={xVal}
                    onChange={(e) => setField(String(k.id), "x", e.target.value)}
                    disabled={isChecked}
                    className={`w-20 text-center border-4 border-black font-bold ${xErr ? "border-destructive" : ""}`}
                  />
                  <span className="font-bold text-sm">,</span>
                  <Input
                    type="text"
                    placeholder="y"
                    value={yVal}
                    onChange={(e) => setField(String(k.id), "y", e.target.value)}
                    disabled={isChecked}
                    className={`w-20 text-center border-4 border-black font-bold ${yErr ? "border-destructive" : ""}`}
                  />
                  <span className="font-bold text-sm">)</span>
                </div>
                {(xErr || yErr) && (
                  <span className="text-xs text-destructive font-bold">{xErr || yErr}</span>
                )}
              </div>
            )
          }

          if (item.type === "uraian") {
            const u = item as UraianItem
            const val = fields[String(u.id)]?.text ?? ""
            const err = errors[`${u.id}_text`]

            return (
              <div key={u.id} className="space-y-1">
                <label className="font-bold text-sm uppercase mb-1 block select-none">
                  {u.question}
                </label>
                <Textarea
                  value={val}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField(String(u.id), "text", e.target.value)}
                  disabled={isChecked}
                  rows={3}
                  className={`border-4 border-black font-semibold resize-none ${err ? "border-destructive" : ""}`}
                />
                {err && (
                  <span className="text-xs text-destructive font-bold">{err}</span>
                )}
              </div>
            )
          }

          return null
        })}
      </div>

      <Button
        type="submit"
        disabled={!isFilled}
        variant={isChecked ? "secondary" : "default"}
        className="w-full font-bold py-3 mt-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase"
      >
        {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
      </Button>
    </form>
  )
}
