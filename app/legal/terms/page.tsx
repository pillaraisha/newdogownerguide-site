import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Terms of Use – New Dog Owner Guide',
  description: 'The terms governing your use of NewDogOwnerGuide.com.',
  canonical: '/legal/terms',
})

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="bg-neutral-950 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-white">Terms of Use</h1>
          <p className="text-white/60 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-14">
        <article className="article-prose">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using NewDogOwnerGuide.com (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.</p>

          <h2>2. Not Veterinary Advice</h2>
          <p>Content on this Site is for <strong>informational purposes only</strong> and does not constitute veterinary or medical advice. Always consult a licensed veterinarian regarding your pet&apos;s health, diagnosis, or treatment. See our full <a href="/legal/disclaimer">Disclaimer</a>.</p>

          <h2>3. Intellectual Property</h2>
          <p>All content on this Site — including articles, graphics, logos, and code — is owned by NewDogOwnerGuide.com or its content suppliers and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our written permission.</p>

          <h2>4. Affiliate Links and Sponsorships</h2>
          <p>Some links on this Site are affiliate links. We may receive a commission if you click a link and complete a purchase. This does not affect our editorial content. See our <a href="/legal/affiliate-disclosure">Affiliate Disclosure</a>.</p>

          <h2>5. User Conduct</h2>
          <p>You agree not to use this Site to:</p>
          <ul>
            <li>Violate any applicable laws or regulations.</li>
            <li>Transmit unsolicited messages or spam.</li>
            <li>Attempt to gain unauthorized access to any part of the Site.</li>
            <li>Use automated tools to scrape or download content without permission.</li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, NewDogOwnerGuide.com shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site or reliance on its content.</p>

          <h2>7. External Links</h2>
          <p>This Site may contain links to third-party websites. We are not responsible for the content or practices of any linked site. Links do not imply endorsement.</p>

          <h2>8. Modifications</h2>
          <p>We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.</p>

          <h2>9. Governing Law</h2>
          <p>These Terms are governed by the laws of the United States. Any disputes shall be resolved in the applicable courts.</p>

          <h2>10. Contact</h2>
          <p>Questions about these Terms? Contact us at <a href="mailto:hello@newdogownerguide.com">hello@newdogownerguide.com</a>.</p>
        </article>
      </div>
    </div>
  )
}
