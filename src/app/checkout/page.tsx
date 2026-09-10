"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  IndianRupee,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/lib/store/cart-store";
import { useUserStore } from "@/lib/store/user-store";
import { lookupPincode } from "@/lib/data/pincodes";
import { Order, PaymentMethod, ShippingAddress } from "@/types";
import { formatINR, generateOrderNumber } from "@/lib/utils";

const indianStates = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi NCR", "Goa",
  "Gujarat", "Haryana", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
  "West Bengal"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscount, getShippingFee, getTotal, clearCart, appliedCoupon } = useCartStore();
  const { user, addOrder, savedAddresses, currentPincode } = useUserStore();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name || "Karthi Krishnan",
    phone: user?.phone || "9840123456",
    streetAddress: "42, Heritage Enclave, Anna Nagar",
    landmark: "Near Metro Station",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: currentPincode || "600001",
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
      state: info.state === "India" ? prev.state : info.state,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
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

    // Simulate Razorpay / Payment Gateway processing delay
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
        trackingNumber: `BD${Math.floor(10000000 + Math.random() * 90000000)}IN`,
        estimatedDelivery: "In 2-3 Business Days",
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#E11D48", "#EA580C", "#D97706", "#0D9488", "#10B981"],
        });
      } catch (err) {
        console.error(err);
      }

      router.push(`/orders/${newOrder.id}`);
    }, 1500);
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Step Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900">
          Indian Express Checkout
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Enter delivery address and choose your preferred Indian payment method.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Address & Payment Selection (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Shipping Address Section */}
          <div className="bg-white rounded-3xl border border-amber-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-lg font-bold font-heading text-gray-900">
                Delivery & Shipping Address
              </h2>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="e.g. Karthi Krishnan"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Mobile Number (10 Digits) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, "") })}
                  placeholder="e.g. 9840123456"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Flat, House No., Building, Street Address *
              </label>
              <input
                type="text"
                required
                value={address.streetAddress}
                onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                placeholder="e.g. 42, Heritage Enclave, Anna Nagar West"
                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="e.g. 600001"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="e.g. Chennai"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  State *
                </label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold focus:bg-white focus:outline-none focus:border-brand-orange"
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

          {/* 2. Payment Method Section */}
          <div className="bg-white rounded-3xl border border-amber-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-brand-pink/10 text-brand-pink flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-lg font-bold font-heading text-gray-900">
                Choose Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("UPI")}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === "UPI"
                    ? "border-brand-pink bg-pink-50/50 shadow-sm ring-2 ring-brand-pink/20"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-brand-pink flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Instant UPI</h4>
                  <p className="text-[10px] text-gray-500">GPay, PhonePe, QR Code</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("CARD")}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === "CARD"
                    ? "border-brand-orange bg-orange-50/50 shadow-sm ring-2 ring-brand-orange/20"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Cards & Banking</h4>
                  <p className="text-[10px] text-gray-500">RuPay, Visa, Master</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === "COD"
                    ? "border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-600/20"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Cash on Delivery</h4>
                  <p className="text-[10px] text-gray-500">Pay cash or UPI at door</p>
                </div>
              </button>
            </div>

            {/* Dynamic Details based on Payment Method */}
            {paymentMethod === "UPI" && (
              <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200/60 flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 text-center shrink-0">
                  <Image
                    src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=utsavkart@okaxis%26pn=UtsavKart%26cu=INR"
                    alt="BHIM UPI QR"
                    width={140}
                    height={140}
                    className="mx-auto"
                  />
                  <span className="text-[10px] font-bold text-gray-500 block mt-1">
                    Scan with any UPI app
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <h5 className="font-bold text-gray-900">
                    Pay instantly via UPI VPA or QR Code
                  </h5>
                  <p className="text-gray-600 leading-relaxed">
                    Scan the dynamic QR code on the left with Google Pay, PhonePe, Paytm, or enter your UPI ID below.
                  </p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@okaxis"
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-gray-300 text-xs font-bold"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "CARD" && (
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <h5 className="font-bold text-xs text-gray-900">
                  Enter Card Details (Razorpay 256-bit Encrypted)
                </h5>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8890"
                  maxLength={19}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-xs font-semibold"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-xs font-semibold"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength={3}
                    className="px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "COD" && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Cash on Delivery (COD) is active for your pincode.</strong> You can also pay via delivery agent&apos;s UPI QR on package arrival.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Order Summary & Place Order Button (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-black font-heading text-gray-900">
              Order Summary ({items.length} items)
            </h3>

            {/* Item Mini List */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-gray-800 truncate">{item.name}</h5>
                    <span className="text-gray-500 font-medium">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-gray-900 font-heading">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>- {formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200 font-heading">
                <span>Total Amount</span>
                <span className="text-brand-pink">{formatINR(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-brand-orange via-brand-pink to-rose-600 text-white font-bold text-sm rounded-2xl shadow-xl shadow-brand-pink/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Processing Order with Razorpay...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order ({formatINR(total)})</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-xs text-gray-600 space-y-1">
            <p className="font-bold text-gray-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Razorpay Secured Checkout
            </p>
            <p className="text-[11px] text-gray-500">
              Instant tax invoice will be generated upon order completion.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

