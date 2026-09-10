-- ==============================================================================
-- Row Level Security (RLS) Policies for Utsav Kart
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Categories: Public can read, Admins can write
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Categories are manageable by admins" ON public.categories FOR ALL USING (public.is_admin());

-- 2. Products: Public can read, Admins can write
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Products are manageable by admins" ON public.products FOR ALL USING (public.is_admin());

-- 3. Profiles: Users can view/update own profile, Admins can view all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 4. Addresses: Users manage their own addresses
CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- 5. Coupons: Public can read active coupons, Admins manage all
CREATE POLICY "Active coupons are viewable by all" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Coupons are manageable by admins" ON public.coupons FOR ALL USING (public.is_admin());

-- 6. Orders: Users can read own orders, Admins can read & update all
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Admins can update order status" ON public.orders FOR UPDATE USING (public.is_admin());

-- 7. Order Items: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.user_id = auth.uid() OR public.is_admin())
  )
);
CREATE POLICY "Users can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- 8. Reviews: Public can read, Authenticated users can write own review
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

