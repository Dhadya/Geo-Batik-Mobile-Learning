"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/retroui/Button"
import { Dialog } from "@/components/retroui/Dialog"

interface SectionSubmitButtonProps {
  isChecked: boolean
  isFilled: boolean
  isCorrect: boolean | null
  isLocked: boolean
  showCobaLagi: boolean
  /** Called on first submit and on "Periksa Jawaban Lagi" (attempt 2) */
  onSubmit: () => void
  /** If true, requires a confirmation dialog before submitting */
  requireConfirmation?: boolean
}

/**
 * Single submit button cycling through all section states.
 * States: Periksa Jawaban → Periksa Jawaban Lagi → Selesai (disabled) | Kesempatan Habis (disabled).
 * "Periksa Jawaban Lagi" directly re-submits (attempt 2) without resetting to edit mode.
 */
export function SectionSubmitButton({
  isChecked,
  isFilled,
  isCorrect,
  isLocked,
  showCobaLagi,
  onSubmit,
  requireConfirmation = false,
}: SectionSubmitButtonProps) {
  const [open, setOpen] = useState(false)

  // Disabled when: not filled (pre-submit) OR locked and not in coba-lagi state
  const isDisabled = !isChecked ? !isFilled : isLocked && !showCobaLagi

  let text: string
  let variantStyle = ""

  if (!isChecked) {
    // Initial state: not yet submitted
    text = "Periksa Jawaban"
  } else if (showCobaLagi) {
    // Wrong on attempt 1: offer attempt 2
    text = "Periksa Jawaban Lagi"
    variantStyle = "bg-secondary text-white hover:bg-secondary/90!"
  } else if (isCorrect) {
    // Correct (attempt 1 or 2): done
    text = "Selesai"
    variantStyle = "bg-secondary text-white hover:bg-secondary/90!"
  } else {
    // Wrong on attempt 2: no more chances
    text = "Kesempatan Habis"
    variantStyle = "bg-gray-300 text-gray-500 border-gray-400!"
  }

  const handleClick = useCallback(() => {
    if (!isLocked || showCobaLagi) {
      if (requireConfirmation) {
        setOpen(true)
      } else {
        onSubmit()
      }
    }
  }, [isLocked, showCobaLagi, onSubmit, requireConfirmation])

  const buttonElement = (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-full font-bold text-xs md:text-base py-1.5 md:py-3 uppercase shadow-[2px_2px_0_0_black] ${variantStyle}`}
    >
      {text}
    </Button>
  )

  if (!requireConfirmation) {
    return buttonElement
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {buttonElement}
      <Dialog.Content size="sm">
        {/* Dialog header bar */}
        <Dialog.Header asChild>
          <div className="flex items-center justify-between border-b-2 px-3 md:px-4 min-h-10 md:min-h-12 bg-primary text-primary-foreground">
            <span className="font-black uppercase text-xs md:text-sm">Kirim Jawaban</span>
          </div>
        </Dialog.Header>

        {/* Confirmation body text */}
        <div className="p-4 md:p-6 text-center space-y-1.5 md:space-y-2">
          {!showCobaLagi ? (
            <>
              <p className="font-semibold text-sm md:text-base">
                Yakin ingin mengirimkan jawaban?
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Kamu hanya dapat mengirimkan jawaban maksimal 2 kali. Kamu sekarang punya 2 kesempatan. Periksa jawaban kamu sebelum mengirim.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-sm md:text-base">
                Yakin ingin mengirimkan jawaban?
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Ini adalah kesempatan terakhirmu. Jawaban yang telah terkirim tidak dapat diubah lagi. Nilai akan dihitung dari skor terbaik dari kedua kesempatan.
              </p>
            </>
          )}
        </div>

        {/* Footer: Batal (cancel) and Kirim (confirm) buttons */}
        <Dialog.Footer>
          <Dialog.Close className="font-bold uppercase text-xs md:text-sm px-4 py-2 cursor-pointer border-2 border-black bg-white hover:shadow-[2px_2px_0_0_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0 active:translate-x-0 transition-all duration-150">
            Batal
          </Dialog.Close>
          <Dialog.Close
            className="font-bold uppercase text-xs md:text-sm px-4 py-2 cursor-pointer border-2 border-primary bg-primary text-primary-foreground hover:shadow-[2px_2px_0_0_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0 active:translate-x-0 transition-all duration-150"
            onClick={() => {
              onSubmit()
              setOpen(false)
            }}
          >
            Kirim
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
