"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  Printer,
  ArrowRight,
  MapPin,
  FileText,
  Zap,
} from "lucide-react";
import { useUserStore } from "@/lib/store/user-store";
import { formatINR, formatDate } from "@/lib/utils";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { getOrderById } = useUserStore();
  const [order, setOrder] = useState(getOrderById(params.id));

  useEffect(() => {
    setOrder(getOrderById(params.id));
  }, [params.id, getOrderById]);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 font-heading">Consignment Not Found</h2>
        <p className="text-xs text-gray-500">The requested order or tracking ID could not be located in the Ambattur dispatch database.</p>
        <Link href="/" className="inline-flex px-6 py-2.5 bg-brand-purple text-white text-xs font-bold rounded-xl">
          Return to Quick&apos;n&apos;Smart Store
        </Link>
      </div>
    );
  }

  const steps = [
    { title: "Order Booked", desc: "Received at Ambattur Hub", icon: CheckCircle2, completed: true },
    { title: "Packed & Sealed", desc: "Quality Verified at Warehouse", icon: Package, completed: order.status !== "placed" },
    { title: "Dispatched", desc: "In Transit via Quick'n'Smart Express", icon: Truck, completed: order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered" },
    { title: "Delivered", desc: "Delivered to Doorstep", icon: Home, completed: order.status === "delivered" },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:p-0">
      {/* Celebratory Banner */}
      <div className="bg-gradient-to-r from-brand-purple via-indigo-700 to-brand-orange text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-2 text-center print:hidden">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white mb-2">
          <Zap className="w-8 h-8 fill-yellow-300 text-yellow-300" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading">
          Consignment Booked & Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto">
          Thank you <strong>{order.customer.fullName}</strong>! We have received your order. Package will be dispatched directly from our <strong>Ambattur, Chennai Hub</strong>.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
          <span className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
            Order ID: {order.orderNumber}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
            Payment: {order.paymentMethod} ({order.paymentStatus.toUpperCase()})
          </span>
        </div>
      </div>

      {/* Visual Live Order Tracker */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-6 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-black font-heading text-gray-900">
              Live Shipment Progress
            </h3>
            <p className="text-xs text-gray-500">
              Origin Hub: Ambattur, Chennai (Tracking AWB: {order.trackingNumber || "QNS-AMB-982341"})
            </p>
          </div>
          <span className="text-xs font-bold text-brand-purple bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200 self-start sm:self-auto">
            Delivery Timeline: {order.estimatedDelivery || "⚡ Same Day / 24-Hr Express"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                    step.completed
                      ? "bg-brand-purple text-white ring-4 ring-purple-100"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{step.title}</h4>
                  <p className="text-[10px] text-gray-500">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tax Invoice & Summary Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-purple-100 shadow-sm space-y-8 print:border-none print:shadow-none">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-black font-heading text-brand-purple">
              Quick&apos;n&apos;Smart Logistics & Store
            </h2>
            <p className="text-xs text-gray-500">No 1, AP Arasu Street, Ram Nagar, Ambattur, Chennai - 600053</p>
            <p className="text-xs text-gray-500">GSTIN: 33AAAAA0000A1Z5 | Domestic Courier & Retail</p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              TAX INVOICE & CONSIGNMENT RECEIPT
            </span>
            <span className="text-base font-black text-gray-900 font-heading block">
              {order.orderNumber}
            </span>
            <span className="text-xs text-gray-500">{formatDate(order.date)}</span>
          </div>
        </div>

        {/* Billed & Shipped Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-700">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-2">
              Consignee (Billed & Shipped To):
            </h4>
            <p className="font-bold text-gray-900 text-sm">{order.customer.fullName}</p>
            <p>{order.customer.streetAddress}</p>
            <p>
              {order.customer.city}, {order.customer.state} - {order.customer.pincode}
            </p>
            <p className="text-gray-500 font-medium">Phone: +91 {order.customer.phone}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-2">
              Hub Dispatch Information:
            </h4>
            <p>Dispatched From: <strong>Ambattur Central Warehouse (600053)</strong></p>
            <p>Payment Mode: <strong className="uppercase">{order.paymentMethod}</strong></p>
            <p>Payment Status: <strong className="text-emerald-600 uppercase">{order.paymentStatus}</strong></p>
            <p>Consignment AWB: <strong>{order.trackingNumber || "QNS-AMB-982341"}</strong></p>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
            Consignment Line Items
          </h4>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <Image src={item.productImage} alt={item.productName} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 line-clamp-1">{item.productName}</h5>
                    {item.variant && <span className="text-gray-500 text-[11px]">{item.variant}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-500">{item.quantity} × {formatINR(item.price)}</span>
                  <span className="font-bold text-gray-900 font-heading block mt-0.5">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Calculations */}
        <div className="flex justify-end">
          <div className="w-full sm:w-72 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount ({order.appliedCoupon})</span>
                <span>- {formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Logistics & Handling Fee</span>
              <span>{order.shippingFee === 0 ? <strong className="text-emerald-600">FREE EXPRESS</strong> : formatINR(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200 font-heading">
              <span>Total Paid</span>
              <span className="text-brand-purple">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Invoice Actions */}
        <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Ambattur Invoice
          </button>

          <Link
            href="/products"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xs flex items-center gap-2 hover:opacity-95 transition-opacity"
          >
            <span>Back to Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
