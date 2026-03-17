import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link  from 'next/link'
import type { Metadata } from 'next'
import Script from 'next/script'
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/metadata'
import { getArticleBySlug, getAllSlugs } from '@/lib/articles'
import { getSmartRelatedArticles }      from '@/lib/related-articles'
import { getAuthor } from '@/lib/authors'
import { loadArticleMDX } from '@/lib/mdx-loader'
import Breadcrumb        from '@/components/Breadcrumb'
import TableOfContents   from '@/components/TableOfContents'
import ArticleProtectionCTA from '@/components/ArticleProtectionCTA'
import RelatedArticles   from '@/components/RelatedArticles'
import EmailSignup       from '@/components/EmailSignup'
import AuthorCard        from '@/components/AuthorCard'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'
import ArticleSources    from '@/components/ArticleSources'
import QuoteCTA          from '@/components/QuoteCTA'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug }  = await params
  const article   = getArticleBySlug(slug)
  if (!article) return {}

  const author = getAuthor(article.authorId)
  return buildMetadata({
    title:       `${article.title} – New Dog Owner Guide`,
    description: article.description,
    canonical:   `/articles/${slug}`,
    ogImage:     article.imageSrc,
    type:        'article',
    publishedAt: article.publishedAt,
    authors:     author ? [author.name] : [],
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug }  = await params
  const article   = getArticleBySlug(slug)
  if (!article) notFound()

  const mdxModule = await loadArticleMDX(slug)
  if (!mdxModule) notFound()

  const Content      = mdxModule.default
  const relatedData  = getSmartRelatedArticles(article)
  const author       = getAuthor(article.authorId)

  const ldArticle = articleJsonLd({
    title:         article.title,
    description:   article.description,
    url:           `https://newdogownerguide.com/articles/${slug}`,
    imageUrl:      article.imageSrc,
    publishedAt:   article.publishedAt,
    modifiedAt:    article.updatedAt,
    authorName:    author?.name ?? 'New Dog Owner Guide',
    isVetAuthored: !!author?.credentials,
  })

  const ldBreadcrumb = breadcrumbJsonLd([
    { name: 'Home',           href: '/' },
    { name: 'Articles',       href: '/articles' },
    { name: article.category, href: `/category/${article.categorySlug}` },
    { name: article.title,    href: `/articles/${slug}` },
  ])

  // Resolve disclaimer: true → MedicalDisclaimer default text; string → custom override; absent → hidden
  const showDisclaimer  = !!article.medicalDisclaimer
  const disclaimerText  = typeof article.medicalDisclaimer === 'string'
    ? article.medicalDisclaimer
    : undefined   // undefined → MedicalDisclaimer renders its built-in default

  return (
    <>
      {/* JSON-LD structured data */}
      <Script id="ld-article"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }} />

      <div className="bg-white">
        {/* ── Hero image ──────────────────────────────────────────────────── */}
        <div className="relative w-full h-[50vh] min-h-[320px] max-h-[560px] bg-neutral-900">
          {article.imageSrc ? (
            <Image
              src={article.imageSrc}
              alt={article.imageAlt ?? article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-80"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-brand-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto max-w-4xl">
            <span className="badge-brand mb-3">{article.category}</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
              {article.title}
            </h1>
          </div>
        </div>

        {/* ── Article body ─────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-10">
          <Breadcrumb items={[
            { label: 'Home',           href: '/' },
            { label: 'Articles',       href: '/articles' },
            { label: article.category, href: `/category/${article.categorySlug}` },
            { label: article.title },
          ]} />

          {/* ── Byline ──────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6 pb-6 border-b border-neutral-100">
            {author && (
              <div className="flex items-center gap-2">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-sm font-bold text-forest-700 flex-shrink-0 overflow-hidden">
                  {author.imageSrc ? (
                    <Image src={author.imageSrc} alt={author.name} width={32} height={32} className="object-cover" />
                  ) : (
                    author.name.charAt(0)
                  )}
                </div>
                {/* Name links to author profile */}
                <span>
                  <Link
                    href={`/authors/${author.slug}`}
                    className="font-semibold text-neutral-800 hover:text-brand-600 transition-colors"
                  >
                    {author.name}
                  </Link>
                  {author.credentials && (
                    <span className="text-forest-600 ml-1">{author.credentials}</span>
                  )}
                  <span className="text-neutral-400 ml-1.5 text-xs">· {author.title}</span>
                </span>
              </div>
            )}
            {author && <span aria-hidden="true">·</span>}
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {article.reviewedDate && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Reviewed {new Date(article.reviewedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{article.readTime} min read</span>
            {author?.credentials && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-forest-600 font-medium">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Veterinarian-authored
                </span>
              </>
            )}
          </div>

          {/* ── Medical disclaimer ──────────────────────────────────────── */}
          {showDisclaimer && <MedicalDisclaimer text={disclaimerText} />}

          {/* ── Table of contents ───────────────────────────────────────── */}
          {article.toc && article.toc.length > 0 && (
            <TableOfContents items={article.toc} />
          )}

          {/* ── Top QuoteCTA — pet-insurance articles only ──────────────── */}
          {/* Reader has just seen the headline and TOC and is primed for    */}
          {/* an insurance message before diving into the content.           */}
          {article.categorySlug === 'pet-insurance' && (
            <QuoteCTA
              heading="Get your personalised Fetch quote in under 2 minutes"
              body="Fetch covers accidents, illness, surgeries, and emergency care with up to 90% reimbursement and no per-incident limits. See exactly what you'd pay today."
              buttonText="Get a Free Fetch Quote"
              placement="articleTop"
              className="mb-8"
            />
          )}

          {/* ── MDX content ─────────────────────────────────────────────── */}
          <article className="article-prose">
            <Content />
          </article>

          {/* ── Mid-article CTA — contextual, placed at peak intent ───────── */}
          <ArticleProtectionCTA placement="mid" categorySlug={article.categorySlug} />

          {/* ── Author card ──────────────────────────────────────────────── */}
          {author && <AuthorCard author={author} />}

          {/* ── Sources ─────────────────────────────────────────────────── */}
          <ArticleSources sources={article.sources} />

          {/* ── Email signup — above the final CTA, at peak reading intent ──── */}
          <EmailSignup
            heading="Get dog health guides and vet cost tips — free"
            body="Join thousands of dog owners who get our research-backed articles on dog health, vet costs, and pet insurance delivered weekly. No spam, ever."
            buttonText="Send Me the Guides"
            successMessage="Thanks! You'll receive helpful dog owner tips soon."
            source="article"
            variant="light"
            className="rounded-2xl my-10"
          />

          {/* ── End-article CTA — contextual, before related articles ───────── */}
          <ArticleProtectionCTA placement="end" categorySlug={article.categorySlug} />

          {/* ── Related articles ─────────────────────────────────────────── */}
          <RelatedArticles data={relatedData} />
        </div>
      </div>
    </>
  )
}
