import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://xaeabopurnlsdogobixs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZWFib3B1cm5sc2RvZ29iaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzY4MDcsImV4cCI6MjA0Nzc1MjgwN30.VovvtWOFmdI6CBMjZIKQIAi1sSKsqIkAGjQQpAkpXUk";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Accept': 'application/json'
    }
  }
});