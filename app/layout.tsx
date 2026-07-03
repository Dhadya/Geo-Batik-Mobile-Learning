import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gematri",
  description: "Belajar Geometri Transformasi melalui Batik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/login"}
          signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/register"}
          appearance={{
            cssLayerName: "clerk",
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
