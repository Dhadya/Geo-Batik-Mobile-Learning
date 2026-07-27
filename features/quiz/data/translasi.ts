import type { PilihanGandaQuestion, QuizModule } from "../types"

/** Kumpulan soal kuis untuk modul Translasi (Paket 1 & 2). */
export const translasiQuestions: PilihanGandaQuestion[] = [
  // ── PAKET 1 ──
  {
    id: 1,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik A(-3, 4) ditranslasikan oleh",
    questionMatrix: "5,-2",
    questionSuffix: "Koordinat bayangan titik A adalah ...",
    options: ["(2, 2)", "(2, 6)", "(-8, 2)", "(8, 2)"],
    correctIndex: 0,
    explanation:
      "A(-3, 4) + T(5, -2) = (-3+5, 4-2) = (2, 2).",
  },
  {
    id: 2,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik P(6, -1) ditranslasikan menjadi P'(2, 4). Vektor translasinya adalah ...",
    options: ["(-4, 5)", "(4, 5)", "(-4, -5)", "(2, 4)"],
    correctIndex: 0,
    explanation:
      "Vektor translasi = P' - P = (2-6, 4-(-1)) = (-4, 5).",
    optionMatrices: { 0: "-4,5", 1: "4,5", 2: "-4,-5", 3: "2,4" },
  },
  {
    id: 3,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik B(x, y) ditranslasikan oleh",
    questionMatrix: "-3,6",
    questionSuffix: "Bayangan titik tersebut adalah ...",
    options: ["(x+3, y-6)", "(x-3, y+6)", "(x-3, y-6)", "(x+3, y+6)"],
    correctIndex: 1,
    explanation:
      "B(x, y) + T(-3, 6) = (x-3, y+6).",
  },
  {
    id: 4,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik Q(-2, 5) ditranslasikan oleh (a, b) sehingga bayangannya Q'(3, 3). Nilai a+b adalah ...",
    options: ["2", "3", "5", "8"],
    correctIndex: 1,
    explanation:
      "a = 3-(-2) = 5, b = 3-5 = -2. a+b = 5+(-2) = 3.",
  },
  {
    id: 5,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "bangun",
    question: "Sebuah persegi ditranslasikan sejauh",
    questionMatrix: "4,1",
    questionSuffix: "Pernyataan yang benar adalah ...",
    options: [
      "Bentuk berubah",
      "Ukuran berubah",
      "Semua titik sudut bergeser sejauh yang sama",
      "Panjang sisi bertambah",
    ],
    correctIndex: 2,
    explanation:
      "Translasi menggeser semua titik sejauh vektor yang sama, tanpa mengubah bentuk atau ukuran.",
  },
  {
    id: 6,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "bangun",
    question: "Sifat yang tidak berubah pada translasi adalah ...",
    options: [
      "Posisi",
      "Letak",
      "Koordinat titik",
      "Bentuk dan ukuran",
    ],
    correctIndex: 3,
    explanation:
      "Translasi hanya memindahkan posisi, bentuk dan ukuran bangun tetap sama.",
  },
  {
    id: 7,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question:
      "Titik A(2, -3) ditranslasikan sehingga bayangannya A'(7, 5). Jika titik B(-4, 1) dikenai translasi yang sama, koordinat B' adalah ...",
    options: ["(1, 9)", "(1, 8)", "(3, 8)", "(3, 9)"],
    correctIndex: 0,
    explanation:
      "T = A' - A = (7-2, 5-(-3)) = (5, 8). B' = (-4+5, 1+8) = (1, 9).",
  },
  {
    id: 8,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "bangun",
    question:
      "Segitiga ABC dengan A(1, 2), B(4, 2), C(2, 5) ditranslasikan oleh",
    questionMatrix: "-2,3",
    questionSuffix: "Koordinat titik C' adalah ...",
    options: ["(0, 8)", "(4, 2)", "(2, 8)", "(0, 5)"],
    correctIndex: 0,
    explanation:
      "C(2, 5) + T(-2, 3) = (2-2, 5+3) = (0, 8).",
  },
  {
    id: 9,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "garis",
    question: "Garis y = 2x - 1 ditranslasikan oleh",
    questionMatrix: "3,2",
    questionSuffix: "Persamaan bayangannya adalah ...",
    options: ["y = 2x - 5", "y = 2x + 1", "y = 2x - 3", "y = 2x + 5"],
    correctIndex: 0,
    explanation:
      "Substitusi x' = x+3, y' = y+2. y-2 = 2(x-3)-1 → y = 2x-5.",
  },
  {
    id: 10,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "garis",
    question: "Garis 2x + y = 6 ditranslasikan oleh",
    questionMatrix: "-2,4",
    questionSuffix: "Persamaan bayangan garis tersebut adalah ...",
    options: ["2x + y = 6", "2x + y = 14", "2x + y = 2", "2x + y = 10"],
    correctIndex: 0,
    explanation:
      "Substitusi x = x'+2, y = y'-4: 2(x'+2)+(y'-4)=6 → 2x'+y'=6. Garis invariant.",
  },

  // ── PAKET 2 ──
  {
    id: 11,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik A(4, -2) ditranslasikan oleh",
    questionMatrix: "-3,5",
    questionSuffix: "Koordinat bayangan titik A adalah ...",
    options: ["(1, 3)", "(7, 3)", "(1, -7)", "(7, -7)"],
    correctIndex: 0,
    explanation:
      "A(4, -2) + T(-3, 5) = (4-3, -2+5) = (1, 3).",
  },
  {
    id: 12,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik P(-5, 2) ditranslasikan menjadi P'(-1, -3). Vektor translasinya adalah ...",
    options: ["(4, -5)", "(-4, 5)", "(4, 5)", "(-1, -3)"],
    correctIndex: 0,
    explanation:
      "Vektor translasi = P' - P = (-1-(-5), -3-2) = (4, -5).",
    optionMatrices: { 0: "4,-5", 1: "-4,5", 2: "4,5", 3: "-1,-3" },
  },
  {
    id: 13,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik B(x, y) ditranslasikan oleh",
    questionMatrix: "6,-4",
    questionSuffix: "Bayangan titik tersebut adalah ...",
    options: ["(x+6, y-4)", "(x-6, y+4)", "(x+6, y+4)", "(x-6, y-4)"],
    correctIndex: 0,
    explanation:
      "B(x, y) + T(6, -4) = (x+6, y-4).",
  },
  {
    id: 14,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik Q(3, -1) ditranslasikan oleh (a, b) sehingga bayangannya Q'(-2, 4). Nilai a+b adalah ...",
    options: ["-10", "0", "5", "-5"],
    correctIndex: 1,
    explanation:
      "a = -2-3 = -5, b = 4-(-1) = 5. a+b = -5+5 = 0.",
  },
  {
    id: 15,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "bangun",
    question: "Sebuah segitiga ditranslasikan oleh",
    questionMatrix: "-2,4",
    questionSuffix: "Pernyataan yang benar adalah ...",
    options: [
      "Bentuk bangun berubah",
      "Semua titik sudut bergeser dengan vektor yang sama",
      "Luas bangun bertambah",
      "Keliling bangun berubah",
    ],
    correctIndex: 1,
    explanation:
      "Translasi menggeser setiap titik dengan vektor yang sama, sehingga bentuk, ukuran, luas, dan keliling tetap.",
  },
  {
    id: 16,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "bangun",
    question: "Setelah suatu bangun ditranslasikan, sifat yang tetap adalah ...",
    options: [
      "Posisi bangun",
      "Koordinat titik",
      "Bentuk dan ukuran bangun",
      "Letak terhadap sumbu koordinat",
    ],
    correctIndex: 2,
    explanation:
      "Translasi mempertahankan bentuk dan ukuran, hanya posisi yang berubah.",
  },
  {
    id: 17,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question:
      "Titik A(-1, 4) ditranslasikan sehingga bayangannya A'(5, 1). Jika titik B(2, -3) dikenai translasi yang sama, koordinat B' adalah ...",
    options: ["(8, -6)", "(7, -6)", "(8, -2)", "(7, -2)"],
    correctIndex: 0,
    explanation:
      "T = A' - A = (5-(-1), 1-4) = (6, -3). B' = (2+6, -3-3) = (8, -6).",
  },
  {
    id: 18,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "bangun",
    question:
      "Persegi panjang ABCD dengan A(-2, 1), B(1, 1), C(1, 4), D(-2, 4) ditranslasikan oleh",
    questionMatrix: "4,-2",
    questionSuffix: "Koordinat titik D' adalah ...",
    options: ["(2, 2)", "(2, 0)", "(4, 2)", "(4, 0)"],
    correctIndex: 0,
    explanation:
      "D(-2, 4) + T(4, -2) = (2, 2).",
  },
  {
    id: 19,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "garis",
    question: "Garis y = -x + 4 ditranslasikan oleh",
    questionMatrix: "2,3",
    questionSuffix: "Persamaan bayangannya adalah ...",
    options: ["y = -x + 5", "y = -x + 3", "y = -x + 9", "y = -x + 1"],
    correctIndex: 2,
    explanation:
      "Substitusi x = x'-2, y = y'-3: y'-3 = -(x'-2)+4 → y' = -x'+9.",
  },
  {
    id: 20,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "garis",
    question: "Garis x - y = 3 ditranslasikan oleh",
    questionMatrix: "5,-2",
    questionSuffix: "Persamaan bayangan garis tersebut adalah ...",
    options: ["x - y = 0", "x - y = 6", "x - y = 10", "x - y = 8"],
    correctIndex: 2,
    explanation:
      "Substitusi x = x'-5, y = y'+2: (x'-5)-(y'+2)=3 → x'-y'=10.",
  },
]

/** Modul kuis Translasi dengan 20 soal (2 paket). */
export const translasiModule: QuizModule = {
  slug: "translasi",
  title: "KUIS TRANSLASI",
  badge: "Translasi",
  questions: translasiQuestions,
}
