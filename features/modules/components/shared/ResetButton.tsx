"use client"

import { useState } from "react"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Dialog } from "@/components/retroui/Dialog"
import { useAnswerStore } from "../../store/answerStore"

/** FAB button that resets all module answers with confirmation dialog. */
export function ResetButton() {
  const [open, setOpen] = useState(false)
  const resetAll = useAnswerStore((s) => s.resetAll)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* FAB trigger — reset icon button fixed to bottom-left */}
      <Dialog.Trigger className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-40 w-10 h-10 md:w-12 md:h-12 p-0 flex items-center justify-center bg-white cursor-pointer  border-2 border-black font-bold hover:shadow-[2px_2px_0_0_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0 active:translate-x-0 transition-all duration-150">
        <MaterialIcon className="size-5" name="refresh" />
      </Dialog.Trigger>

      {/* Confirmation dialog — asks user to confirm reset */}
      <Dialog.Content size="sm">
        {/* Dialog header bar */}
        <Dialog.Header asChild>
          <div className="flex items-center justify-between border-b-2 px-3 md:px-4 min-h-10 md:min-h-12 bg-primary text-primary-foreground">
            <span className="font-black uppercase text-xs md:text-sm">Reset Jawaban</span>
          </div>
        </Dialog.Header>

        {/* Confirmation body text */}
        <div className="p-4 md:p-6 text-center space-y-1.5 md:space-y-2">
          <p className="font-semibold text-sm md:text-base">
            Yakin ingin mereset semua jawaban?
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Semua jawaban yang sudah kamu isi akan dihapus.
          </p>
        </div>

        {/* Footer: Batal (cancel) and Reset (confirm) buttons */}
        <Dialog.Footer>
          <Dialog.Close className="font-bold uppercase text-xs md:text-sm px-4 py-2 cursor-pointer  border-2 border-black bg-white hover:shadow-[2px_2px_0_0_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0 active:translate-x-0 transition-all duration-150">
            Batal
          </Dialog.Close>
          <Dialog.Close
            className="font-bold uppercase text-xs md:text-sm px-4 py-2 cursor-pointer  border-2 border-destructive bg-destructive text-destructive-foreground hover:shadow-[2px_2px_0_0_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0 active:translate-x-0 transition-all duration-150"
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
