"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { useQuizStore } from "../store"

export function QuizResultActions({ slug }: { slug: string }) {
  const router = useRouter()
  const resetAnswers = useQuizStore((s) => s.resetAnswers)

  const handleNext = () => {
    resetAnswers()
    // Determine next route based on current quiz slug
    const nextRoute = slug === "translasi"
      ? "/modul/refleksi"
      : slug === "refleksi"
        ? "/menu"
        : `/modul/${slug}`
    router.push(nextRoute)
  }

  return (
    <div className="flex justify-center gap-4 pt-4">
      <Link href={`/modul/${slug}/kuis`}>
        <Button
          variant="outline"
          size="lg"
          className="px-8 py-4 text-lg font-black uppercase gap-2"
        >
          <MaterialIcon className="size-6" name="arrow_back" />
          Kembali
        </Button>
      </Link>
      <Button
        variant="default"
        size="lg"
        className="px-8 py-4 text-lg font-black uppercase gap-2"
        onClick={handleNext}
      >
        {slug === "refleksi" ? "Ke Menu" : "Modul Selanjutnya"}
        <MaterialIcon className="size-6" name="arrow_forward" />
      </Button>
    </div>
  )
}
