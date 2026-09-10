"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  CheckCircle2,
  X,
  Zap,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatINR } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
    freeShippingThreshold,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();

  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon?.isFreeShipping;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode("");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 text-center space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-50 text-brand-primary mx-auto flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Explore our handcrafted Indian silks, pure Gir cow ghee, and made-in-India ANC audio tech.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs sm:text-sm shadow-xs hover:opacity-95"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-slate-900">
          Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review your selected items and apply festive coupons.
        </p>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-indigo-50/70 p-3.5 sm:p-4 rounded-2xl border border-indigo-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5 sm:mb-2">
          {isFreeShipping ? (
            <span className="text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>FREE Express Delivery unlocked across India!</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-700 truncate">
              <Truck className="w-4 h-4 text-brand-primary shrink-0" />
              <span>Add <strong>₹{remainingForFreeShip}</strong> for <strong>FREE Delivery</strong></span>
            </span>
          )}
          <span className="text-slate-500 font-normal shrink-0">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 sm:h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-primary to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Cart Items List (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="py-4 sm:py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-18 h-18 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 hover:text-brand-primary line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  {item.selectedVariant && (
                    <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                      {item.selectedVariant}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
                      {formatINR(item.price)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatINR(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 self-end sm:self-center w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-0.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 sm:w-9 text-center text-xs font-bold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs sm:text-sm font-black text-slate-900 font-heading min-w-[70px] text-right">
                  {formatINR(item.price * item.quantity)}
                </span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Coupon Box (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
            <h3 className="text-sm sm:text-base font-black font-heading text-slate-900">
              Price Details
            </h3>

            {/* Coupon Box */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="relative flex gap-2">
                <div className="relative flex-1 min-w-0">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon (e.g. NAMASTE20)"
                    className="w-full pl-8 pr-2 py-2 text-xs font-bold uppercase rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p className={`text-[10px] sm:text-[11px] font-semibold ${couponMsg.isError ? "text-red-600" : "text-emerald-600"}`}>
                  {couponMsg.text}
                </p>
              )}
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                <span className="font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  Code {appliedCoupon.code} Applied
                </span>
                <button onClick={removeCoupon} className="text-red-500 font-bold p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 sm:pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>- {formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {shipping === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    formatINR(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2.5 border-t border-slate-200 font-heading">
                <span>Total Amount</span>
                <span className="text-brand-primary">{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-primary/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Proceed to Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 sm:p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure Indian Checkout</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Direct warehouse fulfillment from Ambattur Central Hub with 256-bit encrypted payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
