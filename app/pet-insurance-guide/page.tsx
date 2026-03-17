/**
 * /pet-insurance-guide
 *
 * SEO pillar hub page for pet insurance.
 * Author: Aisha Gregory (Pet Insurance & Finance Writer)
 * Covers: understanding coverage, what's included/excluded, comparing plans,
 *         cost factors, reimbursement models, and when to buy.
 */

import Link from 'next/link'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo/metadata'
import { getArticlesByCategory, getArticleBySlug } from '@/lib/articles'
import { getAuthor } from '@/lib/authors'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/ArticleCard'
import TopicCard from '@/components/TopicCard'
import HubDiscovery from '@/components/HubDiscovery'
import ArticleProtectionCTA from '@/components/ArticleProtectionCTA'
import EmailSignup from '@/components/EmailSignup'
import FetchTrackedLink from '@/components/FetchTrackedLink'
import { fetchLink } from '@/lib/config'

export const metadata = buildMetadata({
  title: 'Pet Insurance Guide: How It Works, What It Covers & How to Choose – New Dog Owner Guide',
  description:
    'Everything you need to understand pet insurance — coverage types, reimbursement models, exclusions, cost factors, and how to choose the right plan for your dog.',
  canonical: '/pet-insurance-guide',
})

const AUTHOR_ID = 'aisha-gregory'

export default function PetInsuranceGuide() {
  const author = getAuthor(AUTHOR_ID)

  const insuranceArticle  = getArticleBySlug('best-pet-insurance-for-puppies')
  const aclArticle        = getArticleBySlug('dog-acl-surgery-cost')
  const insuranceArticles = getArticlesByCategory('pet-insurance')

  const breadcrumbData = breadcrumbJsonLd([
    { name: 'Home',               href: '/' },
    { name: 'Pet Insurance Guide', href: '/pet-insurance-guide' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="bg-white">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="bg-neutral-950 pt-16 pb-20 md:pt-20 md:pb-24 relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-forest-500/10 blur-3xl" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Pet Insurance Guide' },
            ]} />

            <p className="section-eyebrow-light mb-4">Pet Insurance · Complete Buyer's Guide</p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance leading-tight">
              Pet Insurance Guide
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mb-8 leading-relaxed text-balance">
              How pet insurance actually works, what it covers, what it doesn't, and how to find a policy that protects you when your dog needs expensive care.
            </p>

            {/* Key fact row */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mb-8">
              {[
                { value: '$30–$80',  label: 'Avg monthly premium' },
                { value: '80–90%',   label: 'Typical reimbursement' },
                { value: '$0',       label: 'Pre-existing coverage' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/8 border border-white/12 rounded-xl p-3 text-center">
                  <p className="text-sm md:text-base font-bold text-white">{value}</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Jump links */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[
                { label: 'How It Works',          href: '#how-it-works' },
                { label: "What's Covered",         href: '#coverage' },
                { label: "What's Excluded",        href: '#exclusions' },
                { label: 'Reimbursement Models',   href: '#reimbursement' },
                { label: 'Cost Factors',           href: '#cost' },
                { label: 'When to Buy',            href: '#when-to-buy' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">

          {/* Editorial intro */}
          <div className="prose prose-stone max-w-none mb-12">
            <p className="text-lg text-stone-700 leading-relaxed">
              Most dog owners learn about pet insurance the hard way — after a $4,000 emergency visit, or when the vet recommends surgery and the estimate lands on the counter. By then, any conditions your dog already has are excluded permanently.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Pet insurance is one of the few financial products where the best time to buy is before you need it — ideally when your dog is young and healthy, before any conditions appear on their medical record. This guide explains exactly how it works so you can make a confident decision.
            </p>
            <p className="text-stone-600 leading-relaxed">
              We cover coverage types, what's excluded and why, how reimbursement works, what drives premiums up and down, and the single most important factor in choosing a policy: <strong>what happens when you actually file a claim</strong>.
            </p>
          </div>

          {/* Featured article */}
          {insuranceArticle && (
            <div className="mb-12">
              <p className="section-eyebrow mb-4">Our top recommendation</p>
              <ArticleCard {...insuranceArticle} size="large" priority />
            </div>
          )}

          {/* Mid CTA — primary affiliate conversion point */}
          <div className="mb-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-8 text-white">
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">🛡️</span>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/60 mb-2">Our recommendation</p>
                <h2 className="font-serif text-2xl font-bold mb-3 text-balance">
                  Fetch Pet Insurance — our top pick for new dog owners
                </h2>
                <ul className="space-y-1.5 mb-6 text-sm text-white/85">
                  {[
                    'Covers accidents, illnesses, and hereditary conditions',
                    'Up to 90% reimbursement on eligible claims',
                    'No per-incident caps — just your annual deductible',
                    'Fast digital claims — average 2–5 business days',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-white/60" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
                <FetchTrackedLink
                  href={fetchLink.articleMid}
                  placement="articleMid"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-600 font-semibold text-sm px-6 py-3 hover:bg-brand-50 transition-colors"
                >
                  Get a free quote from Fetch
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </FetchTrackedLink>
                <p className="mt-3 text-xs text-white/40">
                  Sponsored affiliate link.{' '}
                  <Link href="/legal/affiliate-disclosure" className="underline hover:text-white/60 transition-colors">
                    Disclosure
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">⚙️</span>
              <p className="section-eyebrow">How It Works</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              The mechanics of pet insurance
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Pet insurance works differently from human health insurance. You typically pay the vet in full, then submit a claim for reimbursement — not a direct payment to the provider.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="💳"
                title="Pay First, Claim Later"
                description="Unlike human insurance, you pay your vet in full then submit a claim. Reimbursement typically arrives within days."
              />
              <TopicCard
                icon="📋"
                title="The Claims Process"
                description="Submit itemised invoices + medical records. Most modern insurers accept digital submissions."
              />
              <TopicCard
                icon="🧾"
                title="Deductible Options"
                description="Annual deductible (most common) vs per-incident — annual is better for dogs with recurring conditions."
              />
              <TopicCard
                icon="📊"
                title="Reimbursement Percentage"
                description="Typically 70%, 80%, or 90% of eligible costs after deductible. Higher = higher premium."
              />
              <TopicCard
                icon="📅"
                title="Waiting Periods"
                description="Most policies have a 14-day illness waiting period and 48-hour accident waiting period. Start coverage before anything happens."
              />
              <TopicCard
                icon="💰"
                title="Annual Coverage Limits"
                description="Some plans cap annual payouts at $5,000–$20,000. Unlimited annual coverage is available but costs more."
              />
            </div>
          </div>
        </section>

        {/* ── What's Covered ───────────────────────────────────────────────── */}
        <section id="coverage" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">✅</span>
              <p className="section-eyebrow">What's Covered</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              What comprehensive plans cover
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              A comprehensive accident & illness policy covers the vast majority of significant vet expenses — including emergencies, surgeries, diagnostics, and hereditary conditions.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🚑"
                title="Accidents & Injuries"
                description="Broken bones, lacerations, swallowed objects, poisoning, and trauma from accidents."
              />
              <TopicCard
                icon="🤒"
                title="Illnesses"
                description="Infections, cancer, diabetes, digestive disorders, and most medical conditions."
              />
              <TopicCard
                icon="🔬"
                title="Diagnostics"
                description="X-rays, blood panels, ultrasounds, MRI/CT scans — when prescribed by a vet."
              />
              <TopicCard
                icon="🔪"
                title="Surgery & Hospitalisation"
                description="Most surgeries including orthopaedic, abdominal, and emergency procedures."
              />
              <TopicCard
                icon="🧬"
                title="Hereditary & Congenital Conditions"
                description="Hip dysplasia, heart disease, eye conditions — covered if they develop after policy start."
              />
              <TopicCard
                icon="🧪"
                title="Specialist Referrals"
                description="Cardiologists, oncologists, neurologists — specialist fees are covered under most plans."
              />
            </div>
            <div className="mt-6 rounded-xl bg-brand-50 border border-brand-200 p-4 text-sm text-stone-700">
              <strong>Fetch covers all of the above</strong> with no per-incident caps — just your annual deductible and chosen reimbursement rate.{' '}
              <Link href="/articles/best-pet-insurance-for-puppies" className="text-brand-600 underline hover:text-brand-700 font-medium transition-colors">
                See full coverage details →
              </Link>
            </div>
          </div>
        </section>

        {/* ── What's Excluded ──────────────────────────────────────────────── */}
        <section id="exclusions" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">❌</span>
              <p className="section-eyebrow">What's Excluded</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Common exclusions to understand before buying
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              No policy covers everything. Understanding exclusions before you buy prevents unpleasant surprises when you file a claim.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="📁"
                title="Pre-Existing Conditions"
                description="The most important exclusion. Any condition present before your policy start date — or during the waiting period — is excluded permanently."
              />
              <TopicCard
                icon="🦷"
                title="Routine & Preventive Care"
                description="Annual wellness exams, vaccines, flea/tick prevention, and teeth cleaning are excluded from standard plans (add-on wellness riders available)."
              />
              <TopicCard
                icon="🐣"
                title="Breeding & Pregnancy"
                description="Costs related to breeding, pregnancy, or whelping are excluded across all major policies."
              />
              <TopicCard
                icon="✂️"
                title="Cosmetic / Elective Procedures"
                description="Ear cropping, tail docking, and other elective procedures are not covered."
              />
              <TopicCard
                icon="🪮"
                title="Grooming"
                description="Grooming costs are excluded regardless of whether they're medically recommended."
              />
              <TopicCard
                icon="🏥"
                title="Experimental Treatment"
                description="Unproven or experimental treatments may be excluded depending on the insurer."
              />
            </div>
          </div>
        </section>

        {/* ── Reimbursement Models ─────────────────────────────────────────── */}
        <section id="reimbursement" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">💵</span>
              <p className="section-eyebrow">Reimbursement Models</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              The three ways insurers calculate what they owe you
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              This is one of the most misunderstood aspects of pet insurance — and it significantly affects how much you actually recover on a claim.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🧾"
                title="Actual Vet Bill (Recommended)"
                description="Reimbursement is based on what your vet actually charged. The most transparent model — Fetch uses this."
              />
              <TopicCard
                icon="📊"
                title="Benefit Schedule"
                description="Fixed payouts per procedure regardless of actual cost. Can leave large gaps when bills are high."
              />
              <TopicCard
                icon="📈"
                title="Usual & Customary (UCR)"
                description="Based on 'average' costs in your region. Can pay less than your vet charges if your vet is above average."
              />
              <TopicCard
                icon="⚖️"
                title="Annual vs Per-Incident Deductible"
                description="Annual deductible resets once per year — better for dogs with multiple issues. Per-incident applies fresh to each condition."
              />
            </div>
          </div>
        </section>

        {/* ── Cost Factors ─────────────────────────────────────────────────── */}
        <section id="cost" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">💰</span>
              <p className="section-eyebrow">Cost Factors</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              What determines your premium
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Average premiums range from $30–$80/month for dogs. Several factors push costs up or down significantly.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🐕"
                title="Breed"
                description="High-risk breeds (French Bulldogs, Cavaliers, Labrador Retrievers) cost more to insure. Mixed breeds are often cheaper."
              />
              <TopicCard
                icon="🎂"
                title="Age at Enrollment"
                description="The younger your dog when you enrol, the lower your premium — and the fewer exclusions. Senior dogs pay significantly more."
              />
              <TopicCard
                icon="📍"
                title="Location"
                description="Vet costs vary by state and city. Urban areas in California and New York have the highest premiums."
              />
              <TopicCard
                icon="🎚️"
                title="Your Chosen Settings"
                description="Higher deductible + lower reimbursement % = lower premium. Balance your risk tolerance against out-of-pocket exposure."
              />
              <TopicCard
                icon="📋"
                title="Coverage Level"
                description="Accident-only plans are cheapest. Comprehensive accident & illness costs more but covers far more."
              />
              <TopicCard
                icon="🦷"
                title="Add-On Riders"
                description="Wellness plans add $15–$30/month. Useful if you want coverage for routine visits too."
              />
            </div>
            <p className="mt-6 text-xs text-stone-400">
              Use the comparison table in our{' '}
              <Link href="/articles/best-pet-insurance-for-puppies" className="underline hover:text-brand-500 transition-colors">
                puppy insurance guide
              </Link>{' '}
              to estimate your specific premium based on breed and location.
            </p>
          </div>
        </section>

        {/* ── When to Buy ──────────────────────────────────────────────────── */}
        <section id="when-to-buy" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">⏰</span>
              <p className="section-eyebrow">When to Buy</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              The right time to get covered
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              The optimal window is the first 8 weeks of ownership — but any time before something happens is the right time.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🐣"
                title="Puppies (Best Time)"
                description="Before the first vet visit is ideal — no conditions on record, lowest premium, maximum coverage."
                href="/articles/best-pet-insurance-for-puppies"
              />
              <TopicCard
                icon="🐕"
                title="Adult Dogs (Still Worth It)"
                description="Even healthy adult dogs benefit. Any condition that develops after enrolment is covered."
              />
              <TopicCard
                icon="👴"
                title="Senior Dogs (More Complex)"
                description="Higher premiums, more exclusions — but still valuable if there are no pre-existing conditions."
              />
              <TopicCard
                icon="🚫"
                title="After a Diagnosis — Too Late"
                description="Once a condition is diagnosed, it's a pre-existing condition. You cannot insure retroactively."
              />
            </div>
            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-stone-700">
              <strong>The most expensive mistake:</strong> waiting until your dog is sick or injured to look into insurance. Once something's happened, that condition is excluded for life. The best time to get a quote is before your next vet visit.
            </div>
          </div>
        </section>

        {/* ── Inter-hub links ──────────────────────────────────────────────── */}
        <section className="py-12 border-t border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <p className="section-eyebrow mb-4">Related guides</p>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Understand the costs you're protecting against
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  href:        '/dog-vet-cost-guide',
                  icon:        '🏥',
                  title:       'Dog Vet Cost Guide',
                  description: 'What every treatment and surgery actually costs.',
                },
                {
                  href:        '/dog-symptom-guide',
                  icon:        '🩺',
                  title:       'Dog Symptom Guide',
                  description: 'Recognise when your dog needs care — before it escalates.',
                },
                {
                  href:        '/dog-breed-health-guide',
                  icon:        '🐕',
                  title:       'Breed Health Guide',
                  description: 'The hereditary risks your dog is predisposed to.',
                },
              ].map(({ href, icon, title, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm transition-all duration-200"
                >
                  <span className="text-2xl">{icon}</span>
                  <p className="font-semibold text-stone-900 text-sm group-hover:text-brand-600 transition-colors">{title}</p>
                  <p className="text-xs text-stone-500 leading-relaxed">{description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Author attribution ───────────────────────────────────────────── */}
        {author && (
          <div className="border-t border-stone-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 font-bold text-lg">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-1">Written by</p>
                  <p className="font-semibold text-stone-900">{author.name}</p>
                  <p className="text-sm text-stone-500">{author.title}</p>
                  <p className="text-sm text-stone-500 mt-2 leading-relaxed max-w-lg">{author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── End CTA ──────────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-4">
          <ArticleProtectionCTA placement="end" categorySlug="pet-insurance" />
        </div>

        {/* ── Discovery module ─────────────────────────────────────────────── */}
        {insuranceArticles.length > 0 && (
          <div className="border-t border-stone-100">
            <HubDiscovery
              eyebrow="More pet insurance guides"
              heading="In-depth guides for every insurance question"
              articles={insuranceArticles}
              viewAllHref="/category/pet-insurance"
              viewAllLabel="Browse all pet insurance guides"
            />
          </div>
        )}

        {/* ── Related cost article ─────────────────────────────────────────── */}
        {aclArticle && (
          <div className="border-t border-stone-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <p className="section-eyebrow mb-4">See insurance in action</p>
              <h2 className="font-serif text-xl font-bold text-stone-900 mb-6">
                A real example of what insurance covers
              </h2>
              <div className="max-w-md">
                <ArticleCard {...aclArticle} />
              </div>
            </div>
          </div>
        )}

        {/* ── Email signup ─────────────────────────────────────────────────── */}
        <EmailSignup
          variant="dark"
          heading="Don't wait until your dog needs care"
          body="We'll send you a free insurance checklist and our top picks for every breed and budget."
        />

      </div>
    </>
  )
}
