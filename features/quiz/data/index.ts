import type { QuizModule } from "../types"
import { translasiModule } from "./translasi"
import { refleksiModule } from "./refleksi"
import { useQuizStore } from "../store"

/** Jumlah soal per paket dalam satu modul. */
export const PACKAGE_SIZE = 10

/** Kumpulan semua modul kuis yang tersedia, di-key oleh slug. */
export const QUIZ_MODULES: Record<string, QuizModule> = {
  translasi: translasiModule,
  refleksi: refleksiModule,
}

/** Mengembalikan konfigurasi modul kuis berdasarkan slug. */
export function getQuizModule(slug: string): QuizModule | undefined {
  return QUIZ_MODULES[slug]
}

/** Mengembalikan soal-soal yang difilter berdasarkan tab untuk tampilan per-tab. */
export function getQuizQuestionsByTab(slug: string, tab: string) {
  const mod = QUIZ_MODULES[slug]
  if (!mod) return []
  return mod.questions.filter((q) => q.tab === tab)
}
