/**
 * lib/sources.ts
 *
 * Site-wide approved veterinary reference list for dog health content.
 *
 * Usage in articles
 * -----------------
 * Import the helpers below and spread into the `sources` array on any
 * health or symptom article in lib/articles.ts:
 *
 *   import { avma, merck, cornell, vca, approvedSourceUrl } from '@/lib/sources'
 *
 *   sources: [
 *     avma('Vaccinations for Your Pet'),
 *     merck('Canine Parvovirus'),
 *     cornell('Puppy Care'),
 *     vca('First Vet Visit for Puppies'),
 *   ]
 *
 * Each helper returns a plain string in the format:
 *   "Source Name — Article Title (url)"
 * which the ArticleSources component renders with a linked URL.
 *
 * For non-approved sources (e.g. journal citations), pass a plain string:
 *   'Journal of Veterinary Internal Medicine — Study title (2024)'
 */

// ── Approved source definitions ───────────────────────────────────────────────

export interface ApprovedSource {
  /** Full institutional name */
  name:  string
  /** Common abbreviation shown in citations */
  abbr:  string
  /** Root URL of the institution */
  url:   string
}

/**
 * The four approved veterinary reference institutions for
 * dog health and symptom articles on this site.
 */
export const APPROVED_VET_SOURCES: ApprovedSource[] = [
  {
    name: 'American Veterinary Medical Association',
    abbr: 'AVMA',
    url:  'https://www.avma.org',
  },
  {
    name: 'Merck Veterinary Manual',
    abbr: 'Merck Vet Manual',
    url:  'https://www.merckvetmanual.com',
  },
  {
    name: 'Cornell University Riney Canine Health Center',
    abbr: 'Cornell Vet',
    url:  'https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center',
  },
  {
    name: 'VCA Animal Hospitals',
    abbr: 'VCA',
    url:  'https://vcahospitals.com',
  },
]

// ── Citation builder helpers ───────────────────────────────────────────────────
// Each helper returns a formatted citation string.
// If articleTitle is provided the string becomes:
//   "Source Name — Article Title"
// Otherwise:
//   "Source Name (url)"

function buildCitation(source: ApprovedSource, articleTitle?: string): string {
  if (articleTitle) {
    return `${source.name} — ${articleTitle}`
  }
  return `${source.name} (${source.url})`
}

/** American Veterinary Medical Association citation. */
export const avma = (articleTitle?: string) =>
  buildCitation(APPROVED_VET_SOURCES[0], articleTitle)

/** Merck Veterinary Manual citation. */
export const merck = (articleTitle?: string) =>
  buildCitation(APPROVED_VET_SOURCES[1], articleTitle)

/** Cornell University Riney Canine Health Center citation. */
export const cornell = (articleTitle?: string) =>
  buildCitation(APPROVED_VET_SOURCES[2], articleTitle)

/** VCA Animal Hospitals citation. */
export const vca = (articleTitle?: string) =>
  buildCitation(APPROVED_VET_SOURCES[3], articleTitle)

/**
 * Returns the root URL string for an approved source by abbreviation.
 * Useful when you want to link directly to the institution homepage.
 */
export function approvedSourceUrl(abbr: 'AVMA' | 'Merck Vet Manual' | 'Cornell Vet' | 'VCA'): string {
  return APPROVED_VET_SOURCES.find((s) => s.abbr === abbr)?.url ?? ''
}
