import Link  from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { buildMetadata }  from '@/lib/seo/metadata'
import { getAllAuthors }   from '@/lib/authors'
import { getArticlesByAuthor } from '@/lib/articles'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = buildMetadata({
  title:       'Our Authors – New Dog Owner Guide',
  description: 'Meet the writers, veterinarians, and experts behind New Dog Owner Guide.',
  canonical:   '/authors',
})

export default function AuthorsPage() {
  const authors = getAllAuthors()

  return (
    <div className="bg-page min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-10 md:py-14">

        <Breadcrumb items={[
          { label: 'Home',    href: '/' },
          { label: 'Authors' },
        ]} />

        <div className="mt-8 mb-10">
          <span className="section-eyebrow">Our team</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            The people behind the guides
          </h1>
          <p className="text-stone-500 max-w-xl leading-relaxed">
            Every article on New Dog Owner Guide is written or reviewed by a specialist — a veterinarian, licensed broker, or subject-matter expert.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {authors.map((author) => {
            const articleCount = getArticlesByAuthor(author.id).length
            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group card p-6 flex items-start gap-4"
              >
                {/* Avatar */}
                {author.imageSrc ? (
                  <Image
                    src={author.imageSrc}
                    alt={author.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover flex-shrink-0 w-14 h-14"
                  />
                ) : (
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center text-xl font-bold text-forest-700 group-hover:bg-forest-200 transition-colors">
                    {author.name.charAt(0)}
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 mb-0.5">
                    <span className="font-serif font-bold text-stone-900 group-hover:text-brand-600 transition-colors">
                      {author.name}
                    </span>
                    {author.credentials && (
                      <span className="text-forest-600 text-sm font-semibold">{author.credentials}</span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 mb-2">{author.title}</p>
                  <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">{author.bio}</p>
                  {articleCount > 0 && (
                    <p className="mt-2 text-xs text-stone-400">
                      {articleCount} article{articleCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
