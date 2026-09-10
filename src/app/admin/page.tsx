"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  CheckCircle2,
  Clock,
  Truck,
  Edit,
  Plus,
  IndianRupee,
  Zap,
  MapPin,
} from "lucide-react";
import { products as initialProducts } from "@/lib/data/products";
import { useUserStore } from "@/lib/store/user-store";
import { formatINR, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { orders } = useUserStore();
  const [productsList] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "inventory">("overview");

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 184200);
  const totalOrdersCount = orders.length + 62;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gray-950 via-purple-950 to-gray-900 text-white p-6 sm:p-8 rounded-3xl border border-purple-900/50 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange flex items-center gap-1.5 mb-1">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Ambattur Hub Dispatch Control (600053)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
            Quick&apos;n&apos;Smart Merchant & Logistics Portal
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time parcel dispatch pipeline, warehouse inventory, and sales analytics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-gray-800/80 p-1 rounded-2xl border border-gray-700 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "overview" ? "bg-brand-purple text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "orders" ? "bg-brand-purple text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Shipments ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "inventory" ? "bg-brand-purple text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Warehouse Stock ({productsList.length})
          </button>
        </div>
      </div>

      {/* 1. Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-brand-purple flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Total Gross Sales
              </span>
              <h3 className="text-2xl font-black text-gray-900 font-heading">
                {formatINR(totalRevenue)}
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +28% Express Fulfillment
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Consignments Dispatched
              </span>
              <h3 className="text-2xl font-black text-gray-900 font-heading">
                {totalOrdersCount}
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 99.8% On-Time Delivery
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Avg Basket Size
              </span>
              <h3 className="text-2xl font-black text-gray-900 font-heading">
                {formatINR(avgOrderValue)}
              </h3>
              <span className="text-[11px] text-gray-400">High direct-to-consumer value</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand-gold flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                HQ Location
              </span>
              <h3 className="text-lg font-black text-gray-900 font-heading">
                Ambattur, Chennai
              </h3>
              <span className="text-[11px] font-bold text-brand-purple">Pin: 600053 • Active Hub</span>
            </div>
          </div>

          {/* Quick Orders List */}
          <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-black font-heading text-gray-900">
              Live Consignments from Ambattur Hub
            </h3>
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <div key={order.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-gray-900">{order.orderNumber}</span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-600">{order.customer.fullName} ({order.customer.city})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-brand-purple font-heading">{formatINR(order.total)}</span>
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-3 py-1 bg-purple-50 text-brand-purple font-bold rounded-lg hover:bg-purple-100"
                    >
                      Track / Invoice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Shipments Fulfillment Tab */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black font-heading text-gray-900">
            Ambattur Hub Dispatch Pipeline
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 uppercase text-[10px] font-bold">
                  <th className="pb-3">Consignment No</th>
                  <th className="pb-3">Booking Date</th>
                  <th className="pb-3">Consignee</th>
                  <th className="pb-3">Destination</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-purple-50/40">
                    <td className="py-3 font-bold text-gray-900">{order.orderNumber}</td>
                    <td className="py-3">{formatDate(order.date)}</td>
                    <td className="py-3 font-medium text-gray-900">{order.customer.fullName}</td>
                    <td className="py-3">{order.customer.city} ({order.customer.pincode})</td>
                    <td className="py-3 uppercase font-bold text-gray-700">{order.paymentMethod}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-50 text-brand-purple border border-purple-200">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 font-extrabold text-gray-900 font-heading">{formatINR(order.total)}</td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-3 py-1 rounded-lg bg-gray-900 text-white font-bold text-[11px]"
                      >
                        Invoice
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Warehouse Stock Tab */}
      {activeTab === "inventory" && (
        <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-black font-heading text-gray-900">
              Ambattur Warehouse Stock ({productsList.length} Active SKUs)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 uppercase text-[10px] font-bold">
                  <th className="pb-3">Product Name</th>
                  <th className="pb-3">Vertical</th>
                  <th className="pb-3">Retail Price</th>
                  <th className="pb-3">MRP</th>
                  <th className="pb-3">Warehouse Stock</th>
                  <th className="pb-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productsList.map((p) => (
                  <tr key={p.id} className="hover:bg-purple-50/40">
                    <td className="py-3 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image src={p.images[0]} alt={p.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-900 line-clamp-1 max-w-xs">{p.name}</span>
                    </td>
                    <td className="py-3 font-semibold text-brand-purple">{p.categoryName}</td>
                    <td className="py-3 font-extrabold text-gray-900 font-heading">{formatINR(p.price)}</td>
                    <td className="py-3 text-gray-400 line-through">{formatINR(p.originalPrice)}</td>
                    <td className="py-3">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {p.stock} units in Ambattur
                      </span>
                    </td>
                    <td className="py-3 font-bold text-amber-600">⭐ {p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
