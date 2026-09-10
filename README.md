# Utsav Kart 🛍️🇮🇳

A full-featured, vibrant, festive Indian retail e-commerce web platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Supabase**.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS (Festive Palette: Rani Pink `#E11D48`, Marigold `#EA580C`, Royal Gold `#D97706`, Morpankhi Teal `#0D9488`)
- **State Management**: Zustand with persistent storage (`utsav-cart-storage`, `utsav-wishlist-storage`, `utsav-user-storage`)
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti
- **Backend Architecture**: Supabase PostgreSQL database schema with Row Level Security (RLS) policies
- **Payments**: Razorpay Indian Payment Gateway simulation (Instant UPI QR, Cards, NetBanking, COD)
- **Deployment**: Ready for Vercel / Node.js

---

## 🚀 Getting Started

### 1. Installation

```bash
# Navigate to project directory
cd "/Users/vinoth/Documents/Karthi Maama/ECommerce Website1"

# Install dependencies (already installed)
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
ECommerce Website1/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root Layout (Fonts, Navbar, Announcement bar, Cart Drawer, Footer)
│   │   ├── page.tsx                # Homepage (Hero Carousel, Deal of Day, Categories, Bestsellers, Reviews)
│   │   ├── products/
│   │   │   ├── page.tsx            # Product Listing (Filters, Sort, Grid/List view)
│   │   │   └── [slug]/page.tsx     # Product Detail (Gallery, Variants, Specs, Pincode Estimator, Reviews)
│   │   ├── cart/page.tsx           # Full Cart page with Free Shipping meter & Coupons
│   │   ├── checkout/page.tsx       # Indian Checkout (Address validation, UPI QR preview & Razorpay)
│   │   ├── orders/
│   │   │   ├── page.tsx            # Customer Order History
│   │   │   └── [id]/page.tsx       # Live Shipment Tracker & Printable GST Tax Invoice
│   │   ├── wishlist/page.tsx       # Saved Wishlist items
│   │   └── admin/page.tsx          # Merchant / Admin Sales Analytics & Fulfillment Pipeline
│   ├── components/
│   │   ├── announcement-bar.tsx    # Festive ticker with active promo code
│   │   ├── navbar.tsx              # Sticky header, search autosuggest, pincode pill, badges
│   │   ├── hero-carousel.tsx       # Festive banner carousel & countdown timer
│   │   ├── product-card.tsx        # Product card with discount badge, wishlist heart, Buy Now
│   │   ├── product-filters.tsx     # Category, price range, rating filters
│   │   ├── cart-drawer.tsx         # Slide-in cart drawer with free delivery meter
│   │   ├── pincode-modal.tsx       # Indian postal pincode delivery lookup modal
│   │   └── footer.tsx              # Brand story, links, Indian payment chips, newsletter
│   ├── lib/
│   │   ├── data/                   # Mock dataset (products, categories, coupons, pincodes)
│   │   ├── store/                  # Zustand stores (cart, wishlist, user)
│   │   ├── supabase/               # Supabase client helper
│   │   └── utils.ts                # INR currency formatter (₹), discount calculations
│   └── types/                      # TypeScript definitions (Product, Order, Coupon, Pincode)
├── supabase/
│   ├── schema.sql                  # PostgreSQL table DDLs, triggers & indexes
│   └── rls-policies.sql            # Supabase Row Level Security policies
├── tailwind.config.js              # Custom festive color tokens & animations
└── package.json
```

---

## 🗄️ Supabase Schema & RLS Setup

When connecting to your remote Supabase instance:
1. Copy the SQL in [`supabase/schema.sql`](supabase/schema.sql) into the **Supabase SQL Editor** and execute it.
2. Copy the SQL in [`supabase/rls-policies.sql`](supabase/rls-policies.sql) to apply Row Level Security policies.
3. Update `.env.local` with your Supabase URL and Anon Key.

---

## 🎟️ Active Test Promo Codes

- `NAMASTE20`: 20% Festive Savings across all categories (Min. cart: ₹799)
- `DIWALI50`: Flat ₹500 OFF on orders above ₹2,499
- `FESTIVE10`: 10% Instant Discount on any cart value
- `FREESHIP`: Free Express Shipping on orders above ₹499
