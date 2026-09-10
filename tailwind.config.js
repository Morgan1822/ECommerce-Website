/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          primary: "#1E40AF",      // Deep Cobalt / Royal Blue (from QNS phone frame & orbital ring)
          primaryHover: "#1D4ED8", // Hover state
          secondary: "#DC2626",    // QNS Crimson / Flame Red (from QNS letters & orbital ring)
          secondaryHover: "#B91C1C",
          accent: "#F59E0B",       // Logistics Parcel Gold / Amber
          accentHover: "#D97706",
          emerald: "#16A34A",      // WhatsApp / Delivery Success Green
          whatsapp: "#22C55E",     // Bright WhatsApp Green
          navy: "#0F172A",         // Deep Slate Dark Navy
          slate: "#334155",
          border: "#E2E8F0",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          cream: "#FEFBF6",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-outfit)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.04)",
        card: "0 10px 25px -3px rgba(30, 64, 175, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)",
        speed: "0 10px 25px -3px rgba(220, 38, 38, 0.18)",
        glow: "0 0 20px rgba(30, 64, 175, 0.25)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
