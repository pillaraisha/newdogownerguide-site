import Link from 'next/link'

/**
 * TopicCard
 *
 * A card used in hub/pillar pages to represent a topic, symptom category,
 * breed group, or subject cluster. When an `href` is provided, the entire
 * card links to the relevant article or category page and shows a chevron.
 * Without an `href`, it renders as a non-linked teaser for upcoming content.
 *
 * Usage
 * -----
 * // Linked (existing article):
 * <TopicCard icon="🦴" title="Dog Limping" description="Sudden vs gradual onset, when to go to the vet." href="/articles/dog-limping-suddenly" />
 *
 * // Unlinked (future content):
 * <TopicCard icon="🌡️" title="Dog Fever" description="Signs of fever, causes, and home care steps." />
 */

interface TopicCardProps {
  icon:        string
  title:       string
  description: string
  href?:       string
  className?:  string
}

export default function TopicCard({
  icon,
  title,
  description,
  href,
  className = '',
}: TopicCardProps) {
  const inner = (
    <>
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-xl">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-stone-900 text-sm leading-snug mb-1">{title}</p>
        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{description}</p>
      </div>
      {href && (
        <svg
          className="flex-shrink-0 w-4 h-4 text-stone-300 group-hover:text-brand-500 transition-colors"
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
      )}
    </>
  )

  const base = `group flex items-start gap-3.5 rounded-xl border bg-white p-4 transition-all duration-200 ${className}`

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} border-stone-200 hover:border-brand-300 hover:shadow-sm hover:-translate-y-px`}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className={`${base} border-stone-100 opacity-75`}>
      {inner}
    </div>
  )
}
