/**
 * lib/analytics/Analytics.tsx
 *
 * Server Component — injects GA4 + optional Plausible scripts.
 * Uses next/script strategy="afterInteractive" so scripts never
 * block initial render or trigger hydration mismatches.
 */
import Script from 'next/script'

const GA_ID     = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export function Analytics() {
  // Skip outside production — keeps local dev console clean
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <>
      {/* ── Google Analytics 4 ─────────────────────────────────────────── */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      )}

      {/* ── Plausible (privacy-friendly optional alternative) ──────────── */}
      {PLAUSIBLE && (
        <Script
          id="plausible-init"
          data-domain={PLAUSIBLE}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
          defer
        />
      )}
    </>
  )
}
