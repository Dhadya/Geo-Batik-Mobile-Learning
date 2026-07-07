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
        options: ["(7, 1)", "(-1, 3)", "(7, 3)", "(-1, 1)"],
        correctIndex: 0,
      },
      {
        id: 2,
        question:
          "Titik B(-2, 5) ditranslasi sejauh T(3, -2). Koordinat B' adalah...",
        options: ["(1, 3)", "(-5, 7)", "(1, 7)", "(-5, 3)"],
        correctIndex: 0,
      },
      {
        id: 3,
        question:
          "Titik C(0, 0) ditranslasi sejauh T(-3, 4). Koordinat C' adalah...",
        options: ["(-3, 4)", "(3, -4)", "(-3, -4)", "(3, 4)"],
        correctIndex: 0,
      },
      {
        id: 4,
        question:
          "Garis PQ dengan P(1,1) dan Q(3,3) ditranslasi T(2,0). Koordinat P' adalah...",
        options: ["(3, 1)", "(1, 3)", "(-1, 1)", "(3, 3)"],
        correctIndex: 0,
      },
      {
        id: 5,
        question:
          "Segitiga ABC dengan A(0,0), B(4,0), C(0,3) ditranslasi T(1,1). Luas A'B'C' adalah...",
        options: ["6", "7", "12", "14"],
        correctIndex: 0,
      },
      {
        id: 6,
        question:
          "Titik D(5, -3) ditranslasi sejauh T(-2, 5). Koordinat D' adalah...",
        options: ["(3, 2)", "(-7, 2)", "(3, -8)", "(7, -8)"],
        correctIndex: 0,
      },
      {
        id: 7,
        question:
          "Titik E(-4, -4) ditranslasi sejauh T(6, -2). Koordinat E' adalah...",
        options: ["(2, -6)", "(-10, -6)", "(2, -2)", "(-10, -2)"],
        correctIndex: 0,
      },
      {
        id: 8,
        question:
          "Persegi JKLM dengan J(1,1), K(1,3), L(3,3), M(3,1) ditranslasi T(2,2). Koordinat J' adalah...",
        options: ["(3, 3)", "(-1, -1)", "(3, 1)", "(1, 3)"],
        correctIndex: 0,
      },
      {
        id: 9,
        question:
          "Titik F(10, 5) ditranslasi sejauh T(-7, -8). Koordinat F' adalah...",
        options: ["(3, -3)", "(17, 13)", "(3, 13)", "(-3, 3)"],
        correctIndex: 0,
      },
      {
        id: 10,
        question:
          "Jarak titik G(2, 3) ke G'(7, 3) setelah translasi adalah...",
        options: ["5", "7", "10", "2"],
        correctIndex: 0,
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
        options: ["(5, 3)", "(-5, -3)", "(-5, 3)", "(3, 5)"],
        correctIndex: 0,
      },
      {
        id: 2,
        question:
          "Titik Q(-4, 6) direfleksikan terhadap sumbu Y. Koordinat Q' adalah...",
        options: ["(4, 6)", "(-4, -6)", "(4, -6)", "(-4, 6)"],
        correctIndex: 0,
      },
      {
        id: 3,
        question:
          "Titik R(3, 7) direfleksikan terhadap titik (0,0). Koordinat R' adalah...",
        options: ["(-3, -7)", "(3, -7)", "(-3, 7)", "(7, 3)"],
        correctIndex: 0,
      },
      {
        id: 4,
        question:
          "Titik S(6, 2) direfleksikan terhadap garis x=y. Koordinat S' adalah...",
        options: ["(2, 6)", "(-2, 6)", "(6, -2)", "(-6, -2)"],
        correctIndex: 0,
      },
      {
        id: 5,
        question:
          "Titik T(4, -5) direfleksikan terhadap garis x=-y. Koordinat T' adalah...",
        options: ["(5, -4)", "(-5, 4)", "(-5, -4)", "(5, 4)"],
        correctIndex: 0,
      },
      {
        id: 6,
        question:
          "Titik U(8, 1) direfleksikan terhadap garis x=3. Koordinat U' adalah...",
        options: ["(-2, 1)", "(8, -1)", "(14, 1)", "(-2, -1)"],
        correctIndex: 0,
      },
      {
        id: 7,
        question:
          "Titik V(2, 9) direfleksikan terhadap garis y=4. Koordinat V' adalah...",
        options: ["(2, -1)", "(-2, 9)", "(2, 17)", "(-2, -1)"],
        correctIndex: 0,
      },
      {
        id: 8,
        question:
          "Titik W(-3, 5) direfleksikan terhadap sumbu X. Koordinat W' adalah...",
        options: ["(-3, -5)", "(3, 5)", "(3, -5)", "(-3, 5)"],
        correctIndex: 0,
      },
      {
        id: 9,
        question:
          "Segitiga ABC dengan A(1,1), B(4,1), C(1,5) direfleksikan terhadap sumbu Y. Luas A'B'C' adalah...",
        options: ["6", "8", "10", "12"],
        correctIndex: 0,
      },
      {
        id: 10,
        question:
          "Titik Z(0, 6) direfleksikan terhadap garis y=2. Koordinat Z' adalah...",
        options: ["(0, -2)", "(0, 10)", "(0, 2)", "(6, 0)"],
        correctIndex: 0,
      },
    ],
  },
}

/** Get quiz config by module slug. */
export function getQuizModule(slug: string): QuizModule | undefined {
  return QUIZ_MODULES[slug]
}
