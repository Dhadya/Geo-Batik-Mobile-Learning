import type { QuizModule } from "./types"

export const QUIZ_MODULES: Record<string, QuizModule> = {
  translasi: {
    slug: "translasi",
    title: "Tantangan Translasi",
    badge: "Geometric Master",
    questions: [
      {
        id: 1,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "titik",
        question:
          "Titik A(3, 2) ditranslasi sejauh T(4, -1). Koordinat A' adalah...",
        options: ["(7, 3)", "(7, 1)", "(-1, 3)", "(7, -1)"],
        correctIndex: 1,
        explanation:
          "A(3, 2) + T(4, -1) = (3+4, 2-1) = (7, 1). Jadi bayangan A' berada di (7, 1).",
      },
      {
        id: 2,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "titik",
        question:
          "Titik B(-2, 5) ditranslasi sejauh T(3, -2). Koordinat B' adalah...",
        options: ["(-5, 7)", "(1, 3)", "(-5, 3)", "(1, 7)"],
        correctIndex: 1,
        explanation:
          "B(-2, 5) + T(3, -2) = (-2+3, 5-2) = (1, 3). Jadi bayangan B' berada di (1, 3).",
      },
      {
        id: 3,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "titik",
        question:
          "Titik C(0, 0) ditranslasi sejauh T(-3, 4). Koordinat C' adalah...",
        options: ["(3, -4)", "(3, 4)", "(-3, 4)", "(-3, -4)"],
        correctIndex: 2,
        explanation:
          "C(0, 0) + T(-3, 4) = (0-3, 0+4) = (-3, 4). Jadi bayangan C' berada di (-3, 4).",
      },
      {
        id: 11,
        type: "uraian",
        module: "translasi",
        tab: "bangun",
        question:
          "Jelaskan perbedaan antara translasi dan refleksi dalam transformasi geometri.",
        answer:
          "Translasi adalah pergeseran titik/bangun sejauh vektor tertentu tanpa mengubah bentuk dan orientasi, sedangkan refleksi adalah pencerminan titik/bangun terhadap suatu garis atau titik yang menghasilkan bayangan cermin.",
        acceptAnswers: [
          "Translasi menggeser, refleksi mencerminkan",
          "Translasi mempertahankan orientasi, refleksi membalik orientasi",
        ],
        explanation:
          "Translasi hanya memindahkan posisi, sedangkan refleksi membalikkan orientasi objek terhadap sumbu pencerminan.",
      },
      {
        id: 12,
        type: "angka",
        module: "translasi",
        tab: "bangun",
        question:
          "Titik A(2, 3) ditranslasikan oleh T(4, -1). Tentukan koordinat bayangan A'.",
        answer: { x: 6, y: 2 },
        acceptFormats: ["(6,2)", "6,2", "x=6,y=2"],
        explanation:
          "A(2, 3) + T(4, -1) = (2+4, 3-1) = (6, 2).",
      },
      {
        id: 4,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "garis",
        question:
          "Garis PQ dengan P(1,1) dan Q(3,3) ditranslasi T(2,0). Koordinat P' adalah...",
        options: ["(3, 1)", "(1, 1)", "(3, 3)", "(1, 3)"],
        correctIndex: 0,
        explanation:
          "P(1, 1) + T(2, 0) = (1+2, 1+0) = (3, 1). Jadi bayangan P' berada di (3, 1).",
      },
      {
        id: 5,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "bangun",
        question:
          "Segitiga ABC dengan A(0,0), B(4,0), C(0,3) ditranslasi T(1,1). Luas A'B'C' adalah...",
        options: ["14", "12", "7", "6"],
        correctIndex: 3,
        explanation:
          "Translasi tidak mengubah luas bangun. Luas segitiga awal = ½ × 4 × 3 = 6 satuan luas. Maka luas bayangannya juga 6.",
      },
      {
        id: 6,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "titik",
        question:
          "Titik D(5, -3) ditranslasi sejauh T(-2, 5). Koordinat D' adalah...",
        options: ["(3, 2)", "(3, -8)", "(7, 2)", "(-7, -8)"],
        correctIndex: 0,
        explanation:
          "D(5, -3) + T(-2, 5) = (5-2, -3+5) = (3, 2). Jadi bayangan D' berada di (3, 2).",
      },
      {
        id: 7,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "titik",
        question:
          "Titik E(-4, -4) ditranslasi sejauh T(6, -2). Koordinat E' adalah...",
        options: ["(2, -6)", "(2, -2)", "(-10, -6)", "(-10, -2)"],
        correctIndex: 0,
        explanation:
          "E(-4, -4) + T(6, -2) = (-4+6, -4-2) = (2, -6). Jadi bayangan E' berada di (2, -6).",
      },
      {
        id: 8,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "garis",
        question:
          "Persegi JKLM dengan J(1,1), K(1,3), L(3,3), M(3,1) ditranslasi T(2,2). Koordinat J' adalah...",
        options: ["(3, 3)", "(-1, -1)", "(3, -1)", "(-1, 3)"],
        correctIndex: 0,
        explanation:
          "J(1, 1) + T(2, 2) = (1+2, 1+2) = (3, 3). Jadi bayangan J' berada di (3, 3).",
      },
      {
        id: 9,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "titik",
        question:
          "Titik F(10, 5) ditranslasi sejauh T(-7, -8). Koordinat F' adalah...",
        options: ["(17, 13)", "(3, -3)", "(17, -3)", "(3, 13)"],
        correctIndex: 1,
        explanation:
          "F(10, 5) + T(-7, -8) = (10-7, 5-8) = (3, -3). Jadi bayangan F' berada di (3, -3).",
      },
      {
        id: 10,
        type: "pilihan_ganda",
        module: "translasi",
        tab: "garis",
        question:
          "Jarak titik G(2, 3) ke G'(7, 3) setelah translasi adalah...",
        options: ["10", "5", "7", "2"],
        correctIndex: 1,
        explanation:
          "Translasi T(5, 0) memindahkan G(2, 3) ke G'(7, 3). Jarak = |7-2| = 5 satuan.",
      },
    ],
  },
  refleksi: {
    slug: "refleksi",
    title: "Tantangan Refleksi",
    badge: "Symmetry Master",
    questions: [
      {
        id: 1,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "sumbu-x",
        question:
          "Titik P(5, -3) direfleksikan terhadap sumbu X. Koordinat P' adalah...",
        options: ["(5, 3)", "(5, -3)", "(-5, -3)", "(-5, 3)"],
        correctIndex: 0,
        explanation:
          "Refleksi terhadap sumbu X: (x, y) → (x, -y). P(5, -3) → (5, 3).",
      },
      {
        id: 2,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "sumbu-y",
        question:
          "Titik Q(-4, 6) direfleksikan terhadap sumbu Y. Koordinat Q' adalah...",
        options: ["(4, -6)", "(-4, -6)", "(-4, 6)", "(4, 6)"],
        correctIndex: 3,
        explanation:
          "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Q(-4, 6) → (4, 6).",
      },
      {
        id: 3,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "titik",
        question:
          "Titik R(3, 7) direfleksikan terhadap titik (0,0). Koordinat R' adalah...",
        options: ["(3, -7)", "(-3, 7)", "(-3, -7)", "(3, 7)"],
        correctIndex: 2,
        explanation:
          "Refleksi terhadap titik asal (0,0): (x, y) → (-x, -y). R(3, 7) → (-3, -7).",
      },
      {
        id: 4,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "garis-x=y",
        question:
          "Titik S(6, 2) direfleksikan terhadap garis x=y. Koordinat S' adalah...",
        options: ["(-6, -2)", "(-6, 2)", "(2, 6)", "(6, -2)"],
        correctIndex: 2,
        explanation:
          "Refleksi terhadap garis x=y: (x, y) → (y, x). S(6, 2) → (2, 6).",
      },
      {
        id: 11,
        type: "uraian",
        module: "refleksi",
        tab: "garis-x=-y",
        question:
          "Jelaskan apa yang terjadi pada orientasi suatu bangun setelah direfleksikan.",
        answer:
          "Orientasi bangun akan terbalik (berlawanan) setelah direfleksikan. Misalnya, arah jarum jam menjadi berlawanan arah jarum jam.",
        acceptAnswers: [
          "Orientasi menjadi terbalik",
          "Bayangan memiliki orientasi yang berkebalikan dengan aslinya",
        ],
        explanation:
          "Refleksi selalu membalikkan orientasi objek. Urutan titik-titik sudut menjadi terbalik arahnya.",
      },
      {
        id: 12,
        type: "angka",
        module: "refleksi",
        tab: "sumbu-x",
        question:
          "Titik A(4, 5) direfleksikan terhadap sumbu X. Tentukan koordinat bayangan A'.",
        answer: { x: 4, y: -5 },
        acceptFormats: ["(4,-5)", "4,-5", "x=4,y=-5"],
        explanation:
          "Refleksi terhadap sumbu X: (x, y) → (x, -y). A(4, 5) → (4, -5).",
      },
      {
        id: 5,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "garis-x=-y",
        question:
          "Titik T(4, -5) direfleksikan terhadap garis x=-y. Koordinat T' adalah...",
        options: ["(-4, 5)", "(5, -4)", "(4, 5)", "(-5, 4)"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap garis x=-y: (x, y) → (-y, -x). T(4, -5) → (5, -4).",
      },
      {
        id: 6,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "garis-x=h",
        question:
          "Titik U(8, 1) direfleksikan terhadap garis x=3. Koordinat U' adalah...",
        options: ["(8, -5)", "(-2, 1)", "(8, 5)", "(-2, -1)"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap garis x=h: (x, y) → (2h-x, y). U(8, 1) → (2·3-8, 1) = (-2, 1).",
      },
      {
        id: 7,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "garis-y=h",
        question:
          "Titik V(2, 9) direfleksikan terhadap garis y=4. Koordinat V' adalah...",
        options: ["(-2, 9)", "(2, -1)", "(-2, -1)", "(2, 9)"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap garis y=k: (x, y) → (x, 2k-y). V(2, 9) → (2, 2·4-9) = (2, -1).",
      },
      {
        id: 8,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "sumbu-x",
        question:
          "Titik W(-3, 5) direfleksikan terhadap sumbu X. Koordinat W' adalah...",
        options: ["(3, 5)", "(-3, -5)", "(-3, 5)", "(3, -5)"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap sumbu X: (x, y) → (x, -y). W(-3, 5) → (-3, -5).",
      },
      {
        id: 9,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "bangun",
        question:
          "Segitiga ABC dengan A(1,1), B(4,1), C(1,5) direfleksikan terhadap sumbu Y. Luas A'B'C' adalah...",
        options: ["6", "10", "8", "12"],
        correctIndex: 0,
        explanation:
          "Refleksi tidak mengubah luas bangun. Alas=3, tinggi=4, Luas = ½ × 3 × 4 = 6 satuan luas.",
      },
      {
        id: 10,
        type: "pilihan_ganda",
        module: "refleksi",
        tab: "garis-y=h",
        question:
          "Titik Z(0, 6) direfleksikan terhadap garis y=2. Koordinat Z' adalah...",
        options: ["(0, 10)", "(0, -2)", "(0, -6)", "(0, 4)"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap garis y=k: (x, y) → (x, 2k-y). Z(0, 6) → (0, 2·2-6) = (0, -2).",
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
