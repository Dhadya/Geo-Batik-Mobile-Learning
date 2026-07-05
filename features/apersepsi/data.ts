/* Static apersepsi content data for translasi and refleksi modules. */
import type { ApersepsiContent, ApersepsiSlug } from "./types"

export const apersepsiData: Record<ApersepsiSlug, ApersepsiContent> = {
  translasi: {
    slug: "translasi",
    label: "MODUL 1",
    title: "TRANSLASI",
    hook: "Perhatikan susunan pola pada kain batik motif kawung berikut! Pernahkah kamu berpikir bagaimana pembatik bisa membuat pola yang rapi dan konsisten hingga memenuhi seluruh kain?",
    explanation: "Mereka tidak menggambar bentuk yang berbeda satu per satu. Mereka hanya perlu membuat satu \"cetakan\" motif dasar. Setelah itu, mereka cukup menggeser cetakan tersebut dengan jarak dan arah yang teratur, ke kanan, ke kiri, ke atas, maupun ke bawah. Proses menggeser inilah yang akan kita pelajari sekarang! Kalian akan ditemani oleh Kak Dhadya yang menjadi instruktur pembatik geometri.",
    visualTitle: "Apa itu Translasi?",
    visualDescription: "Bayangkan kamu sedang menggeser bidak catur di atas papan. Benda tersebut berpindah posisi tanpa merubah bentuk atau ukurannya. Inilah konsep dasar Translasi atau Pergeseran.",
    ctaText: "BAIK, AYO BELAJAR",
    firstTab: "titik",
    icon: "transform",
    bgColor: "bg-module-translasi",
  },
  refleksi: {
    slug: "refleksi",
    label: "MODUL 2",
    title: "REFLEKSI",
    hook: "Coba amati pola batik motif pucuk rebung berikut. Kamu sadar ga kalau pola pada batik ini mirip, sebelah kiri dan sebelah kanannya? Coba bayangkan kamu melipat gambar kain ini di pola bagian tengahnya. Pasti motif sebelah kiri dan kanan akan saling menempel dengan sempurna, kan? Ukurannya sama persis, bentuknya tidak berubah, dan posisinya saling berhadapan satu sama lain.",
    explanation: "Para pembuat batik menggunakan \"trik cermin\" ini supaya kain terlihat seimbang dan cantik dari sudut mana pun. Nah, kira-kira bagaimana ya \"trik cermin\" ini bekerja kalau kita buat polanya di atas bidang koordinat? Yuk, kita cari tahu rahasianya bersama saya!",
    visualTitle: "Apa itu Refleksi?",
    visualDescription: "Bayangkan kamu berdiri di depan cermin. Bayanganmu di cermin memiliki bentuk dan ukuran yang sama persis, tetapi posisinya berlawanan. Inilah konsep dasar Refleksi atau Pencerminan.",
    ctaText: "BAIK, AYO BELAJAR",
    firstTab: "sumbu-x",
    icon: "flip",
    bgColor: "bg-module-refleksi",
  },
}
