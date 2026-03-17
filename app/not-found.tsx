/**
 * app/not-found.tsx
 * Rendered whenever notFound() is called or a URL has no matching route.
 * Surfaces popular categories and featured articles so visitors don't dead-end.
 */

import Link                  from 'next/link'
import { CATEGORIES }        from '@/lib/config'
import { getFeaturedArticles } from '@/lib/articles'
import ArticleCard           from '@/components/ArticleCard'

export default function NotFoundPage() {
  const featured = getFeaturedArticles(3)

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-neutral-950 py-16 text-center px-4">
        <div className="text-7xl mb-4" aria-hidden="true">🐾</div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
          Page not found
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto">
          This page doesn&apos;t exist — but plenty of helpful guides do.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          ← Back to homepage
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 max-w-6xl space-y-14">
        {/* Featured articles */}
        {featured.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Popular guides
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </section>
        )}

        {/* Browse by category */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
            Browse by topic
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card p-5 group flex items-center gap-4 cursor-pointer"
              >
                <span className="text-3xl" aria-hidden="true">{cat.icon}</span>
                <div>
                  <p className="font-semibold text-neutral-800 group-hover:text-brand-500 transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
