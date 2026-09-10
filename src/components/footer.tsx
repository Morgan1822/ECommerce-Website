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

import { BrandLogo } from "./brand-logo";
import { PaymentBadges } from "./payment-badges";

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
          {/* Quick N Smart Company Info (4 Cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5">
            <Link href="/" className="inline-block">
              <BrandLogo size="lg" textColor="light" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for <strong>Direct Retail E-Commerce & Domestic Logistics Services</strong>. Sourced directly with express same-day dispatch from our Ambattur hub.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                <span>
                  <strong>Ambattur Central Hub & Office:</strong><br />
                  No 1, AP Arasu Street, Ram Nagar, Ambattur, Chennai - 600053
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <strong>Helpline / WhatsApp:</strong> +91 91760 96102
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-accent" />
                <span>tndeliveryqns@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational Hours: 09:00 - 18:00 (Open Daily)</span>
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
            <span>© 2026 Quick N Smart (QNS Logistics & Retail, Ambattur). Made with</span>
            <Heart className="w-3.5 h-3.5 text-brand-secondary fill-brand-secondary" />
            <span>for Indian Retail & Express Logistics.</span>
          </div>

          {/* Payment Badges with official brand logos & icons */}
          <PaymentBadges />
        </div>
      </div>
    </footer>
  );
}
