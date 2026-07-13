"use client"

import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Badge } from "@/components/retroui/Badge"
import type { AssessmentQuestion } from "../types"

/** Assessment section with multiple choice questions to check understanding. */
export function AssessmentSection({
  slug,
  tab,
  questions,
}: {
  slug: string
  tab: string
  questions: AssessmentQuestion[]
}) {
  void slug; void tab
  return (
    <section className="border-4 border-black bg-white shadow-lg p-4 md:p-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
        <div className="w-48 h-48 md:w-64 md:h-64 kawung-pattern" />
      </div>

      <div className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Badge variant="solid" size="sm">
            Latihan 01
          </Badge>
          <Text as="h2" className="text-xl md:text-2xl font-black uppercase">
            Cek Pemahaman
          </Text>
        </div>

        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="space-y-4">
              <Text as="p" className="text-base md:text-lg font-medium">
                {q.question}
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 p-3 md:p-4 border-4 border-black bg-white cursor-pointer hover:bg-muted transition-all"
                  >
                    <input
                      type="radio"
                      name={`soal-${q.id}`}
                      className="accent-primary size-5"
                    />
                    <span className="text-base md:text-lg font-bold">
                      {String.fromCharCode(65 + i)}. {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 flex justify-end">
          <Button
            variant="default"
            size="lg"
            className="font-black uppercase tracking-widest"
          >
            Submit Jawaban
          </Button>
        </div>
      </div>
    </section>
  )
}
