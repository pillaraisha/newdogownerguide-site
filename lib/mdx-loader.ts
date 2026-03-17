/**
 * lib/mdx-loader.ts
 *
 * Explicit slug → MDX import map.
 * Webpack needs static-analyzable import paths, so we enumerate them here.
 * Add a new entry whenever a new article is published.
 */
import type React from 'react'

type MDXModule = { default: React.ComponentType<Record<string, never>> }

const LOADERS: Record<string, () => Promise<MDXModule>> = {
  'dog-acl-surgery-cost':                   () => import('@/content/articles/dog-acl-surgery-cost.mdx'),
  'emergency-vet-visit-cost':               () => import('@/content/articles/emergency-vet-visit-cost.mdx'),
  'dog-limping-suddenly':                   () => import('@/content/articles/dog-limping-suddenly.mdx'),
  'dog-intestinal-blockage-surgery-cost':   () => import('@/content/articles/dog-intestinal-blockage-surgery-cost.mdx'),
  'dog-mri-cost':                           () => import('@/content/articles/dog-mri-cost.mdx'),
  'dog-blood-test-cost':                    () => import('@/content/articles/dog-blood-test-cost.mdx'),
  'dog-xray-cost':                          () => import('@/content/articles/dog-xray-cost.mdx'),
  'dog-cancer-treatment-cost':              () => import('@/content/articles/dog-cancer-treatment-cost.mdx'),
  'dog-ear-infection-treatment-cost':       () => import('@/content/articles/dog-ear-infection-treatment-cost.mdx'),
  'is-pet-insurance-worth-it':              () => import('@/content/articles/is-pet-insurance-worth-it.mdx'),
  'best-pet-insurance-for-puppies':         () => import('@/content/articles/best-pet-insurance-for-puppies.mdx'),
  'first-vet-visit-for-a-puppy':            () => import('@/content/articles/first-vet-visit-for-a-puppy.mdx'),
  'first-week-home-with-your-dog':          () => import('@/content/articles/first-week-home-with-your-dog.mdx'),
}

export async function loadArticleMDX(slug: string): Promise<MDXModule | null> {
  const loader = LOADERS[slug]
  if (!loader) return null
  try {
    return await loader()
  } catch {
    return null
  }
}

export function getRegisteredSlugs(): string[] {
  return Object.keys(LOADERS)
}
