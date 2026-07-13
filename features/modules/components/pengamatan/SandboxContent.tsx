"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Textarea } from "@/components/retroui/Textarea"
import { Button } from "@/components/retroui/Button"
import { useSandbox, allowOnlyNumbers } from "@/features/modules/hooks/useObservation"
import type { SectionBlock } from "@/features/modules/types"

interface SandboxContentProps {
  slug: string
  tab: string
  instruction: string
  sectionBlock?: SectionBlock
}

/** Percobaan tab — coordinate input, live bayangan preview, and notes. */
export function SandboxContent({ slug, tab, instruction, sectionBlock: _sectionBlock }: SandboxContentProps) {
  // Sandbox state from zustand store via hook
  const { sandboxX, sandboxY, notes, preview, setSandboxX, setSandboxY, setNotes } = useSandbox(slug, tab)
  const [isChecked, setIsChecked] = useState(false)

  const isFilled = sandboxX !== "" && sandboxY !== "" && notes.trim() !== ""

  // Validate that notes are filled before checking
  const handleCheck = () => {
    if (!isFilled) return
    setIsChecked(true)
    toast.success("Catatan pengamatan Anda berhasil diperiksa dan disimpan! 🎉")
  }

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
              type="text"
              inputMode="numeric"
              placeholder="x"
              value={sandboxX}
              onKeyDown={allowOnlyNumbers}
              onChange={(e) => {
                setSandboxX(e.target.value)
                setIsChecked(false)
              }}
              className="border-4 border-black text-lg font-bold p-3"
            />
            <Input
              type="text"
              inputMode="numeric"
              placeholder="y"
              value={sandboxY}
              onKeyDown={allowOnlyNumbers}
              onChange={(e) => {
                setSandboxY(e.target.value)
                setIsChecked(false)
              }}
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setNotes(e.target.value)
              setIsChecked(false)
            }}
            className="border-4 border-black"
          />
        </div>

        <Button
          onClick={handleCheck}
          disabled={!isFilled}
          variant={isChecked ? "secondary" : "default"}
          className="w-full font-bold py-3 mt-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase"
        >
          {isChecked ? "Periksa Lagi" : "Periksa Jawaban"}
        </Button>
      </div>
    </div>
  )
}
