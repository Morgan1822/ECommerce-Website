"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingBag, Zap, Check } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { formatINR, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [isMounted, setIsMounted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const discountPercent = calculateDiscount(product.originalPrice, product.price);
  const isWishlisted = isMounted ? isInWishlist(product.id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    router.push("/checkout");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case "gold":
        return "bg-amber-500 text-white";
      case "green":
        return "bg-emerald-600 text-white";
      case "trending":
        return "bg-gradient-to-r from-brand-primary to-brand-secondary text-white";
      case "purple":
        return "bg-indigo-600 text-white";
      case "sale":
        return "bg-rose-600 text-white";
      default:
        return "bg-brand-primary text-white";
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 hover:border-brand-primary/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Wrap */}
      <Link href={`/products/${product.slug}`} className="relative h-48 xs:h-52 sm:h-56 md:h-60 w-full overflow-hidden bg-slate-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs z-10 ${getBadgeStyle(
              product.badgeType
            )}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 shadow-xs ${
            isWishlisted
              ? "bg-brand-secondary text-white"
              : "bg-white/85 hover:bg-white text-slate-700 hover:text-brand-secondary"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Quick Discount Pill */}
        {discountPercent > 0 && (
          <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-brand-secondary text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-md shadow-2xs border border-brand-secondary/20">
            {discountPercent}% OFF
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] sm:text-[11px] font-bold text-brand-primary uppercase tracking-wider block mb-0.5 sm:mb-1">
            {product.categoryName}
          </span>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-brand-primary transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-xs">
            <div className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-slate-400 text-[10px] sm:text-[11px]">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100">
          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
            <span className="text-base sm:text-lg font-black text-slate-900 font-heading">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-2 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-50 hover:bg-indigo-100 text-brand-primary border border-indigo-200"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2 px-2 rounded-xl font-bold text-[11px] sm:text-xs bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white flex items-center justify-center gap-1 shadow-xs transition-opacity"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
