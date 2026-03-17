/**
 * lib/analytics/index.ts
 *
 * Single barrel export for all analytics utilities.
 *
 * Exports:
 *   <Analytics />          — Server Component, injects GA4 / Plausible scripts
 *   track()                — Low-level event primitive
 *   trackQuizStart()       — Typed quiz funnel events
 *   trackQuizStep()
 *   trackQuizEmailCapture()
 *   trackQuizComplete()
 *   trackEmailSignup()     — Email capture
 *   trackFetchClick()      — Fetch Pet Insurance CTA clicks
 *   trackAffiliateClick()  — Affiliate product clicks
 *   trackContactSubmit()
 *   trackArticleRead()
 *   trackTocClick()
 */

export { Analytics } from './Analytics'
export { track }    from './track'
export type { TrackProperties } from './track'

export {
  trackQuizStart,
  trackQuizStep,
  trackQuizEmailCapture,
  trackQuizComplete,
  trackEmailSignup,
  trackFetchClick,
  trackAffiliateClick,
  trackContactSubmit,
  trackArticleRead,
  trackTocClick,
} from './events'
