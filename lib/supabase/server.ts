/**
 * lib/supabase/server.ts
 *
 * Server-side Supabase client for use inside Server Components,
 * Route Handlers, and Server Actions.
 *
 * Uses @supabase/ssr's createServerClient which reads/writes cookies
 * via the Next.js `cookies()` API.
 *
 * Usage (Server Component):
 *   import { createClient } from '@/lib/supabase/server'
 *   const supabase = await createClient()
 *   const { data } = await supabase.from('articles').select()
 */
import { createServerClient } from '@supabase/ssr'
import type { CookieMethodsServer } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: Parameters<NonNullable<CookieMethodsServer['setAll']>>[0]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // setAll is called from a Server Component — cookies can't be
            // mutated there, but reads still work fine.
          }
        },
      },
    },
  )
}
