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
  /** Called when user clicks "Periksa Jawaban" (initial submit) */
  onSubmit: () => void
  /** Called when user clicks "Periksa Jawaban Lagi" — resets form to edit mode */
  onCobaLagi?: () => void
  /** If true, requires a confirmation dialog before submitting */
  requireConfirmation?: boolean
}

/**
 * Single submit button cycling through all section states.
 * States: Periksa Jawaban → Periksa Jawaban Lagi → Selesai (disabled) | Kesempatan Habis (disabled).
 * Confirmation dialog shown before both initial submit and coba-lagi.
 */
export function SectionSubmitButton({
  isChecked,
  isFilled,
  isCorrect,
  isLocked,
  showCobaLagi,
  onSubmit,
  onCobaLagi,
  requireConfirmation = false,
}: SectionSubmitButtonProps) {
  const [open, setOpen] = useState(false)

  const isDisabled = !isChecked ? !isFilled : isLocked && !showCobaLagi

  let text: string
  let variantStyle = ""

  if (!isChecked) {
    text = "Periksa Jawaban"
  } else if (showCobaLagi) {
    text = "Periksa Jawaban Lagi"
    variantStyle = "bg-secondary text-white hover:bg-secondary/90"
  } else if (isCorrect) {
    text = "Selesai"
    variantStyle = "bg-green-600 text-white hover:bg-green-700"
  } else {
    text = "Kesempatan Habis"
    variantStyle = "bg-gray-300 text-gray-500 border-gray-400"
  }

  const handleClick = useCallback(() => {
    if (!isLocked) {
      if (requireConfirmation) {
        setOpen(true)
      } else if (showCobaLagi) {
        onCobaLagi?.()
      } else {
        onSubmit()
      }
    }
  }, [isLocked, showCobaLagi, onSubmit, onCobaLagi, requireConfirmation])

  const handleConfirm = useCallback(() => {
    if (showCobaLagi) {
      onCobaLagi?.()
    } else {
      onSubmit()
    }
    setOpen(false)
  }, [showCobaLagi, onCobaLagi, onSubmit])

  const buttonElement = (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-full font-bold text-xs md:text-base py-1.5 md:py-3 uppercase shadow-[2px_2px_0_0_black] ${variantStyle}`}
    >
      {text}
    </Button>
  )

  const wrappedButton = isDisabled ? (
    <div className="inline-block w-full" title="Lengkapi semua jawaban terlebih dahulu">
      {buttonElement}
    </div>
  ) : buttonElement

  if (!requireConfirmation) {
    return wrappedButton
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {wrappedButton}
      <Dialog.Content size="sm">
        <Dialog.Header asChild>
          <div className="flex items-center justify-between border-b-2 px-3 md:px-4 min-h-10 md:min-h-12 bg-primary text-primary-foreground">
            <span className="font-black uppercase text-xs md:text-sm">Kirim Jawaban</span>
          </div>
        </Dialog.Header>

        <div className="p-4 md:p-6 space-y-2">
          <p className="font-semibold text-sm md:text-base">
            Yakin ingin mengirimkan jawaban?
          </p>
          {showCobaLagi ? (
            <p className="text-xs md:text-sm text-gray-600">
              Ini adalah kesempatan terakhirmu. Jawaban yang telah terkirim tidak dapat diubah lagi. Nilai akan dihitung dari skor terbaik dari kedua kesempatan.
            </p>
          ) : (
            <p className="text-xs md:text-sm text-gray-600">
              Kamu hanya dapat mengirimkan jawaban maksimal 2 kali. Kamu sekarang punya 2 kesempatan. Periksa jawaban kamu sebelum mengirim.
            </p>
          )}
        </div>

        <Dialog.Footer>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            className="shadow-[2px_2px_0_0_black] uppercase font-bold text-xs md:text-sm"
          >
            Batal
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleConfirm}
            className="shadow-[2px_2px_0_0_black] uppercase font-bold text-xs md:text-sm"
          >
            Kirim
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
