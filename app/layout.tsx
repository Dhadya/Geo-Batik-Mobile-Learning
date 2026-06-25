import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

/* Space Grotesk — single font for the entire app (300-900 via variable font) */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GEMATRI - Gemakan Mahir Transformasi Geometri",
  description: "Belajar Transformasi Geometri melalui Batik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
