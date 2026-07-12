"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { RefreshCw, Home } from "lucide-react"
import { useQuizStore } from "../store"

export function QuizResultActions({ slug }: { slug: string }) {
  const router = useRouter()
  const resetAnswers = useQuizStore((s) => s.resetAnswers)

  const handleUlangi = () => {
    resetAnswers()
    router.push(`/modul/${slug}/kuis`)
  }

  return (
    <div className="flex justify-center gap-4 pt-4">
      <Button
        variant="outline"
        size="lg"
        className="px-8 py-4 text-lg font-black uppercase gap-2"
        onClick={handleUlangi}
      >
        <RefreshCw className="size-6" />
        Ulangi
      </Button>
      <Link href="/menu">
        <Button
          variant="default"
          size="lg"
          className="px-8 py-4 text-lg font-black uppercase gap-2"
        >
          <Home className="size-6" />
          Kembali ke Menu
        </Button>
      </Link>
    </div>
  )
}
