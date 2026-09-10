"use client";

import React from "react";
import { Zap, Truck, MapPin } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-brand-primary via-indigo-700 to-brand-secondary text-white text-[11px] sm:text-xs md:text-sm font-semibold py-1.5 sm:py-2 px-3 sm:px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span className="flex items-center gap-1 truncate">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
            <span className="font-bold tracking-tight">QUICK&apos;N&apos;SMART:</span>
            <span className="truncate">Ambattur Logistics & Direct Retail Store</span>
            <span className="hidden xs:inline-block bg-white/20 px-1.5 py-0.5 rounded text-amber-200 text-[10px] font-bold border border-white/25 shrink-0">
              NAMASTE20 (20% OFF)
            </span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 lg:gap-4 text-xs font-medium text-white/90 shrink-0">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300" /> Ambattur Hub (600053)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-300" /> ⚡ Same-Day Chennai & Pan-India Express
          </span>
        </div>
      </div>
    </div>
  );
}
