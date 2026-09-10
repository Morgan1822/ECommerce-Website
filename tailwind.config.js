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
          primary: "#4F46E5",    // Royal Electric Indigo
          primaryHover: "#4338CA",
          secondary: "#EA580C",  // Speed Saffron Orange
          secondaryHover: "#C2410C",
          accent: "#D97706",     // Smart Gold / Amber
          emerald: "#059669",    // Express Green
          navy: "#0F172A",       // Deep Slate Navy
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
        card: "0 10px 25px -3px rgba(79, 70, 229, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)",
        speed: "0 10px 25px -3px rgba(234, 88, 12, 0.18)",
        glow: "0 0 20px rgba(79, 70, 229, 0.25)",
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
