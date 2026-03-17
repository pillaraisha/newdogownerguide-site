/**
 * /dog-vet-cost-guide
 *
 * SEO pillar hub page for dog veterinary costs.
 * Author: Sarah Mitchell (Pet Health Writer)
 * Covers: emergency visits, surgery, diagnostics, specialist care,
 *         routine care, chronic condition management.
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
  title: 'Dog Vet Cost Guide: What Every Procedure Actually Costs – New Dog Owner Guide',
  description:
    'Transparent cost data for every major dog vet procedure — emergency visits, surgery, diagnostics, specialist care, and chronic conditions. Know what to expect before the bill arrives.',
  canonical: '/dog-vet-cost-guide',
})

const AUTHOR_ID = 'sarah-mitchell'

export default function DogVetCostGuide() {
  const author = getAuthor(AUTHOR_ID)

  const aclArticle       = getArticleBySlug('dog-acl-surgery-cost')
  const emergencyArticle = getArticleBySlug('emergency-vet-visit-cost')
  const vetCostArticles  = getArticlesByCategory('vet-costs')

  const breadcrumbData = breadcrumbJsonLd([
    { name: 'Home',               href: '/' },
    { name: 'Dog Vet Cost Guide',  href: '/dog-vet-cost-guide' },
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
              { label: 'Dog Vet Cost Guide' },
            ]} />

            <p className="section-eyebrow-light mb-4">Vet Costs · Cost Reference</p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance leading-tight">
              Dog Vet Cost Guide
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mb-8 leading-relaxed text-balance">
              Transparent, research-backed cost data for every major vet procedure — so you never face a bill without context, and you can plan your dog's care finances confidently.
            </p>

            {/* Cost stat banner */}
            <div className="grid grid-cols-3 gap-3 max-w-sm">
              {[
                { value: '$150–$500', label: 'Emergency visit' },
                { value: '$3,500+',   label: 'ACL surgery' },
                { value: '$200–$600', label: 'X-rays & imaging' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/8 border border-white/12 rounded-xl p-3 text-center">
                  <p className="text-sm md:text-base font-bold text-white">{value}</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Jump links */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2 mt-8">
              {[
                { label: 'Emergency Care',       href: '#emergency' },
                { label: 'Surgery',              href: '#surgery' },
                { label: 'Diagnostics',          href: '#diagnostics' },
                { label: 'Specialist Care',      href: '#specialist' },
                { label: 'Routine Care',         href: '#routine' },
                { label: 'Chronic Conditions',   href: '#chronic' },
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
              The biggest financial shock most dog owners face isn't the routine stuff — it's the bill that arrives with almost no warning. A torn ligament on a Tuesday morning. An emergency clinic visit at midnight. A lump that turns out to be cancer.
            </p>
            <p className="text-stone-600 leading-relaxed">
              This guide is a transparent reference for what dog medical care actually costs in the US. Every figure is based on published veterinary data and real owner-reported costs. We break it down by procedure type so you can <strong>understand any estimate your vet gives you</strong>, and plan your finances accordingly.
            </p>
            <p className="text-stone-600 leading-relaxed">
              The single most effective thing you can do to protect yourself from these costs is pet insurance — specifically, getting covered before anything happens. We'll note coverage relevance throughout each section.
            </p>
          </div>

          {/* Featured articles */}
          {(aclArticle || emergencyArticle) && (
            <div className="mb-12">
              <p className="section-eyebrow mb-4">Featured cost guides</p>
              <div className="grid gap-6 sm:grid-cols-2">
                {aclArticle       && <ArticleCard {...aclArticle}       priority />}
                {emergencyArticle && <ArticleCard {...emergencyArticle} priority />}
              </div>
            </div>
          )}

          {/* Mid CTA */}
          <ArticleProtectionCTA placement="mid" categorySlug="vet-costs" />

        </div>

        {/* ── Emergency Care ───────────────────────────────────────────────── */}
        <section id="emergency" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🚑</span>
              <p className="section-eyebrow">Emergency Care</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Emergency vet costs
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Emergency clinics operate 24/7 and charge a premium for it. The triage fee alone is $150–$500 before any treatment begins.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🏥"
                title="Emergency Visit Cost"
                description="What you pay just to walk in the door — triage fees, exam costs, and how bills escalate."
                href="/articles/emergency-vet-visit-cost"
              />
              <TopicCard
                icon="🌙"
                title="After-Hours Emergency Clinic"
                description="Emergency-only clinics add a 20–40% premium over regular emergency rates."
              />
              <TopicCard
                icon="💉"
                title="IV Fluids & Hospitalisation"
                description="Overnight hospital stays can add $500–$2,000+ per night on top of treatment costs."
              />
              <TopicCard
                icon="🩺"
                title="Emergency Surgery"
                description="Foreign body removal, bloat surgery, and trauma repair in emergency settings."
              />
            </div>
            <div className="mt-6 rounded-xl bg-brand-50 border border-brand-200 p-4 text-sm text-stone-700">
              <strong>Pet insurance reimbursement on emergencies:</strong> Fetch Pet Insurance covers emergency visits, overnight hospitalisation, and emergency surgery — typically reimbursing up to 90% of eligible costs.{' '}
              <Link href="/articles/best-pet-insurance-for-puppies" className="text-brand-600 underline hover:text-brand-700 font-medium transition-colors">
                See how coverage works →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Surgery Costs ────────────────────────────────────────────────── */}
        <section id="surgery" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🔪</span>
              <p className="section-eyebrow">Surgery</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Dog surgery costs
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Surgery is where costs spike fastest. Even routine procedures include anaesthesia, surgical team fees, and post-op care that can double the stated price.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🦴"
                title="ACL / TPLO Surgery"
                description="$3,500–$6,500 per leg. The most common orthopaedic surgery in dogs."
                href="/articles/dog-acl-surgery-cost"
              />
              <TopicCard
                icon="🎈"
                title="Bloat (GDV) Surgery"
                description="$3,000–$7,500+. A life-saving surgery with a tight time window."
              />
              <TopicCard
                icon="🍖"
                title="Foreign Body Removal"
                description="$2,000–$5,000+ depending on location and severity of obstruction."
              />
              <TopicCard
                icon="🔵"
                title="Tumour / Mass Removal"
                description="$500–$5,000+ depending on size, location, and whether it's malignant."
              />
              <TopicCard
                icon="🦷"
                title="Dental Surgery"
                description="$300–$2,500. Extractions, root canals, and jaw fracture repair."
              />
              <TopicCard
                icon="👁️"
                title="Eye Surgery"
                description="Cherry eye repair, cataract surgery, and entropion correction: $500–$4,000+."
              />
            </div>
          </div>
        </section>

        {/* ── Diagnostics ──────────────────────────────────────────────────── */}
        <section id="diagnostics" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🔬</span>
              <p className="section-eyebrow">Diagnostics</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Tests, imaging, and lab work
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Before treatment comes diagnosis. These costs are often invisible until you receive the itemised invoice — and they add up fast.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="📊"
                title="Blood Panel (CBC + Chemistry)"
                description="$80–$250. The baseline for almost every illness workup."
              />
              <TopicCard
                icon="📸"
                title="X-rays / Radiographs"
                description="$150–$400 per set. Required for fractures, foreign bodies, and chest/lung issues."
              />
              <TopicCard
                icon="🔊"
                title="Ultrasound"
                description="$300–$600 for abdominal ultrasound. More for cardiac or specialist scans."
              />
              <TopicCard
                icon="🧲"
                title="MRI / CT Scan"
                description="$2,000–$4,500+. Typically requires a specialist referral and general anaesthesia."
              />
              <TopicCard
                icon="🧫"
                title="Biopsy & Pathology"
                description="$300–$1,500 depending on tissue type and laboratory turnaround."
              />
              <TopicCard
                icon="🦠"
                title="Allergy Testing"
                description="$200–$500 for intradermal testing. Food elimination trials are often recommended first."
              />
            </div>
          </div>
        </section>

        {/* ── Specialist Care ──────────────────────────────────────────────── */}
        <section id="specialist" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🏆</span>
              <p className="section-eyebrow">Specialist Care</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Specialist and referral costs
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Specialists charge 2–4× more than general vets. Your general vet refers you when a case exceeds their expertise or equipment.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🦴"
                title="Veterinary Orthopaedic Surgeon"
                description="$300–$600 consultation + surgical fees. Required for TPLO, hip replacement, etc."
              />
              <TopicCard
                icon="❤️"
                title="Veterinary Cardiologist"
                description="$400–$800 for cardiac evaluation. Echocardiograms add $500–$1,200."
              />
              <TopicCard
                icon="🧠"
                title="Veterinary Neurologist"
                description="$500–$1,000 consultation. MRI required for most neurological diagnoses."
              />
              <TopicCard
                icon="🔬"
                title="Veterinary Oncologist"
                description="Cancer treatment varies widely — chemotherapy courses run $3,000–$10,000+."
              />
              <TopicCard
                icon="👁️"
                title="Veterinary Ophthalmologist"
                description="$200–$500 for specialist eye exams. Surgery adds significantly to this."
              />
              <TopicCard
                icon="🦷"
                title="Veterinary Dentist"
                description="Advanced dental work, root canals, and jaw reconstruction: $500–$3,000+."
              />
            </div>
          </div>
        </section>

        {/* ── Routine Care ─────────────────────────────────────────────────── */}
        <section id="routine" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">📅</span>
              <p className="section-eyebrow">Routine Care</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Annual and preventive care costs
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Budget $500–$1,500 per year for routine care. Costs are higher in the first year (puppy vaccines, spay/neuter) and later years (dental, age-related screening).
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="💉"
                title="Annual Wellness Visit"
                description="$50–$250 for exam + vaccinations. Boosters and Bordetella add to the base cost."
              />
              <TopicCard
                icon="✂️"
                title="Spay / Neuter"
                description="$200–$800 for spay; $150–$500 for neuter. Low-cost clinics offer discounts."
              />
              <TopicCard
                icon="🦷"
                title="Dental Cleaning"
                description="$300–$800 annually. Essential for preventing periodontal disease and pain."
              />
              <TopicCard
                icon="🪲"
                title="Parasite Prevention"
                description="$150–$400/year for flea, tick, heartworm, and intestinal parasite prevention."
              />
            </div>
          </div>
        </section>

        {/* ── Chronic Conditions ───────────────────────────────────────────── */}
        <section id="chronic" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">📋</span>
              <p className="section-eyebrow">Chronic Conditions</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Ongoing treatment costs
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Chronic conditions are the most financially draining category — they don't end. Many are manageable, but the lifetime cost can exceed $20,000–$50,000.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🩸"
                title="Diabetes Management"
                description="$100–$200/month for insulin, syringes, and regular glucose monitoring visits."
              />
              <TopicCard
                icon="💊"
                title="Hypothyroidism"
                description="$20–$50/month for medication + biannual bloodwork. Lifelong condition."
              />
              <TopicCard
                icon="🦴"
                title="Arthritis Management"
                description="$50–$200/month for anti-inflammatories, joint supplements, and pain management."
              />
              <TopicCard
                icon="😤"
                title="Allergies & Atopy"
                description="$100–$400/month for Apoquel/Cytopoint injections plus regular vet check-ins."
              />
              <TopicCard
                icon="🫀"
                title="Heart Disease"
                description="$100–$400/month for cardiac medications and quarterly cardiology check-ups."
              />
              <TopicCard
                icon="🧪"
                title="Kidney Disease"
                description="$100–$500/month depending on stage — prescription diet, fluids, and monitoring."
              />
            </div>
            <p className="mt-6 text-xs text-stone-400">
              Note: Most pet insurance policies do not cover pre-existing conditions. Getting insured while your dog is healthy is the only way to ensure chronic conditions are covered if they develop later.
            </p>
          </div>
        </section>

        {/* ── Inter-hub links ──────────────────────────────────────────────── */}
        <section className="py-12 border-t border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <p className="section-eyebrow mb-4">Related guides</p>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Continue your research
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  href:        '/dog-symptom-guide',
                  icon:        '🩺',
                  title:       'Dog Symptom Guide',
                  description: 'What each symptom could mean — and when to call the vet.',
                },
                {
                  href:        '/pet-insurance-guide',
                  icon:        '🛡️',
                  title:       'Pet Insurance Guide',
                  description: 'Protect against these costs with the right coverage.',
                },
                {
                  href:        '/new-dog-owner-guide',
                  icon:        '🐾',
                  title:       'New Dog Owner Guide',
                  description: 'Everything to set up right in the first weeks.',
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
          <ArticleProtectionCTA placement="end" categorySlug="vet-costs" />
        </div>

        {/* ── Discovery module ─────────────────────────────────────────────── */}
        {vetCostArticles.length > 0 && (
          <div className="border-t border-stone-100">
            <HubDiscovery
              eyebrow="More vet cost guides"
              heading="In-depth cost breakdowns for every procedure"
              articles={vetCostArticles}
              viewAllHref="/category/vet-costs"
              viewAllLabel="Browse all vet cost guides"
            />
          </div>
        )}

        {/* ── Email signup ─────────────────────────────────────────────────── */}
        <EmailSignup
          variant="dark"
          heading="Get vet cost data before you need it"
          body="New cost guides every week — so you're never blindsided by a vet bill again."
        />

      </div>
    </>
  )
}
