export type BadgeType = 'gold' | 'trending' | 'green' | 'blue' | 'sale' | 'purple';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Size: M", "Color: Crimson Red", "Pack: 1kg"
  stock: number;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string; // category slug
  categoryName: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: BadgeType;
  variants?: ProductVariant[];
  details: Record<string, string>;
  features: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isDealOfDay?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  itemCount: number;
  isFeatured: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  quantity: number;
  selectedVariant?: string;
  stock: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  minCartValue: number;
  isFreeShipping?: boolean;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export type OrderStatus = 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  appliedCoupon?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  estimatedDays: string;
  codAvailable: boolean;
  expressDelivery: boolean;
}

