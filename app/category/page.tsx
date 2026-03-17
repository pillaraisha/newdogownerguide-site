import { buildMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/config'
import { getArticlesByCategory } from '@/lib/articles'

export const metadata = buildMetadata({
  title: 'Browse by Category – New Dog Owner Guide',
  description: 'Explore all content categories: pet insurance, vet costs, dog health, breed health, new dog owner guides, and product reviews.',
  canonical: '/category',
})

export default function CategoryIndexPage() {
  return (
    <div className="bg-white">
      <div className="bg-neutral-950 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Browse by Category</h1>
          <p className="text-xl text-white/60">Find exactly what you need — from vet cost guides to insurance comparisons and breed health.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const count = getArticlesByCategory(cat.slug).length
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card p-6 group cursor-pointer"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h2 className="font-serif text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-500 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-sm text-neutral-500 mb-4 leading-relaxed">{cat.description}</p>
                <span className="text-xs font-medium text-brand-500">{count > 0 ? `${count} article${count !== 1 ? 's' : ''}` : 'Coming soon'} →</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
