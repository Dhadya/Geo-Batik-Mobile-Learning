/* Static apersepsi content data for translasi and refleksi modules. */
import type { ApersepsiContent, ApersepsiSlug } from "./types"

export const apersepsiData: Record<ApersepsiSlug, ApersepsiContent> = {
  translasi: {
    slug: "translasi",
    label: "MODUL 1",
    title: "TRANSLASI",
    icon: "transform",
    bgColor: "bg-module-translasi",
    contentBeforeImage: "Perhatikan susunan pola pada kain batik motif kawung berikut! Pernahkah kamu berpikir bagaimana pembatik bisa membuat **pola yang rapi dan konsisten** hingga memenuhi seluruh kain?",
    contentAfterImage: "Mereka tidak menggambar bentuk yang berbeda satu per satu. Mereka hanya perlu membuat satu **\"cetakan\" motif dasar**. Setelah itu, mereka cukup **menggeser** cetakan tersebut dengan **jarak dan arah yang teratur**, ke kanan, ke kiri, ke atas, maupun ke bawah.\n\nProses menggeser inilah yang akan kita pelajari sekarang! Kalian akan ditemani oleh Kak Dhadya yang menjadi instruktur pembatik geometri.",
    image: "/images/batik-apersepsi-translasi.webp",
  },
  refleksi: {
    slug: "refleksi",
    label: "MODUL 2",
    title: "REFLEKSI",
    icon: "flip",
    bgColor: "bg-module-refleksi",
    contentBeforeImage: "Coba amati pola batik motif pucuk rebung berikut.",
    contentAfterImage: "Kamu sadar ga kalau pola pada batik ini **mirip**, sebelah kiri dan sebelah kanannya?\n\nCoba bayangkan kamu **melipat** gambar kain ini di pola bagian tengahnya. Pasti motif sebelah kiri dan kanan akan saling menempel dengan sempurna, kan? Ukurannya **sama persis**, bentuknya **tidak berubah**, dan posisinya **saling berhadapan** satu sama lain.\n\nPara pembuat batik menggunakan **\"trik cermin\"** ini supaya kain terlihat seimbang dan cantik dari sudut mana pun.\n\nNah, kira-kira bagaimana ya \"trik cermin\" ini bekerja kalau kita buat polanya di atas **bidang koordinat**? Yuk, kita cari tahu rahasianya bersama saya!",
    image: "/images/batik-apersepsi-refleksi.webp",
  },
}
