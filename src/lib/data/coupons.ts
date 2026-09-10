import { Coupon } from "@/types";

export const coupons: Record<string, Coupon> = {
  "NAMASTE20": {
    code: "NAMASTE20",
    description: "20% Festive Savings across all categories",
    discountPercent: 20,
    minCartValue: 799,
  },
  "DIWALI50": {
    code: "DIWALI50",
    description: "Flat ₹500 OFF on orders above ₹2,499",
    discountAmount: 500,
    minCartValue: 2499,
  },
  "FESTIVE10": {
    code: "FESTIVE10",
    description: "10% Instant Discount on any cart value",
    discountPercent: 10,
    minCartValue: 0,
  },
  "FREESHIP": {
    code: "FREESHIP",
    description: "Free Express Shipping across India",
    isFreeShipping: true,
    minCartValue: 499,
  },
};

