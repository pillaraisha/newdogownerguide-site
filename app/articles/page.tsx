import { buildMetadata } from '@/lib/seo/metadata'
import { articles, getArticlesByCategory } from '@/lib/articles'
import { CATEGORIES } from '@/lib/config'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

export const metadata = buildMetadata({
  title: 'All Articles – New Dog Owner Guide',
  description: 'Browse every research-backed guide for first-time dog owners: health, insurance, costs, training, and more.',
  canonical: '/articles',
})

export default function ArticlesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-neutral-950 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Every guide you need as a new dog owner
          </h1>
          <p className="text-xl text-white/60">
            Research-backed, expert-written, and built for first-time dog owners.
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="border-b border-neutral-100 bg-white sticky top-16 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Filter by category" className="flex items-center gap-1 overflow-x-auto pb-0 py-3 scrollbar-none">
            <Link
              href="/articles"
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-brand-500 text-white"
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Article grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} {...article} priority={i < 3} />
          ))}
        </div>

        {articles.length === 0 && (
          <p className="text-center text-neutral-400 py-20">No articles published yet.</p>
        )}
      </div>
    </div>
  )
}
