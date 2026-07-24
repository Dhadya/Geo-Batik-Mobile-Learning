"use client"

import { Card } from "@/components/retroui/Card"
import { ScoreGauge } from "./ScoreGauge"

export function QuizResultScore({
  score,
  attemptLabel,
}: {
  score?: number | null
  attemptLabel?: string
}) {
  return (
    <Card className="w-full border-4 border-black shadow-lg">
      <Card.Content className="p-6 md:p-8 flex justify-center">
        {score != null ? (
          <ScoreGauge score={score} attemptLabel={attemptLabel} />
        ) : (
          <span className="text-muted-foreground text-sm">Skor belum tersedia</span>
        )}
      </Card.Content>
    </Card>
  )
}
