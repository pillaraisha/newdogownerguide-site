import type { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
import { CATEGORIES, SITE_URL } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,               lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/category`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/quiz`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/legal`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${SITE_URL}/legal/privacy-policy`,       lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/legal/terms`,                lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/legal/affiliate-disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/legal/disclaimer`,           lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url:             `${SITE_URL}/category/${cat.slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.7,
  }))

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url:             `${SITE_URL}/articles/${article.slug}`,
    lastModified:    article.updatedAt,
    changeFrequency: 'monthly',
    priority:        article.featured ? 0.9 : 0.8,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}
