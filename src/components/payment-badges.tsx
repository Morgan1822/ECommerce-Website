import React from "react";

export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {/* 1. BHIM UPI */}
      <div
        className="h-7 px-2.5 bg-slate-900/90 hover:bg-slate-900 rounded-lg border border-slate-700/80 flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
        title="BHIM UPI Instant Payments"
      >
        <svg viewBox="0 0 48 48" className="w-4 h-4 shrink-0" fill="none">
          <path d="M12 36L28 8H36L20 36H12Z" fill="#097939" />
          <path d="M22 36L38 8H44L28 36H22Z" fill="#ED752E" />
        </svg>
        <span className="text-[11px] font-black tracking-wider text-white">
          <span className="text-[#ED752E]">BHIM </span>
          <span className="text-[#097939]">UPI</span>
        </span>
      </div>

      {/* 2. Google Pay */}
      <div
        className="h-7 px-2.5 bg-slate-900/90 hover:bg-slate-900 rounded-lg border border-slate-700/80 flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
        title="Google Pay"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
          />
        </svg>
        <span className="text-[11px] font-bold text-white tracking-tight">GPay</span>
      </div>

      {/* 3. PhonePe */}
      <div
        className="h-7 px-2.5 bg-slate-900/90 hover:bg-slate-900 rounded-lg border border-slate-700/80 flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
        title="PhonePe"
      >
        <div className="w-4 h-4 rounded-full bg-[#5F259F] flex items-center justify-center shrink-0">
          <span className="text-[10px] font-black text-white leading-none">पे</span>
        </div>
        <span className="text-[11px] font-bold text-[#A855F7]">PhonePe</span>
      </div>

      {/* 4. RuPay */}
      <div
        className="h-7 px-2.5 bg-slate-900/90 hover:bg-slate-900 rounded-lg border border-slate-700/80 flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
        title="RuPay Debit & Credit Cards"
      >
        <svg viewBox="0 0 60 20" className="w-8 h-3.5 shrink-0" fill="none">
          <path d="M42 3L36 17H41L47 3H42Z" fill="#097939" />
          <path d="M49 3L43 17H48L54 3H49Z" fill="#ED752E" />
          <text x="2" y="15" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
            RuPay
          </text>
        </svg>
      </div>

      {/* 5. Cash on Delivery (COD) */}
      <div
        className="h-7 px-2.5 bg-slate-900/90 hover:bg-slate-900 rounded-lg border border-slate-700/80 flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
        title="Cash on Delivery Available"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
        <span className="text-[11px] font-bold text-emerald-300">COD</span>
      </div>
    </div>
  );
}
