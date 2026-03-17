import { notFound }  from 'next/navigation'
import Image         from 'next/image'
import Link          from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { getAuthorBySlug, getAllAuthorSlugs } from '@/lib/authors'
import { getArticlesByAuthor } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumb  from '@/components/Breadcrumb'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author   = getAuthorBySlug(slug)
  if (!author) return {}

  return buildMetadata({
    title:       `${author.name} – New Dog Owner Guide`,
    description: author.bio,
    canonical:   `/authors/${slug}`,
  })
}

/** Badge styling by author type */
const AUTHOR_TYPE_LABEL: Record<string, { label: string; className: string }> = {
  veterinarian: { label: 'Licensed Veterinarian',    className: 'bg-forest-100 text-forest-700' },
  broker:       { label: 'Licensed Insurance Broker', className: 'bg-brand-100 text-brand-700' },
  writer:       { label: 'Editorial Writer',          className: 'bg-stone-100 text-stone-700' },
  editor:       { label: 'Research Editor',           className: 'bg-stone-100 text-stone-700' },
  editorial:    { label: 'Editorial Team',            className: 'bg-stone-100 text-stone-700' },
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug }   = await params
  const author     = getAuthorBySlug(slug)
  if (!author) notFound()

  const authorArticles = getArticlesByAuthor(author.id)
  const typeBadge      = AUTHOR_TYPE_LABEL[author.authorType] ?? AUTHOR_TYPE_LABEL.editorial

  return (
    <div className="bg-page min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-10 md:py-14">

        <Breadcrumb items={[
          { label: 'Home',    href: '/' },
          { label: 'Authors', href: '/authors' },
          { label: author.name },
        ]} />

        {/* ── Author header ─────────────────────────────────────────────── */}
        <div className="mt-8 mb-12 flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          {author.imageSrc ? (
            <Image
              src={author.imageSrc}
              alt={author.name}
              width={88}
              height={88}
              className="rounded-full object-cover flex-shrink-0 w-[88px] h-[88px]"
            />
          ) : (
            <div className="flex-shrink-0 w-[88px] h-[88px] rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center text-3xl font-bold text-forest-700">
              {author.name.charAt(0)}
            </div>
          )}

          {/* Details */}
          <div>
            {/* Type badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3 ${typeBadge.className}`}>
              {typeBadge.label}
            </span>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-1">
              {author.name}
              {author.credentials && (
                <span className="text-forest-600 text-xl font-semibold ml-2">
                  {author.credentials}
                </span>
              )}
            </h1>

            <p className="text-stone-500 font-medium mb-4">{author.title}</p>
            <p className="text-stone-700 leading-relaxed max-w-2xl">{author.bio}</p>

            {/* ── Areas of expertise ──────────────────────────────────── */}
            {author.expertise && author.expertise.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-stone-400 mb-2.5">
                  Areas of expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {author.expertise.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Published articles ──────────────────────────────────────────── */}
        {authorArticles.length > 0 ? (
          <>
            <div className="border-t border-stone-200 pt-10">
              <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight mb-6">
                Articles by {author.name.split(' ')[0]}
                <span className="ml-2 text-base font-normal text-stone-400">
                  ({authorArticles.length})
                </span>
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {authorArticles.map((article, i) => (
                  <ArticleCard
                    key={article.slug}
                    {...article}
                    priority={i === 0}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="border-t border-stone-200 pt-10">
            <p className="text-stone-500">No articles published yet.</p>
          </div>
        )}

        {/* ── Back link ──────────────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-brand-600 transition-colors"
          >
            <svg className="w-4 h-4 rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            All authors
          </Link>
        </div>

      </div>
    </div>
  )
}
