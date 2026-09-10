import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Order, ShippingAddress } from "@/types";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
}

interface UserState {
  user: UserProfile | null;
  currentPincode: string;
  savedAddresses: ShippingAddress[];
  orders: Order[];

  setPincode: (pincode: string) => void;
  setUser: (user: UserProfile | null) => void;
  addOrder: (order: Order) => void;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;
  saveAddress: (address: ShippingAddress) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        id: "usr-demo-01",
        name: "Karthi Maama",
        email: "support@quicknsmart.in",
        phone: "9840123456",
        role: "admin",
      },
      currentPincode: "600053",
      savedAddresses: [
        {
          fullName: "Quick'n'Smart Ambattur Hub",
          phone: "9840123456",
          streetAddress: "No 1, AP Arasu Street, Lenin Nagar, Ram Nagar",
          city: "Ambattur, Chennai",
          state: "Tamil Nadu",
          pincode: "600053",
          isDefault: true,
        },
      ],
      orders: [
        {
          id: "ord-qns-01",
          orderNumber: "QNS-892314",
          date: new Date(Date.now() - 86400000).toISOString(),
          customer: {
            fullName: "Karthi Maama",
            phone: "9840123456",
            streetAddress: "No 1, AP Arasu St, Lenin Nagar, Ram Nagar",
            city: "Ambattur, Chennai",
            state: "Tamil Nadu",
            pincode: "600053",
          },
          items: [
            {
              id: "item-01",
              productId: "prod-fash-01",
              productName: "Pure Kanjeevaram Silk Saree (Gold & Silver Zari)",
              productImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
              price: 12499,
              quantity: 1,
            },
          ],
          subtotal: 12499,
          discount: 2499,
          shippingFee: 0,
          total: 10000,
          appliedCoupon: "NAMASTE20",
          paymentMethod: "UPI",
          paymentStatus: "completed",
          status: "shipped",
          trackingNumber: "QNS-AMB-982341",
          estimatedDelivery: "⚡ Same Day Dispatch from Ambattur",
        },
      ],

      setPincode: (pincode: string) => {
        set({ currentPincode: pincode });
      },

      setUser: (user) => {
        set({ user });
      },

      addOrder: (order: Order) => {
        set({ orders: [order, ...get().orders] });
      },

      getOrderById: (orderIdOrNumber: string) => {
        return get().orders.find(
          (o) => o.id === orderIdOrNumber || o.orderNumber === orderIdOrNumber
        );
      },

      saveAddress: (address: ShippingAddress) => {
        set({ savedAddresses: [...get().savedAddresses, address] });
      },
    }),
    {
      name: "quicknsmart-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
