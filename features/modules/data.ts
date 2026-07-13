import type { ModuleSlug, ModuleTab } from "./types"

/** Module tab configurations for translasi and refleksi sections. */
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
      sections: {
        percobaan: {
          instruction:
            "Tentukan nilai translasi agar titik mencapai bayangan yang dituju.",
          items: [
            {
              id: 1,
              type: "matriks",
              label: "(1, -2)",
              targetBayangan: "(3, 1)",
              answer: { a: 2, b: 3 },
            },
            {
              id: 2,
              type: "matriks",
              label: "(-1, 4)",
              targetBayangan: "(3, 1)",
              answer: { a: 4, b: -3 },
            },
            {
              id: 3,
              type: "matriks",
              label: "(6, 4)",
              targetBayangan: "(3, 1)",
              answer: { a: -3, b: -3 },
            },
            {
              id: 4,
              type: "koordinat",
              label: "(1, -3)",
              bayangan: "T(3, 4)",
              answer: { x: 4, y: 1 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut.",
          items: [
            {
              id: 5,
              type: "uraian",
              question:
                "Apakah nilai translasi mempengaruhi arah perpindahan? Jelaskan alasanmu.",
              answer:
                "Iya, karena arah perpindahannya bergantung pada nilai translasi, nilai a mempengaruhi arah perpindahan ke kiri dan kanan, nilai b mempengaruhi arah perpindahan ke atas dan bawah",
            },
            {
              id: 6,
              type: "memasangkan",
              question: "Pasangkan kondisi berikut agar sesuai!",
              leftItems: [
                { id: "a-pos", label: "a > 0" },
                { id: "b-neg", label: "b < 0" },
                { id: "b-pos", label: "b > 0" },
                { id: "a-neg", label: "a < 0" },
              ],
              rightItems: [
                { id: "kanan", label: "Kanan" },
                { id: "bawah", label: "Bawah" },
                { id: "atas", label: "Atas" },
                { id: "kiri", label: "Kiri" },
              ],
              correctMatches: {
                "a-pos": "kanan",
                "b-neg": "bawah",
                "b-pos": "atas",
                "a-neg": "kiri",
              },
            },
          ],
        },
        penyimpulan: {
          instruction: "Simpulkan hasil percobaanmu.",
          items: [
            {
              id: 7,
              type: "uraian",
              question:
                "Apa arti dari translasi berikut?\n( 2 )\n( 1 )",
              answer:
                "Objek geometri atau titik mengalami pergeseran sejauh 2 satuan ke kanan dan 1 satuan ke atas",
            },
            {
              id: 8,
              type: "uraian",
              question:
                "Jika titik awal (x, y) ditranslasikan oleh (a, b), tentukan titik bayangannya.",
              answer: "(x + a, y + b)",
            },
            {
              id: 9,
              type: "uraian",
              question:
                "Apakah titik yang ditranslasikan pasti berubah posisi?",
              answer:
                "Belum pasti, semua titik yang ditranslasikan biasanya berubah posisi, tetapi jika nilai translasinya (0, 0) objek tidak berubah posisi",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 10,
              type: "pilihan_ganda",
              question:
                "Titik A(-3, 2) ditranslasikan oleh (5, -1). Berapakah koordinat bayangannya?",
              options: [
                "A'(1, 2)",
                "A'(-1, 2)",
                "A'(2, 1)",
                "A'(2, -1)",
              ],
              correctIndex: 2,
            },
            {
              id: 11,
              type: "pilihan_ganda",
              question:
                "Titik B(10, -5) memiliki bayangan B'(20, 5). Berapakah nilai translasinya?",
              options: [
                "(10, 10)",
                "(5, 15)",
                "(30, 0)",
                "(15, 5)",
              ],
              optionFormat: "matrix",
              correctIndex: 0,
            },
          ],
        },
      },
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
      sections: {
        percobaan: {
          instruction:
            "Tentukan nilai translasi agar bangun mencapai bayangan yang dituju.",
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "(-6, 3)",
              bayangan: "(-1, 7)",
              answer: { x: 5, y: 4 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "(-6, 1)",
              bayangan: "(-1, 5)",
              answer: { x: 5, y: 4 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "(-4, 1)",
              bayangan: "(1, 5)",
              answer: { x: 5, y: 4 },
            },
            {
              id: 4,
              type: "koordinat",
              label: "(-4, 3)",
              bayangan: "(1, 7)",
              answer: { x: 5, y: 4 },
            },
          ],
        },
        pengamatan: {
          instruction:
            "Amati perpindahan bangun datar berikut. Translasi yang digunakan adalah T(5, 4).",
          items: [
            {
              id: 5,
              type: "koordinat",
              label: "(-6, 3)",
              bayangan: "(-1, 7)",
              answer: { x: -1, y: 7 },
            },
            {
              id: 6,
              type: "koordinat",
              label: "(-6, 1)",
              bayangan: "(-1, 5)",
              answer: { x: -1, y: 5 },
            },
            {
              id: 7,
              type: "koordinat",
              label: "(-4, 1)",
              bayangan: "(1, 5)",
              answer: { x: 1, y: 5 },
            },
            {
              id: 8,
              type: "koordinat",
              label: "(-4, 3)",
              bayangan: "(1, 7)",
              answer: { x: 1, y: 7 },
            },
          ],
        },
        penyimpulan: {
          instruction: "Simpulkan hasil percobaanmu.",
          items: [
            {
              id: 9,
              type: "uraian",
              question:
                "Jika seluruh titik pada bangun ditranslasi sejauh T(a, b), apakah bentuk bangun berubah?",
              answer:
                "Tidak, bentuk bangun tidak berubah karena translasi hanya menggeser posisi bangun tanpa mengubah ukuran atau bentuknya",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 10,
              type: "pilihan_ganda",
              question:
                "Segitiga dengan titik A(1,1), B(4,1), C(1,5) ditranslasi T(2,3). Koordinat A' adalah...",
              options: ["(3, 4)", "(-1, -2)", "(3, 8)", "(5, 4)"],
              correctIndex: 0,
            },
          ],
        },
      },
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
