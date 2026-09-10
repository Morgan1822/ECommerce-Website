"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { LayoutGrid, List, SlidersHorizontal, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  React.useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("q");
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    result = result.filter((p) => p.price <= priceRange[1]);

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange([0, 15000]);
    setMinRating(0);
    setSortBy("featured");
  };

  const currentCatObj = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/10 via-brand-primary/10 to-brand-secondary/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-indigo-200/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-primary flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Quick&apos;n&apos;Smart Ambattur Catalog
            </span>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black font-heading text-slate-900">
              {currentCatObj ? currentCatObj.name : "All Store Products"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {currentCatObj
                ? currentCatObj.description
                : "Explore pure silk handlooms, Vedic A2 ghee, Kashmiri saffron, electronics, and brass decor."}
            </p>
          </div>

          <div className="text-xs font-bold text-slate-500 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <ProductFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Mobile Filter Button Bar */}
        <div className="lg:hidden flex items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-800 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
            <span>Filter Options</span>
          </button>
          <span className="text-xs font-bold text-slate-500">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Mobile Filters Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 xs:p-4 lg:hidden">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-5 sm:p-6 shadow-2xl">
              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setIsMobileFiltersOpen(false);
                }}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                minRating={minRating}
                onRatingChange={setMinRating}
                onReset={handleResetFilters}
              />
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full mt-4 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Apply & View Products ({filteredProducts.length})
              </button>
            </div>
          </div>
        )}

        {/* Products Listing Area (9 cols) */}
        <div className="lg:col-span-9 space-y-4 sm:space-y-6">
          {/* Top Control Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs">
            {/* Active Filters Pill Bar */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
              <span className="text-slate-400 font-semibold text-[11px] sm:text-xs">Active:</span>
              <span className="px-2.5 py-0.5 sm:py-1 bg-indigo-50 text-brand-primary font-bold rounded-lg border border-indigo-100 text-[11px] sm:text-xs">
                {selectedCategory === "all" ? "All Categories" : selectedCategory}
              </span>
              {searchQuery && (
                <span className="px-2.5 py-0.5 sm:py-1 bg-orange-50 text-brand-secondary font-bold rounded-lg border border-orange-200 text-[11px] sm:text-xs">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {/* Sort Dropdown + View Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <label htmlFor="sort-select" className="text-[11px] sm:text-xs font-semibold text-slate-500">
                  Sort:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-[11px] sm:text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-brand-primary"
                >
                  <option value="featured">✨ Featured</option>
                  <option value="price-asc">💵 Price: Low to High</option>
                  <option value="price-desc">💎 Price: High to Low</option>
                  <option value="rating">⭐ Rating</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-brand-primary shadow-2xs font-bold"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-brand-primary shadow-2xs font-bold"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-indigo-50 text-brand-primary mx-auto flex items-center justify-center">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range, clearing your search query, or selecting another category.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-slate-500">Loading catalog...</div>}>
      <ProductListingContent />
    </Suspense>
  );
}
