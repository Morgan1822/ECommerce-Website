/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#E11D48", // Rani Pink
          orange: "#EA580C", // Marigold Orange
          gold: "#D97706", // Royal Indian Gold
          teal: "#0D9488", // Morpankhi Teal
          emerald: "#059669", // Shubh Green
          deep: "#0F172A",
          surface: "#FFFDF9",
          card: "#FFFFFF",
          cream: "#FEF9F3",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        festive: "0 8px 30px -4px rgba(225, 29, 72, 0.15)",
        gold: "0 8px 30px -4px rgba(217, 119, 6, 0.2)",
        glow: "0 0 25px rgba(234, 88, 12, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      animation: {
        pulseGlow: "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".85", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

