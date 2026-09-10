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
  Building2,
} from "lucide-react";

export default function HomePage() {
  const bestsellers = products.filter((p) => p.isBestseller || p.isFeatured).slice(0, 4);
  const techProducts = products.filter((p) => p.category === "tech" || p.category === "gourmet").slice(0, 3);
  const fashionProducts = products.filter((p) => p.category === "fashion").slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Quick'n'Smart Hero Carousel */}
      <HeroCarousel />

      {/* 2. Quick'n'Smart Ambattur Logistics & Courier Calculator Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-brand-purple rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-800/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-yellow-300 text-xs font-black uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5" /> Ambattur Express Logistics Hub
              </div>
              <h3 className="text-xl sm:text-3xl font-black font-heading leading-tight">
                Need to Ship a Parcel or Retail Goods from Chennai?
              </h3>
              <p className="text-xs sm:text-sm text-purple-200 max-w-lg">
                Quick&apos;n&apos;Smart provides domestic door-to-door courier services, B2B wholesale freight, and direct retail order fulfillment from our Ram Nagar, Ambattur hub.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                Track Quick&apos;n&apos;Smart Consignment
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter AWB / Order No (e.g. QNS-892314)"
                  defaultValue="QNS-892314"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white text-gray-900 text-xs font-bold outline-none placeholder-gray-400"
                />
                <Link
                  href="/orders/ord-qns-01"
                  className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-[11px] text-purple-200">
                📍 <strong>Local Pickup:</strong> Ambattur, Anna Nagar, Mogappair & Chennai Central.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-purple uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>Direct Retail Store</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-heading text-gray-900 tracking-tight">
              Featured Product Verticals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-orange flex items-center gap-1 transition-colors"
          >
            <span>View All Store Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-purple-50/40 border border-purple-100/80 hover:border-brand-purple hover:shadow-xl hover:shadow-brand-purple/10 transition-all p-3 flex flex-col items-center text-center"
            >
              <div className="relative w-full h-28 sm:h-36 rounded-xl overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                  {category.itemCount}+ Items
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-purple transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Ambattur Stocked Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-brand-orange" />
              <span>Ready for Immediate Dispatch</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-heading text-gray-900 tracking-tight">
              Ambattur Warehouse Bestsellers
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-orange flex items-center gap-1 transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Coupon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-brand-orange text-white p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-yellow-300 text-xs font-black uppercase tracking-wider border border-white/20">
              <Zap className="w-3.5 h-3.5 fill-yellow-300" /> Quick&apos;n&apos;Smart Festive Offer
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
              Get Flat 20% OFF on All Direct Retail Orders
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Stock up on premium Kanjeevaram silks, pure Vedic Gir cow ghee, and high-performance ANC earbuds with coupon{" "}
              <strong className="underline text-yellow-200">NAMASTE20</strong> at checkout.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="px-6 py-3 rounded-full bg-white text-brand-purple font-bold text-xs sm:text-sm hover:bg-yellow-50 shadow-lg transition-colors"
              >
                Shop Store Catalog
              </Link>
              <span className="text-xs font-semibold text-white/80">
                ⚡ Express Delivery across all 19,000+ Indian Pincodes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Chennai & Tamil Nadu Customer Testimonials */}
      <section className="bg-purple-50/40 py-12 border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-brand-purple px-3 py-1 rounded-full bg-purple-100 border border-purple-200">
              Customer & Merchant Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 mt-3">
              Trusted Across Chennai & Tamil Nadu
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Verified reviews for Quick&apos;n&apos;Smart retail delivery and logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;Ordered a Kanjeevaram silk saree in the morning from their Ambattur store, and it was delivered to Anna Nagar on the very same day. Exceptional quality!&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-brand-purple text-white font-bold text-xs flex items-center justify-center">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">S. Krishnan</h4>
                  <p className="text-[11px] text-gray-400">Anna Nagar, Chennai</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;The A2 Gir cow ghee from their gourmet section is 100% authentic and granular. Packaging and courier handling by Quick&apos;n&apos;Smart was completely leakproof.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center">
                  MR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">M. Ramanathan</h4>
                  <p className="text-[11px] text-gray-400">Ambattur, Chennai</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;AuraPods Max ANC noise cancellation is top notch. Delivery tracking was live and transparent right from the Ambattur warehouse hub.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  VN
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Vignesh N.</h4>
                  <p className="text-[11px] text-gray-400">Coimbatore, TN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
