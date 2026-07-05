"use client"

import { MaterialIcon } from "@/components/common/MaterialIcon"

interface ApersepsiExplanationProps {
  visualTitle: string
  visualDescription: string
  type: "translasi" | "refleksi"
}

/** Visual explanation box with animated demonstration. */
export function ApersepsiExplanation({ visualTitle, visualDescription, type }: ApersepsiExplanationProps) {
  return (
    <section className="w-full border-8 border-black bg-card shadow-xl relative p-8 md:p-12 space-y-6 md:space-y-8">
      {/* Title badge */}
      <div className="absolute -top-6 -left-4 md:-left-6 bg-primary border-4 border-black px-4 py-2 shadow-md">
        <span className="font-black uppercase text-base md:text-lg">{visualTitle}</span>
      </div>

      {/* Description text */}
      <div className="mt-6 md:mt-8">
        <p className="text-base md:text-lg leading-relaxed">
          {visualDescription.split(/(Translasi|Refleksi|Pergeseran|Pencerminan)/).map((part, i) =>
            ["Translasi", "Refleksi", "Pergeseran", "Pencerminan"].includes(part) ? (
              <span key={i} className="font-black underline">{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      </div>

      {/* Visual demonstration */}
      <div className="flex items-center justify-center gap-6 md:gap-12 py-6 md:py-8 bg-surface-container border-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 kawung-pattern" />

        {type === "translasi" ? (
          <>
            {/* Position A */}
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary border-4 border-black shadow-md flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                </div>
              </div>
              <span className="font-bold text-xs md:text-sm uppercase">Posisi A</span>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <MaterialIcon name="arrow_forward" className="!text-4xl md:!text-6xl" />
              <span className="font-bold text-xs uppercase mt-1">Geser</span>
            </div>

            {/* Position B */}
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary border-4 border-black shadow-md flex items-center justify-center opacity-60">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white" />
                </div>
              </div>
              <span className="font-bold text-xs md:text-sm uppercase">Posisi B</span>
            </div>
          </>
        ) : (
          <>
            {/* Left side */}
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-tertiary-container border-4 border-black shadow-md flex items-center justify-center">
                <MaterialIcon name="looks_one" className="!text-3xl md:!text-4xl" />
              </div>
              <span className="font-bold text-xs md:text-sm uppercase">Kiri</span>
            </div>

            {/* Mirror line */}
            <div className="flex flex-col items-center">
              <div className="w-1 h-16 md:h-24 bg-black" />
              <span className="font-bold text-xs uppercase mt-1">Cermin</span>
            </div>

            {/* Right side (mirrored) */}
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-tertiary-container border-4 border-black shadow-md flex items-center justify-center opacity-60 scale-x-[-1]">
                <MaterialIcon name="looks_one" className="!text-3xl md:!text-4xl" />
              </div>
              <span className="font-bold text-xs md:text-sm uppercase">Kanan</span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
