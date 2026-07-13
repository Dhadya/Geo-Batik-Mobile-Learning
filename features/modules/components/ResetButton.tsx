"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { Dialog } from "@/components/retroui/Dialog"
import { useAnswerStore } from "../store/answerStore"

/** FAB button that resets all module answers with confirmation dialog. */
export function ResetButton() {
  const [open, setOpen] = useState(false)
  const resetAll = useAnswerStore((s) => s.resetAll)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button
            variant="outline"
            className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-40 w-10 h-10 md:w-12 md:h-12 p-0 flex items-center justify-center"
          />
        }
      >
        <RotateCcw className="size-4 md:size-5" />
      </Dialog.Trigger>

      <Dialog.Content size="sm">
        <Dialog.Header asChild>
          <div className="flex items-center justify-between border-b-2 px-3 md:px-4 min-h-10 md:min-h-12 bg-primary text-primary-foreground">
            <span className="font-black uppercase text-xs md:text-sm">Reset Jawaban</span>
          </div>
        </Dialog.Header>

        <div className="p-4 md:p-6 text-center space-y-1.5 md:space-y-2">
          <p className="font-semibold text-sm md:text-base">
            Yakin ingin mereset semua jawaban?
          </p>
          <p className="text-[10px] md:text-sm text-muted-foreground">
            Semua jawaban yang sudah kamu isi akan dihapus.
          </p>
        </div>

        <Dialog.Footer>
          <Dialog.Close
            render={
              <Button variant="outline" className="font-bold uppercase text-xs md:text-sm" />
            }
          >
            Batal
          </Dialog.Close>
          <Dialog.Close
            render={
              <Button
                variant="default"
                className="font-bold uppercase text-xs md:text-sm"
              />
            }
            onClick={() => {
              resetAll()
              setOpen(false)
            }}
          >
            Reset
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
