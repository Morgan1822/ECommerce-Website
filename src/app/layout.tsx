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
  title: "Quick'n'Smart | Express Logistics & Direct Retail Store • Ambattur, Chennai",
  description: "Quick'n'Smart — Premier Domestic Logistics, Courier & Direct E-Commerce Store headquartered in Ambattur, Chennai (600053). Same-day delivery across Chennai and Pan-India express dispatch.",
  keywords: [
    "Quick n Smart Ambattur",
    "Quick and Smart Chennai",
    "Ambattur logistics",
    "Chennai courier service",
    "Direct retail store Chennai",
    "Kanjeevaram silk saree",
    "A2 Gir cow ghee",
    "ANC earbuds",
    "UPI payment",
  ],
  authors: [{ name: "Quick'n'Smart Ambattur Team" }],
  openGraph: {
    title: "Quick'n'Smart | Logistics & Direct Retail Store",
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
      <body className="min-h-screen flex flex-col bg-[#FAFAFD] text-gray-900 selection:bg-brand-purple/20 selection:text-brand-purple">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
