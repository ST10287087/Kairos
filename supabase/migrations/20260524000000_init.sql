-- Create Applications table (from Careers page)
CREATE TABLE IF NOT EXISTS public.applications (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    street_address TEXT,
    apartment TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    intro_video_url TEXT,
    cv_url TEXT,
    certificates_url TEXT,
    headshot_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create Registrations table (from Home/Contact page form)
CREATE TABLE IF NOT EXISTS public.registrations (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    registration_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Note: The user requested to wire the migration files to be created later, 
-- but these provide a basic schema based on the HTML forms provided.
