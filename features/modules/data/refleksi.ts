import type { ModuleTab } from "../types"

export const refleksiTabs: ModuleTab[] = [
    {
      label: "SUMBU X",
      value: "sumbu-x",
      title: "Refleksi Terhadap Sumbu X",
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
      title: "Refleksi Terhadap Sumbu Y",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap Sumbu Y.",
      materialId: "m4pxxf27",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["-x", "y"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Tentukan bayangan dari titik-titik berikut jika direfleksikan oleh sumbu y.",
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(2, 3)",
              answer: { x: -2, y: 3 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-2, 4)",
              answer: { x: 2, y: 4 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(1, -6)",
              answer: { x: -1, y: -6 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan tersebut.",
          items: [
            {
              id: 4,
              type: "pilihan_ganda",
              question: "Bagaimana posisi titik A dan A' terhadap sumbu y?",
              options: ["Berada pada sisi yang sama", "Berada pada sisi yang berlawanan"],
              correctIndex: 1,
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke sumbu y dengan jarak A' ke sumbu y!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap sumbu y?",
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
              question: "Amati percobaanmu. Jika titik awal (x, y) direfleksikan terhadap sumbu y, tentukan titik bayangannya dengan mengisi tabel berikut.",
              answer: "(-x, y)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Tentukan bayangan titik P(8, -2) jika dicerminkan terhadap sumbu y!",
              options: ["P'(8, 2)", "P'(-8, 2)", "P'(-8, -2)", "P'(-2, 8)"],
              correctIndex: 2,
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(4, -6) merupakan bayangan titik Q terhadap sumbu y. Tentukan koordinat titik Q!",
              options: ["Q(6, 4)", "Q(6, -4)", "Q(-6, -4)", "Q(-4, -6)"],
              correctIndex: 3,
            },
          ],
        },
      },
    },
    {
      label: "TITIK (0,0)",
      value: "titik",
      title: "Refleksi Terhadap Titik (0,0)",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap titik (0,0).",
      materialId: "ysc23jvw",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["-x", "-y"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Tentukan bayangan dari titik-titik berikut jika direfleksikan oleh titik (0,0).",
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(5, 3)",
              answer: { x: -5, y: -3 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-3, 5)",
              answer: { x: 3, y: -5 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(2, -5)",
              answer: { x: -2, y: 5 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan tersebut.",
          items: [
            {
              id: 4,
              type: "pilihan_ganda",
              question: "Bagaimana posisi titik A dan A' terhadap titik (0,0)?",
              options: ["Berada pada sisi yang sama", "Berada pada sisi yang berlawanan"],
              correctIndex: 1,
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke titik (0,0) dengan jarak A' ke titik (0,0)!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap titik (0,0)?",
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
              question: "Amati percobaanmu. Jika titik awal (x, y) direfleksikan terhadap titik (0,0), tentukan titik bayangannya dengan mengisi tabel berikut.",
              answer: "(-x, -y)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Tentukan bayangan titik P(7, 3) jika dicerminkan terhadap titik (0,0)!",
              options: ["P'(-7, -3)", "P'(7, 3)", "P'(-7, 3)", "P'(3, -7)"],
              correctIndex: 0,
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(-8, -2) merupakan bayangan titik Q terhadap titik (0,0). Tentukan koordinat titik Q!",
              options: ["Q(-8, 2)", "Q(8, -2)", "Q(8, 2)", "Q(2, 8)"],
              correctIndex: 2,
            },
          ],
        },
      },
    },
    {
      label: "GARIS X=Y",
      value: "garis-x=y",
      title: "Refleksi Terhadap Garis x=y",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis x=y.",
      materialId: "drnrb3fr",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["y", "x"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Tentukan bayangan dari titik-titik berikut jika direfleksikan oleh garis x=y.",
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(3, 4)",
              answer: { x: 4, y: 3 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-4, 3)",
              answer: { x: 3, y: -4 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(1, -6)",
              answer: { x: -6, y: 1 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan tersebut.",
          items: [
            {
              id: 4,
              type: "pilihan_ganda",
              question: "Bagaimana posisi titik A dan A' terhadap garis x=y?",
              options: ["Berada pada sisi yang sama", "Berada pada sisi yang berlawanan"],
              correctIndex: 1,
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis x=y dengan jarak A' ke garis x=y!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis x=y?",
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
              question: "Amati percobaanmu. Jika titik awal (x, y) direfleksikan terhadap garis x=y, tentukan titik bayangannya dengan mengisi tabel berikut.",
              answer: "(y, x)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Tentukan bayangan titik P(6, 6) jika dicerminkan terhadap garis x=y!",
              options: ["P'(6, 6)", "P'(-6, 6)", "P'(6, -6)", "P'(-6, 0)"],
              correctIndex: 0,
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(-3, 2) merupakan bayangan titik Q terhadap garis x=y. Tentukan koordinat titik asalnya!",
              options: ["Q(3, 2)", "Q(3, -2)", "Q(2, -3)", "Q(-3, 2)"],
              correctIndex: 2,
            },
          ],
        },
      },
    },
    {
      label: "GARIS X=-Y",
      value: "garis-x=-y",
      title: "Refleksi Terhadap Garis x=-y",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis x=-y.",
      materialId: "pyfvyvbc",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["-y", "-x"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Tentukan bayangan dari titik-titik berikut jika direfleksikan oleh garis x=-y.",
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(4, 2)",
              answer: { x: -2, y: -4 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-5, 3)",
              answer: { x: -3, y: 5 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(2, -6)",
              answer: { x: 6, y: -2 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan tersebut.",
          items: [
            {
              id: 4,
              type: "pilihan_ganda",
              question: "Bagaimana posisi titik A dan A' terhadap garis x=-y?",
              options: ["Berada pada sisi yang sama", "Berada pada sisi yang berlawanan"],
              correctIndex: 1,
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis x=-y dengan jarak A' ke garis x=-y!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis x=-y?",
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
              question: "Amati percobaanmu. Jika titik awal (x, y) direfleksikan terhadap garis x=-y, tentukan titik bayangannya dengan mengisi tabel berikut.",
              answer: "(-y, -x)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Tentukan bayangan titik P(4, 5) jika dicerminkan terhadap garis x=-y!",
              options: ["P'(-5, -4)", "P'(-4, -5)", "P'(4, 5)", "P'(-5, 4)"],
              correctIndex: 0,
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(8, -9) merupakan bayangan titik Q terhadap garis x=-y. Tentukan koordinat titik asalnya!",
              options: ["Q(-9, 8)", "Q(9, -8)", "Q(-9, -8)", "Q(8, -9)"],
              correctIndex: 1,
            },
          ],
        },
      },
    },
    {
      label: "GARIS X=H",
      value: "garis-x=h",
      title: "Refleksi Terhadap Garis x=h",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis x=h.",
      materialId: "dsvtvzcn",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["2h - x", "y"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Tentukan bayangan dari titik-titik berikut jika direfleksikan oleh garis x=h.",
          refleksiGroups: [
            { garis: "x = 2", itemIds: [1, 2] },
            { garis: "x = -1", itemIds: [3, 4] },
          ],
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(3, 2)",
              answer: { x: 1, y: 2 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-3, -3)",
              answer: { x: 7, y: -3 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(1, 5)",
              answer: { x: -3, y: 5 },
            },
            {
              id: 4,
              type: "koordinat",
              label: "D(-2, 2)",
              answer: { x: 0, y: 2 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan tersebut.",
          items: [
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bagaimana posisi titik A dan A' terhadap garis x=h?",
              options: ["Berada pada sisi yang sama", "Berada pada sisi yang berlawanan"],
              correctIndex: 1,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis x=h dengan jarak A' ke garis x=h!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis x=h?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
            },
            {
              id: 8,
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
              question: "Amati percobaanmu. Jika titik awal (x, y) direfleksikan terhadap garis x=h, tentukan titik bayangannya dengan mengisi tabel berikut.",
              answer: "(2h - x, y)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Tentukan bayangan titik P(6, 7) jika dicerminkan terhadap garis x=3!",
              options: ["P'(7, 0)", "P'(7, 6)", "P'(3, 7)", "P'(0, 7)"],
              correctIndex: 3,
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(-3, 6) merupakan bayangan titik Q terhadap garis x=-2. Tentukan koordinat titik asalnya!",
              options: ["Q(-1, 6)", "Q(1, 6)", "Q(3, 6)", "Q(6, 6)"],
              correctIndex: 0,
            },
          ],
        },
      },
    },
    {
      label: "GARIS Y=H",
      value: "garis-y=h",
      title: "Refleksi Terhadap Garis y=h",
      instruction:
        "Amati perpindahan koordinat titik A setelah direfleksikan terhadap garis y=h.",
      materialId: "ksq5uvva",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["x", "2h - y"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Tentukan bayangan dari titik-titik berikut jika direfleksikan oleh garis y=h.",
          refleksiGroups: [
            { garis: "y = 2", itemIds: [1, 2] },
            { garis: "y = -1", itemIds: [3, 4] },
          ],
          items: [
            {
              id: 1,
              type: "koordinat",
              label: "A(2, 3)",
              answer: { x: 2, y: 1 },
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(5, -2)",
              answer: { x: 5, y: 6 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(5, 1)",
              answer: { x: 5, y: -3 },
            },
            {
              id: 4,
              type: "koordinat",
              label: "D(2, -2)",
              answer: { x: 2, y: 0 },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan tersebut.",
          items: [
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bagaimana posisi titik A dan A' terhadap garis y=h?",
              options: ["Berada pada sisi yang sama", "Berada pada sisi yang berlawanan"],
              correctIndex: 1,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis y=h dengan jarak A' ke garis y=h!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis y=h?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
            },
            {
              id: 8,
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
              question: "Amati percobaanmu. Jika titik awal (x, y) direfleksikan terhadap garis y=h, tentukan titik bayangannya dengan mengisi tabel berikut.",
              answer: "(x, 2h - y)",
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Tentukan bayangan titik P(6, 6) jika dicerminkan terhadap garis y=3!",
              options: ["P'(6, 3)", "P'(3, 6)", "P'(6, 0)", "P'(6, 12)"],
              correctIndex: 2,
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(6, -3) merupakan bayangan titik Q terhadap garis y=-2. Tentukan koordinat titik asalnya!",
              options: ["Q(1, -6)", "Q(6, -1)", "Q(6, -5)", "Q(6, -6)"],
              correctIndex: 1,
            },
          ],
        },
      },
    },
    {
      label: "BANGUN",
      value: "bangun",
      title: "Refleksi Bangun",
      instruction:
        "Amati perpindahan bangun datar setelah direfleksikan.",
      materialId: "j8mjwvcj",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["?", "?"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Motif bangun ABCD memiliki titik sudut A(\u22124, 0), B(\u22122, 2), C(\u22122, 6), D(\u22124, 4). Pilih salah satu refleksi berikut, lalu lengkapi tabel.",
          items: [
            {
              id: 1,
              type: "pilihan_refleksi",
              question: "Motif bangun ABCD memiliki titik sudut \nA(\u22124, 0), B(\u22122, 2), C(\u22122, 6), D(\u22124, 4).\nPilih salah satu refleksi berikut:",
              options: ["Sumbu x", "Sumbu y", "Titik (0,0)", "Garis x=y", "Garis x=-y", "Garis x=2", "Garis y=-1"],
              correctAnswers: {
                "Sumbu x": [
                  { x: -4, y: 0 },
                  { x: -2, y: -2 },
                  { x: -2, y: -6 },
                  { x: -4, y: -4 },
                ],
                "Sumbu y": [
                  { x: 4, y: 0 },
                  { x: 2, y: 2 },
                  { x: 2, y: 6 },
                  { x: 4, y: 4 },
                ],
                "Titik (0,0)": [
                  { x: 4, y: 0 },
                  { x: 2, y: -2 },
                  { x: 2, y: -6 },
                  { x: 4, y: -4 },
                ],
                "Garis x=y": [
                  { x: 0, y: -4 },
                  { x: 2, y: -2 },
                  { x: 6, y: -2 },
                  { x: 4, y: -4 },
                ],
                "Garis x=-y": [
                  { x: 0, y: 4 },
                  { x: -2, y: 2 },
                  { x: -6, y: 2 },
                  { x: -4, y: 4 },
                ],
                "Garis x=2": [
                  { x: 8, y: 0 },
                  { x: 6, y: 2 },
                  { x: 6, y: 6 },
                  { x: 8, y: 4 },
                ],
                "Garis y=-1": [
                  { x: -4, y: -2 },
                  { x: -2, y: -4 },
                  { x: -2, y: -8 },
                  { x: -4, y: -6 },
                ],
              },
            },
            {
              id: 2,
              type: "koordinat",
              label: "A(\u22124, 0)",
              answer: { x: 0, y: 0 },
            },
            {
              id: 3,
              type: "koordinat",
              label: "B(\u22122, 2)",
              answer: { x: 0, y: 0 },
            },
            {
              id: 4,
              type: "koordinat",
              label: "C(\u22122, 6)",
              answer: { x: 0, y: 0 },
            },
            {
              id: 5,
              type: "koordinat",
              label: "D(\u22124, 4)",
              answer: { x: 0, y: 0 },
            },
          ],
        },
        pengamatan: {
          instruction: "Berdasarkan pengamatanmu, tentukan sifat-sifat refleksi bangun dengan checklist pernyataan berikut!",
          items: [
            {
              id: 6,
              type: "checklist_table",
              question: "Berdasarkan pengamatanmu, tentukan sifat-sifat refleksi bangun dengan checklist pernyataan berikut!",
              statements: [
                "Bentuk bangun berubah",
                "Ukuran bangun berubah",
                "Bangun dan bayangan saling berhadapan",
                "Jarak bangun ke cermin sama dengan jarak bayangan ke cermin",
              ],
              correctAnswers: [false, false, true, true],
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal-soal berikut.",
          items: [
            {
              id: 8,
              type: "pilihan_ganda",
              question: "Manakah dari gambar berikut yang menunjukkan proses refleksi?",
              options: ["Gambar a", "Gambar b", "Gambar c", "Gambar d", "Gambar e"],
              imageOptions: [
                "/questions/refleksi_1a.webp",
                "/questions/refleksi_1b.webp",
                "/questions/refleksi_1c.webp",
                "/questions/refleksi_1d.webp",
                "/questions/refleksi_1e.webp",
              ],
              optionFormat: "image",
              multiSelect: true,
              correctIndex: 0,
              correctIndices: [1, 2, 3, 4],
            },
            {
              id: 9,
              type: "pilihan_ganda",
              question: "Perhatikan gambar berikut! Tentukan bayangan dari bangun berikut jika direfleksikan terhadap sumbu y!",
              questionImage: "/questions/refleksi_soal.webp",
              options: ["Gambar a", "Gambar b", "Gambar c"],
              imageOptions: [
                "/questions/refleksi_a.webp",
                "/questions/refleksi_b.webp",
                "/questions/refleksi_c.webp",
              ],
              optionFormat: "image",
              correctIndex: 1,
            },
          ],
        },
      },
    },
    {
      label: "GARIS",
      value: "garis",
      title: "Refleksi Garis",
      instruction:
        "Amati perpindahan ruas garis setelah direfleksikan.",
      materialId: "nqw7mzat",
      formula: {
        prefix: "A(x, y) → A'(",
        suffix: ")",
        placeholders: ["?", "?"],
      },
      assessment: [],
      sections: {
        percobaan: {
          instruction: "Perhatikan ruas garis AB, dengan A(\u22126, 1) dan B(\u22122, 3). Pilih salah satu refleksi berikut, lalu tentukan bayangan dari ruas garis yang terbentuk.",
          items: [
            {
              id: 1,
              type: "pilihan_refleksi",
              question: "Perhatikan ruas garis AB, dengan A(\u22126, 1) dan B(\u22122, 3)\nPilih salah satu refleksi berikut:",
              options: ["Sumbu x", "Sumbu y", "Titik (0,0)", "Garis x=y", "Garis x=-y", "Garis x=2", "Garis y=\u22122"],
              correctAnswers: {
                "Sumbu x": [
                  { x: -6, y: -1 },
                  { x: -2, y: -3 },
                ],
                "Sumbu y": [
                  { x: 6, y: 1 },
                  { x: 2, y: 3 },
                ],
                "Titik (0,0)": [
                  { x: 6, y: -1 },
                  { x: 2, y: -3 },
                ],
                "Garis x=y": [
                  { x: 1, y: -6 },
                  { x: 3, y: -2 },
                ],
                "Garis x=-y": [
                  { x: -1, y: 6 },
                  { x: -3, y: 2 },
                ],
                "Garis x=2": [
                  { x: 10, y: 1 },
                  { x: 6, y: 3 },
                ],
                "Garis y=\u22122": [
                  { x: -6, y: -5 },
                  { x: -2, y: 7 },
                ],
              },
            },
          ],
        },
        pengamatan: {
          instruction: "Jawab pertanyaan berikut berdasarkan percobaan ruas garis tersebut.",
          items: [
            {
              id: 4,
              type: "uraian",
              question: "Bagaimana cara menentukan koordinat A\u2019 dan B\u2019?",
              answer: "Koordinat A\u2019 dan B\u2019 ditentukan dengan mencerminkan titik A dan B",
              acceptAnswers: [
                "Mencerminkan titik A dan B terhadap cermin refleksi",
                "Dengan mencerminkan kedua titik ujung ruas garis",
                "Mencerminkan titik A dan B sesuai dengan cermin refleksinya",
              ],
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke cermin dengan titik A\u2019 ke cermin?",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik B ke cermin dengan titik B\u2019 ke cermin?",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah panjang ruas garis awal dengan bayangannya sama?",
              options: ["Iya", "Tidak"],
              correctIndex: 0,
            },
            {
              id: 8,
              type: "pilihan_ganda",
              question: "Apakah posisi ruas garis awal dengan bayangannya sama?",
              options: ["Iya", "Tidak"],
              correctIndex: 1,
            },
          ],
        },
        penyimpulan: {
          instruction: "Simpulkan hasil percobaanmu.",
          items: [
            {
              id: 9,
              type: "urutkan",
              question: "Urutkan cara menentukan bayangan ruas garis mengalami proses refleksi!",
              items: [
                "Ruas garis diketahui",
                "Menentukan koordinat kedua titik ujungnya",
                "Mencerminkan kedua titik ujung sesuai dengan cermin refleksinya",
                "Menulis koordinat bayangan kedua titik ujung",
                "Menghubungkan titik ujung satu dengan titik ujung kedua dengan garis lurus",
              ],
            },
            {
              id: 10,
              type: "uraian",
              question: "Mengapa cukup mencerminkan dua titik untuk menentukan ruas garis hasil refleksi?",
              answer: "Karena untuk mengetahui ruas garis harus mengetahui 2 titik ujung ruas garis tersebut",
              acceptAnswers: [
                "Karena ruas garis ditentukan oleh dua titik ujungnya",
                "Karena mengetahui 2 titik ujung sudah cukup untuk menentukan ruas garis",
              ],
            },
          ],
        },
        cekPemahaman: {
          instruction: "Kerjakan soal berikut.",
          items: [
            {
              id: 11,
              type: "pilihan_ganda",
              question: "Perhatikan gambar berikut! Tentukan bayangan dari ruas garis berikut jika direfleksikan terhadap sumbu x",
              questionImage: "/questions/ruas garis_soal.webp",
              options: ["Gambar a", "Gambar b", "Gambar c", "Gambar d"],
              imageOptions: [
                "/questions/ruas_a.webp",
                "/questions/ruas_b.webp",
                "/questions/ruas_c.webp",
                "/questions/ruas_d.webp",
              ],
              optionFormat: "image",
              correctIndex: 1,
            },
          ],
        },
      },
    },
]
;