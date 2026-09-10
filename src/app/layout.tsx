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
  title: "Quick N Smart (QNS) | Logistics & Direct Retail Store • Ambattur, Chennai",
  description: "Quick N Smart (QNS) — Professional Domestic Logistics, Courier & Direct E-Commerce Store headquartered in Ambattur, Chennai (600053). Sourced directly from Ambattur Hub with same-day Chennai delivery.",
  keywords: [
    "Quick N Smart Ambattur",
    "QNS Logistics Chennai",
    "A2z pain relief kit",
    "Ambattur courier service",
    "Direct retail store Chennai",
    "Kanjeevaram silk saree",
    "A2 Gir cow ghee",
    "ANC earbuds",
    "UPI payment",
  ],
  authors: [{ name: "Quick N Smart Team" }],
  openGraph: {
    title: "Quick N Smart (QNS) | Logistics & Direct Retail Store",
    description: "Ambattur, Chennai • Express Courier, Domestic Logistics & Direct E-Commerce Store.",
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
      <body className="min-h-screen flex flex-col bg-[#FAFAFD] text-gray-900 selection:bg-brand-primary/20 selection:text-brand-primary">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
