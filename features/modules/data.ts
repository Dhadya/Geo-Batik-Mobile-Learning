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
                { id: "kiri", label: "Kiri" },
                { id: "kanan", label: "Kanan" },
                { id: "atas", label: "Atas" },
                { id: "bawah", label: "Bawah" },
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
                "Titik A(-3, 2) ditranslasikan oleh",
              options: [
                "A'(1, 2)",
                "A'(-1, 2)",
                "A'(2, 1)",
                "A'(2, -1)",
              ],
              correctIndex: 2,
              questionMatrix: "5,-1",
              questionSuffix: ". Berapakah koordinat bayangannya?",
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
      assessment: [],
      sections: {
        percobaan: {
          instruction:
            "Tentukan bayangan dari titik-titik berikut jika ditranslasikan oleh",
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(-3, 3)",
              bayangan: "(6, -4)",
              answer: { x: 3, y: -1 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-3, 1)",
              bayangan: "(6, -4)",
              answer: { x: 3, y: -3 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(-1, 1)",
              bayangan: "(6, -4)",
              answer: { x: 5, y: -3 },
            },
            {
              id: 4,
              type: "koordinat",
              label: "D(-1, 3)",
              bayangan: "(6, -4)",
              answer: { x: 5, y: -1 },
            },
          ],
        },
        pengamatan: {
          instruction:
            "Amati perpindahan bangun datar berikut dan jawab pertanyaan di bawah.",
          items: [
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bagaimana arah perpindahan titik A, B, C, D?",
              options: ["Berbeda", "Sama"],
              correctIndex: 1,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Apakah setiap titik jarak berpindahnya sama?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah bentuk bangun motif berubah saat ditranslasikan?",
              options: ["Ya", "Tidak"],
              correctIndex: 1,
            },
            {
              id: 8,
              type: "pilihan_ganda",
              question: "Apakah ukuran bangun motif berubah?",
              options: ["Ya", "Tidak"],
              correctIndex: 1,
            },
          ],
        },
        penyimpulan: {
          instruction: "Simpulkan hasil percobaanmu.",
          items: [
            {
              id: 9,
              type: "uraian",
              question: "Bagaimana hubungan translasi titik terhadap translasi bangun?",
              answer: "Pada translasi bangun, semua titik sudutnya ditranslasikan. Jadi, translasi bangun tetap menggunakan translasi titik.",
            },
            {
              id: 10,
              type: "uraian",
              question: "Apakah bangun yang ditranslasikan pasti berubah posisi?",
              answer: "Belum pasti, semua bangun yang ditranslasikan biasanya berubah posisi, tetapi jika nilai translasinya (0, 0) bangun tidak berubah posisi.",
            },
            {
              id: 11,
              type: "uraian",
              question: "Jika salah satu titik sebuah bangun ditranslasikan oleh (a, b) maka seluruh titik lainnya ditranslasikan oleh",
              answer: "(a, b)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 12,
              type: "pilihan_ganda",
              question: "Manakah dari gambar berikut yang menunjukkan proses translasi?",
              options: ["a", "b", "c", "d", "e", "f"],
              correctIndex: 0,
              multiSelect: true,
              correctIndices: [0, 2, 4],
              imageOptions: [
                "/questions/translasi bangun_1a.webp",
                "/questions/translasi bangun_1b.webp",
                "/questions/translasi bangun_1c.webp",
                "/questions/translasi bangun_1d.webp",
                "/questions/translasi bangun_1e.webp",
                "/questions/translasi bangun_1f.webp",
              ],
            },
            {
              id: 13,
              type: "pilihan_ganda",
              question: "Tentukan bayangan dari bangun berikut jika ditranslasikan sejauh",
              options: ["a", "b", "c", "d"],
              correctIndex: 3,
              optionFormat: "image",
              imageOptions: [
                "/questions/translasi bangun_2a.webp",
                "/questions/translasi bangun_2b.webp",
                "/questions/translasi bangun_2c.webp",
                "/questions/translasi bangun_2d.webp",
              ],
              questionImage: "/questions/translasi bangun_2_soal.webp",
              questionMatrix: "5,2",
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
      materialId: "nmamck92",
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
      sections: {
        percobaan: {
          instruction:
            "Diberikan persamaan garis k : -x + 2y = 4. Garis k akan ditranslasikan sejauh",
          instructionMatrix: "4,-2",
          garisTranslasiTable: {
            sourceItemIds: [1, 2],
            targetItemIds: [3, 4],
            matrix: "6,-2",
          },
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "Titik potong sumbu x",
              answer: { x: -4, y: 0 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "Titik potong sumbu y",
              answer: { x: 0, y: 2 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "A'",
              answer: { x: 2, y: -2 },
            },
            {
              id: 4,
              type: "koordinat",
              label: "B'",
              answer: { x: 6, y: 0 },
            },
            {
              id: 6,
              type: "uraian",
              question: "Tuliskan persamaan garis bayangan k' yang terbentuk!",
              answer: "x - 2y = 6",
              acceptAnswers: ["y = x/2 - 3", "x = 2y + 6", "-2y + x = 6"],
            },
          ],
        },
        pengamatan: {
          instruction:
            "Jawab pertanyaan berikut berdasarkan percobaan garis tersebut.",
          items: [
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah kemiringan garis berubah?",
              options: ["Ya", "Tidak"],
              correctIndex: 1,
            },
            {
              id: 8,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis setelah ditranslasi?",
              options: ["Hanya bergeser", "Berputar", "Terbalik"],
              correctIndex: 0,
            },
            {
              id: 9,
              type: "uraian",
              question: "Apa yang terjadi pada titik potong garis terhadap sumbu x dan y setelah ditranslasi?",
              answer: "Titik potongnya berubah menyesuaikan pergeseran yang bergantung oleh nilai translasi",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Bagaimana jika ditranslasikan oleh (0, 0), apakah titik potong sumbu x dan sumbu y berubah?",
              options: ["Ya", "Tidak"],
              correctIndex: 1,
            },
          ],
        },
        penyimpulan: {
          instruction: "Simpulkan hasil percobaanmu.",
          items: [
            {
              id: 11,
              type: "urutkan",
              question: "Urutkan cara menentukan bayangan dari sebuah persamaan garis yang mengalami proses translasi!",
              items: [
                "Persamaan garis diketahui",
                "Menentukan titik potong sumbu x dan titik potong sumbu y",
                "Mentranslasikan titik potong sumbu x dan titik potong sumbu y",
                "Menentukan persamaan garis melalui 2 titik",
              ],
            },
            {
              id: 12,
              type: "uraian",
              question: "Mengapa cukup mentranslasikan dua titik untuk menentukan garis hasil translasi?",
              answer: "Karena untuk mengetahui persamaan garis bisa dengan mengetahui 2 titik yang berada di garis tersebut",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal berikut.",
          items: [
            {
              id: 13,
              type: "pilihan_ganda",
              question: "Persamaan garis h : 2x + 3y = 6 ditranslasikan oleh",
              options: ["3y + 2x = 6", "2x + 3y = 0", "x + y = 6", "2x + 3y = 12"],
              correctIndex: 1,
              questionMatrix: "3,-4",
              questionSuffix: ". Tentukan persamaan garis hasil translasi!",
            },
          ],
        },
      },
    },
  ],
  refleksi: [
    {
      label: "SUMBU X",
      value: "sumbu-x",
      title: "Refleksi Sumbu X",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap Sumbu X.",
      materialId: "e2ahvxgg",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["x", "-y"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Tentukan bayangan dari titik-titik berikut jika direfleksikan oleh sumbu x.",
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(2, 5)",
              answer: { x: 2, y: -5 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-3, 2)",
              answer: { x: -3, y: -2 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(-1, -4)",
              answer: { x: -1, y: 4 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan tersebut.",
          items: [
            {
              id: 4,
              type: "pilihan_ganda",
              question: "Bagaimana posisi titik A dan A' terhadap sumbu x?",
              options: ["Berada pada sisi yang sama", "Berada pada sisi yang berlawanan"],
              correctIndex: 1,
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke sumbu x dengan jarak A' ke sumbu x?",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap sumbu x?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
            },
          ],
        },
        penyimpulan: {
          instruction: "Simpulkan hasil percobaanmu.",
          items: [
            {
              id: 8,
              type: "uraian",
              question: "Amati percobaanmu. Jika titik awal (x, y) direfleksikan terhadap sumbu x, tentukan titik bayangannya dengan mengisi tabel berikut.",
              answer: "(x, -y)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Tentukan bayangan titik P(4, -3) jika dicerminkan terhadap sumbu x!",
              options: ["P'(-4, 3)", "P'(-4, -3)", "P'(3, 4)", "P'(4, 3)"],
              correctIndex: 3,
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(2, -5) merupakan bayangan titik Q terhadap sumbu x. Tentukan koordinat titik Q!",
              options: ["Q(-2, 5)", "Q(2, 5)", "Q(-2, -5)", "Q(-5, 2)"],
              correctIndex: 1,
            },
          ],
        },
      },
    },
    {
      label: "SUMBU Y",
      value: "sumbu-y",
      title: "Refleksi Sumbu Y",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap Sumbu Y.",
      materialId: "m4pxxf27",
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
      materialId: "ysc23jvw",
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
      materialId: "drnrb3fr",
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
      materialId: "pyfvyvbc",
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
      materialId: "dsvtvzcn",
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
      materialId: "ksq5uvva",
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
    {
      label: "BANGUN",
      value: "bangun",
      title: "Refleksi Bangun Datar",
      instruction:
        "Amati perpindahan bangun datar setelah direfleksikan.",
      materialId: "j8mjwvcj",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["?", "?"],
      },
      assessment: [],
    },
    {
      label: "GARIS",
      value: "garis",
      title: "Refleksi Garis",
      instruction:
        "Amati perpindahan garis setelah direfleksikan.",
      materialId: "nqw7mzat",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["?", "?"],
      },
      assessment: [],
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
