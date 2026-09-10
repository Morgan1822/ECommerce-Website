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
  Zap,
  Menu,
  X,
  ShieldCheck,
  Flame,
  Truck,
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
      setIsMobileMenuOpen(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentCity = popularPincodes[currentPincode]?.city || "Ambattur, Chennai";
  const cartItemCount = isMounted ? getItemCount() : 0;
  const wishlistCount = isMounted ? getWishlistCount() : 0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 gap-2 sm:gap-4 md:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />}
            </button>

            {/* Quick'n'Smart Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-brand-primary via-indigo-600 to-brand-secondary flex items-center justify-center text-white shadow-md shadow-brand-primary/20 group-hover:scale-105 transition-transform shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-amber-300 text-amber-300" />
              </div>
              <div className="min-w-0">
                <span className="font-heading text-lg sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1 leading-none">
                  Quick<span className="text-brand-primary">&apos;n&apos;</span><span className="text-brand-secondary">Smart</span>
                </span>
                <span className="hidden xs:block text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase truncate mt-0.5">
                  Ambattur, Chennai • Express Store
                </span>
              </div>
            </Link>

            {/* Desktop Instant Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-xl relative hidden md:block">
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
                    placeholder="Search silk sarees, A2 ghee, ANC earbuds, gadgets..."
                    className="w-full pl-10 pr-24 py-2.5 bg-slate-100/70 hover:bg-slate-100 focus:bg-white rounded-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/15 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
                  />
                  <Search className="w-4 h-4 text-brand-primary absolute left-3.5 pointer-events-none" />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-3.5 py-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold rounded-full hover:opacity-95 transition-opacity shadow-xs"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Autosuggest Dropdown */}
              {isSearchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {searchResults.length > 0 ? (
                    <div>
                      <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Available in Ambattur Warehouse
                      </div>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors"
                        >
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-brand-primary font-semibold">
                              {product.categoryName}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-slate-900 font-heading">
                            {formatINR(product.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-center text-xs text-slate-500">
                      No products found matching &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Pincode Selector */}
              <button
                onClick={() => setIsPincodeModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-all hover:scale-105 shrink-0"
                title="Change Indian Delivery Pincode"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span className="truncate max-w-[130px]">
                  {currentCity} ({currentPincode})
                </span>
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-brand-primary transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 bg-brand-secondary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={toggleDrawer}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md shadow-brand-primary/20 transition-all hover:scale-105 shrink-0"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-white text-brand-primary text-xs font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              </button>

              {/* Admin Menu */}
              <Link
                href="/admin"
                className="hidden sm:flex p-2 sm:p-2.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-brand-primary transition-colors"
                title="Admin & Logistics Dispatch Center"
              >
                <ShieldCheck className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar (Full-width below header on mobile) */}
          <div className="md:hidden pb-2.5">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search silk sarees, A2 ghee, ANC tech..."
                  className="w-full pl-9 pr-20 py-2 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-brand-primary"
                />
                <Search className="w-3.5 h-3.5 text-brand-primary absolute left-3" />
                <button
                  type="submit"
                  className="absolute right-1 px-3 py-1 bg-brand-primary text-white text-[11px] font-bold rounded-full"
                >
                  Find
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Category Navigation Bar (Horizontal scrolling on mobile/tablet) */}
        <nav className="border-t border-slate-200/80 bg-slate-50/70 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 text-xs font-bold text-slate-700">
            <Link
              href="/products"
              className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors shadow-2xs flex items-center gap-1 text-xs"
            >
              <Flame className="w-3.5 h-3.5 text-brand-secondary" /> All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors shadow-2xs text-xs"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/orders"
              className="shrink-0 ml-auto hidden sm:flex px-3 py-1.5 rounded-full bg-indigo-50 text-brand-primary font-bold hover:bg-indigo-100 transition-colors items-center gap-1 text-xs"
            >
              <Truck className="w-3.5 h-3.5" /> Track Parcel
            </Link>
          </div>
        </nav>

        {/* Mobile Flyout Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Browse Verticals
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-700 p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-brand-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPincodeModalOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-brand-primary bg-indigo-50/70 p-2.5 rounded-xl text-left"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Hub: Ambattur, Chennai (600053) &bull; Change Location</span>
              </button>
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-primary p-2"
              >
                <Truck className="w-4 h-4" /> Track Live Shipment (AWB)
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-primary p-2"
              >
                <ShieldCheck className="w-4 h-4" /> Admin & Dispatch Control
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Pincode Modal */}
      <PincodeModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
      />
    </>
  );
}
