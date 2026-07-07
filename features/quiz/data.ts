import type { QuizModule } from "./types"

export const QUIZ_MODULES: Record<string, QuizModule> = {
  translasi: {
    slug: "translasi",
    title: "Tantangan Translasi",
    badge: "Geometric Master",
    questions: [
      {
        id: 1,
        question:
          "Titik A(3, 2) ditranslasi sejauh T(4, -1). Koordinat A' adalah...",
        options: ["1)", "3)", "(-1", "(7"],
        correctIndex: 1,
        explanation:
          "A(3, 2) + T(4, -1) = (3+4, 2-1) = (7, 1). Jadi bayangan A' berada di (7, 1).",
      },
      {
        id: 2,
        question:
          "Titik B(-2, 5) ditranslasi sejauh T(3, -2). Koordinat B' adalah...",
        options: ["(-5", "7)", "(1", "3)"],
        correctIndex: 2,
        explanation:
          "B(-2, 5) + T(3, -2) = (-2+3, 5-2) = (1, 3). Jadi bayangan B' berada di (1, 3).",
      },
      {
        id: 3,
        question:
          "Titik C(0, 0) ditranslasi sejauh T(-3, 4). Koordinat C' adalah...",
        options: ["(3", "4)", "-4)", "(-3"],
        correctIndex: 2,
        explanation:
          "C(0, 0) + T(-3, 4) = (0-3, 0+4) = (-3, 4). Jadi bayangan C' berada di (-3, 4).",
      },
      {
        id: 4,
        question:
          "Garis PQ dengan P(1,1) dan Q(3,3) ditranslasi T(2,0). Koordinat P' adalah...",
        options: ["(3", "(1", "1)", "3)"],
        correctIndex: 0,
        explanation:
          "P(1, 1) + T(2, 0) = (1+2, 1+0) = (3, 1). Jadi bayangan P' berada di (3, 1).",
      },
      {
        id: 5,
        question:
          "Segitiga ABC dengan A(0,0), B(4,0), C(0,3) ditranslasi T(1,1). Luas A'B'C' adalah...",
        options: ["14", "12", "7", "6"],
        correctIndex: 0,
        explanation:
          "Translasi tidak mengubah luas bangun. Luas segitiga awal = ½ × 4 × 3 = 6 satuan luas. Maka luas bayangannya juga 6.",
      },
      {
        id: 6,
        question:
          "Titik D(5, -3) ditranslasi sejauh T(-2, 5). Koordinat D' adalah...",
        options: ["2)", "2)", "(3", "(-7"],
        correctIndex: 1,
        explanation:
          "D(5, -3) + T(-2, 5) = (5-2, -3+5) = (3, 2). Jadi bayangan D' berada di (3, 2).",
      },
      {
        id: 7,
        question:
          "Titik E(-4, -4) ditranslasi sejauh T(6, -2). Koordinat E' adalah...",
        options: ["(2", "-6)", "(-10", "-6)"],
        correctIndex: 0,
        explanation:
          "E(-4, -4) + T(6, -2) = (-4+6, -4-2) = (2, -6). Jadi bayangan E' berada di (2, -6).",
      },
      {
        id: 8,
        question:
          "Persegi JKLM dengan J(1,1), K(1,3), L(3,3), M(3,1) ditranslasi T(2,2). Koordinat J' adalah...",
        options: ["-1)", "3)", "(-1", "(3"],
        correctIndex: 0,
        explanation:
          "J(1, 1) + T(2, 2) = (1+2, 1+2) = (3, 3). Jadi bayangan J' berada di (3, 3).",
      },
      {
        id: 9,
        question:
          "Titik F(10, 5) ditranslasi sejauh T(-7, -8). Koordinat F' adalah...",
        options: ["-3)", "13)", "(3", "(17"],
        correctIndex: 2,
        explanation:
          "F(10, 5) + T(-7, -8) = (10-7, 5-8) = (3, -3). Jadi bayangan F' berada di (3, -3).",
      },
      {
        id: 10,
        question:
          "Jarak titik G(2, 3) ke G'(7, 3) setelah translasi adalah...",
        options: ["10", "5", "7", "2"],
        correctIndex: 2,
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
        question:
          "Titik P(5, -3) direfleksikan terhadap sumbu X. Koordinat P' adalah...",
        options: ["3)", "(5", "-3)", "(-5"],
        correctIndex: 0,
        explanation:
          "Refleksi terhadap sumbu X: (x, y) → (x, -y). P(5, -3) → (5, 3).",
      },
      {
        id: 2,
        question:
          "Titik Q(-4, 6) direfleksikan terhadap sumbu Y. Koordinat Q' adalah...",
        options: ["-6)", "6)", "(-4", "(4"],
        correctIndex: 3,
        explanation:
          "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Q(-4, 6) → (4, 6).",
      },
      {
        id: 3,
        question:
          "Titik R(3, 7) direfleksikan terhadap titik (0,0). Koordinat R' adalah...",
        options: ["-7)", "(-3", "(3", "-7)"],
        correctIndex: 2,
        explanation:
          "Refleksi terhadap titik asal (0,0): (x, y) → (-x, -y). R(3, 7) → (-3, -7).",
      },
      {
        id: 4,
        question:
          "Titik S(6, 2) direfleksikan terhadap garis x=y. Koordinat S' adalah...",
        options: ["6)", "(-2", "(2", "6)"],
        correctIndex: 2,
        explanation:
          "Refleksi terhadap garis x=y: (x, y) → (y, x). S(6, 2) → (2, 6).",
      },
      {
        id: 5,
        question:
          "Titik T(4, -5) direfleksikan terhadap garis x=-y. Koordinat T' adalah...",
        options: ["4)", "(-5", "-4)", "(5"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap garis x=-y: (x, y) → (-y, -x). T(4, -5) → (5, -4).",
      },
      {
        id: 6,
        question:
          "Titik U(8, 1) direfleksikan terhadap garis x=3. Koordinat U' adalah...",
        options: ["(8", "(-2", "1)", "-1)"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap garis x=h: (x, y) → (2h-x, y). U(8, 1) → (2·3-8, 1) = (-2, 1).",
      },
      {
        id: 7,
        question:
          "Titik V(2, 9) direfleksikan terhadap garis y=4. Koordinat V' adalah...",
        options: ["(-2", "(2", "-1)", "9)"],
        correctIndex: 1,
        explanation:
          "Refleksi terhadap garis y=k: (x, y) → (x, 2k-y). V(2, 9) → (2, 2·4-9) = (2, -1).",
      },
      {
        id: 8,
        question:
          "Titik W(-3, 5) direfleksikan terhadap sumbu X. Koordinat W' adalah...",
        options: ["-5)", "(3", "(-3", "5)"],
        correctIndex: 2,
        explanation:
          "Refleksi terhadap sumbu X: (x, y) → (x, -y). W(-3, 5) → (-3, -5).",
      },
      {
        id: 9,
        question:
          "Segitiga ABC dengan A(1,1), B(4,1), C(1,5) direfleksikan terhadap sumbu Y. Luas A'B'C' adalah...",
        options: ["6", "10", "8", "12"],
        correctIndex: 0,
        explanation:
          "Refleksi tidak mengubah luas bangun. Alas=3, tinggi=4, Luas = ½ × 3 × 4 = 6 satuan luas.",
      },
      {
        id: 10,
        question:
          "Titik Z(0, 6) direfleksikan terhadap garis y=2. Koordinat Z' adalah...",
        options: ["(0", "(0", "10)", "-2)"],
        correctIndex: 2,
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
