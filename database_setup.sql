-- ZenRows Database Setup Script
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- 1. Create Origins Table
CREATE TABLE IF NOT EXISTS public.origins (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  description TEXT
);

-- 2. Create Destinations Table
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  description TEXT
);

-- 3. Create Combinations Table
CREATE TABLE IF NOT EXISTS public.combinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  origin_id UUID REFERENCES public.origins(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Seed Origins Data
INSERT INTO public.origins (id, name, image, description) VALUES
  ('12359b63-3d93-49ad-90b1-0ef5c44b1ad4', 'Zillow', 'https://dummyimage.com/57x57/fff/aaa', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel eros donec ac odio tempor orci dapibus ultrices in. Congue quisque egestas diam in arcu cursus euismod quis.'),
  ('8d68a2a8-fa9c-439e-962e-b2bf9edf1c9e', 'Redfin', 'https://dummyimage.com/57x57/fff/0a0', 'Odio ut sem nulla pharetra diam sit. Ornare aenean euismod elementum nisi quis eleifend. Tortor vitae purus faucibus ornare suspendisse. Lectus sit amet est placerat.'),
  ('e6215619-d65b-4635-bb66-b49a4ef4d7f0', 'Trulia', 'https://dummyimage.com/57x57/fff/00a', 'Amet consectetur adipiscing elit pellentesque habitant. In massa tempor nec feugiat nisl pretium fusce id velit.'),
  ('bce6ab39-518d-4200-a8bc-3ae92ddebd71', 'Realtor', 'https://dummyimage.com/57x57/fff/a00', 'Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Nec feugiat in fermentum posuere urna nec. Egestas quis ipsum suspendisse ultrices gravida.')
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Destinations Data
INSERT INTO public.destinations (id, name, image, description) VALUES
  ('616204ad-4ce7-4b13-8ad3-dea44a18c85e', 'Amazon S3', 'https://dummyimage.com/57x57/000/eee', 'Turpis egestas pretium aenean pharetra magna ac placerat.'),
  ('56b1d1ab-8e53-42e3-91dd-9a954ca4d89d', 'MySQL', 'https://dummyimage.com/57x57/000/a00', 'Accumsan sit amet nulla facilisi morbi tempus. Placerat in egestas erat imperdiet sed.'),
  ('225e2462-a50c-4efd-b9d0-90b1365fdde1', 'MongoDB', 'https://dummyimage.com/57x57/000/0a0', 'Sagittis purus sit amet volutpat consequat mauris nunc congue nisi.'),
  ('09be0dd4-b673-46f1-9e9f-20d5e36eb1b4', 'PostgreSQL', 'https://dummyimage.com/57x57/000/00a', 'Neque sodales ut etiam sit amet nisl purus in mollis. Ut sem viverra aliquet eget sit.')
ON CONFLICT (id) DO NOTHING;

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.origins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.combinations ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS Policies

-- Origins: Allow all authenticated users to read
CREATE POLICY "Enable read access for all authenticated users" ON public.origins
  FOR SELECT
  TO authenticated
  USING (true);

-- Destinations: Allow all authenticated users to read
CREATE POLICY "Enable read access for all authenticated users" ON public.destinations
  FOR SELECT
  TO authenticated
  USING (true);

-- Combinations: Users can only see their own combinations
CREATE POLICY "Users can view their own combinations" ON public.combinations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Combinations: Users can insert their own combinations
CREATE POLICY "Users can insert their own combinations" ON public.combinations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Combinations: Users can delete their own combinations
CREATE POLICY "Users can delete their own combinations" ON public.combinations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Done! Your database is ready.

