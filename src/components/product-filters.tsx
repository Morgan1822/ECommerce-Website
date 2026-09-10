"use client";

import React from "react";
import { categories } from "@/lib/data/categories";
import { Star, RotateCcw, Filter } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
}

export function ProductFilters({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-sm text-gray-900 font-heading">
          <Filter className="w-4 h-4 text-brand-orange" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-brand-pink hover:text-brand-orange flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
          Category
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory("all")}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
              selectedCategory === "all"
                ? "bg-brand-pink text-white"
                : "text-gray-700 hover:bg-amber-50"
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? "bg-brand-orange text-white"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Max Price
          </h4>
          <span className="text-xs font-extrabold text-brand-pink font-heading">
            {formatINR(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={15000}
          step={500}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-brand-orange cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>₹500</span>
          <span>₹15,000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4.8, 4.5, 4.0].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(minRating === rating ? 0 : rating)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                minRating === rating
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "text-gray-700 hover:bg-gray-50 border border-transparent"
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{rating}★ & above</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

