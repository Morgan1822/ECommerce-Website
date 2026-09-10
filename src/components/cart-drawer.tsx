"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Truck,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
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

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();

  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon?.isFreeShipping;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  const handleProceedCheckout = () => {
    setDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-amber-100 flex items-center justify-between bg-amber-50/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-pink/10 text-brand-pink flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-heading">
                Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-amber-50/60 border-b border-amber-100">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
              {isFreeShipping ? (
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <strong>You unlocked FREE Express Delivery!</strong>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-700">
                  <Truck className="w-3.5 h-3.5 text-brand-orange" />
                  Add <strong>₹{remainingForFreeShip}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
              <span className="text-gray-500 font-normal">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-orange to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-gray-800">Your cart is empty</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Discover handcrafted silk sarees, pure A2 ghee, audio gadgets, and ayurvedic elixirs.
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                        {item.name}
                      </h4>
                      {item.selectedVariant && (
                        <span className="text-[11px] font-semibold text-brand-orange block">
                          {item.selectedVariant}
                        </span>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-gray-900 font-heading">
                          {formatINR(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatINR(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/80">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary and Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-amber-100 bg-amber-50/20 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter Coupon (e.g. NAMASTE20)"
                      className="w-full pl-8 pr-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-gray-300 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                    />
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] font-semibold text-red-600">{couponError}</p>
                )}
              </form>

              {/* Applied Coupon Badge */}
              {appliedCoupon && (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon {appliedCoupon.code} Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 font-bold p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-200/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
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
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200 font-heading">
                  <span>Total Payable</span>
                  <span className="text-brand-pink">{formatINR(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-brand-orange via-brand-pink to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-pink/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

