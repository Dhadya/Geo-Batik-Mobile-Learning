import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { SessionSync } from "@/components/layout/SessionSync";
import { Toaster } from "@/components/retroui/Sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GEMATRI | Gemakan Mahir Transformasi Geometri",
  description:
    "Platform belajar geometri transformasi untuk siswa SMP melalui eksplorasi motif Batik Nusantara. Kuasai translasi dan refleksi dengan kuis interaktif, pembahasan AI, dan visualisasi GeoGebra.",
  keywords: [
    "GEMATRI",
    "transformasi geometri",
    "translasi",
    "refleksi",
    "Batik",
    "matematika SMP",
    "geometri koordinat",
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col"><Providers><SessionSync />{children}</Providers><Toaster /></body>
    </html>
  );
}
