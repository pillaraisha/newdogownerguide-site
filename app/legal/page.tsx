import { buildMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'

export const metadata = buildMetadata({
  title: 'Legal – New Dog Owner Guide',
  description: 'Privacy policy, terms of use, affiliate disclosure, and disclaimer for New Dog Owner Guide.',
  canonical: '/legal',
})

const LEGAL_PAGES = [
  { href: '/legal/privacy-policy',       title: 'Privacy Policy',       description: 'How we collect, use, and protect your personal data.', icon: '🔐' },
  { href: '/legal/terms',                title: 'Terms of Use',          description: 'The rules governing use of this website.',             icon: '📋' },
  { href: '/legal/affiliate-disclosure', title: 'Affiliate Disclosure',  description: 'How we earn money through affiliate partnerships.',     icon: '💼' },
  { href: '/legal/disclaimer',           title: 'Disclaimer',            description: 'Medical and financial disclaimer for all content.',      icon: '⚠️' },
]

export default function LegalIndexPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-neutral-950 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Legal</h1>
          <p className="text-white/60 text-lg">We believe in full transparency. All policies and disclosures are below.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-14">
        <ul className="space-y-3">
          {LEGAL_PAGES.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="card flex items-center gap-5 p-5 group">
                <span className="text-3xl flex-shrink-0">{page.icon}</span>
                <div className="flex-1">
                  <h2 className="font-semibold text-neutral-900 group-hover:text-brand-500 transition-colors mb-0.5">{page.title}</h2>
                  <p className="text-sm text-neutral-500">{page.description}</p>
                </div>
                <svg className="w-5 h-5 text-neutral-300 group-hover:text-brand-400 transition-colors flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
          <p className="font-semibold text-neutral-900 mb-2">Medical Disclaimer</p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Content on this website is for informational purposes only and is not a substitute for professional veterinary advice, diagnosis, or treatment. Always consult a qualified veterinarian regarding your dog's health.
          </p>
        </div>
      </div>
    </div>
  )
}
