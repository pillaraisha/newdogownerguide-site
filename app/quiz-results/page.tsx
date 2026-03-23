/**
 * /quiz-results
 *
 * Standalone high-conversion results page for dog owners who have
 * completed (or been linked to) the protection-level quiz.
 *
 * Placement-tracked Fetch CTA uses fetchLink.quiz throughout.
 * All CTAs go through FetchTrackedLink to stay Server Component safe.
 */

import Link from 'next/link'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo/metadata'
import { fetchLink } from '@/lib/config'
import FetchTrackedLink from '@/components/FetchTrackedLink'
import EmailSignup from '@/components/EmailSignup'
import TopicCard from '@/components/TopicCard'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata = buildMetadata({
  title: "Your Dog's Risk Level: What You Need to Know – New Dog Owner Guide",
  description:
    'Based on your answers, unexpected vet costs are a real possibility. Understand your risk level and learn how pet insurance can help reduce financial uncertainty.',
  canonical: '/quiz-results',
  noIndex: true,
})

const FETCH_URL = fetchLink.quiz

// ── Shared arrow icon ────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

// ── Cost data ────────────────────────────────────────────────────────────────
const VET_COSTS = [
  {
    icon:        '🦴',
    title:       'ACL / Cruciate Surgery',
    description: 'One of the most common orthopedic injuries in dogs. Surgery and recovery typically costs $3,000–$7,000 per leg.',
    href:        '/articles/dog-acl-surgery-cost',
  },
  {
    icon:        '🚑',
    title:       'Emergency Vet Visit',
    description: 'After-hours emergency clinic visits — before any treatment — often start at $100–$200. Total bills regularly exceed $1,000–$3,000.',
    href:        '/articles/emergency-vet-visit-cost',
  },
  {
    icon:        '🪢',
    title:       'Intestinal Blockage Surgery',
    description: 'Common in curious dogs who swallow foreign objects. Surgery to remove a blockage costs $2,000–$6,000 and is rarely optional.',
    href:        '/articles/dog-intestinal-blockage-surgery-cost',
  },
]

// ── How insurance works steps ────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    icon:        '📋',
    title:       'You enrol before anything happens',
    description: 'Coverage starts after a short waiting period. Any conditions that arise after your policy start date are eligible for claims.',
  },
  {
    icon:        '💳',
    title:       'You pay the vet, then claim back',
    description: 'Unlike human health insurance, you pay the vet in full, then submit the invoice. Reimbursement is sent directly to you.',
  },
  {
    icon:        '📊',
    title:       'You receive a percentage back',
    description: 'After your annual deductible is met, you are reimbursed a percentage (typically 70–90%) of eligible costs based on your plan.',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default function QuizResultsPage() {
  const breadcrumbData = breadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Dog Protection Quiz', href: '/quiz' },
    { name: 'Your Results', href: '/quiz-results' },
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
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-amber-500/8 blur-3xl" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Quiz', href: '/quiz' },
                { label: 'Your Results' },
              ]}
            />

            {/* Risk badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-[0.1em] px-4 py-2 rounded-full">
                <span aria-hidden="true">⚡</span> Moderate to High Risk
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 text-balance leading-tight">
              Your Dog&apos;s Risk Level:{' '}
              <span className="text-amber-300">Moderate to High</span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 max-w-2xl mb-8 leading-relaxed text-balance">
              Based on your answers, unexpected vet costs are a real possibility.
              Most dog owners in this category will face at least one significant
              vet bill — the question is whether they&apos;re prepared for it.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Takes under 60 seconds', 'No obligation to purchase', 'Free quote'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/8 border border-white/12 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <span aria-hidden="true">✓</span> {label}
                </span>
              ))}
            </div>

            {/* Primary above-fold CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FetchTrackedLink
                href={FETCH_URL}
                placement="quiz_results_hero"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-brand hover:shadow-brand-hover transition-all duration-200 hover:scale-[1.01]"
              >
                Check Your Dog&apos;s Coverage Options
                <ArrowIcon />
              </FetchTrackedLink>
              <Link
                href="/quiz"
                className="inline-flex items-center text-white/50 hover:text-white/80 text-sm font-medium transition-colors py-4"
              >
                ← Retake the quiz
              </Link>
            </div>

            <p className="mt-4 text-xs text-white/35">
              Sponsored affiliate link.{' '}
              <Link href="/legal/affiliate-disclosure" className="underline hover:text-white/55 transition-colors">
                Affiliate disclosure.
              </Link>
            </p>
          </div>
        </div>

        {/* ── Cost reality ─────────────────────────────────────────────────── */}
        <section className="py-14 bg-stone-50/70 border-b border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <p className="section-eyebrow mb-2">Real vet costs</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2 text-balance">
              What these bills actually look like
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-xl leading-relaxed">
              These are typical costs for common dog health events — not rare
              worst-case scenarios. Any of these can happen to an otherwise
              healthy dog with no warning.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {VET_COSTS.map((item) => (
                <TopicCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                />
              ))}
            </div>
            <p className="mt-5 text-xs text-stone-400">
              Cost ranges based on published veterinary data and our cost research guides.{' '}
              <Link href="/dog-vet-cost-guide" className="underline hover:text-brand-500 transition-colors">
                See full vet cost guide →
              </Link>
            </p>
          </div>
        </section>

        {/* ── Problem framing ───────────────────────────────────────────────── */}
        <section className="py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="prose prose-stone max-w-none">
              <p className="section-eyebrow mb-4 not-prose">The reality</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-6 not-prose text-balance">
                Most dog owners are unprepared for large vet bills
              </h2>
              <p className="text-stone-700 leading-relaxed">
                Veterinary costs have risen significantly over the past decade. Treatments
                that were previously unavailable — MRI scans, orthopaedic surgery,
                chemotherapy — are now standard of care in many practices. This is good
                news for dogs, but it means the cost of serious illness or injury has
                increased substantially.
              </p>
              <p className="text-stone-600 leading-relaxed">
                The challenge for most pet owners is that large vet bills arrive
                without warning. A dog that is perfectly healthy on Monday can
                need emergency surgery by Wednesday. There is typically no time
                to plan, save, or comparison-shop when this happens.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Pet insurance is one approach to managing this uncertainty. Like
                all insurance, it works by spreading the risk of an unpredictable
                large expense across a predictable monthly cost. Whether it makes
                financial sense depends on your dog, your finances, and the specific
                policy you choose.
              </p>
            </div>
          </div>
        </section>

        {/* ── Mid-page CTA ─────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pb-14">
          <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">🛡️</span>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/60 mb-2">
                  Pet insurance
                </p>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-white mb-3 text-balance">
                  See what coverage options are available for your dog
                </h2>
                <p className="text-sm text-white/80 mb-6 leading-relaxed max-w-lg">
                  A quote shows you exact premium costs, deductible options, and
                  reimbursement rates for your specific dog — before you commit
                  to anything.
                </p>

                {/* Trust row */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                  {[
                    'Takes under 60 seconds',
                    'No obligation to purchase',
                    'Coverage tailored to your dog',
                  ].map((point) => (
                    <span key={point} className="flex items-center gap-1.5 text-xs text-white/70">
                      <span aria-hidden="true" className="text-white/40">✓</span>
                      {point}
                    </span>
                  ))}
                </div>

                <FetchTrackedLink
                  href={FETCH_URL}
                  placement="quiz_results_mid"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-600 font-semibold text-sm px-6 py-3 hover:bg-brand-50 transition-colors"
                >
                  See Your Personalised Quote
                  <ArrowIcon />
                </FetchTrackedLink>

                <p className="mt-4 text-xs text-white/40">
                  Sponsored affiliate link.{' '}
                  <Link href="/legal/affiliate-disclosure" className="underline hover:text-white/60 transition-colors">
                    Disclosure.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Fetch introduction ────────────────────────────────────────────── */}
        <section className="py-14 bg-stone-50/70 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <p className="section-eyebrow mb-2">About the provider</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-6 text-balance">
              What to know about Fetch Pet Insurance
            </h2>

            <div className="prose prose-stone max-w-none mb-8">
              <p className="text-stone-700 leading-relaxed">
                Fetch is a pet insurance provider that reimburses eligible vet
                expenses after treatment. Like other insurers, Fetch operates on a
                reimbursement model — you pay your vet directly, then submit a
                claim for eligible costs.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Coverage and reimbursement depend on your chosen plan, annual
                deductible, and policy terms. Pre-existing conditions are not
                covered. A quote will show you the specific options available
                for your dog based on breed, age, and location.
              </p>
            </div>

            {/* How it works */}
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-stone-400 mb-4">
              How pet insurance reimbursement works
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {HOW_IT_WORKS.map((item) => (
                <TopicCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-stone-700 leading-relaxed">
              <strong>One important note:</strong> the best time to get coverage is before your
              dog has any diagnosed conditions. Once something appears on your dog&apos;s
              medical record, it is typically excluded as a pre-existing condition — regardless
              of which insurer you choose.
            </div>
          </div>
        </section>

        {/* ── Further reading ───────────────────────────────────────────────── */}
        <section className="py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <p className="section-eyebrow mb-4">Do your research</p>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Understand what you&apos;re protecting against
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  href:        '/dog-vet-cost-guide',
                  icon:        '🏥',
                  title:       'Vet Cost Guide',
                  description: 'Transparent cost breakdowns for surgeries, diagnostics, and emergency care.',
                },
                {
                  href:        '/articles/best-pet-insurance-for-puppies',
                  icon:        '🛡️',
                  title:       'Pet Insurance Guide',
                  description: 'How pet insurance works, what it covers, and how to evaluate a policy.',
                },
                {
                  href:        '/dog-symptom-guide',
                  icon:        '🩺',
                  title:       'Symptom Guide',
                  description: "Common dog symptoms, when to wait, and when to go to the vet.",
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

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <section className="py-14 bg-neutral-950 relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-60 rounded-full bg-brand-500/15 blur-3xl" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <span className="text-4xl mb-5 block" aria-hidden="true">🛡️</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Ready to see what coverage costs for your dog?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto leading-relaxed text-balance">
              A quote gives you actual numbers — premium, deductible options, and
              reimbursement rates — for your specific dog. No commitment required.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                'Takes under 60 seconds',
                'No obligation to purchase',
                'See exact costs for your dog',
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/8 border border-white/12 text-white/65 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <span aria-hidden="true">✓</span> {label}
                </span>
              ))}
            </div>

            <FetchTrackedLink
              href={FETCH_URL}
              placement="quiz_results_end"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base px-10 py-4 rounded-xl shadow-brand hover:shadow-brand-hover transition-all duration-200 hover:scale-[1.01] mb-4"
            >
              Check Your Dog&apos;s Coverage Options
              <ArrowIcon />
            </FetchTrackedLink>

            <p className="text-xs text-white/35 mt-2">
              Sponsored affiliate link.{' '}
              <Link href="/legal/affiliate-disclosure" className="underline hover:text-white/55 transition-colors">
                Affiliate disclosure.
              </Link>
              {' '}Coverage and pricing subject to Fetch&apos;s terms and eligibility requirements.
            </p>
          </div>
        </section>

        {/* ── Email signup ─────────────────────────────────────────────────── */}
        <EmailSignup
          variant="light"
          heading="Get our free dog owner checklist"
          body="Vet cost guides, health tips, and insurance timing advice — all in one printable checklist. Free, no spam."
          source="quiz_results"
        />

      </div>
    </>
  )
}
