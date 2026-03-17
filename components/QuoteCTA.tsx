'use client'

/**
 * QuoteCTA — Reusable Fetch Pet Insurance quote CTA
 *
 * A self-contained, prop-driven CTA card for use anywhere on the site
 * that isn't served by the article-specific ArticleProtectionCTA.
 *
 * Typical placements
 * ------------------
 * - Homepage vet cost section (below cost cards)
 * - Top of pet-insurance category articles
 * - Any one-off inline placement
 *
 * The component uses the site's card design system: warm brand-50
 * background, rounded-2xl, serif heading — it reads as an editorial
 * information module, not a banner ad.
 *
 * All href values derive from lib/config.ts → fetchLink, which ensures
 * a single source of truth for the affiliate URL and placement tracking.
 *
 * Usage
 * -----
 * import QuoteCTA from '@/components/QuoteCTA'
 *
 * <QuoteCTA placement="inline" />
 * <QuoteCTA
 *   heading="Ready to see your rate?"
 *   body="Fetch covers accidents, illness, and emergency care..."
 *   buttonText="Get My Free Quote"
 *   placement="articleTop"
 * />
 */

import Link from 'next/link'
import { fetchLink } from '@/lib/config'
import { trackFetchClick } from '@/lib/analytics'

interface QuoteCTAProps {
  /** Serif card headline */
  heading?:    string
  /** Supporting body copy below the headline */
  body?:       string
  /** Button label */
  buttonText?: string
  /** fetchLink key — controls UTM placement tracking */
  placement?:  keyof typeof fetchLink
  className?:  string
}

export default function QuoteCTA({
  heading    = 'Could you afford a $5,000 vet bill?',
  body       = 'The average dog owner faces at least one major surprise vet bill. Fetch Pet Insurance reimburses up to 90% of eligible costs — surgery, emergency visits, and specialist care. A free quote takes under 2 minutes.',
  buttonText = 'Get a Free Fetch Quote',
  placement  = 'inline',
  className  = '',
}: QuoteCTAProps) {
  const href = fetchLink[placement] ?? fetchLink.inline

  return (
    <aside
      aria-label="Pet insurance quote"
      className={`not-prose rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-orange-50/60 to-brand-50 p-6 md:p-8 shadow-sm ${className}`}
    >
      {/* Eyebrow — keeps the module clearly informational in tone */}
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-600 mb-3">
        Protect your dog
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Icon — recognisable shield, not product branding */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-brand-200 flex items-center justify-center text-xl shadow-sm" aria-hidden="true">
          🛡️
        </div>

        {/* Copy */}
        <div className="flex-1">
          <p className="font-serif text-xl font-bold text-stone-900 mb-1.5 leading-snug text-balance">
            {heading}
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            {body}
          </p>
        </div>

        {/* CTA button */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackFetchClick(placement)}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-brand hover:shadow-brand-hover whitespace-nowrap"
        >
          {buttonText}
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      <p className="mt-4 text-xs text-stone-400">
        Sponsored.{' '}
        <Link href="/legal/affiliate-disclosure" className="underline hover:text-stone-600 transition-colors">
          Affiliate disclosure.
        </Link>
      </p>
    </aside>
  )
}
