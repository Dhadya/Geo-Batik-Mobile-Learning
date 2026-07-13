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
            variant="default"
            className="fixed bottom-6 left-6 z-40 w-12 h-12 p-0 flex items-center justify-center"
          />
        }
      >
        <RotateCcw className="size-5" />
      </Dialog.Trigger>

      <Dialog.Content size="sm">
        <Dialog.Header asChild>
          <div className="flex items-center justify-between border-b-2 px-4 min-h-12 bg-primary text-primary-foreground">
            <span className="font-black uppercase text-sm">Reset Jawaban</span>
          </div>
        </Dialog.Header>

        <div className="p-6 text-center space-y-2">
          <p className="font-semibold text-base">
            Yakin ingin mereset semua jawaban?
          </p>
          <p className="text-sm text-muted-foreground">
            Semua jawaban yang sudah kamu isi akan dihapus.
          </p>
        </div>

        <Dialog.Footer>
          <Dialog.Close
            render={
              <Button variant="outline" size="sm" className="font-bold uppercase" />
            }
          >
            Batal
          </Dialog.Close>
          <Dialog.Close
            render={
              <Button
                variant="default"
                size="sm"
                className="font-bold uppercase"
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
