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
              hint: "Perhatikan kembali pada GeoGebra posisi titik A(2, 5) dan bayangannya terhadap sumbu x. Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-3, 2)",
              answer: { x: -3, y: -2 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik B(-3, 2) dan bayangannya terhadap sumbu x. Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(-1, -4)",
              answer: { x: -1, y: 4 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik C(-1, -4) dan bayangannya terhadap sumbu x. Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
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
              hint: "Perhatikan posisi titik A dan A' pada GeoGebra. Keduanya dipisahkan oleh sumbu x, sehingga berada pada sisi yang berbeda terhadap sumbu tersebut.",
              explanation:
                "Refleksi memindahkan titik A ke sisi lain sumbu x dengan jarak yang sama, sehingga titik A dan bayangannya A' berada pada sisi yang berlawanan terhadap sumbu x.",
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke sumbu x dengan jarak A' ke sumbu x?",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik A ke sumbu x dan jarak titik A' ke sumbu x pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke sumbu x sama dengan jarak titik A' ke sumbu x, karena refleksi menjaga jarak titik terhadap cermin.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap sumbu x?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
              hint: "Perhatikan ruas garis yang menghubungkan titik A dan A' pada GeoGebra. Bagaimana arah ruas garis tersebut terhadap sumbu x?",
              explanation:
                "Ruas garis yang menghubungkan titik A dan A' selalu tegak lurus terhadap sumbu x, karena refleksi memindahkan titik mengikuti garis yang tegak lurus cermin.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
              hint: "Coba pindahkan titik A ke berbagai posisi pada GeoGebra dan perhatikan apakah sifat yang diamati tetap berlaku.",
              explanation:
                "Sifat refleksi terhadap sumbu x berlaku untuk semua titik, yaitu jarak titik ke sumbu sama dengan jarak bayangannya dan keduanya tegak lurus sumbu.",
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
              hint: "Refleksi terhadap sumbu x membalikkan posisi titik terhadap sumbu mendatar. Koordinat yang tegak lurus sumbu x (yaitu koordinat y) berubah tanda, sedangkan koordinat x tetap.",
              explanation:
                "Refleksi terhadap sumbu x membalikkan titik terhadap sumbu mendatar sehingga koordinat x tetap dan koordinat y berubah tanda. Jadi titik (x, y) direfleksikan terhadap sumbu x menghasilkan bayangan (x, -y).",
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
              hint: "Refleksi terhadap sumbu x mengubah tanda koordinat y menjadi -y, sedangkan koordinat x tetap. Terapkan pada titik P(4, -3).",
              explanation:
                "Refleksi terhadap sumbu x: (x, y) → (x, -y). P(4, -3) menjadi P'(4, 3), sehingga jawaban yang benar adalah P'(4, 3).",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(2, -5) merupakan bayangan titik Q terhadap sumbu x. Tentukan koordinat titik Q!",
              options: ["Q(-2, 5)", "Q(2, 5)", "Q(-2, -5)", "Q(-5, 2)"],
              correctIndex: 1,
              hint: "Refleksi terhadap sumbu x mengubah tanda koordinat y menjadi -y, sedangkan koordinat x tetap. Kerjakan kebalikannya: titik asal Q diperoleh dari Q'(2, -5) dengan membalik tanda koordinat y.",
              explanation:
                "Refleksi terhadap sumbu x: (x, y) → (x, -y). Karena Q'(2, -5) = (x, -y), maka x = 2 dan y = 5, sehingga titik asal Q(2, 5).",
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
              hint: "Perhatikan kembali pada GeoGebra posisi titik A(2, 3) dan bayangannya terhadap sumbu y. Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-2, 4)",
              answer: { x: 2, y: 4 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik B(-2, 4) dan bayangannya terhadap sumbu y. Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(1, -6)",
              answer: { x: -1, y: -6 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik C(1, -6) dan bayangannya terhadap sumbu y. Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
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
              hint: "Perhatikan posisi titik A dan A' pada GeoGebra. Keduanya dipisahkan oleh sumbu y, sehingga berada pada sisi yang berbeda terhadap sumbu tersebut.",
              explanation:
                "Refleksi memindahkan titik A ke sisi lain sumbu y dengan jarak yang sama, sehingga titik A dan bayangannya A' berada pada sisi yang berlawanan terhadap sumbu y.",
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke sumbu y dengan jarak A' ke sumbu y!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik A ke sumbu y dan jarak titik A' ke sumbu y pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke sumbu y sama dengan jarak titik A' ke sumbu y, karena refleksi menjaga jarak titik terhadap cermin.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap sumbu y?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
              hint: "Perhatikan ruas garis yang menghubungkan titik A dan A' pada GeoGebra. Bagaimana arah ruas garis tersebut terhadap sumbu y?",
              explanation:
                "Ruas garis yang menghubungkan titik A dan A' selalu tegak lurus terhadap sumbu y, karena refleksi memindahkan titik mengikuti garis yang tegak lurus cermin.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
              hint: "Coba pindahkan titik A ke berbagai posisi pada GeoGebra dan perhatikan apakah sifat yang diamati tetap berlaku.",
              explanation:
                "Sifat refleksi terhadap sumbu y berlaku untuk semua titik, yaitu jarak titik ke sumbu sama dengan jarak bayangannya dan keduanya tegak lurus sumbu.",
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
              hint: "Refleksi terhadap sumbu y membalikkan posisi titik terhadap sumbu tegak. Koordinat yang tegak lurus sumbu y (yaitu koordinat x) berubah tanda, sedangkan koordinat y tetap.",
              explanation:
                "Refleksi terhadap sumbu y membalikkan titik terhadap sumbu tegak sehingga koordinat y tetap dan koordinat x berubah tanda. Jadi titik (x, y) direfleksikan terhadap sumbu y menghasilkan bayangan (-x, y).",
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
              hint: "Refleksi terhadap sumbu y mengubah tanda koordinat x menjadi -x, sedangkan koordinat y tetap. Terapkan pada titik P(8, -2).",
              explanation:
                "Refleksi terhadap sumbu y: (x, y) → (-x, y). P(8, -2) menjadi P'(-8, -2), sehingga jawaban yang benar adalah P'(-8, -2).",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(4, -6) merupakan bayangan titik Q terhadap sumbu y. Tentukan koordinat titik Q!",
              options: ["Q(6, 4)", "Q(6, -4)", "Q(-6, -4)", "Q(-4, -6)"],
              correctIndex: 3,
              hint: "Refleksi terhadap sumbu y mengubah tanda koordinat x menjadi -x, sedangkan koordinat y tetap. Kerjakan kebalikannya: titik asal Q diperoleh dari Q' dengan membalik tanda koordinat x.",
              explanation:
                "Refleksi terhadap sumbu y: (x, y) → (-x, y). Karena Q'(4, -6) = (-x, y), maka x = -4 dan y = -6, sehingga titik asal Q(-4, -6).",
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
              hint: "Perhatikan kembali pada GeoGebra posisi titik A(5, 3) dan bayangannya terhadap titik (0,0). Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-3, 5)",
              answer: { x: 3, y: -5 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik B(-3, 5) dan bayangannya terhadap titik (0,0). Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(2, -5)",
              answer: { x: -2, y: 5 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik C(2, -5) dan bayangannya terhadap titik (0,0). Bandingkan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
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
              hint: "Perhatikan posisi titik A dan A' pada GeoGebra. Keduanya dipisahkan oleh titik (0,0), sehingga berada pada sisi yang berbeda (arah yang berlawanan) dari titik asal.",
              explanation:
                "Refleksi terhadap titik (0,0) memindahkan titik A melewati titik asal, sehingga titik A dan bayangannya A' berada pada sisi yang berlawanan dari titik (0,0).",
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke titik (0,0) dengan jarak A' ke titik (0,0)!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik A ke titik (0,0) dan jarak titik A' ke titik (0,0) pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke titik (0,0) sama dengan jarak titik A' ke titik (0,0), karena refleksi menjaga jarak titik terhadap pusat cermin.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap titik (0,0)?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
              hint: "Perhatikan ruas garis yang menghubungkan titik A dan A' pada GeoGebra. Garis tersebut melewati titik (0,0). Bagaimana kedudukannya terhadap titik tersebut?",
              explanation:
                "Ruas garis yang menghubungkan titik A dan A' selalu melewati (tegak lurus arah) titik (0,0), karena refleksi memindahkan titik melalui titik asal.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
              hint: "Coba pindahkan titik A ke berbagai posisi pada GeoGebra dan perhatikan apakah sifat yang diamati tetap berlaku.",
              explanation:
                "Sifat refleksi terhadap titik (0,0) berlaku untuk semua titik, yaitu jarak titik ke titik asal sama dengan jarak bayangannya dan keduanya segaris melewati titik (0,0).",
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
              hint: "Refleksi terhadap titik asal (0,0) memindahkan titik ke posisi yang berlawanan arah dari titik asal. Kedua koordinat berubah tanda.",
              explanation:
                "Refleksi terhadap titik (0,0) membalikkan titik melewati titik asal sehingga kedua koordinat berubah tanda. Jadi titik (x, y) direfleksikan terhadap titik (0,0) menghasilkan bayangan (-x, -y).",
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
              hint: "Refleksi terhadap titik (0,0) membalikkan titik melewati titik asal sehingga kedua koordinat berubah tanda: (x, y) → (-x, -y). Terapkan pada titik P(7, 3).",
              explanation:
                "Refleksi terhadap titik (0,0): (x, y) → (-x, -y). P(7, 3) menjadi P'(-7, -3), sehingga jawaban yang benar adalah P'(-7, -3).",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(-8, -2) merupakan bayangan titik Q terhadap titik (0,0). Tentukan koordinat titik Q!",
              options: ["Q(-8, 2)", "Q(8, -2)", "Q(8, 2)", "Q(2, 8)"],
              correctIndex: 2,
              hint: "Refleksi terhadap titik (0,0) membalikkan tanda kedua koordinat: (x, y) → (-x, -y). Kerjakan kebalikannya: titik asal Q diperoleh dari Q'(-8, -2) dengan membalik tanda kedua koordinatnya.",
              explanation:
                "Refleksi terhadap titik (0,0): (x, y) → (-x, -y). Karena Q'(-8, -2) = (-x, -y), maka x = 8 dan y = 2, sehingga titik asal Q(8, 2).",
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
              hint: "Perhatikan kembali pada GeoGebra posisi titik A(3, 4) dan bayangannya terhadap garis x=y. Bandingkan kedudukan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-4, 3)",
              answer: { x: 3, y: -4 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik B(-4, 3) dan bayangannya terhadap garis x=y. Bandingkan kedudukan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(1, -6)",
              answer: { x: -6, y: 1 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik C(1, -6) dan bayangannya terhadap garis x=y. Bandingkan kedudukan koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
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
              hint: "Perhatikan posisi titik A dan A' pada GeoGebra. Keduanya dipisahkan oleh garis x=y, sehingga berada pada sisi yang berbeda terhadap garis tersebut.",
              explanation:
                "Refleksi memindahkan titik A ke sisi lain garis x=y dengan jarak yang sama, sehingga titik A dan bayangannya A' berada pada sisi yang berlawanan terhadap garis x=y.",
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis x=y dengan jarak A' ke garis x=y!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik A ke garis x=y dan jarak titik A' ke garis x=y pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke garis x=y sama dengan jarak titik A' ke garis x=y, karena refleksi menjaga jarak titik terhadap cermin.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis x=y?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
              hint: "Perhatikan ruas garis yang menghubungkan titik A dan A' pada GeoGebra. Bagaimana arah ruas garis tersebut terhadap garis x=y?",
              explanation:
                "Ruas garis yang menghubungkan titik A dan A' selalu tegak lurus terhadap garis x=y, karena refleksi memindahkan titik mengikuti garis yang tegak lurus cermin.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
              hint: "Coba pindahkan titik A ke berbagai posisi pada GeoGebra dan perhatikan apakah sifat yang diamati tetap berlaku.",
              explanation:
                "Sifat refleksi terhadap garis x=y berlaku untuk semua titik, yaitu jarak titik ke garis sama dengan jarak bayangannya dan keduanya tegak lurus garis.",
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
              hint: "Garis x=y adalah garis diagonal yang membagi kuadran I dan III. Perhatikan bagaimana koordinat x dan y saling bertukar posisi setelah direfleksikan.",
              explanation:
                "Refleksi terhadap garis x=y menukar kedudukan koordinat x dan y. Jadi titik (x, y) direfleksikan terhadap garis x=y menghasilkan bayangan (y, x).",
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
              hint: "Refleksi terhadap garis x=y menukar kedudukan koordinat x dan y: (x, y) → (y, x). Terapkan pada titik P(6, 6).",
              explanation:
                "Refleksi terhadap garis x=y: (x, y) → (y, x). P(6, 6) menjadi P'(6, 6) karena koordinatnya sama, sehingga jawaban yang benar adalah P'(6, 6).",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(-3, 2) merupakan bayangan titik Q terhadap garis x=y. Tentukan koordinat titik asalnya!",
              options: ["Q(3, 2)", "Q(3, -2)", "Q(2, -3)", "Q(-3, 2)"],
              correctIndex: 2,
              hint: "Refleksi terhadap garis x=y menukar kedudukan koordinat x dan y: (x, y) → (y, x). Kerjakan kebalikannya: titik asal Q diperoleh dari Q'(-3, 2) dengan menukar kembali koordinatnya.",
              explanation:
                "Refleksi terhadap garis x=y: (x, y) → (y, x). Karena Q'(-3, 2) = (y, x), maka koordinat titik asal adalah Q(2, -3).",
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
              hint: "Perhatikan kembali pada GeoGebra posisi titik A(4, 2) dan bayangannya terhadap garis x=-y. Bandingkan kedudukan dan tanda koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-5, 3)",
              answer: { x: -3, y: 5 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik B(-5, 3) dan bayangannya terhadap garis x=-y. Bandingkan kedudukan dan tanda koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(2, -6)",
              answer: { x: 6, y: -2 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik C(2, -6) dan bayangannya terhadap garis x=-y. Bandingkan kedudukan dan tanda koordinat x dan koordinat y titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.",
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
              hint: "Perhatikan posisi titik A dan A' pada GeoGebra. Keduanya dipisahkan oleh garis x=-y, sehingga berada pada sisi yang berbeda terhadap garis tersebut.",
              explanation:
                "Refleksi memindahkan titik A ke sisi lain garis x=-y dengan jarak yang sama, sehingga titik A dan bayangannya A' berada pada sisi yang berlawanan terhadap garis x=-y.",
            },
            {
              id: 5,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis x=-y dengan jarak A' ke garis x=-y!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik A ke garis x=-y dan jarak titik A' ke garis x=-y pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke garis x=-y sama dengan jarak titik A' ke garis x=-y, karena refleksi menjaga jarak titik terhadap cermin.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis x=-y?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
              hint: "Perhatikan ruas garis yang menghubungkan titik A dan A' pada GeoGebra. Bagaimana arah ruas garis tersebut terhadap garis x=-y?",
              explanation:
                "Ruas garis yang menghubungkan titik A dan A' selalu tegak lurus terhadap garis x=-y, karena refleksi memindahkan titik mengikuti garis yang tegak lurus cermin.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
              hint: "Coba pindahkan titik A ke berbagai posisi pada GeoGebra dan perhatikan apakah sifat yang diamati tetap berlaku.",
              explanation:
                "Sifat refleksi terhadap garis x=-y berlaku untuk semua titik, yaitu jarak titik ke garis sama dengan jarak bayangannya dan keduanya tegak lurus garis.",
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
              hint: "Garis x=-y adalah garis diagonal yang membagi kuadran II dan IV. Koordinat x dan y bertukar posisi dan keduanya berubah tanda.",
              explanation:
                "Refleksi terhadap garis x=-y menukar kedudukan koordinat x dan y sekaligus mengubah tanda keduanya. Jadi titik (x, y) direfleksikan terhadap garis x=-y menghasilkan bayangan (-y, -x).",
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
              hint: "Refleksi terhadap garis x=-y menukar kedudukan koordinat x dan y sekaligus mengubah tanda keduanya: (x, y) → (-y, -x). Terapkan pada titik P(4, 5).",
              explanation:
                "Refleksi terhadap garis x=-y: (x, y) → (-y, -x). P(4, 5) menjadi P'(-5, -4), sehingga jawaban yang benar adalah P'(-5, -4).",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(8, -9) merupakan bayangan titik Q terhadap garis x=-y. Tentukan koordinat titik asalnya!",
              options: ["Q(-9, 8)", "Q(9, -8)", "Q(-9, -8)", "Q(8, -9)"],
              correctIndex: 1,
              hint: "Refleksi terhadap garis x=-y: (x, y) → (-y, -x). Kerjakan kebalikannya: dari Q'(8, -9) = (-y, -x), tentukan nilai x dan y asalnya.",
              explanation:
                "Refleksi terhadap garis x=-y: (x, y) → (-y, -x). Karena Q'(8, -9) = (-y, -x), maka -y = 8 dan -x = -9, sehingga y = -8 dan x = 9, titik asal Q(9, -8).",
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
              hint: "Perhatikan kembali pada GeoGebra posisi titik A(3, 2) dan bayangannya terhadap garis vertikal x=2. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(-3, -3)",
              answer: { x: 7, y: -3 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik B(-3, -3) dan bayangannya terhadap garis vertikal x=2. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(1, 5)",
              answer: { x: -3, y: 5 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik C(1, 5) dan bayangannya terhadap garis vertikal x=-1. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 4,
              type: "koordinat",
              label: "D(-2, 2)",
              answer: { x: 0, y: 2 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik D(-2, 2) dan bayangannya terhadap garis vertikal x=-1. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
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
              hint: "Perhatikan posisi titik A dan A' pada GeoGebra. Keduanya dipisahkan oleh garis x=h, sehingga berada pada sisi yang berbeda terhadap garis tersebut.",
              explanation:
                "Refleksi memindahkan titik A ke sisi lain garis vertikal x=h dengan jarak yang sama, sehingga titik A dan bayangannya A' berada pada sisi yang berlawanan terhadap garis x=h.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis x=h dengan jarak A' ke garis x=h!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik A ke garis x=h dan jarak titik A' ke garis x=h pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke garis x=h sama dengan jarak titik A' ke garis x=h, karena refleksi menjaga jarak titik terhadap cermin.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis x=h?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
              hint: "Perhatikan ruas garis yang menghubungkan titik A dan A' pada GeoGebra. Bagaimana arah ruas garis tersebut terhadap garis vertikal x=h?",
              explanation:
                "Ruas garis yang menghubungkan titik A dan A' selalu tegak lurus terhadap garis x=h, karena refleksi memindahkan titik mengikuti garis yang tegak lurus cermin.",
            },
            {
              id: 8,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
              hint: "Coba pindahkan titik A ke berbagai posisi pada GeoGebra dan perhatikan apakah sifat yang diamati tetap berlaku.",
              explanation:
                "Sifat refleksi terhadap garis x=h berlaku untuk semua titik, yaitu jarak titik ke garis sama dengan jarak bayangannya dan keduanya tegak lurus garis.",
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
              hint: "Garis x=h adalah garis vertikal. Titik asal dan bayangannya berjarak sama dari garis tersebut, sehingga koordinat x bergeser sejauh 2 kali selisih x terhadap h, sedangkan koordinat y tetap.",
              explanation:
                "Refleksi terhadap garis vertikal x=h menjaga jarak titik terhadap garis tersebut. Koordinat x berubah menjadi x' = h + (h - x) = 2h - x, sedangkan koordinat y tetap. Jadi bayangannya adalah (2h - x, y).",
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
              hint: "Refleksi terhadap garis vertikal x=h menggunakan rumus x' = 2h - x, sedangkan koordinat y tetap. Terapkan dengan h = 3 pada titik P(6, 7).",
              explanation:
                "Refleksi terhadap garis x=3: x' = 2h - x = 2(3) - 6 = 0 dan y' = 7, sehingga bayangannya P'(0, 7).",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(-3, 6) merupakan bayangan titik Q terhadap garis x=-2. Tentukan koordinat titik asalnya!",
              options: ["Q(-1, 6)", "Q(1, 6)", "Q(3, 6)", "Q(6, 6)"],
              correctIndex: 0,
              hint: "Refleksi terhadap garis vertikal x=h memenuhi x' = 2h - x. Masukkan x' = -3 dan h = -2, lalu selesaikan untuk mencari x asal; koordinat y tetap.",
              explanation:
                "Refleksi terhadap garis x=-2: x' = 2h - x = 2(-2) - x = -4 - x. Karena x' = -3, maka -3 = -4 - x sehingga x = -1, dan y = 6. Jadi titik asal Q(-1, 6).",
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
              hint: "Perhatikan kembali pada GeoGebra posisi titik A(2, 3) dan bayangannya terhadap garis horizontal y=2. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 2,
              type: "koordinat",
              label: "B(5, -2)",
              answer: { x: 5, y: 6 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik B(5, -2) dan bayangannya terhadap garis horizontal y=2. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 3,
              type: "koordinat",
              label: "C(5, 1)",
              answer: { x: 5, y: -3 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik C(5, 1) dan bayangannya terhadap garis horizontal y=-1. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
            },
            {
              id: 4,
              type: "koordinat",
              label: "D(2, -2)",
              answer: { x: 2, y: 0 },
              hint: "Perhatikan kembali pada GeoGebra posisi titik D(2, -2) dan bayangannya terhadap garis horizontal y=-1. Bandingkan jarak titik awal ke garis dan koordinat bayangannya, lalu tentukan koordinat bayangan yang benar.",
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
              hint: "Perhatikan posisi titik A dan A' pada GeoGebra. Keduanya dipisahkan oleh garis y=h, sehingga berada pada sisi yang berbeda terhadap garis tersebut.",
              explanation:
                "Refleksi memindahkan titik A ke sisi lain garis horizontal y=h dengan jarak yang sama, sehingga titik A dan bayangannya A' berada pada sisi yang berlawanan terhadap garis y=h.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik A ke garis y=h dengan jarak A' ke garis y=h!",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik A ke garis y=h dan jarak titik A' ke garis y=h pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke garis y=h sama dengan jarak titik A' ke garis y=h, karena refleksi menjaga jarak titik terhadap cermin.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Bagaimana posisi garis yang menghubungkan A dan A' terhadap garis y=h?",
              options: ["Sejajar", "Tegak Lurus"],
              correctIndex: 1,
              hint: "Perhatikan ruas garis yang menghubungkan titik A dan A' pada GeoGebra. Bagaimana arah ruas garis tersebut terhadap garis horizontal y=h?",
              explanation:
                "Ruas garis yang menghubungkan titik A dan A' selalu tegak lurus terhadap garis y=h, karena refleksi memindahkan titik mengikuti garis yang tegak lurus cermin.",
            },
            {
              id: 8,
              type: "pilihan_ganda",
              question: "Apakah hasil pengamatan selalu berlaku untuk semua titik?",
              options: ["Ya", "Tidak"],
              correctIndex: 0,
              hint: "Coba pindahkan titik A ke berbagai posisi pada GeoGebra dan perhatikan apakah sifat yang diamati tetap berlaku.",
              explanation:
                "Sifat refleksi terhadap garis y=h berlaku untuk semua titik, yaitu jarak titik ke garis sama dengan jarak bayangannya dan keduanya tegak lurus garis.",
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
              hint: "Garis y=h adalah garis horizontal. Titik asal dan bayangannya berjarak sama dari garis tersebut, sehingga koordinat y bergeser sejauh 2 kali selisih y terhadap h, sedangkan koordinat x tetap.",
              explanation:
                "Refleksi terhadap garis horizontal y=h menjaga jarak titik terhadap garis tersebut. Koordinat y berubah menjadi y' = h + (h - y) = 2h - y, sedangkan koordinat x tetap. Jadi bayangannya adalah (x, 2h - y).",
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
              hint: "Refleksi terhadap garis horizontal y=h menggunakan rumus y' = 2h - y, sedangkan koordinat x tetap. Terapkan dengan h = 3 pada titik P(6, 6).",
              explanation:
                "Refleksi terhadap garis y=3: y' = 2h - y = 2(3) - 6 = 0 dan x' = 6, sehingga bayangannya P'(6, 0).",
            },
            {
              id: 10,
              type: "pilihan_ganda",
              question: "Titik Q'(6, -3) merupakan bayangan titik Q terhadap garis y=-2. Tentukan koordinat titik asalnya!",
              options: ["Q(1, -6)", "Q(6, -1)", "Q(6, -5)", "Q(6, -6)"],
              correctIndex: 1,
              hint: "Refleksi terhadap garis horizontal y=h memenuhi y' = 2h - y. Masukkan y' = -3 dan h = -2, lalu selesaikan untuk mencari y asal; koordinat x tetap.",
              explanation:
                "Refleksi terhadap garis y=-2: y' = 2h - y = 2(-2) - y = -4 - y. Karena y' = -3, maka -3 = -4 - y sehingga y = -1, dan x = 6. Jadi titik asal Q(6, -1).",
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
              hint:
                "Bangun ABCD telah diketahui pada bidang koordinat.\nMenentukan koordinat titik sudut A, B, C, dan D.\nMencerminkan titik sudut A, B, C, dan D sesuai dengan cermin refleksi yang dipilih.\nMenulis koordinat bayangan A', B', C', dan D'.\nMenghubungkan titik-titik sudut bayangan sehingga membentuk bangun yang utuh.",
              explanation:
                "Bangun ABCD telah diketahui pada bidang koordinat dengan titik sudut A(-4, 0), B(-2, 2), C(-2, 6), dan D(-4, 4).\nMenentukan koordinat titik sudut A, B, C, dan D.\nMencerminkan titik sudut A, B, C, dan D satu per satu sesuai dengan cermin refleksi yang dipilih menggunakan rumus refleksi yang sesuai.\nMenulis koordinat bayangan A', B', C', dan D' dari hasil pencerminan.\nMenghubungkan titik-titik sudut bayangan sehingga membentuk bangun yang utuh.",
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
              hint: "Bandingkan bentuk, ukuran, arah hadap, dan jarak bangun sebelum dan sesudah refleksi pada GeoGebra. Refleksi seperti pantulan di cermin, bukan seperti pergeseran.",
              explanation:
                "Refleksi tidak mengubah bentuk dan ukuran bangun (jadi pernyataan 1 dan 2 Tidak), tetapi bayangan saling berhadapan seperti pantulan cermin dan jarak bangun ke cermin sama dengan jarak bayangan ke cermin (jadi pernyataan 3 dan 4 Ya).",
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
              hint: "Refleksi menghasilkan bayangan yang kongruen dengan bangun asal tetapi dicerminkan (seperti pantulan di cermin), bukan sekadar digeser. Jarak setiap titik ke cermin sama dengan jarak bayangannya ke cermin. Periksa setiap gambar apakah menampilkan pencerminan.",
              explanation:
                "Gambar yang menunjukkan refleksi adalah gambar b, c, d, dan e, karena bangun bayangannya kongruen dan dibalik seolah-olah dipantulkan oleh cermin. Gambar a hanya menggeser bangun, sehingga bukan refleksi.",
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
              hint: "Refleksi terhadap sumbu y membalikkan bangun ke sisi lain sumbu y: setiap titik (x, y) menjadi (-x, y). Perhatikan arah hadap bangun yang mencerminkan pembalikan terhadap sumbu tegak.",
              explanation:
                "Refleksi terhadap sumbu y mengubah koordinat x setiap titik menjadi -x, sehingga bayangan bangun tampak dibalik ke kiri. Gambar b adalah bayangan yang benar.",
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
              hint:
                "Ruas garis AB telah diketahui pada bidang koordinat.\nMenentukan koordinat kedua titik ujungnya, yaitu A dan B.\nMencerminkan kedua titik ujung sesuai dengan cermin refleksi yang dipilih.\nMenulis koordinat bayangan kedua titik ujung.\nMenghubungkan titik ujung satu dengan titik ujung kedua dengan garis lurus.",
              explanation:
                "Ruas garis AB telah diketahui pada bidang koordinat dengan A(-6, 1) dan B(-2, 3).\nMenentukan koordinat kedua titik ujungnya, yaitu A dan B.\nMencerminkan kedua titik ujung sesuai dengan cermin refleksi yang dipilih menggunakan rumus refleksi yang sesuai.\nMenulis koordinat bayangan kedua titik ujung dari hasil pencerminan.\nMenghubungkan titik ujung satu dengan titik ujung kedua dengan garis lurus membentuk bayangan ruas garis.",
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
              hint:
                "Ruas garis AB telah diketahui pada bidang koordinat.\nMenentukan koordinat kedua titik ujungnya, yaitu A dan B.\nMencerminkan kedua titik ujung sesuai dengan cermin refleksi yang dipilih.\nMenulis koordinat bayangan kedua titik ujung.\nMenghubungkan titik ujung satu dengan titik ujung kedua dengan garis lurus.",
              explanation:
                "Ruas garis AB telah diketahui pada bidang koordinat dengan A(-6, 1) dan B(-2, 3).\nKoordinat A' dan B' ditentukan dengan mencerminkan titik A dan titik B (kedua ujung ruas garis) terhadap cermin/garis refleksi yang sama.\nSetiap titik ujung dicerminkan sesuai dengan cermin refleksinya menggunakan rumus refleksi yang sesuai.\nMenulis koordinat bayangan A' dan B' dari hasil pencerminan.\nHasil refleksi kedua titik tersebut kemudian dihubungkan dengan garis lurus untuk membentuk ruas garis bayangan A'B'.",
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
              hint: "Perhatikan jarak titik A ke cermin dan jarak titik A' ke cermin pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik A ke cermin sama dengan jarak titik A' ke cermin, karena refleksi menjaga jarak titik terhadap cerminnya.",
            },
            {
              id: 6,
              type: "pilihan_ganda",
              question: "Bandingkan jarak titik B ke cermin dengan titik B\u2019 ke cermin?",
              options: ["Sama", "Berbeda"],
              correctIndex: 0,
              hint: "Perhatikan jarak titik B ke cermin dan jarak titik B' ke cermin pada GeoGebra. Ukur keduanya dan bandingkan.",
              explanation:
                "Jarak titik B ke cermin sama dengan jarak titik B' ke cermin, karena refleksi menjaga jarak titik terhadap cerminnya.",
            },
            {
              id: 7,
              type: "pilihan_ganda",
              question: "Apakah panjang ruas garis awal dengan bayangannya sama?",
              options: ["Iya", "Tidak"],
              correctIndex: 0,
              hint: "Perhatikan panjang ruas garis AB dan panjang ruas garis bayangannya A'B' pada GeoGebra. Apakah panjang keduanya sama?",
              explanation:
                "Refleksi tidak mengubah ukuran objek, sehingga panjang ruas garis AB sama dengan panjang ruas garis bayangannya A'B'.",
            },
            {
              id: 8,
              type: "pilihan_ganda",
              question: "Apakah posisi ruas garis awal dengan bayangannya sama?",
              options: ["Iya", "Tidak"],
              correctIndex: 1,
              hint: "Perhatikan kedudukan ruas garis AB dan ruas garis bayangannya A'B' pada GeoGebra. Apakah arah dan letaknya sama seperti semula?",
              explanation:
                "Posisi ruas garis bayangan berbeda dari ruas garis awal, karena refleksi membalik arah hadap ruas garis seolah-olah dipantulkan oleh cermin.",
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
              hint:
                "Bayangan sebuah ruas garis ditentukan oleh bayangan kedua titik ujungnya.\nPikirkan langkah paling awal hingga langkah terakhir secara berurutan: mulai dari ruas garis diketahui, lalu tentukan kedua titik ujung, cerminkan kedua titik ujung, tulis koordinat bayangan, dan terakhir hubungkan kedua titik bayangan.",
              explanation:
                "Urutan yang benar: 1) Ruas garis diketahui\n2) Menentukan koordinat kedua titik ujungnya\n3) Mencerminkan kedua titik ujung sesuai dengan cermin refleksinya\n4) Menulis koordinat bayangan kedua titik ujung\n5) Menghubungkan titik ujung satu dengan titik ujung kedua dengan garis lurus.",
            },
            {
              id: 10,
              type: "uraian",
              question: "Mengapa cukup mencerminkan dua titik untuk menentukan ruas garis hasil refleksi?",
              answer: "Karena untuk mengetahui ruas garis harus mengetahui 2 titik ujung ruas garis tersebut",
              hint: "Sebuah ruas garis dibentuk oleh dua titik ujung. Jika kedua ujungnya sudah diketahui bayangannya, maka ruas garis bayangan dapat langsung digambar.",
              explanation:
                "Sebuah ruas garis ditentukan sepenuhnya oleh dua titik ujungnya. Dengan mencerminkan kedua titik ujung tersebut, koordinat bayangannya diketahui, sehingga ruas garis hasil refleksi dapat ditentukan dengan menghubungkan kedua titik bayangan tersebut.",
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
              questionImage: "/questions/ruas-garis_soal.webp",
              options: ["Gambar a", "Gambar b", "Gambar c", "Gambar d"],
              imageOptions: [
                "/questions/ruas_a.webp",
                "/questions/ruas_b.webp",
                "/questions/ruas_c.webp",
                "/questions/ruas_d.webp",
              ],
              optionFormat: "image",
              correctIndex: 1,
              hint: "Refleksi terhadap sumbu x membalikkan ruas garis ke sisi bawah sumbu x: setiap titik (x, y) menjadi (x, -y). Cari gambar di mana kedua titik ujung ruas garis berpindah ke bawah dengan jarak yang sama ke sumbu x.",
              explanation:
                "Refleksi terhadap sumbu x mengubah koordinat y setiap titik menjadi -y, sehingga ruas garis bayangan berada di bawah sumbu x dengan jarak yang sama. Gambar b adalah bayangan yang benar.",
            },
          ],
        },
      },
    },
  ]
;