import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

/**
 * HubDiscovery
 *
 * Editorial discovery block for pillar/hub pages. Shows an eyebrow label,
 * a section heading, and a responsive grid of ArticleCards. An optional
 * "view all" link appears below the grid.
 *
 * Designed to sit at the bottom of hub pages as a "More guides" module,
 * surfacing related articles and driving deeper engagement.
 *
 * Usage
 * -----
 * import HubDiscovery from '@/components/HubDiscovery'
 * import { getArticlesByCategory } from '@/lib/articles'
 *
 * <HubDiscovery
 *   eyebrow="More dog health guides"
 *   heading="Continue reading"
 *   articles={getArticlesByCategory('dog-health')}
 *   viewAllHref="/category/dog-health"
 *   viewAllLabel="Browse all dog health guides"
 * />
 */

interface HubDiscoveryProps {
  eyebrow?:     string
  heading:      string
  articles:     ArticleMeta[]
  viewAllHref?: string
  viewAllLabel?: string
  className?:   string
}

export default function HubDiscovery({
  eyebrow,
  heading,
  articles,
  viewAllHref,
  viewAllLabel = 'Browse all guides',
  className = '',
}: HubDiscoveryProps) {
  if (!articles.length) return null

  return (
    <section className={`py-14 ${className}`} aria-label={heading}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {eyebrow && (
          <p className="section-eyebrow mb-3">{eyebrow}</p>
        )}
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 text-balance leading-snug">
            {heading}
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex-shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              {viewAllLabel} →
            </Link>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} {...article} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
