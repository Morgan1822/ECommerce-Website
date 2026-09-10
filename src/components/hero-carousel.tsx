"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  Flame,
  Clock,
  ArrowRight,
  Truck,
  MapPin,
  PackageCheck,
  IndianRupee,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

const bannerSlides = [
  {
    id: 1,
    badge: "Ambattur Central Hub • QNS Logistics & Store",
    title: "Quick N Smart Direct Store & Express Delivery",
    subtitle: "From Chennai's Ambattur Hub straight to your doorstep — Ayurvedic wellness, authentic Kanjeevaram silks, audio tech & 24hr express courier.",
    ctaText: "Shop Store Catalog",
    ctaLink: "/products",
    bgGradient: "from-slate-950/95 via-blue-950/90 to-blue-900/90",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80",
    accentTag: "⚡ Same-Day Chennai Dispatch",
  },
  {
    id: 2,
    badge: "Ayurvedic Healthcare • QNS Official",
    title: "A2z Pain Relief Kit & Herbal Formulations",
    subtitle: "Complete herbal joint and muscle relief with Guggul, Shallaki, Triphala, and essential oils. Prepared to ancient classical standards.",
    ctaText: "Explore Pain Relief Kit",
    ctaLink: "/products/a2z-painrelief-kit",
    bgGradient: "from-slate-950/95 via-emerald-950/90 to-blue-950/90",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=80",
    accentTag: "100% Herbal & AYUSH Compliant",
  },
  {
    id: 3,
    badge: "Authentic Handlooms • Silk Mark Certified",
    title: "Pure Kanjeevaram & Banarasi Silks",
    subtitle: "Handcrafted directly from master weavers across Tamil Nadu and Varanasi with verified gold and silver zari purity.",
    ctaText: "Shop Handlooms",
    ctaLink: "/products?category=fashion",
    bgGradient: "from-slate-950/95 via-red-950/90 to-blue-950/90",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
    accentTag: "Direct Weaver Sourced",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 12, seconds: 40 });

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
    <section className="relative overflow-hidden bg-slate-50 py-3 sm:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Main Hero Banner Slide (8 Cols on Desktop) */}
          <div className="lg:col-span-8 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg min-h-[340px] xs:min-h-[380px] sm:min-h-[420px] md:min-h-[460px] flex items-center">
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
            <div className="relative z-10 p-5 sm:p-8 md:p-12 text-white max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-3 sm:mb-4 border border-white/20">
                <Zap className="w-3.5 h-3.5 fill-amber-300" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black font-heading leading-tight tracking-tight mb-2 sm:mb-3">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 mb-4 sm:mb-6 font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  href={slide.ctaLink}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md shadow-brand-primary/30 flex items-center gap-2 transition-all"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="px-3 py-2 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[11px] sm:text-xs font-bold border border-white/15 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-300" />
                  <span>{slide.accentTag}</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
                }
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label="Previous Banner"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label="Next Banner"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-3.5 left-5 sm:bottom-4 sm:left-8 z-20 flex items-center gap-1.5">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    idx === currentSlide ? "w-5 sm:w-6 bg-brand-secondary" : "w-1.5 sm:w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Deal of the Day Card (4 Cols on Desktop) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-brand-primary via-blue-800 to-brand-secondary p-1 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col">
            <div className="bg-white rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 flex-1 flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-brand-primary">
                  <Flame className="w-4 h-4 text-brand-secondary" />
                  <span>QNS Featured Deal</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  <Clock className="w-3 h-3 text-brand-primary" />
                  <span>
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Product Spotlight */}
              <div className="my-3 sm:my-4">
                <div className="relative h-36 xs:h-40 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-2.5 border border-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
                    alt="A2z Pain Relief Kit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-brand-secondary text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                    40% OFF
                  </span>
                </div>

                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block">
                  Herbal Wellness • Ready in Ambattur Hub
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
                  A2z Pain Relief Kit (Ayurvedic Herbal Oil, Capsules & Balm)
                </h3>

                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                    {formatINR(899)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatINR(1499)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/products/a2z-painrelief-kit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 shadow-md shadow-brand-primary/20 transition-opacity"
              >
                <span>Express Order (Ambattur Stock)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick'n'Smart Logistics Highlights (2-cols on mobile, 4-cols on desktop) */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">Ambattur Hub</h4>
              <p className="text-[10px] text-slate-500 truncate">AP Arasu St, Chennai</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-50 text-brand-secondary flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">⚡ Same-Day Delivery</h4>
              <p className="text-[10px] text-slate-500 truncate">Across Chennai Metro</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">Direct Retail & COD</h4>
              <p className="text-[10px] text-slate-500 truncate">UPI, Cash & Cards</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">Pan-India Express</h4>
              <p className="text-[10px] text-slate-500 truncate">19,000+ Pincodes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
