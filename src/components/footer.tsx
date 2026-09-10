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
    <footer className="bg-slate-950 text-slate-300 pt-10 sm:pt-14 pb-8 border-t-4 border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Quick'n'Smart Company Info (4 Cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-primary via-indigo-600 to-brand-secondary flex items-center justify-center text-white shadow-md">
                <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
              </div>
              <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white">
                Quick<span className="text-brand-primary">&apos;n&apos;</span><span className="text-brand-secondary">Smart</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your trusted enterprise for <strong>Domestic Logistics & Direct Retail Store</strong>. Direct warehouse pricing with lightning same-day Chennai dispatch.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                <span>
                  <strong>Ambattur Headquarters & Hub:</strong><br />
                  No 1, AP Arasu Street, Near Lenin Nagar, Ram Nagar, Ambattur, Chennai - 600053
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-primary" />
                <span>+91 98401 23456 (Dispatch & Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>orders@quicknsmart.in</span>
              </div>
            </div>
          </div>

          {/* Retail Categories (3 Cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Retail Store
            </h4>
            <ul className="space-y-1.5 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-brand-secondary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logistics & Tracking (2 Cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Logistics & Courier
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/orders" className="hover:text-brand-secondary transition-colors flex items-center gap-1.5 text-brand-secondary font-bold">
                  <Truck className="w-3.5 h-3.5" /> Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-secondary transition-colors">
                  Merchant Dispatch Portal
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-brand-secondary transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Same-Day Chennai Pickup</span>
              </li>
            </ul>
          </div>

          {/* Special Offers (3 Cols) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Festive Offers Club
            </h4>
            <p className="text-xs text-slate-400">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-xs rounded-lg hover:opacity-90 transition-opacity"
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

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>100% Privacy Protected. Ambattur Hub.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <span>© 2026 Quick&apos;n&apos;Smart (Ambattur, Chennai). Made with</span>
            <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
            <span>for Indian Retail & Logistics.</span>
          </div>

          {/* Payment Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold">
            <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-amber-300">
              BHIM UPI
            </span>
            <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-blue-400">
              Google Pay
            </span>
            <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-indigo-400">
              PhonePe
            </span>
            <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-emerald-400">
              RuPay
            </span>
            <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
