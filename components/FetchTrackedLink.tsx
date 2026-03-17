'use client'

/**
 * FetchTrackedLink
 *
 * Thin client wrapper for a Fetch affiliate <a> that fires a GA4 event
 * on click. Exists solely to push the onClick event handler out of
 * Server Component scope — all visual rendering is done by the caller.
 */

import { trackFetchClick } from '@/lib/analytics/events'

interface FetchTrackedLinkProps {
  href: string
  placement: string
  target?: string
  rel?: string
  className?: string
  children: React.ReactNode
}

export default function FetchTrackedLink({
  href,
  placement,
  target,
  rel,
  className,
  children,
}: FetchTrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackFetchClick(placement)}
      target={target}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  )
}
