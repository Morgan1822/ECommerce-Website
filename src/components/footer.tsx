"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Heart,
  Send,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  MapPin,
  Truck,
} from "lucide-react";
import { categories } from "@/lib/data/categories";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-14 pb-8 border-t-4 border-brand-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          {/* Quick'n'Smart Company Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-purple via-indigo-600 to-brand-orange flex items-center justify-center text-white shadow-md">
                <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              </div>
              <span className="font-heading text-2xl font-black tracking-tight text-white">
                Quick<span className="text-brand-purple">&apos;n&apos;</span><span className="text-brand-orange">Smart</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Your trusted partner for <strong>Express Logistics, Domestic Courier & Direct Retail Products</strong>. Direct warehouse pricing with lightning same-day Chennai delivery.
            </p>

            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>
                  <strong>Headquarters & Logistics Hub:</strong><br />
                  No 1, AP Arasu Street, Near Lenin Nagar, Ram Nagar, Ambattur, Chennai, Tamil Nadu - 600053
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-purple" />
                <span>+91 98401 23456 (Dispatch & Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                <span>orders@quicknsmart.in</span>
              </div>
            </div>
          </div>

          {/* Retail Categories (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Retail Catalog
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logistics & Tracking (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Logistics & Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/orders" className="hover:text-brand-orange transition-colors flex items-center gap-1.5 text-brand-orange font-bold">
                  <Truck className="w-3.5 h-3.5" /> Track Parcel (AWB)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-orange transition-colors">
                  Merchant Dispatch Portal
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-brand-orange transition-colors">
                  My Saved Shortlist
                </Link>
              </li>
              <li>
                <span className="text-gray-500">Same-Day Chennai Pickup</span>
              </li>
              <li>
                <span className="text-gray-500">B2B Domestic Logistics</span>
              </li>
            </ul>
          </div>

          {/* Special Offers (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick&apos;n&apos;Smart Club
            </h4>
            <p className="text-xs text-gray-400">
              Get secret discount codes and express dispatch notifications.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xs rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed! Use coupon NAMASTE20
                </p>
              )}
            </form>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>100% Privacy Protected. Ambattur, Chennai.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>© 2026 Quick&apos;n&apos;Smart (Ambattur, Chennai). Made with</span>
            <Heart className="w-3.5 h-3.5 text-brand-purple fill-brand-purple" />
            <span>for Indian Retail & Logistics.</span>
          </div>

          {/* Payment Chips */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700 text-yellow-300">
              BHIM UPI
            </span>
            <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700 text-blue-400">
              Google Pay
            </span>
            <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700 text-purple-400">
              PhonePe
            </span>
            <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700 text-emerald-400">
              RuPay
            </span>
            <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700 text-gray-300">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
