import Link from 'next/link'
import Image from 'next/image'
import { trackAffiliateClick } from '@/lib/analytics'

export interface AffiliateProductCardProps {
  name:            string
  tagline:         string
  description?:    string
  imageSrc?:       string
  imageAlt?:       string
  rating?:         number
  reviewCount?:    number
  pros?:           string[]
  cons?:           string[]
  bestFor?:        string
  price?:          string
  buttonText?:     string
  buttonHref:      string
  badgeText?:      string
  trackingId?:     string
  showDisclosure?: boolean
  className?:      string
}

function FullStar() {
  return (
    <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  )
}

function EmptyStar() {
  return (
    <svg className="w-4 h-4 text-neutral-200" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  )
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  const full  = Math.floor(rating)
  const empty = 5 - full
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={"Rating: " + rating + " out of 5"}>
        {Array.from({ length: full  }).map((_, i) => <FullStar  key={"f" + i} />)}
        {Array.from({ length: empty }).map((_, i) => <EmptyStar key={"e" + i} />)}
      </div>
      <span className="text-sm font-semibold text-neutral-700">{rating.toFixed(1)}</span>
      {count != null && (
        <span className="text-xs text-neutral-400">({count.toLocaleString()} reviews)</span>
      )}
    </div>
  )
}

export default function AffiliateProductCard({
  name,
  tagline,
  description,
  imageSrc,
  imageAlt,
  rating,
  reviewCount,
  pros           = [],
  cons           = [],
  bestFor,
  price,
  buttonText     = "See Best Price",
  buttonHref,
  badgeText,
  trackingId,
  showDisclosure = true,
  className      = "",
}: AffiliateProductCardProps) {
  const handleClick = () => {
    trackAffiliateClick(trackingId ?? name, "product_card")
  }

  return (
    <aside
      aria-label={"Product card: " + name}
      className={"not-prose rounded-2xl border-2 border-neutral-200 overflow-hidden my-8 bg-white shadow-sm " + className}
    >
      {/* Header */}
      <div className="bg-neutral-950 px-6 py-5 flex items-start justify-between gap-4">
        <div className="flex-1">
          {badgeText && (
            <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2">
              {badgeText}
            </span>
          )}
          <h3 className="font-serif text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{tagline}</p>
        </div>
        {imageSrc && (
          <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10">
            <Image
              src={imageSrc}
              alt={imageAlt ?? name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Rating + price */}
        {(rating != null || price) && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            {rating != null && <StarRating rating={rating} count={reviewCount} />}
            {price && (
              <div className="text-right">
                <span className="text-xs text-neutral-500 block">Starting from</span>
                <span className="text-lg font-bold text-neutral-900">{price}</span>
              </div>
            )}
          </div>
        )}

        {description && (
          <p className="text-sm text-neutral-600 leading-relaxed mb-5">{description}</p>
        )}

        {/* Pros & Cons grid */}
        {(pros.length > 0 || cons.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {pros.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-600 mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-neutral-700">
                      <svg className="w-4 h-4 text-forest-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cons.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-neutral-700">
                      <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Best for callout */}
        {bestFor && (
          <div className="bg-brand-50 border border-brand-100 rounded-xl px-4 py-3 mb-5 flex items-start gap-2">
            <span className="text-brand-500 flex-shrink-0 mt-0.5">🎯</span>
            <div>
              <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Best for: </span>
              <span className="text-sm text-neutral-700">{bestFor}</span>
            </div>
          </div>
        )}

        {/* CTA button */}
        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block w-full text-center bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold text-base py-3.5 px-6 rounded-xl transition-colors shadow-sm"
        >
          {buttonText} →
        </a>

        {/* Disclosure */}
        {showDisclosure && (
          <p className="mt-3 text-xs text-neutral-400 text-center">
            Sponsored affiliate link.{" "}
            <Link href="/legal/affiliate-disclosure" className="underline hover:text-neutral-600 transition-colors">
              Disclosure.
            </Link>
          </p>
        )}
      </div>
    </aside>
  )
}
