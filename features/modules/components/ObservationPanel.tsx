"use client"

import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"

/** Observation panel with coordinate inputs and notes for recording findings. */
export function ObservationPanel({ instruction }: { instruction: string }) {
  return (
    <div className="border-4 border-black bg-surface h-auto md:h-[600px] flex flex-col shadow-lg">
      <div className="p-4 md:p-6 border-b-4 border-black bg-accent">
        <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
          Pengamatan
        </Text>
      </div>
      <div className="p-4 md:p-6 flex-grow overflow-y-auto space-y-4 md:space-y-6">
        <Text as="p" className="text-sm text-muted-foreground">
          {instruction}
        </Text>

        <div className="space-y-4">
          <div>
            <label className="font-bold text-sm uppercase mb-2 block">
              Koordinat Awal A(x, y)
            </label>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <Input
                type="number"
                placeholder="x"
                className="!rounded-none border-4 border-black text-lg font-bold p-3"
              />
              <Input
                type="number"
                placeholder="y"
                className="!rounded-none border-4 border-black text-lg font-bold p-3"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-sm uppercase mb-2 block">
              Koordinat Bayangan A&apos;(x&apos;, y&apos;)
            </label>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <Input
                type="number"
                placeholder="x&apos;"
                readOnly
                className="!rounded-none border-4 border-black bg-surface-high text-lg font-bold p-3"
              />
              <Input
                type="number"
                placeholder="y&apos;"
                readOnly
                className="!rounded-none border-4 border-black bg-surface-high text-lg font-bold p-3"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-sm uppercase mb-2 block">
              Catatan Pengamatan
            </label>
            <Textarea
              placeholder="Tuliskan apa yang berubah..."
              rows={4}
              className="!rounded-none border-4 border-black"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
