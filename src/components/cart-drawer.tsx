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
  ArrowRight,
  Truck,
  CheckCircle2,
  Tag,
  Zap,
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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 sm:px-6 py-3 bg-slate-50/70 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              {isFreeShipping ? (
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>FREE Express Delivery unlocked!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-700 truncate">
                  <Truck className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                  <span>Add <strong>₹{remainingForFreeShip}</strong> for <strong>FREE Delivery</strong></span>
                </span>
              )}
              <span className="text-slate-500 font-normal shrink-0">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-primary to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-indigo-50 text-brand-primary flex items-center justify-center mb-3">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Discover handcrafted silk sarees, pure A2 ghee, and audio gadgets.
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs rounded-xl shadow-xs hover:opacity-90 transition-opacity"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-3.5 sm:py-4 flex gap-3 sm:gap-4 first:pt-0 last:pb-0">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
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
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                        {item.name}
                      </h4>
                      {item.selectedVariant && (
                        <span className="text-[10px] sm:text-[11px] font-semibold text-brand-primary block">
                          {item.selectedVariant}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                          {formatINR(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                            {formatINR(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
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
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/50 space-y-3.5">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon (e.g. NAMASTE20)"
                      className="w-full pl-8 pr-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] font-semibold text-red-600">{couponError}</p>
                )}
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1 font-bold">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Coupon {appliedCoupon.code} Applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-red-500 font-bold p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1.5 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
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
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200 font-heading">
                  <span>Total Amount</span>
                  <span className="text-brand-primary">{formatINR(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-secondary text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-primary/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
