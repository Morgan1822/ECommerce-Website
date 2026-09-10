"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Send,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  MapPin,
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
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-14 pb-8 border-t-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          {/* Brand Intro (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-pink via-brand-orange to-brand-gold flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-heading text-2xl font-black tracking-tight text-white">
                Utsav<span className="text-brand-pink">Kart</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              India&apos;s premier festive & D2C marketplace. Celebrating certified master weavers, organic Vedic gaushalas, and high-performance homegrown technology.
            </p>

            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                <span>Anna Nagar & Bengaluru Tech Hub, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-pink" />
                <span>+91 98401 23456 (9 AM - 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold" />
                <span>namaste@utsavkart.in</span>
              </div>
            </div>
          </div>

          {/* Product Categories (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Heritage Verticals
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

          {/* Customer Care (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/orders" className="hover:text-brand-orange transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-brand-orange transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-orange transition-colors">
                  Merchant / Admin Portal
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Silk Mark Verification</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">FSSAI Lab Certificates</span>
              </li>
            </ul>
          </div>

          {/* Festive Newsletter (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Festive Club
            </h4>
            <p className="text-xs text-gray-400">
              Get secret 20% discount vouchers and seasonal festival drop notifications.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs rounded-lg hover:opacity-90 transition-opacity"
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
              <span>100% Privacy Protected. No spam ever.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Payment Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>© 2026 Utsav Kart Retail. Made with</span>
            <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
            <span>for Indian Shoppers.</span>
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

