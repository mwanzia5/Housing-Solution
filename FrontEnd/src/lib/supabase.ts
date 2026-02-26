// ============================================================
//  HomeLink — Supabase Client
//  src/lib/supabase.ts
// ============================================================
//  Setup:
//    1. Copy .env.example to .env.local
//    2. Fill in your Supabase project URL and anon key
//       (Dashboard → Project Settings → API)
// ============================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export default supabase