import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import {
  Zap,
  ArrowRight,
  Flame,
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Truck,
  MapPin,
  Package,
} from "lucide-react";

export default function HomePage() {
  const bestsellers = products.filter((p) => p.isBestseller || p.isFeatured).slice(0, 4);
  const techProducts = products.filter((p) => p.category === "tech" || p.category === "gourmet").slice(0, 3);
  const fashionProducts = products.filter((p) => p.category === "fashion").slice(0, 3);

  return (
    <div className="space-y-8 sm:space-y-12 pb-12 sm:pb-16">
      {/* 1. Quick'n'Smart Hero Carousel */}
      <HeroCarousel />

      {/* 2. Quick N Smart Ambattur Logistics & Courier Strip */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-primary via-blue-950 to-slate-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-md border border-blue-800/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5" /> Ambattur Express Logistics Hub (QNS)
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black font-heading leading-tight">
                Ship Parcels & Direct Retail Goods from Chennai Hub
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed">
                Quick N Smart provides professional domestic door-to-door courier services, B2B freight, and direct retail order fulfillment from our Ram Nagar, Ambattur hub (600053).
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300">
                Track Consignment Status (AWB)
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter AWB (e.g. QNS-892314)"
                  defaultValue="QNS-892314"
                  className="flex-1 px-3 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold outline-none placeholder-slate-400 min-w-0"
                />
                <Link
                  href="/orders/ord-qns-01"
                  className="px-3.5 sm:px-4 py-2 bg-brand-secondary hover:bg-brand-secondaryHover text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-200">
                📍 <strong>Local Hub:</strong> Ambattur, Anna Nagar, Mogappair & Chennai Metro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-brand-primary uppercase tracking-wider mb-0.5 sm:mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Direct Retail Store</span>
            </div>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black font-heading text-slate-900 tracking-tight">
              Featured Product Verticals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-secondary flex items-center gap-1 transition-colors shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-brand-primary hover:shadow-md transition-all p-2.5 sm:p-3 flex flex-col items-center text-center"
            >
              <div className="relative w-full h-24 xs:h-28 sm:h-36 rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 bg-slate-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 text-[9px] sm:text-[10px] font-bold text-white bg-black/50 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                  {category.itemCount}+ Items
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Ambattur Stocked Bestsellers */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-brand-secondary uppercase tracking-wider mb-0.5 sm:mb-1">
              <Flame className="w-4 h-4 text-brand-secondary" />
              <span>Ready in Ambattur Stock</span>
            </div>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black font-heading text-slate-900 tracking-tight">
              Warehouse Bestsellers
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-secondary flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Coupon Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-brand-primary via-blue-900 to-brand-secondary text-white p-5 sm:p-8 md:p-10 shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-2 sm:space-y-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-white/20">
              <Zap className="w-3.5 h-3.5 fill-amber-300" /> Quick N Smart Festive Offer
            </span>
            <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black font-heading leading-tight">
              Get Flat 20% OFF on All Direct Retail Orders
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              Stock up on A2z Pain Relief Kits, pure Kanjeevaram silks, Vedic Gir cow ghee, and audio tech with coupon{" "}
              <strong className="underline text-amber-200">NAMASTE20</strong> at checkout.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href="/products"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-brand-primary font-bold text-xs sm:text-sm hover:bg-slate-50 shadow-md transition-colors"
              >
                Shop Store Catalog
              </Link>
              <span className="text-[11px] sm:text-xs font-semibold text-white/85">
                ⚡ Express Delivery across 19,000+ Indian Pincodes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Chennai & Tamil Nadu Customer Testimonials */}
      <section className="bg-slate-100/70 py-8 sm:py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-primary px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200">
              Customer & Merchant Reviews
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-slate-900 mt-2 sm:mt-3">
              Trusted Across Chennai & Tamil Nadu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified reviews for Quick&apos;n&apos;Smart retail delivery and logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-2.5 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;Ordered a Kanjeevaram silk saree from their Ambattur store in the morning, and it was delivered to Anna Nagar on the very same day. Exceptional quality!&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-primary text-white font-bold text-xs flex items-center justify-center">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">S. Krishnan</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Anna Nagar, Chennai</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-2.5 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;The A2 Gir cow ghee from their gourmet section is 100% authentic and granular. Packaging and courier handling by Quick&apos;n&apos;Smart was completely leakproof.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-secondary text-white font-bold text-xs flex items-center justify-center">
                  MR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">M. Ramanathan</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Ambattur, Chennai</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-2.5 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;AuraPods Max ANC noise cancellation is top notch. Delivery tracking was live and transparent right from the Ambattur warehouse hub.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  VN
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Vignesh N.</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Coimbatore, TN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
