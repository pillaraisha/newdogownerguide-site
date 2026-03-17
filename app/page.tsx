import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import { getFeaturedArticles, getRecentArticles, getArticlesByCategory } from '@/lib/articles'
import { CATEGORIES } from '@/lib/config'
import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import ProtectionCTA from '@/components/ProtectionCTA'
import EmailSignup from '@/components/EmailSignup'
import QuoteCTA from '@/components/QuoteCTA'

export const metadata = buildMetadata({
  title: 'New Dog Owner Guide – Could You Afford a $5,000 Vet Bill?',
  description: 'Research-backed guides, pet insurance comparisons, and cost breakdowns that help new dog owners protect their pet — and their wallet.',
  canonical: '/',
})

const VET_COST_CARDS = [
  { procedure: 'Dog ACL Surgery',             range: '$3,000–$7,000',  icon: '🦴', href: '/articles/dog-acl-surgery-cost' },
  { procedure: 'Emergency Vet Visit',         range: '$1,000–$4,000+', icon: '🚨', href: '/articles/emergency-vet-visit-cost' },
  { procedure: 'Intestinal Blockage Surgery', range: '$3,000–$8,000',  icon: '⚕️', href: '/articles/dog-intestinal-blockage-surgery-cost' },
  { procedure: 'Dog Cancer Treatment',        range: '$5,000–$15,000+',icon: '🩺', href: '/articles/dog-cancer-treatment-cost' },
  { procedure: 'Dog MRI Scan',                range: '$2,000–$5,500',  icon: '🔬', href: '/articles/dog-mri-cost' },
  { procedure: 'Parvovirus Treatment',        range: '$1,500–$4,000',  icon: '💉', href: '/articles/first-vet-visit-for-a-puppy' },
]

const HEALTH_CONCERNS = [
  { emoji: '🦿', label: 'My Dog Is Limping',        href: '/articles/dog-limping-suddenly' },
  { emoji: '🤢', label: 'My Dog Is Vomiting',        href: '/articles/emergency-vet-visit-cost' },
  { emoji: '🍫', label: 'My Dog Ate Something Bad',  href: '/articles/dog-intestinal-blockage-surgery-cost' },
  { emoji: '🍽️', label: 'My Dog Is Not Eating',     href: '/category/dog-health' },
  { emoji: '💩', label: 'My Dog Has Diarrhea',       href: '/category/dog-health' },
  { emoji: '😴', label: 'My Dog Is Very Lethargic',  href: '/category/dog-health' },
]

export default function HomePage() {
  const featuredArticles     = getFeaturedArticles(3)
  const recentArticles       = getRecentArticles(3)
  const insuranceArticles    = getArticlesByCategory('pet-insurance').slice(0, 3)

  return (
    <>
      {/* ── Section 1: Hero ────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Section 2: Vet Cost Reality ───────────────────────────────────── */}
      <section aria-label="Vet cost reality check" className="bg-page py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Editorial eyebrow — plain text, not a pill badge */}
            <span className="section-eyebrow">Why It Matters</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4 text-balance tracking-tight">
              The vet bills that wipe out savings accounts
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              These aren&apos;t worst-case scenarios. They&apos;re common procedures that dog owners face every day — often with no warning.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {VET_COST_CARDS.map((card) => (
              <Link
                key={card.procedure}
                href={card.href}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-stone-200 bg-white hover:border-brand-200 hover:bg-brand-50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-stone-100 shadow-sm flex items-center justify-center text-2xl">
                  {card.icon}
                </div>
                <div>
                  <p className="font-semibold text-stone-700 group-hover:text-brand-600 transition-colors text-sm">{card.procedure}</p>
                  <p className="text-lg font-bold text-stone-900">{card.range}</p>
                </div>
                <svg className="w-4 h-4 text-stone-300 group-hover:text-brand-400 ml-auto flex-shrink-0 transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
            ))}
          </div>

          {/* QuoteCTA — appears directly below cost data while financial context is top of mind */}
          <QuoteCTA
            heading="These aren't worst-case scenarios. Is your dog covered?"
            body="Fetch Pet Insurance can reimburse up to 90% of eligible vet costs — surgery, emergency visits, and specialist care. A personalised quote takes under 2 minutes."
            buttonText="Get a Fetch Pet Insurance Quote"
            placement="homepageCosts"
            className="mb-8"
          />

          {/* Secondary action */}
          <div className="text-center">
            <Link href="/articles" className="btn-secondary">
              Browse all vet cost guides →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 3: Dog Health Concern Hub ─────────────────────────────── */}
      <section aria-label="Dog health concerns" className="bg-page-alt py-16 md:py-20 border-y border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-3 text-balance tracking-tight">
              What&apos;s going on with your dog right now?
            </h2>
            <p className="text-stone-500 leading-relaxed max-w-lg mx-auto">
              Get research-backed guidance on the most common concerns new owners face.
            </p>
          </div>

          {/* Full-width grid — rows with icon container + label + chevron */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {HEALTH_CONCERNS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-200 hover:border-brand-300 hover:shadow-card transition-all duration-200"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center text-xl group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                  {item.emoji}
                </span>
                <span className="text-sm font-semibold text-stone-700 group-hover:text-brand-600 transition-colors leading-snug flex-1">
                  {item.label}
                </span>
                <svg className="w-4 h-4 text-stone-300 group-hover:text-brand-400 flex-shrink-0 transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/category/dog-health" className="btn-secondary">
              Browse all health guides →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 4: Insurance Education ────────────────────────────────── */}
      <section aria-label="Insurance education" className="bg-page py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-eyebrow">Pet Insurance</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-3 text-balance tracking-tight">
              Everything you need to know about pet insurance
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
              Cut through the jargon. These guides explain what&apos;s actually covered, how much it costs, and whether it&apos;s worth it for your dog.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insuranceArticles.map((article, i) => (
              <ArticleCard key={article.slug} {...article} priority={i === 0} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/category/pet-insurance" className="btn-secondary">
              All insurance guides →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 4b: ProtectionCTA (full) ──────────────────────────────── */}
      <ProtectionCTA placement="inline" />

      {/* ── Section 5: Featured Guides ────────────────────────────────────── */}
      <section aria-label="Featured guides" className="bg-page-alt py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-eyebrow">Editor&apos;s Picks</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-3 tracking-tight">
              Guides every new dog owner reads first
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, i) => (
              <ArticleCard key={article.slug} {...article} priority={i === 0} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/articles" className="btn-secondary">
              Browse all articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Browse categories row ──────────────────────────────────────────── */}
      <section aria-label="Browse by category" className="bg-page border-y border-stone-200 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-2xl font-bold text-stone-900 mb-8 tracking-tight">Browse by topic</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-white hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 text-sm font-medium text-stone-700 transition-all duration-200"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Email Signup — Lead Magnet ─────────────────────────── */}
      <EmailSignup
        heading="Get the Free New Dog Owner Starter Checklist"
        body="Everything a new dog owner needs to know — vet costs, health basics, insurance timing, and money-saving tips — in one printable checklist. Join thousands of dog owners who already have it."
        buttonText="Send Me the Free Checklist"
        successMessage="Thanks! You'll receive helpful dog owner tips soon."
        source="homepage"
      />
    </>
  )
}
