"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MapPin,
  Tag,
  Share2,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useUserStore } from "@/lib/store/user-store";
import { lookupPincode } from "@/lib/data/pincodes";
import { formatINR, calculateDiscount } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { currentPincode } = useUserStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [pincodeInput, setPincodeInput] = useState(currentPincode);
  const [deliveryEstimate, setDeliveryEstimate] = useState(lookupPincode(currentPincode));

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.originalPrice, product.price);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant);
    router.push("/checkout");
  };

  const handlePincodeCheck = () => {
    if (/^\d{6}$/.test(pincodeInput.trim())) {
      setDeliveryEstimate(lookupPincode(pincodeInput.trim()));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8 sm:space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 truncate">
        <Link href="/" className="hover:text-brand-primary shrink-0">
          Home
        </Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-brand-primary shrink-0">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-slate-900 truncate">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery & Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Gallery (6 Cols) */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          <div className="relative h-[300px] xs:h-[360px] sm:h-[440px] md:h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {product.badge && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-brand-primary text-white shadow-xs">
                {product.badge}
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-xs transition-all ${
                isWishlisted
                  ? "bg-brand-secondary text-white"
                  : "bg-white/85 hover:bg-white text-slate-700 hover:text-brand-secondary"
              }`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-brand-primary shadow-xs scale-105"
                      : "border-slate-200 hover:border-brand-primary opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details (6 Cols) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-brand-primary uppercase tracking-wider px-2.5 py-0.5 sm:py-1 rounded-md bg-indigo-50 border border-indigo-100">
                {product.categoryName}
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Product link copied to clipboard!");
                  }
                }}
                className="text-xs font-bold text-slate-500 hover:text-brand-primary flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>

            <h1 className="text-xl xs:text-2xl sm:text-3xl font-black font-heading text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2 sm:mt-3 flex-wrap">
              <div className="flex items-center gap-1 bg-amber-500 text-white font-bold text-xs px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                ({product.reviewsCount} customer ratings)
              </span>
              <span className="text-slate-300 hidden xs:inline">•</span>
              <span className="text-xs font-bold text-emerald-600">
                In Ambattur Stock ({product.stock} units left)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="text-[11px] sm:text-xs font-extrabold text-brand-secondary bg-orange-100 px-2 py-0.5 rounded-md">
                  {discountPercent}% OFF (Save {formatINR(product.originalPrice - product.price)})
                </span>
              </>
            )}
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-1.5 sm:space-y-2">
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">
                Select Option / Variant
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.name)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedVariant === v.name
                        ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                        : "bg-white text-slate-700 border-slate-300 hover:border-brand-primary"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl bg-white p-0.5 sm:p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-50 hover:bg-indigo-100 text-brand-primary border border-indigo-200"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-95 text-white flex items-center justify-center gap-2 shadow-md shadow-brand-primary/20 transition-opacity"
            >
              <Zap className="w-4 h-4 fill-white" /> Buy Now with Instant UPI / COD
            </button>
          </div>

          {/* Pincode Estimator Widget */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-primary" /> Delivery Estimation:
              </span>
              <span className="font-bold text-emerald-600 text-[11px] sm:text-xs">
                {deliveryEstimate.estimatedDays}
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-3 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-primary min-w-0"
              />
              <button
                onClick={handlePincodeCheck}
                className="px-3.5 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors shrink-0"
              >
                Check
              </button>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Direct dispatch from <strong>Ambattur Central Warehouse (600053)</strong> to <strong>{deliveryEstimate.city}</strong>.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-1.5 sm:space-y-2">
            <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Highlights
            </h4>
            <ul className="space-y-1 sm:space-y-1.5">
              {product.features.map((feat, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications & Description Table */}
      <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
        <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
          Product Details & Heritage Specifications
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
          {product.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-100">
          {Object.entries(product.details).map(([k, v]) => (
            <div key={k} className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {k}
              </span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black font-heading text-slate-900">
              You May Also Like
            </h3>
            <Link
              href={`/products?category=${product.category}`}
              className="text-xs font-bold text-brand-primary hover:text-brand-secondary"
            >
              View More &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
