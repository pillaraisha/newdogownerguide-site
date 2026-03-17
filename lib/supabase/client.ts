/**
 * lib/supabase/client.ts
 *
 * Browser-side Supabase client for use inside Client Components.
 * Uses @supabase/ssr's createBrowserClient which correctly manages
 * cookie-based auth sessions in Next.js App Router.
 *
 * Usage:
 *   import { createClient } from '@/lib/supabase/client'
 *   const supabase = createClient()
 */
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
