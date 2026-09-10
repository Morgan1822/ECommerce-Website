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
  Sparkles,
  Tag,
  ShieldCheck,
  CheckCircle2,
  X,
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-amber-50 text-brand-orange mx-auto flex items-center justify-center">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black font-heading text-gray-900">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
          Explore our handcrafted Indian silks, pure Gir cow ghee, made-in-India ANC audio tech, and brass decor.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900">
          Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Review your selected items and apply festive coupons.
        </p>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
        <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-2">
          {isFreeShipping ? (
            <span className="text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <strong>Congratulations! You get FREE Express Delivery across India.</strong>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-gray-700">
              <Truck className="w-4 h-4 text-brand-orange" />
              Add <strong>₹{remainingForFreeShip}</strong> more to unlock <strong>FREE Delivery</strong>
            </span>
          )}
          <span className="text-gray-500 font-normal">{progressPercent}%</span>
        </div>
        <div className="w-full bg-amber-200/60 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-orange to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-amber-100 p-6 shadow-sm divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 hover:text-brand-pink line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  {item.selectedVariant && (
                    <span className="text-xs font-semibold text-gray-500 block mt-0.5">
                      {item.selectedVariant}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-extrabold text-gray-900 font-heading">
                      {formatINR(item.price)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatINR(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 self-end sm:self-center">
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50/60 p-0.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-bold text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-sm font-black text-gray-900 font-heading min-w-[75px] text-right">
                  {formatINR(item.price * item.quantity)}
                </span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Coupon Box (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm space-y-5">
            <h3 className="text-base font-black font-heading text-gray-900">
              Price Details
            </h3>

            {/* Coupon Box */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon (e.g. NAMASTE20)"
                    className="w-full pl-8 pr-3 py-2.5 text-xs font-bold uppercase rounded-xl border border-gray-300 focus:outline-none focus:border-brand-orange"
                  />
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p className={`text-[11px] font-semibold ${couponMsg.isError ? "text-red-600" : "text-emerald-600"}`}>
                  {couponMsg.text}
                </p>
              )}
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Code {appliedCoupon.code} Applied
                </span>
                <button onClick={removeCoupon} className="text-red-500 font-bold p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-gray-900">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings</span>
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
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-200 font-heading">
                <span>Total Amount</span>
                <span className="text-brand-pink">{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full py-3.5 bg-gradient-to-r from-brand-orange via-brand-pink to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-pink/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 text-xs text-gray-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure Indian Checkout</span>
            </div>
            <p className="text-[11px] text-gray-500">
              All transactions are 256-bit encrypted. We accept UPI (Google Pay, PhonePe), Cards, NetBanking, and Cash on Delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

