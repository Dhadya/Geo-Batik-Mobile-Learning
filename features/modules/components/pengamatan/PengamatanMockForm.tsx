"use client"

import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Button } from "@/components/retroui/Button"
import { useMockForm } from "@/features/modules/hooks/useObservation"

export function PengamatanMockForm() {
  const { mockAns, mockError, isMockChecked, setMockAns, handleSubmit } = useMockForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Text as="p" className="text-sm text-muted-foreground font-semibold leading-relaxed">
        Amati visualisasi GeoGebra di samping, lalu tentukan koordinat bayangannya berdasarkan teori refleksi/translasi.
      </Text>

      <div className="space-y-3 pt-2">
        <div>
          <label className="font-bold text-sm uppercase mb-1 block select-none">
            Koordinat Bayangan Akhir
          </label>
          <Input
            type="text"
            placeholder="Contoh: (2, 4) atau -x, y"
            value={mockAns}
            onChange={(e) => setMockAns(e.target.value)}
            className={`border-4 border-black p-3 font-bold ${mockError ? "border-destructive" : ""}`}
          />
          {mockError && (
            <span className="text-xs text-destructive font-bold">{mockError}</span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant={isMockChecked ? "secondary" : "default"}
        className="w-full font-bold py-3 mt-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase"
      >
        Periksa Jawaban
      </Button>
    </form>
  )
}
