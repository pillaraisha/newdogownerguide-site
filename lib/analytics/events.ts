/**
 * lib/analytics/events.ts
 *
 * Typed, named event helpers — the only layer that should know about
 * specific event names and their expected properties.
 *
 * Usage:
 *   import { trackQuizStart, trackFetchClick } from '@/lib/analytics'
 *   trackFetchClick('hero')
 */
import { track } from './track'

// ── Quiz funnel ──────────────────────────────────────────────────────────

export function trackQuizStart(): void {
  track('quiz_start')
}

export function trackQuizStep(step: number, stepName: string): void {
  track('quiz_step', { step, step_name: stepName })
}

export function trackQuizEmailCapture(): void {
  track('quiz_email_capture')
}

export function trackQuizComplete(data: {
  pet_type:  string
  pet_age:   string
  dog_size?: string | null
  risk_level: string
}): void {
  track('quiz_complete', data)
}

// ── Email signup ─────────────────────────────────────────────────────────

export function trackEmailSignup(source: string): void {
  track('email_signup', { signup_source: source })
}

// ── Fetch affiliate CTA ──────────────────────────────────────────────────

export function trackFetchClick(placement: string): void {
  track('fetch_quote_click', { placement })
}

// ── Affiliate product clicks ─────────────────────────────────────────────

export function trackAffiliateClick(product: string, placement: string): void {
  track('affiliate_click', { product, placement })
}

// ── Contact form ─────────────────────────────────────────────────────────

export function trackContactSubmit(): void {
  track('contact_form_submit')
}

// ── Content engagement ───────────────────────────────────────────────────

export function trackArticleRead(slug: string, category: string): void {
  track('article_read', { slug, category })
}

export function trackTocClick(heading: string, slug: string): void {
  track('toc_click', { heading, slug })
}
