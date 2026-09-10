"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const { productIds, clearWishlist } = useWishlistStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wishlistedProducts = products.filter((p) => productIds.includes(p.id));

  if (!isMounted) return null;

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-50 text-brand-pink mx-auto flex items-center justify-center">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black font-heading text-gray-900">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Save your favorite Indian handlooms, gourmet ghee, and audio gadgets to buy them anytime.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs rounded-xl shadow-md"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900">
            My Saved Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Your personal shortlist of handcrafted Indian products.
          </p>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs font-bold text-red-600 hover:text-red-800"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

