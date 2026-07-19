"use client"

import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"

interface AttemptFeedbackProps {
  showCobaLagi: boolean
  onCobaLagi: () => void
  isLocked: boolean
}

/** "Coba Lagi" button and locked-state banner shared across all section forms. */
export function AttemptFeedback({ showCobaLagi, onCobaLagi, isLocked }: AttemptFeedbackProps) {
  return (
    <>
      {showCobaLagi && !isLocked && (
        <Button
          variant="outline"
          onClick={onCobaLagi}
          className="w-full font-bold text-xs md:text-base py-1.5 md:py-3 uppercase shadow-[2px_2px_0_0_black]"
        >
          Coba Lagi
        </Button>
      )}

      {isLocked && (
        <div className="border-4 border-black bg-gray-100 p-3 md:p-4">
          <Text className="font-bold uppercase text-xs md:text-sm text-gray-500 text-center">
            Jawaban terkunci
          </Text>
        </div>
      )}
    </>
  )
}
