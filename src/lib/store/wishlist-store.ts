import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggleWishlist: (productId) => {
        const current = get().productIds;
        const exists = current.includes(productId);
        if (exists) {
          set({ productIds: current.filter((id) => id !== productId) });
          return false;
        } else {
          set({ productIds: [...current, productId] });
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().productIds.includes(productId);
      },

      clearWishlist: () => {
        set({ productIds: [] });
      },

      getCount: () => {
        return get().productIds.length;
      },
    }),
    {
      name: "utsav-wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

