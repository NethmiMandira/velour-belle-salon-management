import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velour Belle | Luxury Beauty Studio & Sanctuary",
  description: "A refined beauty studio experience delivering bespoke salon services, facials, and wellness treatments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-brand-ivory text-brand-charcoal antialiased selection:bg-brand-blush selection:text-brand-burgundy font-sans">
        {children}
      </body>
    </html>
  );
}