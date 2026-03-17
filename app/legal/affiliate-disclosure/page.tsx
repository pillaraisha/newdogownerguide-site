import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Affiliate Disclosure – New Dog Owner Guide',
  description: 'Transparency about how New Dog Owner Guide earns money through affiliate partnerships.',
  canonical: '/legal/affiliate-disclosure',
})

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-white">
      <div className="bg-neutral-950 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-white">Affiliate Disclosure</h1>
          <p className="text-white/60 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-14">
        <article className="article-prose">
          <h2>Our Commitment to Transparency</h2>
          <p>NewDogOwnerGuide.com is committed to being fully transparent about how this site earns money. This page explains our affiliate relationships and how they affect our content.</p>

          <h2>What Is an Affiliate Link?</h2>
          <p>An affiliate link is a special URL that contains a tracking code. When you click one and complete a qualifying action (such as purchasing a product or requesting an insurance quote), we receive a commission from the partner company at <strong>no additional cost to you</strong>.</p>

          <h2>Our Primary Affiliate Partner: Fetch Pet Insurance</h2>
          <p>We have an affiliate partnership with <strong>Fetch Pet Insurance</strong>. Links to Fetch on this site are affiliate links. If you click a Fetch link and request a quote or purchase a policy, we may earn a commission.</p>
          <p>We recommend Fetch because we genuinely believe it offers strong coverage for dog owners. Our editorial assessment of Fetch is independent of our affiliate relationship — we would recommend removing it from our site if we did not consider it a quality product.</p>

          <h2>Other Affiliate Programs</h2>
          <p>We may participate in other affiliate programs, including Amazon Associates and other pet product affiliate networks. Affiliate links are used for product recommendations throughout the site.</p>

          <h2>FTC Disclosure Compliance</h2>
          <p>In accordance with the Federal Trade Commission (FTC) guidelines (16 CFR Part 255), we disclose that we have an affiliate relationship with the companies mentioned above. We always aim to clearly label affiliate content with disclosures such as &ldquo;Sponsored&rdquo; or &ldquo;Affiliate link&rdquo; near the relevant links.</p>

          <h2>Does This Affect Our Reviews?</h2>
          <p>Our editorial team evaluates products and services based on research, expert input, and real-world data — not based on affiliate commissions. We may recommend products we do not have affiliate relationships with, and we may choose not to recommend products even if they offer high commissions.</p>
          <p>Our goal is to be the most trusted resource for new dog owners. Compromising that trust for short-term affiliate income would undermine the entire purpose of this site.</p>

          <h2>Questions?</h2>
          <p>If you have questions about our affiliate relationships, please <a href="/contact">contact us</a>.</p>
        </article>
      </div>
    </div>
  )
}
