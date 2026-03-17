'use client'

import Link from 'next/link'
import { fetchLink } from '@/lib/config'
import { trackFetchClick } from '@/lib/analytics'

interface ProtectionCTAProps {
  variant?:   'full' | 'inline'
  placement?: keyof typeof fetchLink
  className?: string
}

export default function ProtectionCTA({
  variant   = 'full',
  placement = 'inline',
  className = '',
}: ProtectionCTAProps) {
  const href = fetchLink[placement] ?? fetchLink.inline

  if (variant === 'inline') {
    return (
      <aside
        aria-label="Pet insurance call to action"
        className={`not-prose rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-orange-50/60 to-brand-50 p-6 md:p-8 my-8 shadow-sm ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border border-brand-200 flex items-center justify-center text-2xl shadow-sm">
            🛡️
          </div>
          <div className="flex-1">
            <p className="font-serif text-xl font-bold text-stone-900 mb-1 tracking-editorial-sm">
              Could you afford this vet bill?
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              The average dog owner faces a surprise vet bill of{' '}
              <strong className="text-stone-900">$1,000–$5,000</strong> at some point.
              Fetch Pet Insurance can reimburse up to 90% of eligible costs.
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackFetchClick(placement)}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-brand hover:shadow-brand-hover"
          >
            Get a Free Quote
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        <p className="mt-4 text-xs text-stone-400">
          Sponsored.{' '}
          <Link href="/legal/affiliate-disclosure" className="underline hover:text-stone-600 transition-colors">
            Affiliate disclosure.
          </Link>
        </p>
      </aside>
    )
  }

  return (
    <section
      aria-label="Pet insurance section"
      className={`relative overflow-hidden bg-neutral-950 py-20 md:py-28 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-forest-500/20 blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <div className="text-5xl mb-6" aria-hidden="true">🛡️</div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-5 text-balance tracking-tight">
          One vet emergency can cost $3,000–$8,000.
          <span className="text-brand-400"> Are you covered?</span>
        </h2>
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
          We recommend Fetch Pet Insurance — it covers accidents, illnesses, surgeries, and emergency care with up to 90% reimbursement and no per-incident limits.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
          {[
            { value: 'Up to 90%', label: 'Reimbursement' },
            { value: '$0',        label: 'Annual limits' },
            { value: '24/7',      label: 'Vet helpline' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/6 border border-white/12 rounded-xl p-4">
              <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackFetchClick(placement)}
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base px-10 py-4 rounded-xl shadow-brand hover:shadow-brand-hover transition-all duration-200 hover:scale-[1.02]"
          >
            Get My Free Fetch Quote →
          </a>
          <Link href="/category/pet-insurance" className="inline-flex items-center justify-center text-white/75 hover:text-white text-sm font-medium transition-colors">
            Compare all pet insurance plans
          </Link>
        </div>

        <p className="mt-8 text-xs text-white/50">
          Sponsored partnership.{' '}
          <Link href="/legal/affiliate-disclosure" className="underline hover:text-white/75 transition-colors">
            Affiliate disclosure.
          </Link>
        </p>
      </div>
    </section>
  )
}
