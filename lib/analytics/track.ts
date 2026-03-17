/**
 * lib/analytics/track.ts
 *
 * Global Window type augmentation + low-level track() primitive.
 * This is the ONE place Window interface is extended — all other files
 * must import from here instead of redeclaring.
 *
 * Usage:
 *   import { track } from '@/lib/analytics'
 *   track('email_signup', { source: 'homepage_hero' })
 */

// ── Global type augmentation (single source of truth) ───────────────────
declare global {
  interface Window {
    gtag?:      (...args: unknown[]) => void
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void
    dataLayer?:  unknown[]
  }
}

export type TrackProperties = Record<string, string | number | boolean | null | undefined>

/**
 * Fire an analytics event to all configured providers.
 * Safe to call server-side — exits early when window is unavailable.
 */
export function track(event: string, properties?: TrackProperties): void {
  if (typeof window === 'undefined') return

  // ── GA4 ─────────────────────────────────────────────────────────────
  window.gtag?.('event', event, properties ?? {})

  // ── Plausible ────────────────────────────────────────────────────────
  if (window.plausible && properties) {
    // Plausible requires all prop values to be non-null strings/numbers
    const props = Object.fromEntries(
      Object.entries(properties).filter(([, v]) => v != null),
    ) as Record<string, string | number>
    window.plausible(event, { props })
  } else {
    window.plausible?.(event)
  }
}
