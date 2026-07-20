import type { QuizModule } from "./types"

export const QUIZ_MODULES: Record<string, QuizModule> = {
  translasi: {
    slug: "translasi",
    title: "KUIS TRANSLASI",
    badge: "Translasi",
    questions: [
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
    ],
  },

  refleksi: {
    slug: "refleksi",
    title: "KUIS REFLEKSI",
    badge: "Refleksi",
    questions: [
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
    ],
  },
}

/** Get quiz config by module slug. */
export function getQuizModule(slug: string): QuizModule | undefined {
  return QUIZ_MODULES[slug]
}

/** Get questions filtered by tab for per-tab breakdown. */
export function getQuizQuestionsByTab(slug: string, tab: string) {
  const mod = QUIZ_MODULES[slug]
  if (!mod) return []
  return mod.questions.filter((q) => q.tab === tab)
}
