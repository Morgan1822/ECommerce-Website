"use client";

import React from "react";
import { Sparkles, Truck, Tag } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-brand-pink via-brand-orange to-brand-gold text-white text-xs md:text-sm font-semibold py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <strong className="tracking-wide">MAHA FESTIVE SALE:</strong> Use code{" "}
            <span className="bg-white/20 px-2 py-0.5 rounded text-yellow-200 border border-white/30 tracking-wider">
              NAMASTE20
            </span>{" "}
            for 20% OFF!
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-white/90">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-yellow-300" /> Free Express Delivery above ₹999
          </span>
          <span className="hidden lg:inline">•</span>
          <span className="hidden lg:flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-yellow-300" /> 100% Authentic Indian Heritage & GI Certified
          </span>
        </div>
      </div>
    </div>
  );
}

