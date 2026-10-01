import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/** Server Component / Server Action içinde kullanıcı oturumuna göre çalışan client (RLS uygulanır). */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Component içinden çağrıldıysa cookie set edilemez; middleware ile yenilenir.
          }
        },
      },
    },
  );
}

/**
 * Yalnızca server-side kullanılacak, RLS'i bypass eden admin client.
 * Service role key ASLA client'a expose edilmemeli — bu dosya "use client" içermez ve
 * yalnızca Server Actions / Route Handlers içinde import edilmelidir.
 */
export function createSupabaseAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
