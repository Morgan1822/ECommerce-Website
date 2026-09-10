import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  textColor?: "dark" | "light";
}

export function BrandLogo({
  size = "md",
  showText = true,
  textColor = "dark",
}: BrandLogoProps) {
  const sizeMap = {
    sm: { box: "w-8 h-8", font: "text-base", sub: "text-[9px]" },
    md: { box: "w-10 h-10 sm:w-11 sm:h-11", font: "text-lg sm:text-xl", sub: "text-[10px]" },
    lg: { box: "w-14 h-14", font: "text-2xl", sub: "text-xs" },
    xl: { box: "w-20 h-20", font: "text-3xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className="flex items-center gap-2.5 shrink-0 group">
      {/* SVG Icon representing the QNS Logo */}
      <div className={`relative ${currentSize.box} shrink-0 flex items-center justify-center transition-transform group-hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orbital Ring Background with Gradient */}
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="24"
            transform="rotate(-15 50 50)"
            stroke="url(#qns-orbit-grad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* QNS Red Letters in background */}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill="#DC2626"
            fontSize="26"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            letterSpacing="-1"
            opacity="0.9"
          >
            QNS
          </text>

          {/* White Circular Center Shield */}
          <circle cx="50" cy="50" r="30" fill="#FFFFFF" stroke="#1E40AF" strokeWidth="2.5" />

          {/* Smartphone Outline (Cobalt Blue) */}
          <rect
            x="40"
            y="28"
            width="20"
            height="34"
            rx="4"
            stroke="#1E40AF"
            strokeWidth="2.5"
            fill="#F8FAFC"
          />
          {/* Phone Screen Speaker & Button */}
          <line x1="47" y1="31" x2="53" y2="31" stroke="#1E40AF" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="50" cy="58.5" r="1" fill="#1E40AF" />

          {/* Red Map Pin inside Phone */}
          <path
            d="M50 34C46.5 34 44 36.5 44 39.5C44 43.5 50 49 50 49C50 49 56 43.5 56 39.5C56 36.5 53.5 34 50 34Z"
            fill="#DC2626"
          />
          {/* QNS text in Map Pin */}
          <text x="50" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="900">
            QNS
          </text>

          {/* Golden Logistics Cardboard Box at bottom */}
          <path
            d="M41 51L50 46L59 51L50 56L41 51Z"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1"
          />
          <path
            d="M41 51V60L50 65V56L41 51Z"
            fill="#D97706"
            stroke="#B45309"
            strokeWidth="1"
          />
          <path
            d="M59 51V60L50 65V56L59 51Z"
            fill="#FBBF24"
            stroke="#B45309"
            strokeWidth="1"
          />

          {/* Quick N Smart Text in Arc or Bottom */}
          <text
            x="50"
            y="76"
            textAnchor="middle"
            fill="#1E40AF"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="0.5"
          >
            QUICK N SMART
          </text>

          {/* Linear Gradient for Planetary Orbit */}
          <defs>
            <linearGradient id="qns-orbit-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="min-w-0">
          <span
            className={`font-heading ${currentSize.font} font-black tracking-tight flex items-center gap-1 leading-none ${
              textColor === "light" ? "text-white" : "text-slate-900"
            }`}
          >
            Quick <span className="text-brand-primary">N</span> <span className="text-brand-secondary">Smart</span>
          </span>
          <span className="hidden xs:flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase truncate mt-0.5">
            <span>Ambattur, Chennai</span>
            <span className="text-brand-emerald">• +91 91760 96102</span>
          </span>
        </div>
      )}
    </div>
  );
}
