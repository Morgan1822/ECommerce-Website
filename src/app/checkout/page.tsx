"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  IndianRupee,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/lib/store/cart-store";
import { useUserStore } from "@/lib/store/user-store";
import { lookupPincode } from "@/lib/data/pincodes";
import { Order, PaymentMethod, ShippingAddress } from "@/types";
import { formatINR, generateOrderNumber } from "@/lib/utils";

const indianStates = [
  "Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana", "Maharashtra",
  "Delhi NCR", "Gujarat", "Haryana", "Punjab", "Rajasthan", "Uttar Pradesh", "West Bengal"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscount, getShippingFee, getTotal, clearCart, appliedCoupon } = useCartStore();
  const { user, addOrder, currentPincode } = useUserStore();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name || "Karthi Maama",
    phone: user?.phone || "9840123456",
    streetAddress: "No 1, AP Arasu Street, Ram Nagar",
    landmark: "Near Lenin Nagar",
    city: "Ambattur, Chennai",
    state: "Tamil Nadu",
    pincode: currentPincode || "600053",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [upiId, setUpiId] = useState("karthi@oksbi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items, router]);

  const handlePincodeChange = (pin: string) => {
    const clean = pin.replace(/\D/g, "");
    const info = lookupPincode(clean);
    setAddress((prev) => ({
      ...prev,
      pincode: clean,
      city: info.city.includes("Pincode") ? prev.city : info.city,
      state: info.state === "Pan-India" ? prev.state : info.state,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!address.fullName || !address.phone || !address.streetAddress || !address.city || !address.pincode) {
      setFormError("Please fill in all mandatory shipping address fields.");
      return;
    }

    if (!/^\d{10}$/.test(address.phone.trim())) {
      setFormError("Please enter a valid 10-digit Indian mobile phone number.");
      return;
    }

    if (!/^\d{6}$/.test(address.pincode.trim())) {
      setFormError("Please enter a valid 6-digit postal PIN code.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generateOrderNumber(),
        date: new Date().toISOString(),
        customer: { ...address },
        items: items.map((item) => ({
          id: item.id,
          productId: item.productId,
          productName: item.name,
          productImage: item.image,
          price: item.price,
          quantity: item.quantity,
          variant: item.selectedVariant,
        })),
        subtotal: subtotal,
        discount: discount,
        shippingFee: shipping,
        total: total,
        appliedCoupon: appliedCoupon?.code,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "COD" ? "pending" : "completed",
        status: "placed",
        trackingNumber: `QNS-AMB-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: "⚡ Same-Day Dispatch from Ambattur Hub",
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      try {
        confetti({
          particleCount: 140,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#4F46E5", "#EA580C", "#D97706", "#059669"],
        });
      } catch (err) {
        console.error(err);
      }

      router.push(`/orders/${newOrder.id}`);
    }, 1400);
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-slate-900">
          Quick&apos;n&apos;Smart Express Checkout
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter destination address and choose your payment method.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Side: Address & Payment (8 Cols) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* 1. Address Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-slate-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                Delivery & Consignee Address
              </h2>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="e.g. Karthi Maama"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (10 Digits) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, "") })}
                  placeholder="e.g. 9840123456"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Flat, House No., Building, Street Address *
              </label>
              <input
                type="text"
                required
                value={address.streetAddress}
                onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                placeholder="e.g. No 1, AP Arasu St, Ram Nagar"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="e.g. 600053"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="e.g. Ambattur, Chennai"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  State *
                </label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-primary"
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Payment Selection */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-slate-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-50 text-brand-primary flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                Select Payment Mode
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("UPI")}
                className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "UPI"
                    ? "border-brand-primary bg-indigo-50/60 shadow-xs ring-2 ring-brand-primary/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-brand-primary flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Instant UPI</h4>
                  <p className="text-[10px] text-slate-500">GPay, PhonePe, QR Code</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("CARD")}
                className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "CARD"
                    ? "border-brand-secondary bg-orange-50/60 shadow-xs ring-2 ring-brand-secondary/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-secondary flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Cards & NetBanking</h4>
                  <p className="text-[10px] text-slate-500">RuPay, Visa, Master</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === "COD"
                    ? "border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-600/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Cash on Delivery</h4>
                  <p className="text-[10px] text-slate-500">Doorstep Cash or UPI</p>
                </div>
              </button>
            </div>

            {/* Dynamic Details based on Payment Method */}
            {paymentMethod === "UPI" && (
              <div className="p-4 sm:p-5 bg-indigo-50/40 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="bg-white p-2.5 rounded-2xl shadow-xs border border-slate-200 text-center shrink-0">
                  <Image
                    src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=upi://pay?pa=quicknsmart@okaxis%26pn=QuickNSmart%26cu=INR"
                    alt="BHIM UPI QR"
                    width={130}
                    height={130}
                    className="mx-auto"
                  />
                  <span className="text-[10px] font-bold text-slate-500 block mt-1">
                    Scan with any UPI app
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-center sm:text-left">
                  <h5 className="font-bold text-slate-900">
                    Pay instantly via UPI VPA or QR Code
                  </h5>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    Scan with Google Pay, PhonePe, Paytm, or enter your UPI ID below for instant Ambattur hub dispatch.
                  </p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. name@oksbi"
                    className="w-full px-3 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "CARD" && (
              <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                <h5 className="font-bold text-slate-900">
                  Enter Card Details (256-bit Encrypted)
                </h5>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8890"
                  maxLength={19}
                  className="w-full px-3.5 py-2 bg-white rounded-xl border border-slate-300 font-semibold"
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="px-3.5 py-2 bg-white rounded-xl border border-slate-300 font-semibold"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength={3}
                    className="px-3.5 py-2 bg-white rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "COD" && (
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Cash on Delivery (COD) is active for Ambattur / Chennai & Pan-India.</strong> You can pay with Cash or UPI upon package arrival.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Order Summary & Place Order (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-sm sm:text-base font-black font-heading text-slate-900">
              Order Summary ({items.length} items)
            </h3>

            {/* Item Mini List */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2.5 text-xs">
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-800 truncate">{item.name}</h5>
                    <span className="text-slate-500 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-heading">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-slate-600 pt-2.5 border-t border-slate-100">
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
                <span>Logistics / Delivery</span>
                <span>{shipping === 0 ? <strong className="text-emerald-600">FREE EXPRESS</strong> : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200 font-heading">
                <span>Total Amount</span>
                <span className="text-brand-primary">{formatINR(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-secondary text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Confirming Consignment...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order ({formatINR(total)})</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Ambattur Hub Dispatch Guarantee
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Instant tax invoice and tracking AWB will be generated immediately.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
