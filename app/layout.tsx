import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FavoritesDrawer from "@/components/FavoritesDrawer";
import SearchOverlay from "@/components/SearchOverlay";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const passions = localFont({
  src: "./fonts/PassionsConflictRUS-Regular.otf",
  variable: "--font-passions",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAPER.FAIRIES — Бутик нежности",
  description:
    "Премиум аксессуары для волос, косметички и сумки. Элегантная коллекция в нежной розово‑белой палитре с возможностью персонализации.",
  keywords: [
    "крабики",
    "расчёски",
    "косметички",
    "гребешки с гравировкой",
    "сумки",
    "женские аксессуары",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${manrope.variable} ${passions.variable}`}>
      <body className="min-h-screen bg-petal-gradient font-sans text-ink-900 antialiased noise">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CartDrawer />
        <FavoritesDrawer />
        <SearchOverlay />
      </body>
    </html>
  );
}
