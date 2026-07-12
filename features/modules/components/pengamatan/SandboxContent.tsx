"use client"

import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { useSandbox } from "@/features/modules/hooks/useObservation"

interface SandboxContentProps {
  slug: string
  tab: string
  instruction: string
}

export function SandboxContent({ slug, tab, instruction }: SandboxContentProps) {
  const { sandboxX, sandboxY, notes, preview, setSandboxX, setSandboxY, setNotes } = useSandbox(slug, tab)

  return (
    <div className="space-y-4 md:space-y-6">
      <Text as="p" className="text-sm text-muted-foreground font-semibold leading-relaxed">
        {instruction}
      </Text>

      <div className="space-y-4 pt-2">
        <div>
          <label className="font-bold text-sm uppercase mb-2 block">
            Koordinat Awal A(x, y)
          </label>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <Input
              type="number"
              placeholder="x"
              value={sandboxX}
              onChange={(e) => setSandboxX(e.target.value)}
              className="border-4 border-black text-lg font-bold p-3"
            />
            <Input
              type="number"
              placeholder="y"
              value={sandboxY}
              onChange={(e) => setSandboxY(e.target.value)}
              className="border-4 border-black text-lg font-bold p-3"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-sm uppercase mb-2 block">
            Koordinat Bayangan A&apos;(x&apos;, y&apos;)
          </label>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <Input
              type="text"
              placeholder="x'"
              value={preview.x}
              readOnly
              className="border-4 border-black bg-muted text-lg font-bold p-3"
            />
            <Input
              type="text"
              placeholder="y'"
              value={preview.y}
              readOnly
              className="border-4 border-black bg-muted text-lg font-bold p-3"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-sm uppercase mb-2 block">
            Catatan Pengamatan
          </label>
          <Textarea
            placeholder="Tuliskan apa yang berubah pada koordinat bayangan..."
            rows={4}
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            className="border-4 border-black"
          />
        </div>
      </div>
    </div>
  )
}
