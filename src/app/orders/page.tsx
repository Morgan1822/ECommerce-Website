"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowRight, Truck, CheckCircle2, Clock, Eye } from "lucide-react";
import { useUserStore } from "@/lib/store/user-store";
import { formatINR, formatDate } from "@/lib/utils";

export default function OrdersHistoryPage() {
  const { orders } = useUserStore();

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-brand-orange mx-auto flex items-center justify-center">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black font-heading text-gray-900">
          No Orders Placed Yet
        </h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Start exploring India&apos;s finest handcrafted silks, pure Gir cow ghee, and high-performance audio gadgets.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs rounded-xl shadow-md"
        >
          <span>Explore Storefront</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "placed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading text-gray-900">
          My Orders & Shipments ({orders.length})
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          View live tracking status, past invoices, and order histories.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm space-y-4 hover:border-brand-pink/30 transition-all"
          >
            {/* Order Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 font-heading text-sm">
                  {order.orderNumber}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{formatDate(order.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <span className="text-sm font-black text-gray-900 font-heading">
                  {formatINR(order.total)}
                </span>
              </div>
            </div>

            {/* Items Thumbnails */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 shrink-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      <Image src={item.productImage} alt={item.productName} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="text-xs max-w-[180px]">
                      <p className="font-bold text-gray-900 truncate">{item.productName}</p>
                      <p className="text-gray-500 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/orders/${order.id}`}
                  className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-brand-orange font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track & Invoice</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

