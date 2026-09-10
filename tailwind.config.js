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
          purple: "#7C3AED", // Quick'n'Smart Purple
          indigo: "#4F46E5",
          orange: "#EA580C", // Quick'n'Smart Speed Orange
          gold: "#F59E0B",   // Smart Lightbulb Yellow
          pink: "#E11D48",
          teal: "#0D9488",
          emerald: "#059669",
          surface: "#FAFAFD",
          card: "#FFFFFF",
          cream: "#FEFAF6",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        smart: "0 8px 30px -4px rgba(124, 58, 237, 0.18)",
        speed: "0 8px 30px -4px rgba(234, 88, 12, 0.22)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
