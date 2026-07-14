"use client"

import { Card } from "@/components/retroui/Card"
import { Check, X } from "lucide-react"

export function QuizResultScore({
  correctCount,
  total,
}: {
  correctCount: number
  total: number
}) {
  const incorrectCount = total - correctCount

  return (
    <Card className="w-full border-4 border-black shadow-lg">
      <Card.Header className="bg-primary-container border-b-4 border-black">
        <Card.Title className="text-xl md:text-2xl font-black uppercase">
          Skor Anda
        </Card.Title>
      </Card.Header>
      <Card.Content className="p-6 md:p-8 space-y-6">
        <div className="text-center">
          <span className="text-6xl md:text-7xl font-black">{correctCount}</span>
          <span className="text-2xl md:text-3xl font-bold text-muted-foreground">/{total}</span>
        </div>

        <div className="flex justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 bg-secondary border-2 border-black flex items-center justify-center">
              <Check className="size-5 md:size-6 text-secondary-foreground" />
            </div>
            <span className="font-bold text-base md:text-lg">{correctCount} Benar</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 bg-destructive border-2 border-black flex items-center justify-center">
              <X className="size-5 md:size-6 text-destructive-foreground" />
            </div>
            <span className="font-bold text-base md:text-lg">{incorrectCount} Salah</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
