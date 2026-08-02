import type { PilihanGandaQuestion, QuizModule } from "../types"

/** Kumpulan soal kuis untuk modul Refleksi (Paket 1 & 2). */
export const refleksiQuestions: PilihanGandaQuestion[] = [
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
      "Refleksi adalah pencerminan bangun terhadap suatu garis cermin dengan menggunakan sumbu sebagai garis cermin. Setiap titik bayangan memiliki jarak yang sama terhadap garis cermin seperti titik asalnya.\n\nLangkah-langkah: 1) Tentukan sumbu cermin (sumbu X). 2) Terapkan rumus refleksi sumbu X: (x, y) → (x, -y). 3) Untuk A(3, -5), koordinat bayangan adalah (3, -(-5)) = (3, 5).",
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
      "Refleksi terhadap sumbu Y membalik koordinat x (absis) sementara koordinat y (ordinat) tetap. Sumbu Y berperan sebagai garis cermin yang memantulkan titik ke sisi berlawanan.\n\nLangkah-langkah: 1) Tentukan sumbu cermin (sumbu Y). 2) Terapkan rumus refleksi sumbu Y: (x, y) → (-x, y). 3) Untuk P(-4, 6), koordinat bayangan adalah (-(-4), 6) = (4, 6).",
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
      "Refleksi terhadap titik pusat (0, 0) membalik kedua koordinat x dan y. Titik asal merupakan pusat simetri sehingga bayangan terletak di kuadran yang berlawanan.\n\nLangkah-langkah: 1) Identifikasi pusat pencerminan sebagai (0, 0). 2) Terapkan rumus refleksi titik asal: (x, y) → (-x, -y). 3) Untuk Q(5, -2), koordinat bayangan adalah (-5, -(-2)) = (-5, 2).",
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
      "Refleksi terhadap garis x = y menukar nilai koordinat x dan y. Garis ini merupakan diagonal yang membagi bidang kuadran menjadi dua bagian simetris.\n\nLangkah-langkah: 1) Tentukan garis cermin yaitu x = y. 2) Terapkan rumus refleksi x = y: (x, y) → (y, x). 3) Untuk R(2, -7), koordinat bayangan adalah (-7, 2).",
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
      "Refleksi terhadap garis x = -y menukar koordinat x dan y kemudian mengubah tanda keduanya. Garis x = -y adalah diagonal yang menghubungkan kuadran II dan IV.\n\nLangkah-langkah: 1) Tentukan garis cermin yaitu x = -y. 2) Terapkan rumus refleksi x = -y: (x, y) → (-y, -x). 3) Untuk S(4, 1), koordinat bayangan adalah (-1, -4).",
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
      "Refleksi terhadap garis vertikal x = h menggunakan rumus (x, y) → (2h - x, y). Jarak titik asal ke garis cermin sama dengan jarak bayangan ke garis cermin.\n\nLangkah-langkah: 1) Identifikasi h = 1 dari persamaan garis x = 1. 2) Terapkan rumus: (x, y) → (2(1) - x, y) = (2 - x, y). 3) Untuk T(3, 5), bayangan x = 2 - 3 = -1, y tetap 5. Hasilnya (-1, 5).",
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
      "Refleksi merupakan transformasi isometri yang mempertahankan ukuran dan bentuk bangun datar. Hanya posisi atau lokasi bangun yang berubah di bidang koordinat.\n\nLangkah-langkah: 1) Pahami bahwa refleksi adalah pencerminan tanpa mengubah ukuran. 2) Setiap titik pada bangun dipantulkan terhadap sumbu Y. 3) Karena semua titik berpindah dengan jarak yang sama, panjang sisi, luas, dan keliling tetap sama. Pilihan yang tepat adalah ukuran bangun tetap.",
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
      "Pada refleksi, setiap titik dan bayangannya terletak berjarak sama terhadap garis cermin. Garis cermin merupakan sumbu simetri yang membagi ruas garis penghubung titik dan bayangannya menjadi dua bagian yang sama panjang.\n\nLangkah-langkah: 1) Ingat sifat dasar refleksi: jarak titik ke cermin sama dengan jarak bayangan ke cermin. 2) Ruas garis dari titik ke bayangan bersifat tegak lurus terhadap garis cermin. 3) Pilihan yang tepat adalah berjarak sama terhadap garis cermin.",
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
      "Untuk mencerminkan grafik garis terhadap sumbu X, setiap koordinat y diganti dengan -y. Persamaan baru diperoleh dengan mensubstitusi y menjadi -y pada persamaan awal.\n\nLangkah-langkah: 1) Tulis persamaan awal: y = x + 2. 2) Untuk refleksi sumbu X, ganti y dengan -y sehingga menjadi -y = x + 2. 3) Kalikan kedua ruas dengan -1 sehingga diperoleh y = -x - 2.",
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
      "Untuk mencerminkan grafik garis terhadap sumbu Y, setiap koordinat x diganti dengan -x. Persamaan baru diperoleh dengan mensubstitusi x menjadi -x pada persamaan awal.\n\nLangkah-langkah: 1) Tulis persamaan awal: y = 2x - 3. 2) Untuk refleksi sumbu Y, ganti x dengan -x sehingga menjadi y = 2(-x) - 3. 3) Sederhanakan menjadi y = -2x - 3.",
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
      "Refleksi terhadap sumbu X mengubah tanda pada koordinat y (ordinat) sementara koordinat x (absis) tetap. Sumbu X berfungsi sebagai garis cermin horizontal.\n\nLangkah-langkah: 1) Tentukan sumbu cermin yaitu sumbu X. 2) Terapkan rumus (x, y) → (x, -y). 3) Untuk A(-6, 3), koordinat bayangan adalah (-6, -(3)) = (-6, -3).",
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
      "Refleksi terhadap sumbu Y membalik tanda koordinat x (absis) sementara koordinat y (ordinat) tetap. Bayangan terletak di sisi berlawanan terhadap sumbu Y.\n\nLangkah-langkah: 1) Tentukan sumbu cermin yaitu sumbu Y. 2) Terapkan rumus (x, y) → (-x, y). 3) Untuk B(5, -4), koordinat bayangan adalah (-5, -4).",
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
      "Refleksi terhadap titik asal membalik tanda kedua koordinat x dan y. Bayangan terletak di kuadran yang berlawanan dari titik asal dengan jarak yang sama.\n\nLangkah-langkah: 1) Identifikasi pusat pencerminan (0, 0). 2) Terapkan rumus (x, y) → (-x, -y). 3) Untuk C(-2, 7), koordinat bayangan adalah (-(-2), -(7)) = (2, -7).",
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
      "Refleksi terhadap garis x = y dilakukan dengan cara menukar posisi koordinat x dan y. Garis x = y melintas dari kiri bawah ke kanan atas melalui titik asal.\n\nLangkah-langkah: 1) Garis cermin adalah x = y. 2) Terapkan rumus (x, y) → (y, x). 3) Untuk D(-5, 2), koordinat bayangan adalah (2, -5).",
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
      "Refleksi terhadap garis x = -y menukar koordinat dan mengubah tanda kedua-duanya. Garis x = -y melintas dari kiri atas ke kanan bawah.\n\nLangkah-langkah: 1) Tentukan garis cermin: x = -y. 2) Terapkan rumus (x, y) → (-y, -x). 3) Untuk E(3, -6), koordinat bayangan adalah (-(-6), -(3)) = (6, -3).",
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
      "Refleksi terhadap garis horizontal y = k menggunakan rumus (x, y) → (x, 2k - y). Jarak titik dari garis cermin sama dengan jarak bayangan dari garis cermin.\n\nLangkah-langkah: 1) Tentukan k = 4 dari persamaan garis y = 4. 2) Terapkan rumus: (x, y) → (x, 2(4) - y) = (x, 8 - y). 3) Untuk F(7, 2), koordinat bayangan adalah (7, 8 - 2) = (7, 6).",
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
      "Refleksi terhadap garis tunggal x = h juga merupakan transformasi isometri yang mempertahankan bentuk dan ukuran bangun. Yang berubah hanya posisi bangun pada bidang koordinat.\n\nLangkah-langkah: 1) Pahami bahwa refleksi terhadap garis vertikal x = h adalah transformasi isometri. 2) Setiap titik bangun dicerminkan sehingga jarak ke garis cermin tetap terjaga. 3) Karena jarak dan sudut tetap, maka bentuk, ukuran, luas, dan keliling bangun tidak berubah.",
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
      "Garis cermin (sumbu refleksi) merupakan sumbu simetri yang membagi ruas garis penghubung antara titik asal dan bayangannya menjadi dua bagian sama panjang. Pembagian ini juga berlaku tegak lurus terhadap ruas tersebut.\n\nLangkah-langkah: 1) Ingat bahwa refleksi menghasilkan bayangan yang simetris terhadap garis cermin. 2) Garis cermin membagi tegak lurus ruas garis yang menghubungkan titik dan bayangannya. 3) Hanya pilihan kedua yang sesuai dengan sifat dasar refleksi ini.",
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
      "Untuk mencerminkan persamaan garis terhadap sumbu X, substitusikan y dengan -y pada persamaan awal. Kemudian selesaikan untuk mendapatkan persamaan bayangan.\n\nLangkah-langkah: 1) Tulis persamaan awal: y = -2x + 5. 2) Untuk refleksi sumbu X, ganti y dengan -y: -y = -2x + 5. 3) Kalikan kedua ruas dengan -1: y = 2x - 5.",
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
      "Untuk mencerminkan persamaan garis terhadap sumbu Y, substitusikan x dengan -x pada persamaan awal. Persamaan baru mencerminkan bentuk asli yang terbalik secara horizontal terhadap sumbu Y.\n\nLangkah-langkah: 1) Tulis persamaan awal: y = -3x + 1. 2) Untuk refleksi sumbu Y, ganti x dengan -x: y = -3(-x) + 1. 3) Sederhanakan menjadi y = 3x + 1.",
  },
]

/** Modul kuis Refleksi dengan 20 soal (2 paket). */
export const refleksiModule: QuizModule = {
  slug: "refleksi",
  title: "KUIS REFLEKSI",
  questions: refleksiQuestions,
}