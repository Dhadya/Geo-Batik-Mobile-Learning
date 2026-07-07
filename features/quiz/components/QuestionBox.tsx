"use client"

import { Text } from "@/components/retroui/Text"

/** Bordered question text container. */
export function QuestionBox({ question }: { question: string }) {
  return (
    <div className="w-full border-4 border-black bg-surface p-6 md:p-8 text-center">
      <Text as="h2" className="text-lg md:text-xl lg:text-2xl font-bold leading-relaxed">
        {question}
      </Text>
    </div>
  )
}
