import type { Metadata } from "next";
import { Archivo_Black, Great_Vibes, Hanken_Grotesk, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const logo = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jennet.K — Painter",
  description: "Oil paintings, portraits and studio works by Jennet.K.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable} ${script.variable} ${logo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
