import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from "lucide-react";

export default function HomePage() {
  const bestsellers = products.filter((p) => p.isBestseller || p.isFeatured).slice(0, 4);
  const gourmetProducts = products.filter((p) => p.category === "gourmet").slice(0, 3);
  const fashionProducts = products.filter((p) => p.category === "fashion").slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Festive Hero Carousel */}
      <HeroCarousel />

      {/* 2. Featured Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Categories</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-heading text-gray-900 tracking-tight">
              Curated Indian Verticals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-brand-pink hover:text-brand-orange flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-amber-50/60 border border-amber-100/80 hover:border-brand-orange hover:shadow-xl hover:shadow-brand-orange/10 transition-all p-3 flex flex-col items-center text-center"
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
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Festive Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-pink uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-brand-orange" />
              <span>Trending Across India</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-heading text-gray-900 tracking-tight">
              Festive Bestsellers
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-pink flex items-center gap-1 transition-colors"
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

      {/* 4. Promotional Deal Banner Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-900 via-brand-pink to-brand-orange text-white p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-yellow-300 text-xs font-black uppercase tracking-wider border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Festive Super Saver
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
              Get Flat ₹500 OFF on Orders Above ₹2,499
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Stock up on pure Gir cow ghee, Kashmiri saffron, and wedding silk sarees with coupon{" "}
              <strong className="underline text-yellow-200">DIWALI50</strong> at checkout.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="px-6 py-3 rounded-full bg-white text-brand-pink font-bold text-xs sm:text-sm hover:bg-yellow-50 shadow-lg transition-colors"
              >
                Shop Festive Collection
              </Link>
              <span className="text-xs font-semibold text-white/80">
                ⚡ Valid across all 19,000+ Indian Pincodes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pure Vedic Gourmet Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Lab Certified Purity</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-heading text-gray-900 tracking-tight">
              Vedic Organics & Kashmiri Harvest
            </h2>
          </div>
          <Link
            href="/products?category=gourmet"
            className="text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-pink flex items-center gap-1 transition-colors"
          >
            <span>View Gourmet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gourmetProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Indian Customer Reviews Section */}
      <section className="bg-amber-50/50 py-12 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange px-3 py-1 rounded-full bg-amber-100 border border-amber-200">
              Patron Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 mt-3">
              Loved by 25,000+ Indian Families
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Real reviews from verified buyers across Bengaluru, Chennai, Mumbai and Delhi NCR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;The Kanjeevaram saree was 100% pure silk with original Silk Mark certification. The gold zari work looked breathtaking at my sister&apos;s wedding!&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-brand-pink text-white font-bold text-xs flex items-center justify-center">
                  PS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Priya Sundaram</h4>
                  <p className="text-[11px] text-gray-400">Verified Buyer • Chennai</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;The A2 Gir cow ghee has that genuine granular Bilona texture and aromatic richness that reminded me of my grandmother&apos;s home in Gujarat.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center">
                  RP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Rajesh Patel</h4>
                  <p className="text-[11px] text-gray-400">Verified Buyer • Ahmedabad</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;AuraPods Max ANC noise cancellation is truly unmatched at this price point. Sound quality is rich and battery lasts through 3 work days easily.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Ananya Kapoor</h4>
                  <p className="text-[11px] text-gray-400">Verified Buyer • Bengaluru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

