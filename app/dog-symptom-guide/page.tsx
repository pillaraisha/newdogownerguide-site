/**
 * /dog-symptom-guide
 *
 * SEO pillar hub page for dog health symptoms.
 * Author: Sarah Mitchell (Pet Health Writer)
 * Covers: limping, vomiting, lethargy, skin issues, breathing problems,
 *         digestive emergencies — organised into topic clusters.
 */

import Link from 'next/link'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo/metadata'
import { getArticlesByCategory, getArticleBySlug } from '@/lib/articles'
import { getAuthor } from '@/lib/authors'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/ArticleCard'
import TopicCard from '@/components/TopicCard'
import HubDiscovery from '@/components/HubDiscovery'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'
import ArticleProtectionCTA from '@/components/ArticleProtectionCTA'
import EmailSignup from '@/components/EmailSignup'

export const metadata = buildMetadata({
  title: 'Dog Symptom Guide: What Every Symptom Could Mean – New Dog Owner Guide',
  description:
    'Research-backed guides to the most common dog symptoms — limping, vomiting, lethargy, skin issues, and more. Know what to watch for, when to call the vet, and what it will cost.',
  canonical: '/dog-symptom-guide',
})

const AUTHOR_ID = 'sarah-mitchell'

export default function DogSymptomGuide() {
  const author = getAuthor(AUTHOR_ID)

  // Existing articles for this hub
  const limpingArticle  = getArticleBySlug('dog-limping-suddenly')
  const healthArticles  = getArticlesByCategory('dog-health')

  const breadcrumbJsonLdData = breadcrumbJsonLd([
    { name: 'Home',             href: '/' },
    { name: 'Dog Symptom Guide', href: '/dog-symptom-guide' },
  ])

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLdData) }}
      />

      <div className="bg-white">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="bg-neutral-950 pt-16 pb-20 md:pt-20 md:pb-24 relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-forest-500/10 blur-3xl" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Dog Symptom Guide' },
            ]} />

            <p className="section-eyebrow-light mb-4">Dog Health · Symptom Reference</p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance leading-tight">
              Dog Symptom Guide
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mb-8 leading-relaxed text-balance">
              Clear, research-backed answers to what your dog's symptoms could mean — which signs need an emergency vet, which can wait, and what treatment typically costs.
            </p>

            {/* Jump links */}
            <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
              {[
                { label: 'Mobility & Injury',   href: '#mobility' },
                { label: 'Digestive Issues',     href: '#digestive' },
                { label: 'Skin & Coat',          href: '#skin' },
                { label: 'Respiratory',          href: '#respiratory' },
                { label: 'Emergency Symptoms',   href: '#emergency' },
                { label: 'Neurological Signs',   href: '#neurological' },
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
              Dogs can't tell you what hurts. That's what makes symptoms so stressful — a dog limping, vomiting, or acting lethargic could be minor, or it could be the start of something serious. The difference is often the <strong>pattern, timing, and accompanying signs</strong>.
            </p>
            <p className="text-stone-600 leading-relaxed">
              This guide organises the most common dog symptoms into clear clusters. Each section explains the likely causes, the red flags that mean you need a vet now, and the realistic cost of treatment if it escalates. Use it as a reference — but always follow up with your veterinarian for anything that concerns you.
            </p>
            <p className="text-stone-600 leading-relaxed">
              One important note: many symptom investigations start with a vet visit you weren't expecting. That's where pet insurance earns its keep. We'll flag the cost exposure for each symptom cluster so you can plan ahead.
            </p>
          </div>

          {/* Featured article */}
          {limpingArticle && (
            <div className="mb-12">
              <p className="section-eyebrow mb-4">Featured guide</p>
              <ArticleCard {...limpingArticle} size="large" priority />
            </div>
          )}

          {/* Mid CTA */}
          <ArticleProtectionCTA placement="mid" categorySlug="dog-health" />

        </div>

        {/* ── Mobility & Injury ───────────────────────────────────────────── */}
        <section id="mobility" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🦴</span>
              <p className="section-eyebrow">Mobility & Injury</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Limping, joint pain, and movement problems
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Mobility issues are among the most common — and most expensive — reasons dogs visit the vet. From a thorn in the paw to a torn ligament, the range is enormous.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🐾"
                title="Dog Limping Suddenly"
                description="Sudden onset limping vs gradual — causes, when it's an emergency, and diagnosis costs."
                href="/articles/dog-limping-suddenly"
              />
              <TopicCard
                icon="🦵"
                title="ACL / CCL Injury"
                description="One of the most common injuries in active dogs. Signs, diagnosis, and surgical costs."
                href="/articles/dog-acl-surgery-cost"
              />
              <TopicCard
                icon="🔩"
                title="Hip Dysplasia Signs"
                description="Wobbling, reluctance to jump, or bunny-hopping gait can point to hip dysplasia."
              />
              <TopicCard
                icon="💊"
                title="Arthritis in Dogs"
                description="Stiffness after rest, reluctance on stairs — recognising early arthritis and managing it."
              />
              <TopicCard
                icon="🩺"
                title="Paw Pad Injuries"
                description="Cuts, burns, cracks, and foreign objects — when to treat at home versus see a vet."
              />
              <TopicCard
                icon="⚡"
                title="Spinal / Disc Issues"
                description="Back pain, sudden paralysis, and dragging legs — disc disease is a common emergency."
              />
            </div>
            <p className="mt-6 text-xs text-stone-400">
              💡 Mobility issues are the leading cause of dog ACL surgery, which averages <strong className="text-stone-500">$3,500–$6,500</strong> per leg.{' '}
              <Link href="/articles/dog-acl-surgery-cost" className="underline hover:text-brand-500 transition-colors">See the full cost breakdown →</Link>
            </p>
          </div>
        </section>

        {/* ── Digestive Issues ─────────────────────────────────────────────── */}
        <section id="digestive" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🤢</span>
              <p className="section-eyebrow">Digestive Issues</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Vomiting, diarrhoea, and stomach issues
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Most digestive upsets are mild and self-resolving. A few — like bloat or foreign body ingestion — are life-threatening emergencies that require immediate care.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🤮"
                title="Vomiting: When to Worry"
                description="Single episode vs repeated vomiting — how to tell minor GI upset from something serious."
              />
              <TopicCard
                icon="💧"
                title="Diarrhoea in Dogs"
                description="Common triggers, hydration risks, and the signs that mean you need to call the vet today."
              />
              <TopicCard
                icon="🎈"
                title="Bloat (GDV) — Emergency"
                description="A distended stomach and unproductive retching is a life-threatening emergency. Act immediately."
              />
              <TopicCard
                icon="🍖"
                title="Foreign Body Ingestion"
                description="Dogs eat things they shouldn't. Signs of obstruction, what vets do, and what it costs."
              />
              <TopicCard
                icon="🍽️"
                title="Loss of Appetite"
                description="Skipping one meal is normal. Extended anorexia can signal pain, dental issues, or illness."
              />
              <TopicCard
                icon="🩸"
                title="Blood in Stool or Vomit"
                description="Bright red blood vs dark tarry stools have different causes. Neither should be ignored."
              />
            </div>
          </div>
        </section>

        {/* ── Skin & Coat ──────────────────────────────────────────────────── */}
        <section id="skin" className="py-12 bg-stone-50/60 border-y border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🐕</span>
              <p className="section-eyebrow">Skin & Coat</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Itching, hair loss, lumps, and skin infections
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Skin issues are the most common reason for vet visits. Allergies, infections, parasites, and tumours all present through the skin — and look deceptively similar.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🤧"
                title="Dog Allergies & Itching"
                description="Environmental, food, and contact allergies — identification, management, and allergy testing costs."
              />
              <TopicCard
                icon="🪲"
                title="Fleas, Ticks & Mites"
                description="Parasite identification, risks (Lyme disease, mange), and treatment options."
              />
              <TopicCard
                icon="💈"
                title="Hair Loss (Alopecia)"
                description="Patchy vs diffuse hair loss — hormonal causes, ringworm, and stress-related shedding."
              />
              <TopicCard
                icon="🔵"
                title="Lumps & Bumps"
                description="Most lumps are benign. How to tell a lipoma from something that needs urgent biopsy."
              />
              <TopicCard
                icon="🦠"
                title="Skin Infections (Pyoderma)"
                description="Bacterial skin infections causing hot spots, pustules, and raw patches."
              />
              <TopicCard
                icon="👁️"
                title="Hot Spots"
                description="Moist dermatitis that spreads fast — how to manage hot spots before the vet visit."
              />
            </div>
          </div>
        </section>

        {/* ── Respiratory ──────────────────────────────────────────────────── */}
        <section id="respiratory" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🫁</span>
              <p className="section-eyebrow">Respiratory</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Coughing, laboured breathing, and nasal discharge
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Respiratory symptoms can range from kennel cough (minor) to congestive heart failure (serious). Breathing difficulty is always an emergency.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="🌬️"
                title="Kennel Cough"
                description="The honking cough, how long it lasts, when to treat, and vaccination to prevent it."
              />
              <TopicCard
                icon="😮‍💨"
                title="Breathing Difficulty"
                description="Laboured breathing or blue-tinged gums is always an emergency. Call your vet immediately."
              />
              <TopicCard
                icon="🤧"
                title="Nasal Discharge"
                description="Clear vs coloured discharge — viral, bacterial, fungal, or structural causes."
              />
              <TopicCard
                icon="❤️"
                title="Heart Disease Signs"
                description="Coughing at night, exercise intolerance, and pot belly in older dogs can signal heart disease."
              />
            </div>
          </div>
        </section>

        {/* ── Emergency Symptoms ───────────────────────────────────────────── */}
        <section id="emergency" className="py-12 bg-red-50/40 border-y border-red-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🚨</span>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-red-600">Emergency Symptoms</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Symptoms that always need an emergency vet
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              If your dog shows any of these signs, stop reading and go to an emergency vet clinic now. Minutes matter.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="😵"
                title="Collapse or Loss of Consciousness"
                description="Sudden collapse, inability to stand, or loss of consciousness — emergency. Go now."
              />
              <TopicCard
                icon="🫀"
                title="Suspected Poisoning"
                description="Chocolate, xylitol, grapes, rat poison — call your vet or animal poison control immediately."
              />
              <TopicCard
                icon="🎈"
                title="Bloat / GDV"
                description="Distended abdomen with unproductive retching. This is a surgical emergency with minutes to spare."
              />
              <TopicCard
                icon="🩸"
                title="Uncontrolled Bleeding"
                description="Deep wounds, internal bleeding signs (pale gums, weakness) — go to emergency immediately."
              />
              <TopicCard
                icon="⚡"
                title="Seizures"
                description="A first-time seizure, multiple seizures, or a seizure lasting over 5 minutes needs emergency care."
              />
              <TopicCard
                icon="😮‍💨"
                title="Laboured Breathing"
                description="Gasping, blue gums, or extreme breathing distress — respiratory emergency, act immediately."
              />
            </div>
            <div className="mt-6 rounded-xl bg-white border border-red-200 p-4 text-sm text-stone-600">
              <strong className="text-stone-900">Emergency vet visits cost $150–$500+ just to walk in.</strong> After treatment, bills often reach $2,000–$8,000.{' '}
              <Link href="/articles/emergency-vet-visit-cost" className="text-brand-600 underline hover:text-brand-700 transition-colors font-medium">
                See emergency vet cost data →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Neurological Signs ───────────────────────────────────────────── */}
        <section id="neurological" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">🧠</span>
              <p className="section-eyebrow">Neurological Signs</p>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Seizures, disorientation, and head tilts
            </h2>
            <p className="text-stone-500 text-sm mb-8 max-w-2xl">
              Neurological symptoms are often frightening and confusing. Knowing which are emergencies and which can be managed helps you respond quickly.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <TopicCard
                icon="⚡"
                title="Epilepsy & Seizures"
                description="First seizure vs epilepsy — diagnosis, medication options, and long-term management."
              />
              <TopicCard
                icon="😵‍💫"
                title="Vestibular Disease"
                description="Sudden head tilt, falling, and rolling. Terrifying but often resolves within days."
              />
              <TopicCard
                icon="🔃"
                title="Disorientation / Dementia"
                description="Cognitive dysfunction in older dogs — pacing, confusion, and sleep cycle changes."
              />
              <TopicCard
                icon="🦯"
                title="Sudden Blindness"
                description="SARD and other causes of rapid vision loss — signs, diagnosis, and what to expect."
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
                  href:        '/dog-vet-cost-guide',
                  icon:        '🏥',
                  title:       'Dog Vet Cost Guide',
                  description: 'What every treatment, surgery, and emergency actually costs.',
                },
                {
                  href:        '/dog-breed-health-guide',
                  icon:        '🐕',
                  title:       'Dog Breed Health Guide',
                  description: 'Health risks specific to your dog's breed.',
                },
                {
                  href:        '/pet-insurance-guide',
                  icon:        '🛡️',
                  title:       'Pet Insurance Guide',
                  description: 'How to protect yourself from unexpected vet bills.',
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
          <ArticleProtectionCTA placement="end" categorySlug="dog-health" />
        </div>

        {/* ── Discovery module ─────────────────────────────────────────────── */}
        {healthArticles.length > 0 && (
          <div className="border-t border-stone-100">
            <HubDiscovery
              eyebrow="More dog health guides"
              heading="In-depth guides for every health concern"
              articles={healthArticles}
              viewAllHref="/category/dog-health"
              viewAllLabel="Browse all dog health guides"
            />
          </div>
        )}

        {/* ── Email signup ─────────────────────────────────────────────────── */}
        <EmailSignup
          variant="dark"
          heading="Get new symptom guides in your inbox"
          body="We publish new research-backed guides every week. No spam — unsubscribe anytime."
        />

      </div>
    </>
  )
}
