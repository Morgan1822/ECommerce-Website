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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-semibold text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-orange">
          Home
        </Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-brand-orange">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery & Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-amber-50/40 border border-amber-100 shadow-sm">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {product.badge && (
              <span className="absolute top-4 left-4 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500 text-white shadow-md">
                {product.badge}
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all ${
                isWishlisted
                  ? "bg-brand-pink text-white"
                  : "bg-white/80 hover:bg-white text-gray-700 hover:text-brand-pink"
              }`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-brand-pink shadow-md scale-105"
                      : "border-gray-200 hover:border-brand-orange opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200">
                {product.categoryName}
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Product link copied to clipboard!");
                  }
                }}
                className="text-xs font-bold text-gray-500 hover:text-brand-pink flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-amber-500 text-white font-bold text-xs px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs font-semibold text-gray-500">
                ({product.reviewsCount} verified customer ratings)
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-bold text-emerald-600">
                In Stock ({product.stock} units left)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-baseline gap-3">
            <span className="text-3xl font-black text-gray-900 font-heading">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-base text-gray-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="text-xs font-extrabold text-brand-pink bg-pink-100 px-2 py-0.5 rounded-md">
                  {discountPercent}% OFF (Save {formatINR(product.originalPrice - product.price)})
                </span>
              </>
            )}
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Select Option / Variant
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedVariant === v.name
                        ? "bg-brand-orange text-white border-brand-orange shadow-md shadow-orange-500/20"
                        : "bg-white text-gray-700 border-gray-300 hover:border-brand-orange"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-100 hover:bg-amber-200 text-brand-orange border border-amber-300"
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
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-brand-orange via-brand-pink to-rose-600 hover:opacity-95 text-white flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/25 transition-opacity"
            >
              <Zap className="w-4 h-4 fill-white" /> Buy Now with Instant UPI / COD
            </button>
          </div>

          {/* Pincode Estimator Widget */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-orange" /> Delivery Estimation:
              </span>
              <span className="text-[11px] font-bold text-emerald-600">
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
                className="flex-1 px-3 py-1.5 bg-white rounded-xl border border-gray-300 text-xs font-semibold focus:outline-none focus:border-brand-orange"
              />
              <button
                onClick={handlePincodeCheck}
                className="px-4 py-1.5 bg-gray-900 text-white font-bold text-xs rounded-xl hover:bg-gray-800 transition-colors"
              >
                Check
              </button>
            </div>
            <p className="text-[11px] text-gray-500">
              Delivering to <strong>{deliveryEstimate.city}, {deliveryEstimate.state}</strong> (COD & UPI available).
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Key Highlights
            </h4>
            <ul className="space-y-1.5">
              {product.features.map((feat, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications & Description Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold font-heading text-gray-900">
          Product Details & Heritage Specifications
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-4xl">
          {product.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          {Object.entries(product.details).map(([k, v]) => (
            <div key={k} className="p-3 bg-amber-50/40 rounded-xl border border-amber-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                {k}
              </span>
              <span className="text-xs font-bold text-gray-800 mt-0.5 block">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black font-heading text-gray-900">
              You May Also Like
            </h3>
            <Link
              href={`/products?category=${product.category}`}
              className="text-xs font-bold text-brand-orange hover:text-brand-pink"
            >
              View More in {product.categoryName} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

