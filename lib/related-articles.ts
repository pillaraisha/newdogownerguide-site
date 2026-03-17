/**
 * lib/related-articles.ts
 *
 * Smart related-article recommendation engine.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS
 * ─────────────────────────────────────────────────────────────────────────────
 * The simple getRelatedArticles() in lib/articles.ts returns same-category
 * articles. That's fine for basic linking but doesn't:
 *   • guide readers through the symptom → cost → insurance funnel
 *   • reinforce pillar page authority with backlinks
 *   • adapt recommendations by article type
 *
 * This module fixes all three problems with a simple, metadata-driven approach.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * RECOMMENDATION RULES
 * ─────────────────────────────────────────────────────────────────────────────
 * Each category defines a three-slot funnel:
 *
 *  Slot A — Same / related topic cluster
 *    The reader just finished a symptom article — show them another symptom.
 *    Keeps them in-topic, increases dwell time.
 *
 *  Slot B — Supporting topic cluster
 *    Natural next step: "here's what that symptom costs to treat."
 *    Moves the reader down the funnel toward financial awareness.
 *
 *  Slot C — Monetisation cluster (pet-insurance)
 *    Closes the funnel: "here's how to protect yourself from that cost."
 *    Direct path toward the Fetch affiliate conversion goal.
 *
 * Category → funnel slot order:
 *
 *  dog-health     → dog-health    → vet-costs    → pet-insurance
 *  vet-costs      → vet-costs     → dog-health   → pet-insurance
 *  breed-health   → breed-health  → vet-costs    → pet-insurance
 *  new-dog-owner  → new-dog-owner → dog-health   → pet-insurance
 *  pet-insurance  → pet-insurance → vet-costs    → dog-health
 *  product-reviews→ product-reviews→ new-dog-owner→ pet-insurance
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SELECTION PRIORITY (within each slot)
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Editorial overrides — article.relatedSlugs are honoured first, in order.
 *    If three editorial picks are defined, the funnel logic is not invoked.
 *    Partial lists are supported: 1–2 editorial picks + funnel fills the rest.
 *
 * 2. Tag overlap score — within each slot's category, the article with the
 *    most shared tags with the current article wins.
 *
 * 3. Recency tiebreak — equal tag scores → most recently published wins.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * PILLAR PAGE BACKLINKS
 * ─────────────────────────────────────────────────────────────────────────────
 * Every category maps to one of the five editorial hub pages. The
 * RelatedArticles component renders a "Part of: [Hub Name] →" link above
 * the article grid, reinforcing pillar page authority with an internal link
 * from every article in that topic cluster.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADDING A NEW CATEGORY
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Add an entry to FUNNEL_ORDER  (e.g. 'dog-training': ['dog-training', 'dog-health', 'pet-insurance'])
 * 2. Add an entry to PILLAR_MAP   (or leave absent if there's no hub page yet)
 * 3. No other changes required.
 */

import { articles, type ArticleMeta, getArticleBySlug } from './articles'

// ── Public types ──────────────────────────────────────────────────────────────

/** A reference to one of the five editorial hub pages. */
export interface PillarPageRef {
  title: string
  href:  string
}

/**
 * The structured result returned by getSmartRelatedArticles().
 * Pass this directly to <RelatedArticles data={...} />.
 */
export interface RelatedArticlesData {
  /** Up to 3 recommended articles, in funnel slot order. */
  articles:     ArticleMeta[]
  /**
   * The hub/pillar page this article belongs to.
   * Undefined for categories that don't yet have a hub page (e.g. product-reviews).
   */
  pillarPage?:  PillarPageRef
}

// ── Configuration ─────────────────────────────────────────────────────────────

/**
 * Maps each categorySlug to the corresponding editorial hub page.
 * Only categories with a live hub page are listed here.
 */
const PILLAR_MAP: Readonly<Record<string, PillarPageRef>> = {
  'dog-health':    { title: 'Dog Symptom Guide',      href: '/dog-symptom-guide' },
  'vet-costs':     { title: 'Dog Vet Cost Guide',     href: '/dog-vet-cost-guide' },
  'breed-health':  { title: 'Dog Breed Health Guide', href: '/dog-breed-health-guide' },
  'new-dog-owner': { title: 'New Dog Owner Guide',    href: '/new-dog-owner-guide' },
  'pet-insurance': { title: 'Pet Insurance Guide',    href: '/pet-insurance-guide' },
}

/**
 * Three-slot funnel order per categorySlug.
 * Tuple: [slot-A: same/related cluster, slot-B: supporting, slot-C: monetisation]
 *
 * The engine fills slots left-to-right, picking the best article from each
 * category pool (by tag overlap). Slots already filled by editorial overrides
 * are skipped.
 */
const FUNNEL_ORDER: Readonly<Record<string, readonly [string, string, string]>> = {
  'dog-health':      ['dog-health',     'vet-costs',      'pet-insurance'],
  'vet-costs':       ['vet-costs',      'dog-health',     'pet-insurance'],
  'breed-health':    ['breed-health',   'vet-costs',      'pet-insurance'],
  'new-dog-owner':   ['new-dog-owner',  'dog-health',     'pet-insurance'],
  'pet-insurance':   ['pet-insurance',  'vet-costs',      'dog-health'],
  'product-reviews': ['product-reviews','new-dog-owner',  'pet-insurance'],
}

/** Used when the current article's categorySlug is not in FUNNEL_ORDER. */
const FALLBACK_FUNNEL: readonly [string, string, string] = [
  'dog-health', 'vet-costs', 'pet-insurance',
]

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * Count the number of tags shared between a candidate article and
 * the tags array of the current article.
 */
function tagOverlapScore(candidate: ArticleMeta, currentTags: string[]): number {
  if (!currentTags.length || !candidate.tags.length) return 0
  return candidate.tags.reduce(
    (count, tag) => count + (currentTags.includes(tag) ? 1 : 0),
    0,
  )
}

/**
 * From the global articles registry, pick the single best candidate
 * that matches `targetCategory`, hasn't been used yet, and isn't the
 * current article. Ranked by tag overlap, then recency.
 *
 * Returns null if no eligible article exists in that category.
 */
function pickBestFromCategory(
  targetCategory: string,
  currentSlug:    string,
  usedSlugs:      ReadonlySet<string>,
  currentTags:    string[],
): ArticleMeta | null {
  const pool = articles.filter(
    (a) => a.categorySlug === targetCategory
        && a.slug          !== currentSlug
        && !usedSlugs.has(a.slug),
  )

  if (!pool.length) return null

  return [...pool].sort((a, b) => {
    const scoreDiff = tagOverlapScore(b, currentTags) - tagOverlapScore(a, currentTags)
    if (scoreDiff !== 0) return scoreDiff
    // Tiebreak: more recently published first
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })[0]
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Generate a structured set of related articles for a given article page.
 *
 * Selection order:
 *  1. Editorial overrides from article.relatedSlugs (respected in full)
 *  2. Funnel-slot logic (fills any remaining slots up to 3 total)
 *  3. Any remaining articles sorted by recency (final backstop)
 *
 * The returned `articles` array is in funnel slot order:
 *  articles[0] — same/related cluster
 *  articles[1] — supporting cluster
 *  articles[2] — monetisation cluster (usually pet-insurance)
 *
 * Usage:
 *   import { getSmartRelatedArticles } from '@/lib/related-articles'
 *   const relatedData = getSmartRelatedArticles(article)
 *   // → pass to <RelatedArticles data={relatedData} />
 */
export function getSmartRelatedArticles(article: ArticleMeta): RelatedArticlesData {
  const result: ArticleMeta[]  = []
  const usedSlugs               = new Set<string>([article.slug])

  // ── Step 1: Honour editorial overrides ─────────────────────────────────────
  // relatedSlugs in lib/articles.ts are editorial hand-picks. Use them first.
  // Partial lists are fine — funnel logic fills whatever remains.
  if (article.relatedSlugs?.length) {
    for (const slug of article.relatedSlugs) {
      if (result.length >= 3) break
      const candidate = getArticleBySlug(slug)
      if (candidate && !usedSlugs.has(candidate.slug)) {
        result.push(candidate)
        usedSlugs.add(candidate.slug)
      }
    }
  }

  // ── Step 2: Fill remaining slots via funnel logic ──────────────────────────
  if (result.length < 3) {
    const slotOrder = FUNNEL_ORDER[article.categorySlug] ?? FALLBACK_FUNNEL

    for (const targetCategory of slotOrder) {
      if (result.length >= 3) break

      // Don't add a second article from a category already represented
      // by an editorial override — respect the editorial intent.
      const categoryAlreadyCovered = result.some(
        (a) => a.categorySlug === targetCategory,
      )
      if (categoryAlreadyCovered) continue

      const best = pickBestFromCategory(
        targetCategory,
        article.slug,
        usedSlugs,
        article.tags,
      )
      if (best) {
        result.push(best)
        usedSlugs.add(best.slug)
      }
    }
  }

  // ── Step 3: Recency backstop — fill any remaining gap ─────────────────────
  // Runs only if the registry is very small and the funnel couldn't find 3.
  if (result.length < 3) {
    const backstop = [...articles]
      .filter((a) => !usedSlugs.has(a.slug))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )

    for (const a of backstop) {
      if (result.length >= 3) break
      result.push(a)
      usedSlugs.add(a.slug)
    }
  }

  return {
    articles:   result,
    pillarPage: PILLAR_MAP[article.categorySlug],
  }
}
