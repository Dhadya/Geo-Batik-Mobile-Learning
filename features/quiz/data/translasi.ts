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
      "Translasi adalah pergeseran bangun datar sejauh vektor tertentu tanpa mengubah bentuk, ukuran, maupun orientasi. Setiap titik pada bangun digeser dengan jarak dan arah yang sama.\n\nLangkah-langkah: 1) Tentukan vektor translasi T(5, -2). 2) Jumlahkan vektor translasi dengan koordinat titik: A + T = (-3+5, 4+(-2)). 3) Hitung: (-3+5, 4-2) = (2, 2).",
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
      "Vektor translasi dapat dicari dengan mengurangi koordinat bayangan dengan koordinat titik awal. Hasilnya adalah vektor yang menggeser titik dari posisi semula ke posisi bayangan.\n\nLangkah-langkah: 1) Gunakan rumus T = P' - P. 2) Substitusi koordinat: T = (2-6, 4-(-1)). 3) Hitung: (-4, 5).",
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
      "Translasi menjumlahkan komponen vektor translasi dengan masing-masing koordinat titik. Untuk vektor T(a, b), bayangan titik (x, y) adalah (x+a, y+b).\n\nLangkah-langkah: 1) Tentukan vektor translasi T(-3, 6). 2) Jumlahkan dengan koordinat B(x, y): (x+(-3), y+6). 3) Sederhanakan: (x-3, y+6).",
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
      "Untuk mencari komponen vektor translasi, kurangi koordinat bayangan dengan koordinat titik asal. Jumlahkan kedua komponen vektor untuk mendapatkan nilai a+b.\n\nLangkah-langkah: 1) Hitung a = x' - x = 3-(-2) = 5. 2) Hitung b = y' - y = 3-5 = -2. 3) Hitung a+b = 5+(-2) = 3.",
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
      "Translasi menggeser seluruh titik bangun dengan vektor yang sama sehingga posisi bangun berpindah. Semua sifat bangun seperti bentuk, ukuran, luas, dan keliling tetap tidak berubah.\n\nLangkah-langkah: 1) Pahami bahwa translasi adalah pergeseran semua titik dengan vektor yang identik. 2) Karena setiap titik bergerak sejauh vektor yang sama, maka semua titik sudut bergeser sejauh yang sama. 3) Pilihan yang tepat adalah semua titik sudut bergeser sejauh yang sama.",
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
      "Translasi hanya mengubah posisi bangun di bidang koordinat. Bentuk, ukuran, dan semua sifat geometri bangun tetap dipertahankan.\n\nLangkah-langkah: 1) Ingat bahwa translasi memindahkan bangun tanpa mengubah bentuk atau ukuran. 2) Posisi, letak, dan koordinat titik pasti berubah karena bangun bergeser. 3) Pilihan yang tepat adalah bentuk dan ukuran bangun.",
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
      "Pertama tentukan vektor translasi dengan mengurangi koordinat bayangan dengan koordinat titik asal, lalu terapkan vektor tersebut ke titik lain.\n\nLangkah-langkah: 1) Tentukan vektor translasi T = A' - A = (7-2, 5-(-3)) = (5, 8). 2) Terapkan vektor yang sama ke titik B: B' = B + T = (-4+5, 1+8). 3) Hitung B' = (1, 9).",
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
      "Setiap titik pada bangun ditranslasikan dengan menjumlahkan komponen vektor translasi ke masing-masing koordinat titik.\n\nLangkah-langkah: 1) Tentukan vektor translasi T(-2, 3). 2) Terapkan ke titik C(2, 5): C' = (2+(-2), 5+3). 3) Hitung C' = (0, 8).",
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
      "Untuk mentranslasikan persamaan garis, substitusikan x dengan x' - a dan y dengan y' - b, di mana T(a, b) adalah vektor translasi. Kemudian selesaikan untuk mendapatkan persamaan bayangan dalam variabel x' dan y'.\n\nLangkah-langkah: 1) Vektor translasi T(3, 2), maka substitusi x = x'-3 dan y = y'-2. 2) Masukkan ke persamaan awal: y'-2 = 2(x'-3)-1. 3) Sederhanakan: y'-2 = 2x'-6-1 → y' = 2x'-5. Persamaan bayangan: y = 2x-5.",
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
      "Jika garis ditranslasikan oleh vektor (a, b), substitusikan x dengan x'-a dan y dengan y'-b. Beberapa garis memiliki sifat invariant setelah translasi tertentu.\n\nLangkah-langkah: 1) Vektor translasi T(-2, 4), substitusi x = x'+2 dan y = y'-4. 2) Masukkan ke persamaan awal: 2(x'+2)+(y'-4)=6. 3) Sederhanakan: 2x'+4+y'-4=6 → 2x'+y'=6. Hasilnya sama dengan persamaan awal, sehingga garis ini invariant terhadap translasi tersebut.",
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
      "Translasi menjumlahkan komponen vektor translasi dengan masing-masing koordinat titik. Pahami bahwa translasi tidak mengubah bentuk atau ukuran, hanya menggeser posisi.\n\nLangkah-langkah: 1) Tentukan vektor translasi T(-3, 5). 2) Jumlahkan dengan koordinat A(4, -2): (4+(-3), -2+5). 3) Hitung: (1, 3).",
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
      "Vektor translasi diperoleh dari selisih koordinat bayangan dan titik asal. Ini adalah kebalikan dari proses translasi biasa, yaitu mencari vektor yang menghasilkan pergeseran tersebut.\n\nLangkah-langkah: 1) Gunakan rumus T = P' - P. 2) Substitusi koordinat: T = (-1-(-5), -3-2). 3) Hitung: (4, -5).",
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
      "Translasi dengan vektor T(a, b) mengubah koordinat (x, y) menjadi (x+a, y+b). Perhatikan bahwa tanda setiap komponen vektor memengaruhi arah pergeseran.\n\nLangkah-langkah: 1) Tentukan vektor translasi T(6, -4). 2) Jumlahkan dengan koordinat B(x, y): (x+6, y+(-4)). 3) Sederhanakan: (x+6, y-4).",
  },
  {
    id: 14,
    type: "pilihan_ganda",
    module: "translasi",
    tab: "titik",
    question: "Titik Q(3, -1) ditranslasikan oleh",
    questionMatrix: "a,b",
    questionSuffix: "sehingga bayangannya Q'(-2, 4). Nilai a+b adalah ...",
    options: ["-10", "0", "5", "-5"],
    correctIndex: 1,
    explanation:
      "Untuk mencari komponen vektor translasi, kurangi koordinat bayangan dengan koordinat titik asal. Tentukan kedua komponen lalu jumlahkan.\n\nLangkah-langkah: 1) Hitung a = x' - x = -2-3 = -5. 2) Hitung b = y' - y = 4-(-1) = 5. 3) Hitung a+b = -5+5 = 0.",
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
      "Translasi menggeser setiap titik bangun dengan vektor translasi yang identik. Akibatnya, semua titik sudut bergeser dengan jarak dan arah yang sama.\n\nLangkah-langkah: 1) Pahami bahwa translasi menggeser setiap titik dengan vektor (a, b) yang sama. 2) Karena vektor identik untuk semua titik, maka semua titik sudut bergeser sejauh yang sama. 3) Pilihan yang tepat adalah semua titik sudut bergeser dengan vektor yang sama.",
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
      "Translasi mempertahankan semua sifat geometri bangun seperti bentuk, ukuran, sudut, dan luas. Satu-satunya yang berubah adalah posisi bangun pada bidang koordinat.\n\nLangkah-langkah: 1) Ingat bahwa translasi adalah transformasi kaku (isometri). 2) Transformasi kaku mempertahankan bentuk dan ukuran bangun. 3) Posisi bangun berubah seiring pergeseran. Pilihan yang tepat adalah bentuk dan ukuran bangun.",
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
      "Tentukan vektor translasi dari pasangan titik asal dan bayangan yang diketahui, lalu terapkan vektor yang sama ke titik yang belum diketahui.\n\nLangkah-langkah: 1) Tentukan vektor translasi T = A' - A = (5-(-1), 1-4) = (6, -3). 2) Terapkan ke titik B(2, -3): B' = B + T = (2+6, -3+(-3)). 3) Hitung B' = (8, -6).",
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
      "Untuk mencari koordinat bayangan suatu titik, jumlahkan vektor translasi dengan koordinat titik asal.\n\nLangkah-langkah: 1) Tentukan vektor translasi T(4, -2). 2) Terapkan ke titik D(-2, 4): D' = (-2+4, 4+(-2)). 3) Hitung D' = (2, 2).",
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
      "Untuk mentranslasikan persamaan garis, substitusikan x dengan x' - a dan y dengan y' - b. Kemudian susun ulang persamaan dalam variabel x' dan y'.\n\nLangkah-langkah: 1) Vektor translasi T(2, 3), substitusi x = x'-2 dan y = y'-3. 2) Masukkan ke persamaan awal: y'-3 = -(x'-2)+4. 3) Sederhanakan: y'-3 = -x'+2+4 → y' = -x'+9. Persamaan bayangan: y = -x+9.",
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
      "Untuk mentranslasikan persamaan garis, substitusikan x dengan x' - a dan y dengan y' - b, lalu selesaikan untuk mendapatkan persamaan bayangan baru.\n\nLangkah-langkah: 1) Vektor translasi T(5, -2), substitusi x = x'-5 dan y = y'+2. 2) Masukkan ke persamaan awal: (x'-5)-(y'+2)=3. 3) Sederhanakan: x'-5-y'-2=3 → x'-y'=10. Persamaan bayangan: x - y = 10.",
  },
]

/** Modul kuis Translasi dengan 20 soal (2 paket). */
export const translasiModule: QuizModule = {
  slug: "translasi",
  title: "KUIS TRANSLASI",
  questions: translasiQuestions,
}