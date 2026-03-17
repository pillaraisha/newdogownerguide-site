/**
 * ArticleSources
 *
 * Reusable sources / references section rendered at the bottom of article pages.
 * Returns null when the sources array is empty or undefined so the template
 * can render it unconditionally without a wrapping conditional.
 *
 * Citation string format
 * ----------------------
 * Each entry in the `sources` array is a plain string. The component renders it
 * as a hyperlink if the string begins with "http", otherwise as plain text.
 *
 * Recommended format for institutional citations:
 *   "American Veterinary Medical Association — Vaccination Guidelines"
 *   "Merck Veterinary Manual — Canine Parvovirus"
 *
 * Use the citation helpers in lib/sources.ts to generate these strings:
 *   import { avma, merck, cornell, vca } from '@/lib/sources'
 *   sources: [avma('Vaccination Guidelines'), merck('Canine Parvovirus')]
 *
 * URL citations are rendered as a plain linked URL:
 *   "https://vcahospitals.com/know-your-pet/first-vet-visit"
 */

interface ArticleSourcesProps {
  sources?:   string[]
  className?: string
}

export default function ArticleSources({
  sources   = [],
  className = '',
}: ArticleSourcesProps) {
  if (!sources || sources.length === 0) return null

  return (
    <div
      className={`not-prose mb-10 rounded-xl border border-stone-200 bg-stone-50 px-6 py-5 ${className}`}
    >
      <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-stone-500 mb-3">
        Sources &amp; References
      </h3>
      <ul className="space-y-1.5">
        {sources.map((source, i) => (
          <li key={i} className="text-sm text-stone-600 flex items-start gap-2">
            <span className="text-stone-300 flex-shrink-0 mt-0.5" aria-hidden="true">–</span>
            {source.startsWith('http') ? (
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-brand-600 transition-colors"
              >
                {source}
              </a>
            ) : (
              <span>{source}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
