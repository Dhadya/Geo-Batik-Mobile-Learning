"use client"

import { Text } from "@/components/retroui/Text"

/** Question text container. */
export function QuestionBox({ question }: { question: string }) {
  return (
    <div className="w-full p-6 md:p-8 text-center">
      <Text as="h2" className="text-lg md:text-xl font-bold leading-relaxed wrap-break-word">
        {question}
      </Text>
    </div>
  )
}
