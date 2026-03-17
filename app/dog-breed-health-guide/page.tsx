/**
 * /dog-breed-health-guide
 *
 * SEO pillar hub page for dog breed-specific health.
 * Author: Sarah Mitchell (Pet Health Writer)
 * Covers: large breeds, small breeds, flat-faced (brachycephalic) breeds,
 *         working/active breeds, genetic conditions, breed predispositions.
 */

import Link from 'next/link'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo/metadata'
import { getArticlesByCategory } from '@/lib/articles'
import { getAuthor } from '@/lib/authors'
import Breadcrumb from '@/components/Breadcrumb'
import TopicCard from '@/components/TopicCard'
import HubDiscovery from '@/components/HubDiscovery'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'
import ArticleProtectionCTA from '@/components/ArticleProtectionCTA'
import EmailSignup from '@/components/EmailSignup'

export const metadata = buildMetadata({
  title: 'Dog Breed Health Guide: Know Your Breed's Risks – New Dog Owner Guide',
  description:
    'Breed-specific health guides covering genetic conditions, common predispositions, and what to watch for in large, small, flat-faced, and working dog breeds.',
  canonical: '/dog-breed-health-guide',
})

const AUTHOR_ID = 'sarah-mitchell'

export default function DogBreedHealthGuide() {
  const author = getAuthor(AUTHOR_ID)
  const breedArticles = getArticlesByCategory('breed-health')

  const breadcrumbData = breadcrumbJsonLd([
    { name: 'Home',                    href: '/' },
    { name: 'Dog Breed Health Guide',   href: '/dog-breed-health-guide' },
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
              { label: 'Dog Breed Health Guide' },
            ]} />

            <p className="section-eyebrow-light mb-4">Breed Health · Genetic Risk Reference</p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance leading-tight">
              Dog Breed Health Guide
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mb-8 leading-relaxed text-balance">
              Every breed carries specific health predispositions. Know what conditions your dog is most at risk for — so you can catch signs early and insure before they appear.
            </p>

            {/* Jump links */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[
                { label: 'Large Breeds',         href: '#large-breeds' },
                { label: 'Small Breeds',          href: '#small-breeds' },
                { label: 'Flat-Faced Breeds',     href: '#brachycephalic' },
                { label: 'Working Breeds',        href: '#working-breeds' },
                { label: 'Genetic Conditions',    href: '#genetic' },
                { label: 'Screening & Testing',   href: '#screening' },
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

          {/* Medical disclaimer */}
          <MedicalDisclaimer />

          {/* Editorial intro */}
          <div className="prose prose-stone max-w-none mb-12">
            <p className="text-lg text-stone-700 leading-relaxed">
              Selective breeding has made dogs extraordinarily diverse — but it has also concentrated certain genetic traits that predispose specific breeds to predictable health conditions. Understanding your dog's breed profile isn't just interesting. It's the foundation of proactive, cost-effective care.
            </p>
            <p className="text-stone-600 leading-relaxed">
              This guide covers the most common health risks by breed group. Whether you own a French Bulldog, a German Shepherd, or a Labrador Retriever, knowing what conditions to watch for lets you act early — when treatment is less complex and less expensive.
            </p>
            <p className="text-stone-600 leading-relaxed">
              One important caveat: breed predispositions are statistical tendencies, not certainties. Your dog may never develop the condition your breed is known for. But if they do, and you're not insured, you may face a $3,000–$10,000+ bill you weren't prepared for. Fetch Pet Insurance covers hereditary conditions — but only if you enrol before they're diagnosed.
            </p>
          </div>

          {/* Insurance pre-enrol callout */}
          <div className="not-prose mb-12 rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-4 items-start">
            <span className="text-2xl flex-shrink-0" aria-hidden="true">⚠️</span>
            <div>
              <p className="font-semibold text-stone-900 mb-1">Pre-existing conditions aren't covered</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pet insurance only covers conditions that develop <em>after</em> your policy starts. If your Labrador develops hip dysplasia before you get insured, that condition is excluded permanently. The best time to get covered is now — while your dog is healthy.
              </p>
            </div>
          </div>

          {/* Mid CTA */}
          <ArticleProtectionCTA placement="mid" categorySlug="breed-health" />

        </div>

        {/* ── Large Breeds ─────────────────────────────────────────────────── */}
        <section id="large-breeds" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🐕</span>
              <p className="section-eyebrow">Large Breeds</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Health risks for large and giant breeds
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Large breeds (50+ lbs) are predisposed to joint disease, bloat, and heart conditions. Their size increases surgical risk and costs significantly.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🦴"
                title="Hip Dysplasia — Labs, Shepherds, Goldens"
                description="Malformed hip joints lead to pain and arthritis. Common in retrievers and shepherds."
              />
              <TopicCard
                icon="🎈"
                title="Bloat (GDV) — Deep-Chested Breeds"
                description="Great Danes, Dobermanns, and Weimeraners have significantly elevated bloat risk."
              />
              <TopicCard
                icon="❤️"
                title="Dilated Cardiomyopathy — Dobermann"
                description="DCM affects Dobermanns at extremely high rates — often developing silently."
              />
              <TopicCard
                icon="🦵"
                title="Elbow Dysplasia — German Shepherd"
                description="Malformed elbow joints causing lameness — common in German Shepherds and Labs."
              />
              <TopicCard
                icon="🧠"
                title="Degenerative Myelopathy — German Shepherd"
                description="Progressive spinal cord disease — similar to ALS in humans. No cure."
              />
              <TopicCard
                icon="🔵"
                title="Osteosarcoma — Large Breeds"
                description="Bone cancer is far more common in large and giant breeds. High amputation and chemo costs."
              />
            </div>
          </div>
        </section>

        {/* ── Small Breeds ─────────────────────────────────────────────────── */}
        <section id="small-breeds" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🐩</span>
              <p className="section-eyebrow">Small Breeds</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Health risks for small and toy breeds
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Small breeds often live longer than large breeds, but they're predisposed to dental disease, luxating patellas, and collapsed tracheas.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🦷"
                title="Dental Disease — Toy Breeds"
                description="Small mouths mean crowded teeth. Periodontal disease causes pain and systemic illness."
              />
              <TopicCard
                icon="🦵"
                title="Luxating Patella — Pomeranians, Chihuahuas"
                description="Kneecap dislocation is common in toy breeds — ranges from mild to requiring $2,000+ surgery."
              />
              <TopicCard
                icon="🌀"
                title="Tracheal Collapse — Yorkshire Terriers"
                description="A honking cough is the hallmark sign. Managed medically or surgically in severe cases."
              />
              <TopicCard
                icon="❤️"
                title="Mitral Valve Disease — Cavaliers, Dachshunds"
                description="Heart murmurs develop in most Cavalier King Charles Spaniels by age 10."
              />
              <TopicCard
                icon="🧠"
                title="Hydrocephalus — Chihuahuas"
                description="Fluid on the brain — common in toy breeds, particularly dome-headed Chihuahuas."
              />
              <TopicCard
                icon="📍"
                title="Legg-Calvé-Perthes Disease — Small Breeds"
                description="Deterioration of the hip joint in dogs under 20 lbs — most common in Yorkies and Maltese."
              />
            </div>
          </div>
        </section>

        {/* ── Brachycephalic Breeds ────────────────────────────────────────── */}
        <section id="brachycephalic" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🐾</span>
              <p className="section-eyebrow">Flat-Faced Breeds</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Brachycephalic breeds: French Bulldogs, Pugs, Bulldogs
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Flat-faced breeds have compressed airways that lead to a cluster of breathing and structural problems. They are among the most expensive breeds to insure and treat.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="😮‍💨"
                title="BOAS (Brachycephalic Obstructive Airway Syndrome)"
                description="Stenotic nares, elongated soft palate, and narrow trachea — surgery often needed."
              />
              <TopicCard
                icon="🔥"
                title="Overheating / Heat Stroke Risk"
                description="Flat-faced dogs overheat much faster and can't pant efficiently. A genuine danger in summer."
              />
              <TopicCard
                icon="👁️"
                title="Eye Problems — Cherry Eye, Proptosis"
                description="Prominent eyes are prone to injury and cherry eye prolapse, requiring surgical correction."
              />
              <TopicCard
                icon="🦴"
                title="Spinal Issues — French Bulldogs"
                description="Hemivertebrae and intervertebral disc disease (IVDD) are common in French Bulldogs."
              />
              <TopicCard
                icon="🦷"
                title="Dental Crowding"
                description="Compressed jaw means severely crowded teeth — dental disease often starts early."
              />
              <TopicCard
                icon="🐾"
                title="Skin Fold Dermatitis"
                description="Moisture in facial folds breeds bacterial and yeast infections requiring ongoing care."
              />
            </div>
          </div>
        </section>

        {/* ── Working Breeds ───────────────────────────────────────────────── */}
        <section id="working-breeds" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🏃</span>
              <p className="section-eyebrow">Working & Active Breeds</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              High-energy and working breed health risks
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Working and sporting breeds are built for activity — but that same athleticism creates specific injury and orthopedic vulnerabilities.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🦴"
                title="CCL / ACL Tears — Active Breeds"
                description="Labrador Retrievers, Rottweilers, and Golden Retrievers have the highest CCL rupture rates."
              />
              <TopicCard
                icon="👁️"
                title="Progressive Retinal Atrophy — Border Collies"
                description="Hereditary blindness that progresses slowly — genetic testing can identify carriers."
              />
              <TopicCard
                icon="🧬"
                title="MDR1 Gene Mutation — Collies"
                description="Drug sensitivity that makes many common medications toxic. Test before treating."
              />
              <TopicCard
                icon="❤️"
                title="Subaortic Stenosis — Golden Retrievers"
                description="A heart defect causing a murmur — ranges from mild to life-threatening."
              />
            </div>
          </div>
        </section>

        {/* ── Genetic Conditions ───────────────────────────────────────────── */}
        <section id="genetic" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🧬</span>
              <p className="section-eyebrow">Genetic Conditions</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Hereditary conditions across all breeds
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Some conditions cross breed lines — they're inherited regardless of breed and can appear in mixed-breeds too.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🩸"
                title="Von Willebrand Disease"
                description="A clotting disorder — Dobermanns are at highest risk. Can turn minor surgery fatal."
              />
              <TopicCard
                icon="👁️"
                title="Hereditary Cataracts"
                description="Early-onset cataracts across multiple breeds — genetic testing can identify risk before breeding."
              />
              <TopicCard
                icon="🦴"
                title="Osteochondrosis (OCD)"
                description="Abnormal bone development in joints — causes lameness in young, rapidly-growing dogs."
              />
              <TopicCard
                icon="💊"
                title="Addison's Disease"
                description="Adrenal insufficiency — often called the 'great pretender' for how many conditions it mimics."
              />
            </div>
          </div>
        </section>

        {/* ── Screening ────────────────────────────────────────────────────── */}
        <section id="screening" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🔬</span>
              <p className="section-eyebrow">Screening & Testing</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Health screening and genetic testing
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Proactive screening can identify conditions before they become symptomatic — giving you more treatment options and lower costs.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🧬"
                title="DNA Health Testing"
                description="Tests like Embark screen for 200+ genetic conditions. $100–$200 one-time cost."
              />
              <TopicCard
                icon="🦴"
                title="Hip & Elbow OFA Evaluation"
                description="The gold standard for orthopaedic screening in breeds predisposed to dysplasia."
              />
              <TopicCard
                icon="❤️"
                title="Cardiac Screening"
                description="Annual cardiac auscultation is recommended for Cavaliers from age 1."
              />
              <TopicCard
                icon="👁️"
                title="CERF / CAER Eye Exam"
                description="Annual eye exam by a veterinary ophthalmologist — essential for herding breeds."
              />
            </div>
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
                  description: 'Recognise the signs when a predisposition becomes a problem.',
                },
                {
                  href:        '/dog-vet-cost-guide',
                  icon:        '🏥',
                  title:       'Dog Vet Cost Guide',
                  description: 'What breed-specific surgeries and treatments actually cost.',
                },
                {
                  href:        '/pet-insurance-guide',
                  icon:        '🛡️',
                  title:       'Pet Insurance Guide',
                  description: 'Get covered before a predisposed condition appears.',
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
          <ArticleProtectionCTA placement="end" categorySlug="breed-health" />
        </div>

        {/* ── Discovery module ─────────────────────────────────────────────── */}
        {breedArticles.length > 0 && (
          <div className="border-t border-stone-100">
            <HubDiscovery
              eyebrow="Breed health articles"
              heading="In-depth guides for specific breeds"
              articles={breedArticles}
              viewAllHref="/category/breed-health"
              viewAllLabel="Browse all breed health guides"
            />
          </div>
        )}

        {/* ── Email signup ─────────────────────────────────────────────────── */}
        <EmailSignup
          variant="dark"
          heading="New breed health guides every week"
          body="Research-backed guides for dog owners who want to stay ahead of their breed's risks."
        />

      </div>
    </>
  )
}
