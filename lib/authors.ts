/**
 * lib/authors.ts
 * Single source of truth for all author profiles.
 *
 * Articles reference an authorId string; components look up the full profile here.
 * To add a new author:
 *   1. Add an entry to AUTHORS below.
 *   2. Set authorId on the relevant articles in lib/articles.ts.
 *   3. The /authors/[slug] page generates automatically via generateStaticParams.
 *
 * Veterinarian authors
 * --------------------
 * The `veterinarian` AuthorType is reserved for future use when a real licensed
 * veterinarian joins the contributor roster. Do NOT add fictional or unverified
 * veterinarian profiles. The `credentials` field (e.g. "DVM") must only be
 * populated for authors whose credentials have been verified.
 */

export type AuthorType = 'veterinarian' | 'writer' | 'broker' | 'editor' | 'editorial'

export interface AuthorMeta {
  /** Unique identifier — used as authorId in article metadata. */
  id:          string
  /** URL-safe slug — used in /authors/[slug] route. Must match the key in AUTHORS. */
  slug:        string
  name:        string
  /** Job title shown on bylines and author profile pages. */
  title:       string
  /** Professional post-nominal credentials (e.g. "DVM"). Only populate for verified credentials. */
  credentials?: string
  /** Author category — drives how the byline trust signal is styled. */
  authorType:  AuthorType
  bio:         string
  /** Areas of expertise shown on the author profile page. */
  expertise?:  string[]
  /** Optional absolute URL to a headshot. Falls back to an initial avatar if absent. */
  imageSrc?:   string
}

export const AUTHORS: Record<string, AuthorMeta> = {

  // ── Editorial contributors ────────────────────────────────────────────────

  'aisha-gregory': {
    id:         'aisha-gregory',
    slug:       'aisha-gregory',
    name:       'Aisha Gregory',
    title:      'Licensed Insurance Broker',
    authorType: 'broker',
    bio:        'Aisha Gregory is a licensed insurance broker who specializes in helping pet owners understand veterinary cost risks and how insurance can help protect against unexpected medical expenses.',
    expertise:  [
      'Pet insurance',
      'Veterinary cost protection',
      'Insurance reimbursement',
      'Financial planning for pet care',
    ],
  },

  'sarah-mitchell': {
    id:         'sarah-mitchell',
    slug:       'sarah-mitchell',
    name:       'Sarah Mitchell',
    title:      'Pet Health Writer',
    authorType: 'writer',
    bio:        'Sarah Mitchell is a pet health writer who focuses on helping dog owners understand symptoms, veterinary care, and treatment options using reputable veterinary references and educational resources.',
    expertise:  [
      'Dog health education',
      'Dog symptoms',
      'Veterinary care awareness',
      'Pet health research',
    ],
  },

  'daniel-reed': {
    id:         'daniel-reed',
    slug:       'daniel-reed',
    name:       'Daniel Reed',
    title:      'Pet Product Research Editor',
    authorType: 'editor',
    bio:        'Daniel Reed researches and reviews dog products with a focus on safety, durability, and practical usefulness for everyday dog owners.',
    expertise:  [
      'Dog gear',
      'Product testing research',
      'Pet product comparisons',
    ],
  },

  'laura-bennett': {
    id:         'laura-bennett',
    slug:       'laura-bennett',
    name:       'Laura Bennett',
    title:      'Dog Behavior & Training Writer',
    authorType: 'writer',
    bio:        'Laura Bennett writes about dog behavior, training strategies, and helping owners build healthy relationships with their pets.',
    expertise:  [
      'Dog training',
      'Behavioral issues',
      'Puppy development',
    ],
  },

  'michael-torres': {
    id:         'michael-torres',
    slug:       'michael-torres',
    name:       'Michael Torres',
    title:      'Pet Lifestyle Writer',
    authorType: 'writer',
    bio:        'Michael Torres focuses on everyday dog ownership topics including routines, lifestyle tips, and practical guidance for pet owners.',
    expertise:  [
      'Dog ownership tips',
      'Pet lifestyle',
      'Dog routines',
    ],
  },

  // ── Editorial team ────────────────────────────────────────────────────────

  'editorial-team': {
    id:         'editorial-team',
    slug:       'editorial-team',
    name:       'New Dog Owner Guide Editorial Team',
    title:      'Editorial Team',
    authorType: 'editorial',
    bio:        'The New Dog Owner Guide editorial team researches and writes practical, research-backed content to help dog owners make confident decisions for their pets.',
  },
}

// ── Query helpers ─────────────────────────────────────────────────────────────

/** Look up an author by their id. Returns undefined for unknown IDs. */
export function getAuthor(id: string): AuthorMeta | undefined {
  return AUTHORS[id]
}

/** Look up an author by their URL slug (same as id for this codebase). */
export function getAuthorBySlug(slug: string): AuthorMeta | undefined {
  return AUTHORS[slug]
}

/** All author slugs — used by generateStaticParams on the /authors/[slug] page. */
export function getAllAuthorSlugs(): string[] {
  return Object.keys(AUTHORS)
}

/** All author profiles as an array — used by the /authors index page. */
export function getAllAuthors(): AuthorMeta[] {
  return Object.values(AUTHORS)
}
