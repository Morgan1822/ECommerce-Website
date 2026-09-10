"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Clock,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  IndianRupee,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

const bannerSlides = [
  {
    id: 1,
    badge: "Maha Festive Utsav • Up to 50% OFF",
    title: "Pure Handloom Silks & Royal Heritage",
    subtitle: "GI Tagged Kanjeevaram sarees, Varanasi Banarasi dupattas & Chanderi sets directly from master weavers.",
    ctaText: "Shop Festive Handlooms",
    ctaLink: "/products?category=fashion",
    bgGradient: "from-rose-900/90 via-rose-800/80 to-amber-900/90",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
    accentTag: "Silk Mark Certified",
  },
  {
    id: 2,
    badge: "Vedic Purity • Authentic Bharat",
    title: "Pure A2 Gir Cow Ghee & Kashmiri Saffron",
    subtitle: "Cultured Danedaar Bilona Ghee and Grade-1 Mongra Saffron from Pampore valley with lab-tested purity.",
    ctaText: "Explore Pure Organics",
    ctaLink: "/products?category=gourmet",
    bgGradient: "from-amber-950/90 via-orange-900/80 to-amber-900/90",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=1600&q=80",
    accentTag: "100% Bilona Churned",
  },
  {
    id: 3,
    badge: "Made in India D2C Tech",
    title: "AuraPods Max ANC & AMOLED Smartwatches",
    subtitle: "Engineered for high-bass lovers with 42dB Active Noise Cancellation and 48-hour battery longevity.",
    ctaText: "Discover Audio & Tech",
    ctaLink: "/products?category=tech",
    bgGradient: "from-slate-950/90 via-indigo-950/80 to-purple-950/90",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80",
    accentTag: "1 Year Warranty",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const slide = bannerSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-brand-cream/30 py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Banner Slide (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] md:min-h-[440px] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-all duration-1000"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 p-6 md:p-12 text-white max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-yellow-300 text-xs font-black uppercase tracking-wider mb-4 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading leading-tight tracking-tight mb-3">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-white/90 mb-6 font-medium leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={slide.ctaLink}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-brand-pink/30 flex items-center gap-2 group transition-all"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="px-3.5 py-2.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-bold border border-white/15 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{slide.accentTag}</span>
                </div>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
                }
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label="Previous Banner"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label="Next Banner"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-6 md:left-12 z-20 flex items-center gap-1.5">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? "w-6 bg-brand-orange" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Deal of the Day Card (4 Cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-amber-500 via-orange-500 to-brand-pink p-1 rounded-3xl shadow-xl flex flex-col">
            <div className="bg-white rounded-[22px] p-5 flex-1 flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-brand-pink">
                  <Flame className="w-4 h-4 text-brand-orange" />
                  <span>Deal of the Day</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Clock className="w-3 h-3 text-brand-orange" />
                  <span>
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Product Spotlight */}
              <div className="my-4">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-gray-100 mb-3 border border-amber-100">
                  <Image
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                    alt="Pure Kanjeevaram Silk Saree"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-brand-pink text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                    34% OFF
                  </span>
                </div>

                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">
                  Handlooms & Ethnic
                </span>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mt-0.5">
                  Pure Kanjeevaram Silk Saree (Gold & Silver Zari)
                </h3>

                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-xl font-black text-gray-900 font-heading">
                    {formatINR(12499)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatINR(18999)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/products/kanjeevaram-silk-saree-gold-zari"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 shadow-md shadow-brand-pink/20 transition-opacity"
              >
                <span>Grab Festive Deal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Free Express Delivery</h4>
              <p className="text-[11px] text-gray-500">Across 19,000+ Indian Pincodes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-pink flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">100% Certified Authentic</h4>
              <p className="text-[11px] text-gray-500">GI Tagged & Lab Tested</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand-gold flex items-center justify-center shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Instant UPI & COD</h4>
              <p className="text-[11px] text-gray-500">Zero Fee GPay, PhonePe, Cash</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">7-Day Easy Returns</h4>
              <p className="text-[11px] text-gray-500">Hassle-Free Doorstep Pickup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

