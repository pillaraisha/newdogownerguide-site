/**
 * lib/seo/metadata.ts
 *
 * Centralised SEO metadata factory.
 * Wraps Next.js Metadata type with site-wide defaults so every page
 * only needs to override what's different.
 *
 * Usage:
 *   export const metadata = buildMetadata({
 *     title: 'My Page – New Dog Owner Guide',
 *     description: 'Page-specific description.',
 *     canonical: '/my-page',
 *   })
 */
import type { Metadata } from 'next'

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://newdogownerguide.com'
const SITE_NAME = 'New Dog Owner Guide'
const DEFAULT_OG_IMAGE = '/images/og/default-og.jpg'

interface BuildMetadataOptions {
  title:       string
  description: string
  canonical?:  string    // relative path, e.g. '/articles/my-post'
  ogImage?:    string    // absolute URL or relative path
  noIndex?:    boolean
  type?:       'website' | 'article'
  publishedAt?: string   // ISO date for articles
  authors?:    string[]
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage   = DEFAULT_OG_IMAGE,
  noIndex   = false,
  type      = 'website',
  publishedAt,
  authors,
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL
  const ogImageUrl   = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url:       canonicalUrl,
      siteName:  SITE_NAME,
      type,
      images: [
        {
          url:    ogImageUrl,
          width:  1200,
          height: 630,
          alt:    title,
        },
      ],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(authors && { authors }),
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      [ogImageUrl],
      // TODO: Add @NewDogOwnerGuide Twitter/X handle
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
  }
}

/**
 * Structured data helpers (JSON-LD)
 */
export function articleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  modifiedAt,
  authorName,
  isVetAuthored = false,
}: {
  title:          string
  description:    string
  url:            string
  imageUrl?:      string
  publishedAt:    string
  modifiedAt?:    string
  authorName?:    string
  /** True only when the article's author holds veterinary credentials (e.g. DVM). */
  isVetAuthored?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:    title,
    description,
    url,
    image:       imageUrl,
    datePublished:  publishedAt,
    dateModified:   modifiedAt ?? publishedAt,
    publisher: {
      '@type': 'Organization',
      name:    SITE_NAME,
      url:     SITE_URL,
    },
    ...(authorName && {
      author: {
        '@type': 'Person',
        name:    authorName,
        ...(isVetAuthored && { description: 'Doctor of Veterinary Medicine' }),
      },
    }),
  }
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       `${SITE_URL}${item.href}`,
    })),
  }
}
