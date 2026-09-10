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
        name: "Karthi Krishnan",
        email: "karthi@example.com",
        phone: "9840123456",
        role: "customer",
      },
      currentPincode: "560001",
      savedAddresses: [
        {
          fullName: "Karthi Krishnan",
          phone: "9840123456",
          streetAddress: "42, Heritage Enclave, Anna Nagar",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600001",
          isDefault: true,
        },
      ],
      orders: [
        {
          id: "ord-sample-01",
          orderNumber: "UTSAV-782910",
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
          customer: {
            fullName: "Karthi Krishnan",
            phone: "9840123456",
            streetAddress: "42, Heritage Enclave, Anna Nagar",
            city: "Chennai",
            state: "Tamil Nadu",
            pincode: "600001",
          },
          items: [
            {
              id: "item-01",
              productId: "prod-gour-01",
              productName: "Pure A2 Gir Cow Bilona Cultured Ghee (1 Litre)",
              productImage: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80",
              price: 1899,
              quantity: 1,
            },
          ],
          subtotal: 1899,
          discount: 380,
          shippingFee: 0,
          total: 1519,
          appliedCoupon: "NAMASTE20",
          paymentMethod: "UPI",
          paymentStatus: "completed",
          status: "shipped",
          trackingNumber: "BD982341209IN",
          estimatedDelivery: "In 2 Business Days",
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
      name: "utsav-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

