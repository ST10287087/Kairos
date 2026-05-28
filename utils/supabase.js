import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createStubClient(reason) {
  const error = new Error(reason);
  const stubResponse = async () => ({ data: null, error });
  const queryBuilder = {
    select: stubResponse,
    insert: stubResponse,
    update: stubResponse,
    delete: stubResponse,
    upsert: stubResponse,
    eq: function () { return this; },
    in: function () { return this; },
    order: function () { return this; },
    limit: function () { return this; },
    single: stubResponse,
    then: (resolve) => resolve({ data: null, error }),
  };
  return {
    from: () => queryBuilder,
    auth: {
      signInWithPassword: stubResponse,
      signOut: stubResponse,
      getSession: async () => ({ data: { session: null }, error }),
      getUser: async () => ({ data: { user: null }, error }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  };
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createStubClient(
        'Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      );
