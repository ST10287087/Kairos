-- Enable RLS on tables (if not already enabled)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE to insert into applications
CREATE POLICY "Allow public insert on applications" 
ON public.applications FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow ANYONE to select/read applications (needed for Admin Dashboard)
CREATE POLICY "Allow public read on applications" 
ON public.applications FOR SELECT 
TO public 
USING (true);

-- Allow ANYONE to delete applications (needed for Admin Dashboard)
CREATE POLICY "Allow public delete on applications" 
ON public.applications FOR DELETE 
TO public 
USING (true);

-- Allow ANYONE to insert into registrations
CREATE POLICY "Allow public insert on registrations" 
ON public.registrations FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow ANYONE to select/read registrations (needed for Admin Dashboard)
CREATE POLICY "Allow public read on registrations" 
ON public.registrations FOR SELECT 
TO public 
USING (true);

-- Allow ANYONE to delete registrations (needed for Admin Dashboard)
CREATE POLICY "Allow public delete on registrations" 
ON public.registrations FOR DELETE 
TO public 
USING (true);
