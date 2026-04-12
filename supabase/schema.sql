-- supabase/schema.sql
-- Instructions: Run this in your Supabase SQL Editor

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin'))
);

-- Note: We want to ensure 'john.limpiada@felice.ed.jp' is always an admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    new.id, 
    new.email, 
    CASE WHEN new.email = 'john.limpiada@felice.ed.jp' THEN 'admin' ELSE 'student' END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  color TEXT NOT NULL,
  order_idx INT DEFAULT 0
);

CREATE TABLE public.apps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  description TEXT,
  order_idx INT DEFAULT 0
);

CREATE TABLE public.settings (
  id INT PRIMARY KEY DEFAULT 1,
  background_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop'
);

-- Give RLS Policies (Everything can be read by authenticated users, only admins can write)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Reading: Any authenticated user
CREATE POLICY "Allow read for authenticated" ON public.categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read for authenticated" ON public.apps FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read for authenticated" ON public.settings FOR SELECT TO authenticated USING (true);

-- Writing: Only admins (Role check via function)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  )
$$ LANGUAGE sql SECURITY DEFINER;

CREATE POLICY "Allow all for admins" ON public.categories FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Allow all for admins" ON public.apps FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Allow all for admins" ON public.settings FOR ALL TO authenticated USING (public.is_admin());

-- Insert initial settings row
INSERT INTO public.settings (id) VALUES (1) ON CONFLICT DO NOTHING;
