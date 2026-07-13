"use client"

import { Fragment, useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { BayanganInput } from "./BayanganInput"
import { useSection } from "@/features/modules/hooks/useObservation"
import type { KoordinatItem } from "@/features/modules/types"

interface PengamatanBangunFormProps {
  slug: string
  tab: string
}

/** Pengamatan form for translasi bangun — koordinat items with row-spanned translasi vector. */
export function PengamatanBangunForm({ slug, tab }: PengamatanBangunFormProps) {
  const {
    items, fields, errors, isChecked, isFilled,
    setField, handleSubmit,
  } = useSection(slug, tab, "pengamatan")

  const handleClick = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  const koordinatItems = items.filter((i): i is KoordinatItem => i.type === "koordinat")

  return (
    <form onSubmit={handleClick} className="space-y-4">
      <Text as="p" className="text-sm text-muted-foreground font-semibold leading-relaxed">
        Amati perpindahan bangun datar berikut. Translasi yang digunakan adalah T(5, 4). Bantu menentukan bayangan motif tersebut.
      </Text>

      <div className="border-4 border-black bg-background p-4">
        <div className="grid grid-cols-[1.2fr_1fr_1.5fr] gap-x-2 gap-y-3 items-center">
          <div className="font-black text-center text-xs uppercase select-none">Titik Awal</div>
          <div className="font-black text-center text-xs uppercase select-none">Translasi</div>
          <div className="font-black text-center text-xs uppercase select-none">Bayangan</div>

          {koordinatItems.map((item, idx) => {
            const xVal = fields[String(item.id)]?.x ?? ""
            const yVal = fields[String(item.id)]?.y ?? ""
            const xErr = errors[`${item.id}_x`]
            const yErr = errors[`${item.id}_y`]

            return (
              <Fragment key={item.id}>
                <div className="text-center font-bold text-sm">{item.label}</div>
                {idx === 0 ? (
                  <div className="row-span-4 flex items-center justify-center gap-0.5 border-4 border-black p-2 bg-muted select-none">
                    <span className="text-4xl font-light select-none inline-block scale-y-[1.4] origin-center">(</span>
                    <div className="flex flex-col gap-1 text-sm font-black">
                      <div>5</div>
                      <div>4</div>
                    </div>
                    <span className="text-4xl font-light select-none inline-block scale-y-[1.4] origin-center">)</span>
                  </div>
                ) : (
                  <div />
                )}
                <BayanganInput
                  x={xVal}
                  y={yVal}
                  xError={xErr}
                  yError={yErr}
                  onXChange={(val) => setField(String(item.id), "x", val)}
                  onYChange={(val) => setField(String(item.id), "y", val)}
                />
              </Fragment>
            )
          })}
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isFilled}
        variant={isChecked ? "secondary" : "default"}
        className="w-full font-bold py-3 shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase"
      >
        {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
      </Button>
    </form>
  )
}

