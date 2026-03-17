/**
 * lib/config.ts — site-wide constants
 * Single source of truth for affiliate links, brand config, etc.
 */

export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://newdogownerguide.com'
export const SITE_NAME = 'New Dog Owner Guide'
export const SITE_EMAIL = 'hello@newdogownerguide.com'

/** Fetch Pet Insurance affiliate link (brokerportal / firstconnect) */
export const FETCH_QUOTE_URL =
  'https://www.fetchpet.com/mypet?a=FC94899&utm_source=firstconnect&utm_medium=brokerportal&utm_campaign=firstconnect_email&c=firstconnect&p=firstconnect'

/** UTM variants for placement-specific tracking */
export const fetchLink = {
  hero:         `${FETCH_QUOTE_URL}&placement=hero`,
  articleTop:   `${FETCH_QUOTE_URL}&placement=article_top`,
  articleMid:   `${FETCH_QUOTE_URL}&placement=article_mid`,
  articleEnd:   `${FETCH_QUOTE_URL}&placement=article_end`,
  quiz:         `${FETCH_QUOTE_URL}&placement=quiz_results`,
  inline:       `${FETCH_QUOTE_URL}&placement=inline_cta`,
  homepageCosts:`${FETCH_QUOTE_URL}&placement=homepage_costs`,
  footer:       `${FETCH_QUOTE_URL}&placement=footer`,
} as const

export const CATEGORIES = [
  { slug: 'pet-insurance',    name: 'Pet Insurance',    icon: '🛡️', description: 'Honest comparisons, cost guides, and everything you need to choose the right coverage.' },
  { slug: 'vet-costs',        name: 'Vet Costs',        icon: '🏥', description: 'Transparent cost breakdowns for surgeries, treatments, and routine care.' },
  { slug: 'dog-health',       name: 'Dog Health',       icon: '🩺', description: 'Symptom guides, treatment options, and when to call the vet.' },
  { slug: 'breed-health',     name: 'Breed Health',     icon: '🐕', description: 'Health risks, genetic conditions, and care tips for specific breeds.' },
  { slug: 'new-dog-owner',    name: 'New Dog Owner',    icon: '🐾', description: 'First-week guides, puppy checklists, and everything first-timers need.' },
  { slug: 'product-reviews',  name: 'Product Reviews',  icon: '⭐', description: 'Honest, tested reviews of food, gear, and care products.' },
] as const

export type CategorySlug = typeof CATEGORIES[number]['slug']
