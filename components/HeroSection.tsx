'use client'

import Image from 'next/image'
import Link from 'next/link'
import { fetchLink } from '@/lib/config'
import { trackFetchClick } from '@/lib/analytics'

interface HeroSectionProps {
  headline?:    string
  subheadline?: string
  imageSrc?:    string
  imageAlt?:    string
}

export default function HeroSection({
  headline    = 'Could You Afford a $5,000 Vet Bill for Your Dog?',
  subheadline = 'Most dog owners can\'t. One accident or illness can wipe out thousands in savings overnight. Find out if your dog is protected — in under 2 minutes.',
  imageSrc    = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=80',
  imageAlt    = 'Happy golden retriever sitting on a sunny lawn',
}: HeroSectionProps) {
  return (
    <section aria-label="Hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-950">
      {/* Background image with layered overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        {/* Directional gradient — dark left, fade right for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />
        {/* Bottom vignette — blends into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="max-w-2xl">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-8 text-sm font-medium text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            Research-backed &amp; trusted by 12,000+ dog owners
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] mb-6 text-balance tracking-tight">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/65 mb-10 leading-relaxed max-w-lg">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-brand hover:shadow-brand-hover transition-all duration-200 hover:scale-[1.02] active:scale-100"
            >
              Check Your Dog&apos;s Protection Level
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href={fetchLink.hero}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackFetchClick('hero')}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 text-white font-bold text-base px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-100"
            >
              Get a Fetch Quote
            </a>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/45">
            {['No spam — 2-minute quiz', 'Research-backed advice', '100% free'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
