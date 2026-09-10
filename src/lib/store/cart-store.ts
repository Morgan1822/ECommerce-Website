import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Coupon, Product } from "@/types";
import { coupons } from "@/lib/data/coupons";

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  isDrawerOpen: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;

  // Actions
  addItem: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
  toggleDrawer: () => void;

  // Computed Getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      isDrawerOpen: false,
      freeShippingThreshold: 999,
      standardShippingFee: 99,

      addItem: (product, quantity = 1, selectedVariant) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.productId === product.id && item.selectedVariant === selectedVariant
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isDrawerOpen: true });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${selectedVariant || "default"}`,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0] || "",
            category: product.category,
            quantity: quantity,
            selectedVariant: selectedVariant,
            stock: product.stock,
          };
          set({ items: [...currentItems, newItem], isDrawerOpen: true });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((i) => i.id !== itemId) });
      },

      updateQuantity: (itemId, delta) => {
        const currentItems = get().items;
        const index = currentItems.findIndex((i) => i.id === itemId);
        if (index === -1) return;

        const newQty = currentItems[index].quantity + delta;
        if (newQty <= 0) {
          set({ items: currentItems.filter((i) => i.id !== itemId) });
        } else {
          const updated = [...currentItems];
          updated[index].quantity = newQty;
          set({ items: updated });
        }
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null });
      },

      applyCoupon: (code) => {
        const clean = code.trim().toUpperCase();
        const found = coupons[clean];
        if (!found) {
          return { success: false, message: "Invalid coupon code. Try NAMASTE20 or FESTIVE10" };
        }

        const subtotal = get().getSubtotal();
        if (found.minCartValue && subtotal < found.minCartValue) {
          return {
            success: false,
            message: `Coupon requires minimum cart value of ₹${found.minCartValue}`,
          };
        }

        set({ appliedCoupon: found });
        return { success: true, message: `Coupon ${clean} applied successfully!` };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      setDrawerOpen: (isOpen) => {
        set({ isDrawerOpen: isOpen });
      },

      toggleDrawer: () => {
        set({ isDrawerOpen: !get().isDrawerOpen });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;

        if (coupon.discountPercent) {
          return Math.round((subtotal * coupon.discountPercent) / 100);
        }
        if (coupon.discountAmount) {
          return Math.min(subtotal, coupon.discountAmount);
        }
        return 0;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const coupon = get().appliedCoupon;
        if (coupon?.isFreeShipping) return 0;
        return subtotal >= get().freeShippingThreshold ? 0 : get().standardShippingFee;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: "utsav-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon }),
    }
  )
);

