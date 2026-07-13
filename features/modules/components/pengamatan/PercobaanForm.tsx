"use client"

import { useCallback } from "react"
import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { CoordStack } from "./CoordStack"
import { BayanganInput } from "./BayanganInput"
import { useSection } from "@/features/modules/hooks/useObservation"
import type { MatriksItem, KoordinatItem } from "@/features/modules/types"

interface PercobaanFormProps {
  slug: string
  tab: string
}

/** Percobaan form — renders matriks + koordinat items from section data in a table. */
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

  return (
    <div className="space-y-4">
      {block?.instruction && (
        <Text as="p" className="text-sm text-muted-foreground font-semibold leading-relaxed">
          {block.instruction}
        </Text>
      )}

      <div className="border-4 border-black overflow-hidden bg-background">
        <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-xs md:text-sm font-black p-2">
          <div>Titik Awal</div>
          <div>Translasi</div>
          <div>Titik Bayangan</div>
        </div>
        <div className="divide-y-2 divide-black text-sm">
          {items.map((item) => {
            switch (item.type) {
              case "matriks": {
                const m = item as MatriksItem
                return (
                  <div key={m.id} className="grid grid-cols-3 items-center py-3 text-center">
                    <div className="font-bold">{m.label}</div>
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="text-3xl font-light select-none inline-block scale-y-[2.1] origin-center">(</span>
                      <CoordStack
                        a={fields[String(m.id)]?.a ?? ""}
                        b={fields[String(m.id)]?.b ?? ""}
                        aError={errors[`${m.id}_a`]}
                        bError={errors[`${m.id}_b`]}
                        onAChange={(val) => setField(String(m.id), "a", val)}
                        onBChange={(val) => setField(String(m.id), "b", val)}
                      />
                      <span className="text-3xl font-light select-none inline-block scale-y-[2.1] origin-center">)</span>
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
                  <div key={k.id} className="grid grid-cols-3 items-center py-3 text-center">
                    <div className="font-bold">{k.label}</div>
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
                      <div className="flex flex-col gap-1 text-sm font-black">
                        <div className="px-1 select-none">{bx}</div>
                        <div className="px-1 select-none">{by}</div>
                      </div>
                      <span className="text-3xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
                    </div>
                    <BayanganInput
                      x={fields[String(k.id)]?.x ?? ""}
                      y={fields[String(k.id)]?.y ?? ""}
                      xError={errors[`${k.id}_x`]}
                      yError={errors[`${k.id}_y`]}
                      onXChange={(val) => setField(String(k.id), "x", val)}
                      onYChange={(val) => setField(String(k.id), "y", val)}
                    />
                  </div>
                )
              }
              default:
                return null
            }
          })}
        </div>
      </div>

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
  )
}
