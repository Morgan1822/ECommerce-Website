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

  // Badge color mappings
  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case "gold":
        return "bg-amber-500 text-white";
      case "green":
        return "bg-emerald-600 text-white";
      case "trending":
        return "bg-gradient-to-r from-brand-orange to-brand-pink text-white";
      case "purple":
        return "bg-purple-600 text-white";
      case "sale":
        return "bg-rose-600 text-white";
      default:
        return "bg-amber-600 text-white";
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-amber-100/90 hover:border-brand-pink/40 shadow-xs hover:shadow-xl hover:shadow-brand-pink/10 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Wrap */}
      <Link href={`/products/${product.slug}`} className="relative h-60 w-full overflow-hidden bg-amber-50/40">
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
            className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md z-10 ${getBadgeStyle(
              product.badgeType
            )}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 shadow-sm ${
            isWishlisted
              ? "bg-brand-pink text-white"
              : "bg-white/80 hover:bg-white text-gray-700 hover:text-brand-pink"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Quick Discount Pill */}
        {discountPercent > 0 && (
          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-brand-pink text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-xs border border-brand-pink/20">
            {discountPercent}% OFF
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
            {product.categoryName}
          </span>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-brand-pink transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center gap-0.5 text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3 h-3 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-gray-400 text-[11px]">
              ({product.reviewsCount} reviews)
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-gray-900 font-heading">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-50 hover:bg-amber-100 text-brand-orange border border-amber-200"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2 px-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-orange to-brand-pink hover:opacity-90 text-white flex items-center justify-center gap-1 shadow-xs transition-opacity"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

