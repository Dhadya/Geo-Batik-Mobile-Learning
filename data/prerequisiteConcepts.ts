/* Prerequisite concept data for the prasyarat page.
   Each concept is a card explaining a fundamental geometry element. */
export interface PrerequisiteConcept {
  title: string
  description: string
  /** Material Symbol name for the card icon */
  icon: string
}

export const prerequisiteConcepts: PrerequisiteConcept[] = [
  {
    title: "Titik",
    description:
      "Sesuatu yang hanya menunjukkan posisi atau letak, tidak memiliki dimensi panjang maupun lebar. Berada di dimensi 0. Penamaannya menggunakan huruf kapital. Posisi titik ditunjukkan oleh (absis, ordinat).",
    icon: "ads_click",
  },
  {
    title: "Garis",
    description:
      "Himpunan titik-titik berderet yang memanjang tanpa batas ke dua arah (kanan-kiri atau atas-bawah). Garis memiliki dimensi panjang, tetapi tidak memiliki dimensi lebar. Berada di dimensi 1. Penamaannya berupa persamaan garis.",
    icon: "horizontal_rule",
  },
  {
    title: "Bidang",
    description:
      "Bidang dideskripsikan sebagai permukaan datar dua dimensi yang meluas tanpa batas ke segala arah dan tidak memiliki ketebalan.",
    icon: "grid_view",
  },
  {
    title: "Sumbu x",
    description:
      "Sumbu x adalah garis bilangan real horizontal pada bidang Kartesius. Nilai pada sumbu x disebut absis.",
    icon: "east",
  },
  {
    title: "Sumbu y",
    description:
      "Sumbu y adalah garis bilangan real vertikal pada bidang Kartesius. Nilai pada sumbu y disebut ordinat.",
    icon: "north",
  },
  {
    title: "Kuadran",
    description:
      "Daerah yang terbagi karena perpotongan sumbu x dan sumbu y. Terdapat 4 kuadran, yaitu:\nKuadran I: absis x > 0 dan ordinat y > 0.\nKuadran II: absis x < 0 dan ordinat y > 0.\nKuadran III: absis x < 0 dan ordinat y < 0.\nKuadran IV: absis x > 0 dan ordinat y < 0.",
    icon: "grid_4x4",
  },
  {
    title: "Ruas Garis",
    description:
      "Ruas garis didefinisikan sebagai bagian dari suatu garis lurus yang dibatasi oleh dua titik ujung.",
    icon: "remove",
  },
  {
    title: "Bangun Datar",
    description:
      "Bentuk 2 dimensi yang datar. Bangun datar memiliki dimensi panjang dan lebar.",
    icon: "pentagon",
  },
]
