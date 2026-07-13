"use client"

import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { BayanganInput } from "./BayanganInput"
import { useBangunForm } from "@/features/modules/hooks/useObservation"
import type { SectionBlock } from "@/features/modules/types"

/** Pengamatan form for translasi bangun — 4-point grid with row-spanned translasi vector. */
export function PengamatanBangunForm({ slug, sectionBlock }: { slug?: string; sectionBlock?: SectionBlock }) {
  // Form state from zustand store via hook
  const { form, errors, isChecked, setForm, handleSubmit } = useBangunForm()
  const isFilled = Object.values(form).every((v) => v !== undefined && v !== "")

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Text as="p" className="text-sm text-muted-foreground font-semibold leading-relaxed">
        Sekarang kita beralih ke motif yang berupa bangun. Kak Dhadya ingin memindahkan motif tersebut dengan translasi [ 5 / 4 ]. Bantu menentukan bayangan motif tersebut.
      </Text>

      <div className="border-4 border-black bg-background p-4">
        <div className="grid grid-cols-[1.2fr_1fr_1.5fr] gap-x-2 gap-y-3 items-center">
          <div className="font-black text-center text-xs uppercase select-none">Titik Awal</div>
          <div className="font-black text-center text-xs uppercase select-none">Translasi</div>
          <div className="font-black text-center text-xs uppercase select-none">Bayangan</div>

          <div className="text-center font-bold text-sm">(-6, 3)</div>
          <div className="row-span-4 flex items-center justify-center gap-0.5 border-4 border-black p-2 bg-muted select-none">
            <span className="text-4xl font-light select-none inline-block scale-y-[1.4] origin-center">(</span>
            <div className="flex flex-col gap-1 text-sm font-black">
              <div>5</div>
              <div>4</div>
            </div>
            <span className="text-4xl font-light select-none inline-block scale-y-[1.4] origin-center">)</span>
          </div>
          <BayanganInput
            x={form.b1_x ?? ""}
            y={form.b1_y ?? ""}
            xError={errors.b1_x}
            yError={errors.b1_y}
            onXChange={(val) => setForm({ b1_x: val })}
            onYChange={(val) => setForm({ b1_y: val })}
          />

          <div className="text-center font-bold text-sm">(-6, 1)</div>
          <BayanganInput
            x={form.b2_x ?? ""}
            y={form.b2_y ?? ""}
            xError={errors.b2_x}
            yError={errors.b2_y}
            onXChange={(val) => setForm({ b2_x: val })}
            onYChange={(val) => setForm({ b2_y: val })}
          />

          <div className="text-center font-bold text-sm">(-4, 1)</div>
          <BayanganInput
            x={form.b3_x ?? ""}
            y={form.b3_y ?? ""}
            xError={errors.b3_x}
            yError={errors.b3_y}
            onXChange={(val) => setForm({ b3_x: val })}
            onYChange={(val) => setForm({ b3_y: val })}
          />

          <div className="text-center font-bold text-sm">(-4, 3)</div>
          <BayanganInput
            x={form.b4_x ?? ""}
            y={form.b4_y ?? ""}
            xError={errors.b4_x}
            yError={errors.b4_y}
            onXChange={(val) => setForm({ b4_x: val })}
            onYChange={(val) => setForm({ b4_y: val })}
          />
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
