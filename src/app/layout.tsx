import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utsav Kart | India's Festive & D2C Heritage Marketplace",
  description: "Shop certified Kanjeevaram silk handlooms, pure A2 Gir cow ghee, Kashmiri saffron, and made-in-India audio tech. Lightning delivery across 19,000+ Indian pincodes.",
  keywords: [
    "Indian ecommerce",
    "Kanjeevaram silk saree",
    "A2 Gir cow ghee",
    "Kashmiri saffron",
    "ANC earbuds",
    "UPI payment",
    "handloom",
    "festive sale",
  ],
  authors: [{ name: "Utsav Kart Team" }],
  openGraph: {
    title: "Utsav Kart | Indian Festive & D2C Marketplace",
    description: "Discover authentic Indian handlooms, Vedic organics, and high-performance audio gadgets.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FFFDF9] text-gray-900 selection:bg-brand-pink/20 selection:text-brand-pink">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}

