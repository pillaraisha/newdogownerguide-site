/**
 * /new-dog-owner-guide
 *
 * SEO pillar hub page for new dog owners.
 * Author: Michael Torres (Pet Lifestyle Writer)
 * Covers: before you bring them home, the first week, health & vaccines,
 *         training & behaviour, nutrition, costs and insurance.
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

export const metadata = buildMetadata({
  title: 'New Dog Owner Guide: Everything You Need in Your First Month – New Dog Owner Guide',
  description:
    'The complete guide for first-time dog owners — what to do before you bring your dog home, the critical first week, vet visits, training basics, nutrition, and financial planning.',
  canonical: '/new-dog-owner-guide',
})

const AUTHOR_ID = 'michael-torres'

export default function NewDogOwnerGuide() {
  const author = getAuthor(AUTHOR_ID)

  const firstWeekArticle     = getArticleBySlug('first-week-home-with-your-dog')
  const firstVetArticle      = getArticleBySlug('first-vet-visit-for-a-puppy')
  const insuranceArticle     = getArticleBySlug('best-pet-insurance-for-puppies')
  const newDogArticles       = getArticlesByCategory('new-dog-owner')

  const breadcrumbData = breadcrumbJsonLd([
    { name: 'Home',               href: '/' },
    { name: 'New Dog Owner Guide', href: '/new-dog-owner-guide' },
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
              { label: 'New Dog Owner Guide' },
            ]} />

            <p className="section-eyebrow-light mb-4">New Dog Owner · Complete Starter Guide</p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance leading-tight">
              New Dog Owner Guide
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mb-8 leading-relaxed text-balance">
              Everything you actually need in the first weeks — from puppy-proofing your home to the first vet visit, establishing a routine, and setting up the right financial protection.
            </p>

            {/* Quick-start stat row */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mb-8">
              {[
                { value: 'Week 1',    label: 'Most critical period' },
                { value: '72 hrs',    label: 'First vet visit window' },
                { value: '$500–$1k',  label: 'First-year vet budget' },
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
                { label: 'Before They Come Home', href: '#before' },
                { label: 'The First Week',         href: '#first-week' },
                { label: 'Health & Vet Visits',    href: '#health' },
                { label: 'Training & Behaviour',   href: '#training' },
                { label: 'Nutrition & Feeding',    href: '#nutrition' },
                { label: 'Costs & Insurance',      href: '#costs' },
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
              Getting a dog is one of the most rewarding things you'll do — and one of the most overwhelming. In the first few weeks, you'll face dozens of decisions at once: feeding schedules, toilet training, vet appointments, socialisation windows, and more.
            </p>
            <p className="text-stone-600 leading-relaxed">
              This guide cuts through the noise. It's structured around what actually matters, in the order it actually matters. Start with the sections that are most relevant to where you are right now, and bookmark the rest for later.
            </p>
            <p className="text-stone-600 leading-relaxed">
              One thing we recommend doing in the first week — before anything goes wrong — is getting pet insurance. It's significantly cheaper when your dog is young and healthy, and it protects you from the costs you'll meet in this guide.
            </p>
          </div>

          {/* Featured articles */}
          <div className="mb-12">
            <p className="section-eyebrow mb-4">Start here</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {firstWeekArticle && <ArticleCard {...firstWeekArticle}  priority />}
              {firstVetArticle  && <ArticleCard {...firstVetArticle} />}
              {insuranceArticle && <ArticleCard {...insuranceArticle} />}
            </div>
          </div>

          {/* Mid CTA */}
          <ArticleProtectionCTA placement="mid" categorySlug="new-dog-owner" />

        </div>

        {/* ── Before They Come Home ─────────────────────────────────────────── */}
        <section id="before" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🏠</span>
              <p className="section-eyebrow">Before They Come Home</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              What to prepare before pickup day
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              The 48 hours before your dog arrives are the most important prep window you have. Puppies pick up on stress — the calmer your environment, the smoother the transition.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🛏️"
                title="Set Up a Safe Space"
                description="A crate or pen in a quiet corner gives your dog a secure base to decompress in."
              />
              <TopicCard
                icon="🔒"
                title="Puppy-Proof Your Home"
                description="Cables, toxic plants, small objects, gaps under furniture — a safety audit before arrival."
              />
              <TopicCard
                icon="🛒"
                title="The Essential Shopping List"
                description="What you actually need (and what's clever marketing). A practical gear checklist."
              />
              <TopicCard
                icon="🍽️"
                title="Choose a Food & Have It Ready"
                description="Get the same food your dog's been eating. Switching immediately causes digestive upset."
              />
              <TopicCard
                icon="🐕‍🦺"
                title="Find a Vet Before Arrival"
                description="Book your first appointment before pickup day — schedule for within 72 hours."
              />
              <TopicCard
                icon="🛡️"
                title="Get Pet Insurance First"
                description="The day before or the day of arrival is the ideal time. Pre-existing conditions won't be covered."
              />
            </div>
          </div>
        </section>

        {/* ── The First Week ───────────────────────────────────────────────── */}
        <section id="first-week" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">📅</span>
              <p className="section-eyebrow">The First Week</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Day-by-day priorities for the first seven days
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              The first week sets patterns that will persist for years. Routine, consistency, and calm are the three most important things you can give a new dog.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🚗"
                title="Day 1: The Arrival"
                description="The car ride home, the first room introduction, managing the overwhelm."
                href="/articles/first-week-home-with-your-dog"
              />
              <TopicCard
                icon="🕐"
                title="Days 2–3: Building Routine"
                description="Feeding times, toilet schedule, sleep location — establish the pattern early."
                href="/articles/first-week-home-with-your-dog"
              />
              <TopicCard
                icon="🩺"
                title="Days 4–5: First Vet Visit"
                description="What to bring, what the vet checks, what you'll need to decide on vaccines."
                href="/articles/first-vet-visit-for-a-puppy"
              />
              <TopicCard
                icon="🤝"
                title="Days 6–7: First Personality Signs"
                description="The '3-3-3' rule — three days decompressing, three weeks settling, three months feeling home."
                href="/articles/first-week-home-with-your-dog"
              />
              <TopicCard
                icon="🌙"
                title="Night-Time Crying"
                description="Managing the first nights — crate training vs co-sleeping, and why consistency matters."
              />
              <TopicCard
                icon="🚽"
                title="Toilet Training Basics"
                description="Frequency, supervision, reward timing, and how long it really takes."
              />
            </div>
          </div>
        </section>

        {/* ── Health & Vet Visits ──────────────────────────────────────────── */}
        <section id="health" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🩺</span>
              <p className="section-eyebrow">Health & Vet Visits</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Puppies need more vet visits than adult dogs
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              In the first year, most puppies need 3–4 vet visits just for vaccines. Understanding the schedule upfront makes it less stressful.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="💉"
                title="Puppy Vaccination Schedule"
                description="DHPP, rabies, Bordetella — what each vaccine is for and when your puppy needs it."
                href="/articles/first-vet-visit-for-a-puppy"
              />
              <TopicCard
                icon="🪲"
                title="Parasite Prevention"
                description="Start flea, tick, and heartworm prevention in the first week — before exposure happens."
              />
              <TopicCard
                icon="✂️"
                title="Spay or Neuter Timing"
                description="The evidence on optimal timing has shifted — what your vet will likely recommend."
              />
              <TopicCard
                icon="🦷"
                title="Dental Care from Day One"
                description="The window for tooth brushing acceptance closes fast. Start the habit in week one."
              />
              <TopicCard
                icon="📋"
                title="First-Year Vet Cost Breakdown"
                description="Budget $500–$1,500 for the first year. Here's what that covers and what it doesn't."
                href="/articles/first-vet-visit-for-a-puppy"
              />
              <TopicCard
                icon="🧬"
                title="Health Screening for Your Breed"
                description="Early screening for breed-specific risks — what to ask your vet about."
              />
            </div>
          </div>
        </section>

        {/* ── Training & Behaviour ─────────────────────────────────────────── */}
        <section id="training" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🎓</span>
              <p className="section-eyebrow">Training & Behaviour</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Building a well-behaved dog from day one
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              The socialisation window closes at around 16 weeks. What your puppy is exposed to before then shapes their confidence for life.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🌍"
                title="Socialisation Window (8–16 Weeks)"
                description="Exposure to sounds, people, surfaces, and other animals during this critical period."
              />
              <TopicCard
                icon="📣"
                title="The Four Basic Commands"
                description="Sit, stay, come, and leave it — the foundation of safety and control."
              />
              <TopicCard
                icon="🏠"
                title="Crate Training Done Right"
                description="A crate isn't a punishment — it's a den. How to introduce it positively."
              />
              <TopicCard
                icon="🦷"
                title="Bite Inhibition"
                description="Puppies bite. Teaching bite pressure now prevents injuries later."
              />
              <TopicCard
                icon="😰"
                title="Separation Anxiety Prevention"
                description="Start brief separations from day one — preventing full-blown anxiety later."
              />
              <TopicCard
                icon="🐕‍🦺"
                title="Puppy Classes"
                description="Group classes offer socialisation and structure that home training alone can't replicate."
              />
            </div>
          </div>
        </section>

        {/* ── Nutrition & Feeding ──────────────────────────────────────────── */}
        <section id="nutrition" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🍗</span>
              <p className="section-eyebrow">Nutrition & Feeding</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Feeding your dog the right food, the right way
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Nutrition affects everything — coat quality, joint health, energy, and longevity. The basics are straightforward once you know what to look for.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🏷️"
                title="How to Read a Dog Food Label"
                description="Ingredient lists, AAFCO statements, and the marketing claims to ignore."
              />
              <TopicCard
                icon="📊"
                title="Puppy vs Adult Food"
                description="Life-stage formulas aren't just marketing — large breeds especially need the right calcium ratio."
              />
              <TopicCard
                icon="⚖️"
                title="Portion Sizes & Body Condition"
                description="Overfeeding is the most common nutritional mistake. How to assess your dog's body condition."
              />
              <TopicCard
                icon="⏰"
                title="Feeding Schedule"
                description="Puppies need 3–4 meals per day. Transitioning to twice-daily feeding after 6 months."
              />
            </div>
          </div>
        </section>

        {/* ── Costs & Insurance ────────────────────────────────────────────── */}
        <section id="costs" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">💰</span>
              <p className="section-eyebrow">Costs & Insurance</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Planning the financial side of dog ownership
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Dog ownership costs more than most first-time owners expect. Planning ahead is the difference between a manageable budget and a financial crisis.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="📋"
                title="Annual Cost of Dog Ownership"
                description="$1,500–$3,500/year for a healthy dog. Significantly more if illness or injury strikes."
              />
              <TopicCard
                icon="🚑"
                title="Emergency Vet Costs"
                description="The bill most owners face at least once — what emergencies actually cost."
                href="/articles/emergency-vet-visit-cost"
              />
              <TopicCard
                icon="🛡️"
                title="Why Pet Insurance Matters"
                description="The case for getting insured now — before your puppy's first illness."
                href="/articles/best-pet-insurance-for-puppies"
              />
              <TopicCard
                icon="📅"
                title="First-Year Vet Budget"
                description="Vaccines, spay/neuter, microchipping, parasite prevention — the full first-year estimate."
                href="/articles/first-vet-visit-for-a-puppy"
              />
            </div>
          </div>
        </section>

        {/* ── Inter-hub links ──────────────────────────────────────────────── */}
        <section className="py-12 border-t border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <p className="section-eyebrow mb-4">Related guides</p>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Go deeper on any topic
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  href:        '/dog-symptom-guide',
                  icon:        '🩺',
                  title:       'Dog Symptom Guide',
                  description: 'Know what's normal — and what needs a vet visit.',
                },
                {
                  href:        '/dog-vet-cost-guide',
                  icon:        '🏥',
                  title:       'Dog Vet Cost Guide',
                  description: 'Transparent cost data for every procedure you might face.',
                },
                {
                  href:        '/pet-insurance-guide',
                  icon:        '🛡️',
                  title:       'Pet Insurance Guide',
                  description: 'Everything you need to choose the right coverage.',
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
          <ArticleProtectionCTA placement="end" categorySlug="new-dog-owner" />
        </div>

        {/* ── Discovery module ─────────────────────────────────────────────── */}
        {newDogArticles.length > 0 && (
          <div className="border-t border-stone-100">
            <HubDiscovery
              eyebrow="More guides for new dog owners"
              heading="Everything you need in your first year"
              articles={newDogArticles}
              viewAllHref="/category/new-dog-owner"
              viewAllLabel="Browse all new dog owner guides"
            />
          </div>
        )}

        {/* ── Email signup ─────────────────────────────────────────────────── */}
        <EmailSignup
          variant="dark"
          heading="New dog? We'll walk you through it."
          body="Practical guides for every stage of your first year — delivered to your inbox weekly."
        />

      </div>
    </>
  )
}
