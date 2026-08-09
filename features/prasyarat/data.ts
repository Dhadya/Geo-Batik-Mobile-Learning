/* Prerequisite concept data for the prasyarat page.
   Each concept is a card explaining a fundamental geometry element. */
export interface PrerequisiteConcept {
  title: string
  description: string
  /** Paragraph-form description for the concept sheet (no numbering) */
  sheetDescription: string
  /** Material Symbol name for the card icon */
  icon: string
}

/** Concept cards shown in the konsep dasar section. */
export const prerequisiteConcepts: PrerequisiteConcept[] = [
  {
    title: "Sumbu x",
    description:
      "Sumbu x adalah garis bilangan horizontal (mendatar) pada bidang kartesius. Nilainya bertambah dari kiri ke kanan.",
    sheetDescription:
      "Sumbu x adalah garis bilangan horizontal (mendatar) pada bidang kartesius. Nilainya bertambah dari kiri ke kanan.",
    icon: "axis_horizontal",
  },
  {
    title: "Sumbu y",
    description:
      "Sumbu y adalah garis bilangan vertikal (tegak) pada bidang kartesius. Nilainya bertambah dari bawah ke atas.",
    sheetDescription:
      "Sumbu y adalah garis bilangan vertikal (tegak) pada bidang kartesius. Nilainya bertambah dari bawah ke atas.",
    icon: "axis_vertical",
  },
  {
    title: "Titik",
    description:
      "1. Biasanya direpresentasikan dengan sebuah noktah atau dot.\n2. Objek geometri yang menunjukkan posisi, tetapi tidak memiliki ukuran.\n3. Titik tidak memiliki dimensi.\n4. Penamaan titik menggunakan huruf kapital, seperti A, B, atau C.",
    sheetDescription:
      "Biasanya direpresentasikan dengan sebuah noktah atau dot. Objek geometri yang menunjukkan posisi, tetapi tidak memiliki ukuran. Titik tidak memiliki dimensi. Penamaan titik menggunakan huruf kapital, seperti A, B, atau C.",
    icon: "ads_click",
  },
  {
    title: "Kuadran",
    description:
      "Sumbu x dan sumbu y membagi bidang koordinat menjadi empat bagian yang disebut kuadran. Kuadran diberi nomor I, II, III, dan IV dengan arah berlawanan jarum jam.\n1. Kuadran I: x > 0 dan y > 0.\n2. Kuadran II: x < 0 dan y > 0.\n3. Kuadran III: x < 0 dan y < 0.\n4. Kuadran IV: x > 0 dan y < 0.",
    sheetDescription:
      "Sumbu x dan sumbu y membagi bidang koordinat menjadi empat bagian yang disebut kuadran. Kuadran diberi nomor I, II, III, dan IV dengan arah berlawanan jarum jam. Kuadran I memiliki x > 0 dan y > 0. Kuadran II memiliki x < 0 dan y > 0. Kuadran III memiliki x < 0 dan y < 0. Kuadran IV memiliki x > 0 dan y < 0.",
    icon: "grid_4x4",
  },
  {
    title: "Garis",
    description:
      "1. Himpunan titik yang memanjang tanpa batas ke dua arah yang berlawanan.\n2. Garis bersifat lurus dan satu dimensi.\n3. Titik P dan Q berada pada garis tersebut.\n4. Penamaan garis sebagai berikut:\na. Menggunakan dua titik yang melalui garis, misal garis melalui titik P dan Q, penamaannya menjadi garis PQ.\nb. Menggunakan huruf kecil, misal garis m.",
    sheetDescription:
      "Garis adalah himpunan titik yang memanjang tanpa batas ke dua arah yang berlawanan. Garis bersifat lurus dan satu dimensi. Titik P dan Q berada pada garis tersebut. Penamaan garis dapat dilakukan dengan dua cara: menggunakan dua titik yang dilaluinya (misalnya garis PQ) atau menggunakan huruf kecil (misalnya garis m).",
    icon: "line_garis",
  },
  {
    title: "Ruas Garis",
    description:
      "Ruas garis adalah bagian dari suatu garis yang terdiri dari dua titik (yang disebut sebagai titik ujung atau endpoints) dan semua titik yang terletak di antara kedua titik ujung tersebut.",
    sheetDescription:
      "Ruas garis adalah bagian dari suatu garis yang terdiri dari dua titik (yang disebut sebagai titik ujung atau endpoints) dan semua titik yang terletak di antara kedua titik ujung tersebut.",
    icon: "line_ruas_garis",
  },
  {
    title: "Bidang",
    description:
      "1. Permukaan datar dua dimensi.\n2. Bidang memiliki panjang tak hingga dan lebar tak hingga, tetapi tidak memiliki ketebalan.\n3. Bidang terdiri atas tak hingga banyak titik dan memuat garis-garis di dalamnya.\n4. Gambar bidang hanya menunjukkan sebagian dari bidang yang sebenarnya.",
    sheetDescription:
      "Bidang adalah permukaan datar dua dimensi. Bidang memiliki panjang tak hingga dan lebar tak hingga, tetapi tidak memiliki ketebalan. Bidang terdiri atas tak hingga banyak titik dan memuat garis-garis di dalamnya. Gambar bidang hanya menunjukkan sebagian dari bidang yang sebenarnya.",
    icon: "grid_view",
  },
  {
    title: "Bangun Datar",
    description:
      "Bangun datar adalah bagian dari bidang yang dibatasi oleh satu atau beberapa batas.",
    sheetDescription:
      "Bangun datar adalah bagian dari bidang yang dibatasi oleh satu atau beberapa batas.",
    icon: "pentagon",
  },
]

/** Separate concepts for control panel sheet (K1-K4 not shown as cards). */
export const controlPanelConcepts: Record<string, PrerequisiteConcept> = {
  "Kuadran I": {
    title: "Kuadran I",
    description: "Kuadran I: x > 0 dan y > 0.",
    sheetDescription: "Kuadran I: x > 0 dan y > 0.",
    icon: "grid_view",
  },
  "Kuadran II": {
    title: "Kuadran II",
    description: "Kuadran II: x < 0 dan y > 0.",
    sheetDescription: "Kuadran II: x < 0 dan y > 0.",
    icon: "grid_view",
  },
  "Kuadran III": {
    title: "Kuadran III",
    description: "Kuadran III: x < 0 dan y < 0.",
    sheetDescription: "Kuadran III: x < 0 dan y < 0.",
    icon: "grid_view",
  },
  "Kuadran IV": {
    title: "Kuadran IV",
    description: "Kuadran IV: x > 0 dan y < 0.",
    sheetDescription: "Kuadran IV: x > 0 dan y < 0.",
    icon: "grid_view",
  },
}
