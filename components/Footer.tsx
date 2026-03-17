import Link from 'next/link'
import { CATEGORIES, fetchLink } from '@/lib/config'

const LEGAL_LINKS = [
  { href: '/legal/privacy-policy',       label: 'Privacy Policy' },
  { href: '/legal/terms',                label: 'Terms of Use' },
  { href: '/legal/affiliate-disclosure', label: 'Affiliate Disclosure' },
  { href: '/legal/disclaimer',           label: 'Disclaimer' },
  { href: '/contact',                    label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-950 text-neutral-400" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-xl font-bold text-white hover:text-brand-400 transition-colors">
              NewDogOwnerGuide
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Expert, research-backed guides for first-time dog owners. Because your dog deserves the best possible start.
            </p>
            <a
              href={fetchLink.footer}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 mt-5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              🛡️ Get a Fetch Quote
            </a>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm hover:text-white transition-colors flex items-center gap-2">
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: '/articles',              label: 'All Articles' },
                { href: '/quiz',                  label: 'Protection Quiz' },
                { href: '/category/vet-costs',    label: 'Vet Cost Guides' },
                { href: '/category/pet-insurance',label: 'Pet Insurance' },
                { href: '/contact',               label: 'Contact Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="space-y-1">
            <p>© {year} NewDogOwnerGuide.com — All rights reserved.</p>
            <p>
              Content is for informational purposes only and is not a substitute for veterinary advice.{' '}
              <Link href="/legal/disclaimer" className="underline hover:text-neutral-400 transition-colors">Disclaimer.</Link>
            </p>
          </div>
          <p>
            We may earn a commission from qualifying purchases.{' '}
            <Link href="/legal/affiliate-disclosure" className="underline hover:text-neutral-400 transition-colors">
              Affiliate disclosure.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
