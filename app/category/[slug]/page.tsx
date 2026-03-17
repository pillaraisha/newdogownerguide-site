import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import { getArticlesByCategory } from '@/lib/articles'
import { CATEGORIES } from '@/lib/config'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumb from '@/components/Breadcrumb'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORIES.find((c) => c.slug === slug)
  if (!cat) return {}
  return buildMetadata({
    title:       `${cat.name} – New Dog Owner Guide`,
    description: cat.description,
    canonical:   `/category/${slug}`,
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug }   = await params
  const category   = CATEGORIES.find((c) => c.slug === slug)
  if (!category) notFound()

  const catArticles = getArticlesByCategory(slug)

  return (
    <div className="bg-white">
      {/* Hero header */}
      <div className="bg-neutral-950 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/category' }, { label: category.name }]} />
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">{category.name}</h1>
          </div>
          <p className="text-xl text-white/60">{category.description}</p>
        </div>
      </div>

      {/* Category nav — other categories */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.slug === slug
                    ? 'bg-brand-500 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Articles */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {catArticles.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {catArticles.map((article, i) => (
              <ArticleCard key={article.slug} {...article} priority={i === 0} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-neutral-400">
            <div className="text-5xl mb-4">{category.icon}</div>
            <p className="text-lg">No articles in this category yet — check back soon.</p>
            <Link href="/articles" className="btn-primary mt-6 inline-flex">Browse all articles</Link>
          </div>
        )}
      </div>
    </div>
  )
}
