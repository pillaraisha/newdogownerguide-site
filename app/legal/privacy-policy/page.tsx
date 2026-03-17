import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Privacy Policy – New Dog Owner Guide',
  description: 'How New Dog Owner Guide collects, uses, and protects your personal information.',
  canonical: '/legal/privacy-policy',
  noIndex: false,
})

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="bg-neutral-950 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-white/60 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-14">
        <article className="article-prose">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li><strong>Email address</strong> — when you subscribe to our newsletter or complete our quiz.</li>
            <li><strong>Quiz responses</strong> — pet type, age, size, and ZIP code to personalise results.</li>
            <li><strong>Contact form submissions</strong> — name, email, and message when you contact us.</li>
          </ul>
          <p>We also collect usage data automatically through analytics tools, including pages visited, time on site, and referral sources.</p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To send you the content and guides you requested.</li>
            <li>To personalise quiz results and recommendations.</li>
            <li>To improve our content and understand how visitors use our site.</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <p>We will never sell your personal data to third parties.</p>

          <h2>3. Cookies and Tracking</h2>
          <p>We use cookies for analytics (Google Analytics 4) and to improve site functionality. You can opt out of analytics tracking by enabling "Do Not Track" in your browser or by using a browser extension like uBlock Origin.</p>

          <h2>4. Third-Party Services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul>
            <li><strong>Supabase</strong> — to securely store form submissions and email subscribers.</li>
            <li><strong>Google Analytics 4</strong> — for website analytics.</li>
            <li><strong>Vercel</strong> — for website hosting and deployment.</li>
          </ul>

          <h2>5. Affiliate Links</h2>
          <p>Some links on this site are affiliate links, including links to Fetch Pet Insurance. We may earn a commission if you click these links and make a purchase. This does not affect our editorial independence. See our <a href="/legal/affiliate-disclosure">Affiliate Disclosure</a>.</p>

          <h2>6. Data Retention</h2>
          <p>We retain your email address for as long as you are subscribed to our list. You can unsubscribe at any time by clicking the unsubscribe link in any email we send you. Contact form submissions are retained for 12 months.</p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to access, correct, or delete the personal data we hold about you. To exercise these rights, please contact us at <a href="mailto:hello@newdogownerguide.com">hello@newdogownerguide.com</a>.</p>

          <h2>8. Children's Privacy</h2>
          <p>Our site is not directed at children under 13. We do not knowingly collect personal information from children under 13.</p>

          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.</p>

          <h2>10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@newdogownerguide.com">hello@newdogownerguide.com</a>.</p>
        </article>
      </div>
    </div>
  )
}
