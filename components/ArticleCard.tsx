import Link  from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/articles'
import { getAuthor }        from '@/lib/authors'

type ArticleCardProps = Pick<
  ArticleMeta,
  'slug' | 'title' | 'excerpt' | 'category' | 'readTime' | 'publishedAt' | 'imageSrc' | 'imageAlt' | 'authorId'
> & {
  priority?: boolean
  size?:     'default' | 'large'
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  readTime,
  publishedAt,
  imageSrc,
  imageAlt,
  authorId,
  priority = false,
  size     = 'default',
}: ArticleCardProps) {
  const isLarge = size === 'large'
  const author  = getAuthor(authorId)

  return (
    <article className={`card group flex flex-col h-full relative ${isLarge ? 'sm:flex-row sm:h-auto' : ''}`}>
      {/* Thumbnail */}
      <Link
        href={`/articles/${slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className={`block overflow-hidden flex-shrink-0 ${isLarge ? 'sm:w-2/5' : ''}`}
      >
        <div className={`relative w-full bg-neutral-100 ${isLarge ? 'h-56 sm:h-full sm:min-h-[220px]' : 'aspect-[16/9]'}`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              sizes={isLarge
                ? '(max-width: 640px) 100vw, 40vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
            />
          ) : (
            // Branded placeholder rendered when an article has no image yet
            <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-neutral-100 to-orange-50 flex items-center justify-center">
              <span className="text-5xl opacity-25" aria-hidden="true">🐾</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-5 ${isLarge ? 'sm:p-6 sm:justify-center' : ''}`}>
        <span className="badge-brand mb-3 self-start">{category}</span>

        <h2 className={`font-serif font-bold text-stone-900 mb-2 leading-snug group-hover:text-brand-600 transition-colors tracking-editorial-sm ${isLarge ? 'text-xl md:text-2xl' : 'text-lg'}`}>
          <Link href={`/articles/${slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h2>

        <p className="text-sm text-stone-500 leading-relaxed flex-1 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center gap-3 text-xs text-stone-400 mt-auto">
          {author && (
            <>
              <span className="text-forest-600 font-semibold">
                {author.name}{author.credentials ? `, ${author.credentials}` : ''}
              </span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </article>
  )
}
