-- Create a public bucket for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to this bucket (for anyone)
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'uploads');

-- Allow public viewing of files in this bucket
CREATE POLICY "Allow public viewing"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

-- Allow public deletes (optional, so admin can delete via client)
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'uploads');
