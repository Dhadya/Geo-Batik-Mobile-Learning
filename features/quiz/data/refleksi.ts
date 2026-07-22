import type { PilihanGandaQuestion, QuizModule } from "../types"

/** Kumpulan soal kuis untuk modul Refleksi (Paket 1 & 2). */
export const refleksiQuestions: PilihanGandaQuestion[] = [
  // ── PAKET 1 ──
  {
    id: 1,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "sumbu-x",
    question: "Titik A(3, -5) dicerminkan terhadap sumbu X. Koordinat bayangannya adalah ...",
    options: ["(-3, -5)", "(3, 5)", "(-3, 5)", "(5, 3)"],
    correctIndex: 1,
    explanation:
      "Refleksi sumbu X: (x, y) → (x, -y). A(3, -5) → (3, 5).",
  },
  {
    id: 2,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "sumbu-y",
    question: "Titik P(-4, 6) dicerminkan terhadap sumbu Y. Koordinat bayangannya adalah ...",
    options: ["(4, 6)", "(-4, -6)", "(6, -4)", "(4, -6)"],
    correctIndex: 0,
    explanation:
      "Refleksi sumbu Y: (x, y) → (-x, y). P(-4, 6) → (4, 6).",
  },
  {
    id: 3,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "titik",
    question:
      "Titik Q(5, -2) dicerminkan terhadap titik pusat (0, 0). Koordinat bayangannya adalah ...",
    options: ["(-5, -2)", "(5, 2)", "(-5, 2)", "(2, -5)"],
    correctIndex: 2,
    explanation:
      "Refleksi titik asal: (x, y) → (-x, -y). Q(5, -2) → (-5, 2).",
  },
  {
    id: 4,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis-x=y",
    question:
      "Titik R(2, -7) dicerminkan terhadap garis x = y. Koordinat bayangannya adalah ...",
    options: ["(-7, 2)", "(7, -2)", "(-2, 7)", "(-7, -2)"],
    correctIndex: 0,
    explanation:
      "Refleksi x=y: (x, y) → (y, x). R(2, -7) → (-7, 2).",
  },
  {
    id: 5,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis-x=-y",
    question:
      "Titik S(4, 1) dicerminkan terhadap garis x = -y. Koordinat bayangannya adalah ...",
    options: ["(1, 4)", "(-1, -4)", "(-4, -1)", "(4, -1)"],
    correctIndex: 1,
    explanation:
      "Refleksi x=-y: (x, y) → (-y, -x). S(4, 1) → (-1, -4).",
  },
  {
    id: 6,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis-x=h",
    question:
      "Titik T(3, 5) dicerminkan terhadap garis x = 1. Koordinat bayangannya adalah ...",
    options: ["(-1, 5)", "(1, 5)", "(-3, 5)", "(5, 3)"],
    correctIndex: 0,
    explanation:
      "Refleksi x=h: (x, y) → (2h-x, y). T(3, 5) → (2·1-3, 5) = (-1, 5).",
  },
  {
    id: 7,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "bangun",
    question:
      "Sebuah persegi direfleksikan terhadap sumbu Y. Pernyataan yang benar adalah ...",
    options: [
      "Luas bangun berubah",
      "Bentuk bangun berubah",
      "Ukuran bangun tetap",
      "Keliling bangun bertambah",
    ],
    correctIndex: 2,
    explanation:
      "Refleksi tidak mengubah ukuran, bentuk, luas, maupun keliling bangun.",
  },
  {
    id: 8,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "bangun",
    question:
      "Setelah suatu bangun direfleksikan terhadap garis cermin, hubungan titik dengan bayangannya adalah ...",
    options: [
      "Berjarak sama terhadap garis cermin",
      "Selalu berada pada kuadran yang sama",
      "Membentuk sudut 45°",
      "Berimpit dengan garis cermin",
    ],
    correctIndex: 0,
    explanation:
      "Titik dan bayangannya berjarak sama terhadap garis cermin dan tegak lurus terhadapnya.",
  },
  {
    id: 9,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis",
    question: "Garis y = x + 2 dicerminkan terhadap sumbu X. Persamaan bayangannya adalah ...",
    options: ["y = x - 2", "y = -x + 2", "y = -x - 2", "y = -x + 4"],
    correctIndex: 2,
    explanation:
      "Refleksi sumbu X: y → -y. -y = x+2 → y = -x-2.",
  },
  {
    id: 10,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis",
    question: "Garis y = 2x - 3 dicerminkan terhadap sumbu Y. Persamaan bayangannya adalah ...",
    options: ["y = 2x + 3", "y = -2x - 3", "y = -2x + 3", "y = 2x - 3"],
    correctIndex: 1,
    explanation:
      "Refleksi sumbu Y: x → -x. y = 2(-x)-3 → y = -2x-3.",
  },

  // ── PAKET 2 ──
  {
    id: 11,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "sumbu-x",
    question: "Titik A(-6, 3) dicerminkan terhadap sumbu X. Koordinat bayangannya adalah ...",
    options: ["(6, 3)", "(-6, -3)", "(6, -3)", "(-3, -6)"],
    correctIndex: 1,
    explanation:
      "Refleksi sumbu X: (x, y) → (x, -y). A(-6, 3) → (-6, -3).",
  },
  {
    id: 12,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "sumbu-y",
    question: "Titik B(5, -4) dicerminkan terhadap sumbu Y. Koordinat bayangannya adalah ...",
    options: ["(-5, -4)", "(5, 4)", "(-5, 4)", "(4, -5)"],
    correctIndex: 0,
    explanation:
      "Refleksi sumbu Y: (x, y) → (-x, y). B(5, -4) → (-5, -4).",
  },
  {
    id: 13,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "titik",
    question:
      "Titik C(-2, 7) dicerminkan terhadap titik pusat (0, 0). Koordinat bayangannya adalah ...",
    options: ["(2, -7)", "(-2, -7)", "(2, 7)", "(-7, 2)"],
    correctIndex: 0,
    explanation:
      "Refleksi titik asal: (x, y) → (-x, -y). C(-2, 7) → (2, -7).",
  },
  {
    id: 14,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis-x=y",
    question:
      "Titik D(-5, 2) dicerminkan terhadap garis x = y. Koordinat bayangannya adalah ...",
    options: ["(2, -5)", "(-2, 5)", "(5, -2)", "(-5, 2)"],
    correctIndex: 0,
    explanation:
      "Refleksi x=y: (x, y) → (y, x). D(-5, 2) → (2, -5).",
  },
  {
    id: 15,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis-x=-y",
    question:
      "Titik E(3, -6) dicerminkan terhadap garis x = -y. Koordinat bayangannya adalah ...",
    options: ["(-6, 3)", "(6, -3)", "(6, 3)", "(-3, 6)"],
    correctIndex: 1,
    explanation:
      "Refleksi x=-y: (x, y) → (-y, -x). E(3, -6) → (6, -3).",
  },
  {
    id: 16,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis-y=h",
    question:
      "Titik F(7, 2) dicerminkan terhadap garis y = 4. Koordinat bayangannya adalah ...",
    options: ["(7, 6)", "(7, -2)", "(1, 2)", "(7, 8)"],
    correctIndex: 0,
    explanation:
      "Refleksi y=k: (x, y) → (x, 2k-y). F(7, 2) → (7, 2·4-2) = (7, 6).",
  },
  {
    id: 17,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "bangun",
    question:
      "Sebuah segitiga direfleksikan terhadap garis x = h. Pernyataan yang benar adalah ...",
    options: [
      "Semua panjang sisi berubah",
      "Bentuk dan ukuran bangun tetap",
      "Luas bangun menjadi dua kali lipat",
      "Semua titik berpindah dengan arah yang sama",
    ],
    correctIndex: 1,
    explanation:
      "Refleksi mempertahankan bentuk dan ukuran bangun, hanya posisi yang berubah.",
  },
  {
    id: 18,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "bangun",
    question:
      "Manakah pernyataan yang benar tentang hasil refleksi suatu bangun?",
    options: [
      "Titik dan bayangannya selalu berada pada kuadran yang sama",
      "Garis cermin membagi dua sama panjang ruas yang menghubungkan titik dan bayangannya secara tegak lurus",
      "Refleksi mengubah panjang sisi bangun",
      "Refleksi mengubah besar sudut bangun",
    ],
    correctIndex: 1,
    explanation:
      "Garis cermin merupakan sumbu simetri yang membagi ruas titik dan bayangannya menjadi dua bagian sama panjang dan tegak lurus.",
  },
  {
    id: 19,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis",
    question: "Garis y = -2x + 5 dicerminkan terhadap sumbu X. Persamaan bayangannya adalah ...",
    options: ["y = 2x - 5", "y = 2x + 5", "y = -2x - 5", "y = -2x + 5"],
    correctIndex: 0,
    explanation:
      "Refleksi sumbu X: y → -y. -y = -2x+5 → y = 2x-5.",
  },
  {
    id: 20,
    type: "pilihan_ganda",
    module: "refleksi",
    tab: "garis",
    question: "Garis y = -3x + 1 dicerminkan terhadap sumbu Y. Persamaan bayangannya adalah ...",
    options: ["y = 3x + 1", "y = 3x - 1", "y = -3x - 1", "y = -3x + 1"],
    correctIndex: 0,
    explanation:
      "Refleksi sumbu Y: x → -x. y = -3(-x)+1 → y = 3x+1.",
  },
]

/** Modul kuis Refleksi dengan 20 soal (2 paket). */
export const refleksiModule: QuizModule = {
  slug: "refleksi",
  title: "KUIS REFLEKSI",
  badge: "Refleksi",
  questions: refleksiQuestions,
}
