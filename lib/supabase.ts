import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Course = Database['public']['Tables']['courses']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];