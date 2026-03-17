import Link  from 'next/link'
import Image from 'next/image'
import type { AuthorMeta } from '@/lib/authors'

interface AuthorCardProps {
  author:     AuthorMeta
  className?: string
}

/**
 * AuthorCard
 * Displays an author's avatar, name, title, bio, and a link to their profile page.
 * Intended for use at the bottom of article pages (inside the .article-prose column).
 * Uses `not-prose` so the card's own styles aren't overridden by Tailwind Typography.
 */
export default function AuthorCard({ author, className = '' }: AuthorCardProps) {
  const initial = author.name.charAt(0)
  const firstName = author.name.split(' ')[0]

  return (
    <aside
      aria-label={`About the author: ${author.name}`}
      className={`not-prose rounded-2xl border border-stone-200 bg-stone-50 p-6 md:p-8 my-10 ${className}`}
    >
      <p className="section-eyebrow mb-5">About the author</p>

      <div className="flex items-start gap-5">
        {/* Avatar — image or initial fallback */}
        <div className="flex-shrink-0">
          {author.imageSrc ? (
            <Image
              src={author.imageSrc}
              alt={author.name}
              width={64}
              height={64}
              className="rounded-full object-cover w-16 h-16"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center text-2xl font-bold text-forest-700"
              aria-hidden="true"
            >
              {initial}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name + credentials on one line */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
            <Link
              href={`/authors/${author.slug}`}
              className="font-serif text-lg font-bold text-stone-900 hover:text-brand-600 transition-colors"
            >
              {author.name}
            </Link>
            {author.credentials && (
              <span className="text-forest-600 text-sm font-semibold">
                {author.credentials}
              </span>
            )}
          </div>

          {/* Title */}
          <p className="text-sm text-stone-500 mb-3">{author.title}</p>

          {/* Bio */}
          <p className="text-sm text-stone-700 leading-relaxed">{author.bio}</p>

          {/* Profile link */}
          <Link
            href={`/authors/${author.slug}`}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            More articles by {firstName}
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  )
}
