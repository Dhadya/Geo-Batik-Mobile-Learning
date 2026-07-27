"use client"

import { Text } from "@/components/retroui/Text"

/** Question text container. */
export function QuestionBox({ question }: { question: string }) {
  return (
    <div className="w-full p-6 md:p-8 text-center">
      <Text as="h2" className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed break-words">
        {question}
      </Text>
    </div>
  )
}
