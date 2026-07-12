"use client"

import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { CoordStack } from "./CoordStack"
import { BayanganInput } from "./BayanganInput"
import { useTitikForm } from "@/features/modules/hooks/useObservation"

export function PengamatanTitikForm() {
  const { form, errors, isChecked, setForm, handleSubmit } = useTitikForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Text as="p" className="text-sm font-semibold">
        Seorang pembatik harus mampu menyusun motif sesuai yang dia rencanakan. Kak Dhadya telah menentukan bahwa motif berikutnya harus berada pada koordinat (4, 4). Bantulah Kakak ini menentukan nilai translasi agar titik bayangannya sesuai target.
      </Text>

      <div className="border-4 border-black overflow-hidden bg-background">
        <div className="grid grid-cols-3 bg-muted border-b-4 border-black text-center text-xs font-black p-2 uppercase">
          <div>Titik Awal</div>
          <div>Translasi oleh</div>
          <div>Bayangan</div>
        </div>

        <div className="divide-y-2 divide-black text-sm">
          {([["t1", "(2, 3)"], ["t2", "(-1, 4)"], ["t3", "(-2, 2)"]] as const).map(([prefix, label]) => (
            <div key={prefix} className="grid grid-cols-3 items-center py-3 text-center">
              <div className="font-bold">{label}</div>
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-2xl font-light select-none">(</span>
                <CoordStack
                  a={form[`${prefix}_a` as keyof typeof form] ?? ""}
                  b={form[`${prefix}_b` as keyof typeof form] ?? ""}
                  aError={errors[`${prefix}_a` as keyof typeof errors]}
                  bError={errors[`${prefix}_b` as keyof typeof errors]}
                  onAChange={(val) => setForm({ [`${prefix}_a`]: val })}
                  onBChange={(val) => setForm({ [`${prefix}_b`]: val })}
                />
                <span className="text-2xl font-light select-none">)</span>
              </div>
              <div className="font-bold">(4, 4)</div>
            </div>
          ))}
        </div>
      </div>

      <Text as="p" className="text-sm font-semibold pt-2">
        Sekarang, translasikan lagi motifnya dan tentukan bayangannya:
      </Text>

      <div className="border-4 border-black p-4 flex items-center justify-between bg-background">
        <div className="text-center font-bold">(-3, -2)</div>
        <div className="flex items-center gap-0.5">
          <span className="text-3xl font-light select-none">(</span>
          <div className="flex flex-col text-sm font-black">
            <div>5</div>
            <div>4</div>
          </div>
          <span className="text-3xl font-light select-none">)</span>
        </div>
        <BayanganInput
          x={form.t4_x ?? ""}
          y={form.t4_y ?? ""}
          xError={errors.t4_x}
          yError={errors.t4_y}
          onXChange={(val) => setForm({ t4_x: val })}
          onYChange={(val) => setForm({ t4_y: val })}
        />
      </div>

      <Button
        type="submit"
        variant={isChecked ? "secondary" : "default"}
        className="w-full font-bold py-3 mt-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase"
      >
        {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
      </Button>
    </form>
  )
}
