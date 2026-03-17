'use client'

/**
 * ArticleProtectionCTA
 *
 * Context-aware pet insurance CTA for use inside article pages.
 * Renders article-type-specific copy that connects the article topic
 * to financial protection naturally — no generic messaging.
 *
 * Placements
 * ----------
 * "mid"  — Compact inline card. Place directly after the MDX content block,
 *           before the AuthorCard. Catches the reader at peak intent while
 *           the article topic is still front of mind.
 *
 * "end"  — Dark prominent block. Place after Sources/AuthorCard, before
 *           RelatedArticles. Final action prompt before the reader moves on.
 *
 * Copy variants are keyed by categorySlug (from lib/articles.ts).
 * Unrecognised slugs fall back to generic messaging.
 *
 * Tracking
 * --------
 * Uses fetchLink.articleMid / fetchLink.articleEnd for placement-tagged UTM
 * URLs, and calls trackFetchClick() for GA4 event logging.
 *
 * Usage
 * -----
 * import ArticleProtectionCTA from '@/components/ArticleProtectionCTA'
 *
 * // Mid-article (after MDX content):
 * <ArticleProtectionCTA placement="mid" categorySlug={article.categorySlug} />
 *
 * // End-article (after Sources, before RelatedArticles):
 * <ArticleProtectionCTA placement="end" categorySlug={article.categorySlug} />
 */

import Link from 'next/link'
import { fetchLink } from '@/lib/config'
import { trackFetchClick } from '@/lib/analytics'

// ── Copy types ────────────────────────────────────────────────────────────────

interface CTACopy {
  eyebrow:  string
  headline: string
  body:     string
  cta:      string
}

// ── Mid-article copy — compact card, one per category ─────────────────────────
// Intent: reader just finished the main content. Connect what they just learned
// to the specific financial risk that category represents.

const MID_COPY: Record<string, CTACopy> = {

  // Symptom guides — connect possible escalation to cost exposure
  'dog-health': {
    eyebrow:  'Treatment costs can escalate fast',
    headline: 'One symptom can turn into a $3,000+ vet bill',
    body:     "Diagnosis, imaging, and hospitalisation add up quickly. Fetch Pet Insurance reimburses up to 90% of eligible costs — so the bill doesn't stop you from getting your dog the care they need.",
    cta:      'See My Free Quote',
  },

  // Cost guides — validate the numbers and make the leap to protection
  'vet-costs': {
    eyebrow:  'These costs are real',
    headline: "Most dog owners can't cover a bill this size out of pocket",
    body:     'Fetch Pet Insurance can reimburse up to 90% of eligible vet costs — including surgery, emergency visits, and specialist care. A free quote takes under 2 minutes.',
    cta:      'Get a Free Quote',
  },

  // Insurance guides — reader is already in buying mindset, reduce friction
  'pet-insurance': {
    eyebrow:  'Ready to see your rate?',
    headline: 'Get your personalised Fetch quote in under 2 minutes',
    body:     "Fetch covers accidents, illness, surgeries, and emergency care with up to 90% reimbursement and no per-incident limits. See exactly what you'd pay.",
    cta:      'See My Free Fetch Quote',
  },

  // Breed health — connect predispositions to future cost exposure
  'breed-health': {
    eyebrow:  "Your breed's risk is real",
    headline: 'Breed-specific conditions can cost $5,000+ to treat',
    body:     "Fetch covers hereditary conditions with no breed-specific exclusions — but only if you enrol while your dog is healthy. Pre-existing conditions won't be covered.",
    cta:      'Get a Free Quote',
  },

  // New dog owner — connect early planning to protection before emergencies
  'new-dog-owner': {
    eyebrow:  'The best time to get covered is now',
    headline: 'Insure your dog before their first illness or injury',
    body:     "Most policies won't cover pre-existing conditions. Getting covered while your dog is healthy gives you the widest possible protection. Fetch quotes take under 2 minutes.",
    cta:      'Get My Free Quote',
  },

  // Product reviews — protection for the dog, not just the gear
  'product-reviews': {
    eyebrow:  'Protect the dog too',
    headline: "Great gear matters — so does a financial safety net",
    body:     "The best products help your dog thrive. Fetch Pet Insurance makes sure an unexpected vet bill doesn't undo all that effort. Up to 90% reimbursement on eligible costs.",
    cta:      'Get a Free Quote',
  },
}

// ── End-article copy — dark prominent block, one per category ─────────────────
// Intent: final action before the reader moves to related articles. Stronger
// urgency, cleaner CTA, summarises the protection proposition concisely.

const END_COPY: Record<string, CTACopy> = {

  'dog-health': {
    eyebrow:  'Protect your dog before the next scare',
    headline: "Don't let an unexpected vet bill make the decision for you",
    body:     'Serious symptoms can mean emergency care, surgery, or overnight stays. Fetch covers accidents, illness, and emergency care — get a free personalised quote in under 2 minutes.',
    cta:      'Get My Free Fetch Quote →',
  },

  'vet-costs': {
    eyebrow:  'The cost is real. The coverage is optional.',
    headline: "Don't let a vet bill wipe out your savings",
    body:     'Fetch Pet Insurance covers accidents, illness, surgery, and emergency care with no per-incident limits. Get your personalised quote in under 2 minutes.',
    cta:      'Get My Free Fetch Quote →',
  },

  'pet-insurance': {
    eyebrow:  'Take the next step',
    headline: 'See your personalised Fetch quote — no commitment required',
    body:     'Fetch is one of the most comprehensive pet insurance plans available. Up to 90% reimbursement, no per-incident limits, 24/7 vet helpline. Takes under 2 minutes.',
    cta:      'Get My Free Fetch Quote →',
  },

  'breed-health': {
    eyebrow:  'Protect against breed-specific risks',
    headline: "Don't wait until a predisposed condition appears",
    body:     "Fetch covers hereditary and breed-specific conditions — but only if you're enrolled before they're diagnosed. The best time to get covered is before symptoms show.",
    cta:      'Get My Free Fetch Quote →',
  },

  'new-dog-owner': {
    eyebrow:  'New dog owner tip',
    headline: "The smartest move you can make in your dog's first month",
    body:     'Pet insurance is cheapest when your dog is young and healthy. Fetch covers accidents, illness, and emergency care — get your free quote before anything happens.',
    cta:      'Get My Free Fetch Quote →',
  },

  'product-reviews': {
    eyebrow:  'Protect your dog today',
    headline: "Don't wait for a $5,000 vet bill to get insurance",
    body:     'Fetch Pet Insurance covers accidents, illness, surgery, and emergency care. Get your personalised quote in under 2 minutes.',
    cta:      'Get My Free Fetch Quote →',
  },
}

// ── Fallbacks for any future category slugs ───────────────────────────────────

const FALLBACK_MID: CTACopy = {
  eyebrow:  'Protect your dog',
  headline: 'Could you afford a $5,000 vet bill?',
  body:     'The average dog owner faces at least one major unexpected vet bill. Fetch Pet Insurance reimburses up to 90% of eligible costs — a free quote takes under 2 minutes.',
  cta:      'Get a Free Quote',
}

const FALLBACK_END: CTACopy = {
  eyebrow:  'Protect your dog today',
  headline: "Don't wait for a $5,000 vet bill to get insurance",
  body:     'Fetch Pet Insurance covers accidents, illness, surgery, and emergency care. Get your personalised quote in under 2 minutes.',
  cta:      'Get My Free Fetch Quote →',
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ArticleProtectionCTAProps {
  /** Article's categorySlug from lib/articles.ts — drives copy selection. */
  categorySlug: string
  /** 'mid' = inline card after content; 'end' = dark block before related articles. */
  placement:    'mid' | 'end'
  className?:   string
}

export default function ArticleProtectionCTA({
  categorySlug,
  placement,
  className = '',
}: ArticleProtectionCTAProps) {
  const isMid = placement === 'mid'
  const copy  = isMid
    ? (MID_COPY[categorySlug]  ?? FALLBACK_MID)
    : (END_COPY[categorySlug]  ?? FALLBACK_END)

  const href        = isMid ? fetchLink.articleMid : fetchLink.articleEnd
  const trackingKey = isMid ? 'articleMid'         : 'articleEnd'

  // ── Mid variant — compact inline card ──────────────────────────────────────
  if (isMid) {
    return (
      <aside
        aria-label="Pet insurance call to action"
        className={`not-prose rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-orange-50/60 to-brand-50 p-6 md:p-7 my-8 shadow-sm ${className}`}
      >
        {/* Contextual eyebrow — connects article topic to protection */}
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-600 mb-3">
          {copy.eyebrow}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Copy */}
          <div className="flex-1">
            <p className="font-serif text-xl font-bold text-stone-900 mb-1.5 leading-snug text-balance">
              {copy.headline}
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              {copy.body}
            </p>
          </div>

          {/* CTA button */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackFetchClick(trackingKey)}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-brand hover:shadow-brand-hover whitespace-nowrap"
          >
            {copy.cta}
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

  // ── End variant — dark prominent block ─────────────────────────────────────
  return (
    <div
      aria-label="Pet insurance call to action"
      className={`not-prose mt-12 rounded-2xl bg-neutral-950 p-8 md:p-10 text-center ${className}`}
    >
      <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
        {copy.eyebrow}
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 text-balance leading-snug">
        {copy.headline}
      </h2>
      <p className="text-white/60 mb-6 max-w-md mx-auto text-sm leading-relaxed">
        {copy.body}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() => trackFetchClick(trackingKey)}
        className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-brand hover:shadow-brand-hover"
      >
        {copy.cta}
      </a>
      <p className="mt-4 text-xs text-white/50">
        Sponsored.{' '}
        <a href="/legal/affiliate-disclosure" className="underline hover:text-white/75 transition-colors">
          Affiliate disclosure.
        </a>
      </p>
    </div>
  )
}
