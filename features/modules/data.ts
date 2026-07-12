import type { ModuleSlug, ModuleTab } from "./types"

export const MODULE_TABS: Record<ModuleSlug, ModuleTab[]> = {
  translasi: [
    {
      label: "TITIK",
      value: "titik",
      title: "Translasi Titik",
      instruction:
        "Amati perpindahan koordinat titik A setelah ditranslasi sejauh T(a, b).",
      materialId: "xqcrxksq",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["x + a", "y + b"],
      },
      assessment: [
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
      ],
    },
    {
      label: "BANGUN",
      value: "bangun",
      title: "Translasi Bangun",
      instruction:
        "Amati perpindahan bangun datar setelah ditranslasi sejauh T(a, b).",
      materialId: "dmvhzyum",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["x + a", "y + b"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Segitiga ABC dengan A(0,0), B(4,0), C(0,3) ditranslasi T(1,1). Luas A'B'C' adalah...",
          options: ["6", "7", "12", "14"],
          correctIndex: 0,
        },
      ],
    },
    {
      label: "GARIS",
      value: "garis",
      title: "Translasi Garis",
      instruction:
        "Amati perpindahan garis PQ setelah ditranslasi sejauh T(a, b).",
      formula: {
        prefix: "P(x, y) → P'(",
        suffix: ")",
        placeholders: ["x + a", "y + b"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Garis PQ dengan P(1,1) dan Q(3,3) ditranslasi T(2,0). Panjang P'Q' adalah...",
          options: ["2√2", "4", "2", "8"],
          correctIndex: 0,
        },
      ],
    },
  ],
  refleksi: [
    {
      label: "SUMBU X",
      value: "sumbu-x",
      title: "Refleksi Sumbu X",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap Sumbu X.",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["x", "-y"],
      },
      assessment: [
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
            "Titik Q(-4, 6) direfleksikan terhadap sumbu X. Koordinat Q' adalah...",
          options: ["(-4, -6)", "(4, 6)", "(4, -6)", "(-4, 6)"],
          correctIndex: 0,
        },
      ],
    },
    {
      label: "SUMBU Y",
      value: "sumbu-y",
      title: "Refleksi Sumbu Y",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap Sumbu Y.",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["-x", "y"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Titik P(5, -3) direfleksikan terhadap sumbu Y. Koordinat P' adalah...",
          options: ["(-5, -3)", "(5, 3)", "(-5, 3)", "(3, 5)"],
          correctIndex: 0,
        },
      ],
    },
    {
      label: "TITIK (0,0)",
      value: "titik",
      title: "Refleksi Titik (0,0)",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap titik (0,0).",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["-x", "-y"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Titik P(5, -3) direfleksikan terhadap titik (0,0). Koordinat P' adalah...",
          options: ["(-5, 3)", "(5, 3)", "(-5, -3)", "(3, -5)"],
          correctIndex: 0,
        },
      ],
    },
    {
      label: "GARIS X=Y",
      value: "garis-x=y",
      title: "Refleksi Garis x=y",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis x=y.",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["y", "x"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Titik P(5, -3) direfleksikan terhadap garis x=y. Koordinat P' adalah...",
          options: ["(-3, 5)", "(3, -5)", "(-3, -5)", "(5, -3)"],
          correctIndex: 0,
        },
      ],
    },
    {
      label: "GARIS X=-Y",
      value: "garis-x=-y",
      title: "Refleksi Garis x=-y",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis x=-y.",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["-y", "-x"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Titik P(5, -3) direfleksikan terhadap garis x=-y. Koordinat P' adalah...",
          options: ["(3, -5)", "(-3, 5)", "(3, 5)", "(-3, -5)"],
          correctIndex: 2,
        },
      ],
    },
    {
      label: "GARIS X=H",
      value: "garis-x=h",
      title: "Refleksi Garis x=h",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis x=h.",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["2h - x", "y"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Titik P(5, -3) direfleksikan terhadap garis x=2. Koordinat P' adalah...",
          options: ["(-1, -3)", "(1, -3)", "(9, -3)", "(-1, 3)"],
          correctIndex: 0,
        },
      ],
    },
    {
      label: "GARIS Y=H",
      value: "garis-y=h",
      title: "Refleksi Garis y=h",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis y=h.",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["x", "2h - y"],
      },
      assessment: [
        {
          id: 1,
          question:
            "Titik P(5, -3) direfleksikan terhadap garis y=1. Koordinat P' adalah...",
          options: ["(5, 5)", "(5, -5)", "(-5, 5)", "(5, 1)"],
          correctIndex: 0,
        },
      ],
    },
  ],
}

/** Get tabs for a given module slug. */
export function getModuleTabs(slug: string): ModuleTab[] | undefined {
  return MODULE_TABS[slug as ModuleSlug]
}

/** Get a specific tab config by module slug and tab value. */
export function getModuleTab(
  slug: string,
  tab: string,
): ModuleTab | undefined {
  const tabs = getModuleTabs(slug)
  return tabs?.find((t) => t.value === tab)
}
