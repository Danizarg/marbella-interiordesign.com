import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3D Architectural Renders Marbella | Marbella Interior Design",
  description:
    "Photorealistic 3D interior and architectural visualization for exceptional residences in Marbella and the Costa del Sol.",
  metadataBase: new URL("https://marbella-interiordesign.com"),
  openGraph: {
    title: "3D Architectural Renders — Marbella Interior Design",
    description:
      "See every material, proportion and lighting decision before construction begins.",
    type: "website",
    locale: "en_GB",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
