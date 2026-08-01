import type { ModuleTab } from "../types"

export const translasiTabs: ModuleTab[] = [
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
              hint: "Perhatikan dua komponen vektor translasi. Komponen pertama menentukan perpindahan horizontal, komponen kedua menentukan perpindahan vertikal. Periksa tanda positif dan negatifnya.",
              explanation:
                "Ya. Arah perpindahan ditentukan oleh nilai translasi (a, b): nilai a > 0 menggeser ke kanan, a < 0 ke kiri; nilai b > 0 menggeser ke atas, b < 0 ke bawah. Komponen a mengatur perpindahan mendatar (kiri/kanan) dan komponen b mengatur perpindahan tegak (atas/bawah).",
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
              hint: "Translasi (2, 1) berarti setiap titik bergeser 2 satuan mendatar dan 1 satuan tegak. Tentukan arah untuk masing-masing komponen berdasarkan tandanya.",
              explanation:
                "Translasi (2, 1) memindahkan setiap titik sejauh 2 satuan ke kanan (komponen a = 2 bernilai positif) dan 1 satuan ke atas (komponen b = 1 bernilai positif). Jadi objek atau titik bergeser 2 satuan ke kanan dan 1 satuan ke atas.",
            },
            {
              id: 8,
              type: "uraian",
              question:
                "Jika titik awal (x, y) ditranslasikan oleh (a, b), tentukan titik bayangannya.",
              answer: "(x + a, y + b)",
              hint: "Bayangan diperoleh dengan menjumlahkan koordinat titik awal dengan vektor translasinya, komponen x dengan komponen a dan komponen y dengan komponen b.",
              explanation:
                "Bayangan titik (x, y) oleh translasi (a, b) adalah (x + a, y + b). Komponen x digeser sejauh a dan komponen y digeser sejauh b, sehingga koordinatnya ditambah dengan vektor translasi.",
            },
            {
              id: 9,
              type: "uraian",
              question:
                "Apakah titik yang ditranslasikan pasti berubah posisi?",
              answer:
                "Belum pasti, semua titik yang ditranslasikan biasanya berubah posisi, tetapi jika nilai translasinya (0, 0) objek tidak berubah posisi",
              hint: "Bayangkan geseran sejauh (0, 0). Apakah ada perpindahan yang terjadi? Ingat ada satu nilai translasi khusus yang tidak menggeser apa pun.",
              explanation:
                "Belum tentu. Titik yang ditranslasikan pada umumnya berubah posisi, kecuali jika nilai translasinya (0, 0). Geseran sebesar nol satuan ke setiap arah membuat titik tetap pada posisi semula, sehingga posisinya tidak berubah.",
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
              hint: "Bangun datar dibentuk oleh titik-titik sudutnya. Bagaimana cara menentukan bayangan bangun jika semua titik sudutnya sudah diketahui bayangannya?",
              explanation:
                "Translasi pada bangun dilakukan dengan mentranslasikan semua titik sudutnya. Karena bangun merupakan gabungan titik-titik sudut, maka menentukan bayangan bangun sama dengan menentukan bayangan tiap titik sudutnya, lalu menghubungkan kembali titik-titik bayangan tersebut.",
            },
            {
              id: 10,
              type: "uraian",
              question: "Apakah bangun yang ditranslasikan pasti berubah posisi?",
              answer: "Belum pasti, semua bangun yang ditranslasikan biasanya berubah posisi, tetapi jika nilai translasinya (0, 0) bangun tidak berubah posisi.",
              hint: "Perhatikan nilai translasi yang membuat bangun tetap pada tempatnya. Geseran sejauh apa yang membuat semua titik sudut kembali ke posisi semula?",
              explanation:
                "Belum tentu. Bangun yang ditranslasikan biasanya berubah posisi, tetapi jika nilai translasinya (0, 0) maka semua titik sudutnya tidak berpindah, sehingga bangun tidak berubah posisi.",
            },
            {
              id: 11,
              type: "uraian",
              question: "Jika salah satu titik sebuah bangun ditranslasikan oleh (a, b) maka seluruh titik lainnya ditranslasikan oleh",
              answer: "(a, b)",
              hint: "Translasi berlaku seragam pada seluruh bangun. Semua titik pada bangun yang sama mendapat geseran yang identik.",
              explanation:
                "Semua titik pada bangun yang sama ditranslasikan dengan vektor translasi yang sama, yaitu (a, b). Translasi satu titik oleh (a, b) berarti seluruh titik lainnya juga digeser sejauh (a, b).",
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
              correctIndex: 0,
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
          instructionSuffix: ". Ikuti langkah-langkah berikut untuk menentukan bayangan garis k:",
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
              hint: "Translasi menggeser setiap titik pada garis, tetapi tidak mengubah kemiringannya. Translasikan dua titik pada garis, misalnya titik potong terhadap sumbu x dan sumbu y, lalu susun persamaan garis yang melalui dua titik bayangan tersebut.",
              explanation:
                "Garis k ditranslasikan sehingga semua titiknya bergeser dengan vektor yang sama. Kemiringan garis tidak berubah karena translasi hanya memindahkan posisi. Dengan mentranslasikan dua titik (misal titik potong dengan sumbu x dan sumbu y), lalu menentukan persamaan garis yang melalui kedua titik bayangannya, diperoleh persamaan garis bayangan k': x - 2y = 6.",
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
              question: "Apakah kemiringan garis berubah saat ditranslasi?",
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
              hint: "Perhatikan titik potong sumbu x dan sumbu y sebelum dan sesudah translasi pada GeoGebra. Apakah koordinatnya tetap atau ikut bergeser mengikuti nilai translasi?",
              explanation:
                "Titik potong garis terhadap sumbu x dan sumbu y ikut bergeser mengikuti nilai translasi yang diberikan. Karena setiap titik pada garis ditranslasikan, maka titik potongnya juga berpindah sesuai dengan besar dan arah translasi.",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Bagaimana jika ditranslasikan oleh",
              questionMatrix: "0,0",
              questionSuffix: ", apakah titik potong sumbu x dan sumbu y berubah?",
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
              hint: "Sebuah garis lurus ditentukan secara unik oleh dua titik yang berbeda. Cukup dua titik bayangan yang diketahui koordinatnya untuk menyusun kembali garis tersebut.",
              explanation:
                "Sebuah garis lurus dapat ditentukan secara unik hanya dengan dua titik yang berbeda. Oleh karena itu, cukup mentranslasikan dua titik pada garis (misalnya titik potong sumbu x dan sumbu y), lalu melalui kedua titik bayangan tersebut persamaan garis hasil translasi dapat ditentukan.",
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
  ]
