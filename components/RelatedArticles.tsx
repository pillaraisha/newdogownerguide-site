/**
 * RelatedArticles
 *
 * Renders a structured set of related articles at the end of an article page,
 * above the final EmailSignup block.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT THIS COMPONENT DOES
 * ─────────────────────────────────────────────────────────────────────────────
 *  1. Receives pre-computed RelatedArticlesData from getSmartRelatedArticles()
 *     (lib/related-articles.ts) — no selection logic lives here.
 *
 *  2. Shows a "Part of: [Hub Name] →" backlink to the appropriate pillar page.
 *     This reinforces topical authority and gives every article a clean
 *     internal link back to its cluster hub.
 *
 *  3. Renders up to 3 ArticleCards in a responsive grid. Cards come from the
 *     funnel-ordered array (same cluster → supporting → monetisation), so the
 *     natural reading order moves the reader toward the insurance CTA without
 *     any hard-sell labelling.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DIFFERENCES FROM HubDiscovery
 * ─────────────────────────────────────────────────────────────────────────────
 * HubDiscovery (used on hub pages):
 *   – Takes a raw ArticleMeta[] and renders any number of cards
 *   – Designed for editorial browse / topic discovery
 *   – No pillar page link (IS the pillar page)
 *
 * RelatedArticles (used in article pages):
 *   – Takes structured RelatedArticlesData including the pillar ref
 *   – Max 3 cards in funnel slot order
 *   – Includes the pillar backlink
 *   – Sits inline in the article body (not-prose, tight layout)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * USAGE
 * ─────────────────────────────────────────────────────────────────────────────
 * import { getSmartRelatedArticles }    from '@/lib/related-articles'
 * import RelatedArticles               from '@/components/RelatedArticles'
 *
 * // In the article page server component:
 * const relatedData = getSmartRelatedArticles(article)
 * // ...
 * <RelatedArticles data={relatedData} />
 */

import Link        from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import type { RelatedArticlesData } from '@/lib/related-articles'

interface RelatedArticlesProps {
  data:      RelatedArticlesData
  className?: string
}

export default function RelatedArticles({
  data,
  className = '',
}: RelatedArticlesProps) {
  const { articles, pillarPage } = data

  if (!articles.length) return null

  return (
    <section
      aria-label="Related articles"
      className={`not-prose mt-16 pt-10 border-t border-neutral-100 ${className}`}
    >
      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <h2 className="font-serif text-2xl font-bold text-neutral-900">
          Keep reading
        </h2>

        {/* Pillar page backlink — reinforces hub authority */}
        {pillarPage && (
          <Link
            href={pillarPage.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-brand-600 transition-colors group"
            aria-label={`Part of the ${pillarPage.title}`}
          >
            <svg
              className="w-3 h-3 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              {/* Grid / collection icon */}
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="group-hover:underline">
              Part of:{' '}
              <span className="text-stone-600 group-hover:text-brand-600 transition-colors">
                {pillarPage.title}
              </span>
            </span>
            <svg
              className="w-3 h-3 flex-shrink-0 text-stone-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* ── Article grid ────────────────────────────────────────────────────── */}
      {/*
        Cards are in funnel slot order:
          articles[0] — same/related topic cluster
          articles[1] — supporting topic cluster (e.g. cost guide)
          articles[2] — monetisation cluster (e.g. insurance)
        The visual order moves the reader naturally toward financial protection.
      */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  )
}
