require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// To run this script, you must provide your Supabase URL and SERVICE_ROLE_KEY in .env.local
// as SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
// Run: node scripts/seed-admin.js

const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seedAdmin() {
  const email = 'admin@kairos.com';
  const password = 'adminpassword123';

  console.log(`Attempting to create admin user: ${email}...`);

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('Successfully seeded admin user!', data.user.id);
  }
}

seedAdmin();
