"use client"

interface ApersepsiContentProps {
  hook: string
  explanation: string
}

/** Apersepsi content section with hook and explanation text. */
export function ApersepsiContentSection({ hook, explanation }: ApersepsiContentProps) {
  return (
    <section className="space-y-6 md:space-y-8">
      <div className="bg-card border-4 border-black shadow-lg p-6 md:p-8 space-y-4 md:space-y-6">
        <p className="text-base md:text-lg font-semibold leading-relaxed">
          {hook}
        </p>
      </div>
      <div className="bg-card border-4 border-black shadow-lg p-6 md:p-8 space-y-4 md:space-y-6">
        <p className="text-base md:text-lg leading-relaxed">
          {explanation}
        </p>
      </div>
    </section>
  )
}
