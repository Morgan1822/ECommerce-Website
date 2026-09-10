"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  MapPin,
  Sparkles,
  Menu,
  X,
  User,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useUserStore } from "@/lib/store/user-store";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { popularPincodes } from "@/lib/data/pincodes";
import { PincodeModal } from "./pincode-modal";
import { formatINR } from "@/lib/utils";

export function Navbar() {
  const router = useRouter();
  const { toggleDrawer, getItemCount } = useCartStore();
  const { getCount: getWishlistCount } = useWishlistStore();
  const { currentPincode } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim().length >= 2
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentCity = popularPincodes[currentPincode]?.city || "India";
  const cartItemCount = isMounted ? getItemCount() : 0;
  const wishlistCount = isMounted ? getWishlistCount() : 0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-3 md:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-amber-50"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-brand-pink via-brand-orange to-brand-gold flex items-center justify-center text-white shadow-md shadow-brand-pink/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <span className="font-heading text-xl md:text-2xl font-black tracking-tight text-gray-900 flex items-center gap-1">
                  Utsav<span className="text-brand-pink">Kart</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-brand-orange border border-amber-200">
                    Retail
                  </span>
                </span>
                <span className="hidden sm:block text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  India&apos;s Heritage & D2C Market
                </span>
              </div>
            </Link>

            {/* Instant Search Bar with Autosuggest */}
            <div ref={searchRef} className="flex-1 max-w-xl relative hidden sm:block">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Search silk sarees, A2 ghee, ANC earbuds, shilajit, brass diyas..."
                    className="w-full pl-11 pr-24 py-2.5 bg-amber-50/50 hover:bg-amber-50 focus:bg-white rounded-full border border-amber-200/80 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/15 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                  />
                  <Search className="w-4 h-4 text-brand-orange absolute left-4 pointer-events-none" />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-4 py-1.5 bg-gradient-to-r from-brand-orange to-brand-pink text-white text-xs font-bold rounded-full hover:opacity-95 transition-opacity shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Autosuggest Dropdown */}
              {isSearchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-amber-100 py-3 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {searchResults.length > 0 ? (
                    <div>
                      <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Matching Products
                      </div>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50/60 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-brand-orange font-bold">
                              {product.categoryName}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-gray-900 font-heading">
                            {formatINR(product.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">
                      No products found matching &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Pincode Selector */}
              <button
                onClick={() => setIsPincodeModalOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50/40 hover:bg-amber-100/60 text-xs font-semibold text-gray-800 transition-all hover:scale-105"
                title="Change Indian Delivery Pincode"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                <span className="truncate max-w-[120px]">
                  {currentCity} ({currentPincode})
                </span>
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full hover:bg-amber-50 text-gray-700 hover:text-brand-pink transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-pink text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={toggleDrawer}
                className="relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs md:text-sm hover:opacity-95 shadow-md shadow-brand-orange/25 transition-all hover:scale-105"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-white text-brand-pink text-xs font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              </button>

              {/* Account / Admin Menu Link */}
              <Link
                href="/admin"
                className="hidden sm:flex p-2.5 rounded-full hover:bg-amber-50 text-gray-700 hover:text-brand-orange transition-colors"
                title="Admin Dashboard"
              >
                <ShieldCheck className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar (Visible on mobile screens) */}
          <div className="sm:hidden pb-3">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search silk sarees, ghee, audio, ayurveda..."
                  className="w-full pl-10 pr-4 py-2 bg-amber-50/60 rounded-full border border-amber-200 text-xs text-gray-800 placeholder-gray-400 outline-none"
                />
                <Search className="w-4 h-4 text-brand-orange absolute left-3.5" />
              </div>
            </form>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="border-t border-amber-100/80 bg-brand-cream/60 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-2 text-xs font-bold text-gray-700">
            <Link
              href="/products"
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-white border border-amber-200 hover:border-brand-pink hover:text-brand-pink transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-brand-pink" /> All Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-white border border-amber-100 hover:border-brand-orange hover:bg-orange-50/50 hover:text-brand-orange transition-colors shadow-2xs"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-amber-100 bg-white px-4 py-4 space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Browse Categories
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-semibold text-gray-700 py-1.5 hover:text-brand-pink"
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPincodeModalOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-brand-orange"
              >
                <MapPin className="w-4 h-4" /> Change Pincode: {currentPincode} ({currentCity})
              </button>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-brand-orange"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Portal & Orders
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Indian Pincode Modal */}
      <PincodeModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
      />
    </>
  );
}

