'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES, fetchLink } from '@/lib/config'

export default function Navigation() {
  const pathname    = usePathname()
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [catOpen,   setCatOpen]   = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const catRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setCatOpen(false) }, [pathname])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 w-full border-b border-neutral-100 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}
    >
      <nav aria-label="Main navigation" className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Wordmark */}
        <Link href="/" className="font-serif text-2xl font-bold text-stone-900 hover:text-brand-600 transition-colors flex-shrink-0 tracking-tight">
          NewDogOwnerGuide
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {/* Categories dropdown */}
          <li ref={catRef} className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              aria-expanded={catOpen}
              className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-neutral-50 hover:text-brand-500 ${pathname.startsWith('/category') ? 'text-brand-500' : 'text-neutral-600'}`}
            >
              Categories
              <svg className={`w-4 h-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors group"
                  >
                    <span className="text-xl flex-shrink-0">{cat.icon}</span>
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-brand-500 transition-colors">{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </li>

          {[
            { href: '/articles', label: 'All Articles' },
            { href: '/quiz',     label: 'Quiz' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-neutral-50 hover:text-brand-500 ${pathname.startsWith(href) ? 'text-brand-500' : 'text-neutral-600'}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={fetchLink.inline}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-sm font-medium px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-colors"
          >
            Get a Quote
          </a>
          <Link href="/quiz" className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm">
            Take the Quiz →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-4 py-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 px-3 py-2">Categories</p>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-neutral-50 hover:text-brand-500 ${pathname.startsWith(`/category/${cat.slug}`) ? 'text-brand-500 bg-brand-50' : 'text-neutral-700'}`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
          <div className="border-t border-neutral-100 pt-2 mt-2 space-y-1">
            {[{ href: '/articles', label: 'All Articles' }, { href: '/quiz', label: 'Take the Quiz' }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-neutral-50 hover:text-brand-500 ${pathname.startsWith(href) ? 'text-brand-500 bg-brand-50' : 'text-neutral-700'}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="pt-3 pb-1 space-y-2">
            <a
              href={fetchLink.inline}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full text-center border border-neutral-200 text-neutral-600 font-medium text-sm px-5 py-2.5 rounded-xl transition-colors hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50"
            >
              Get a Fetch Quote
            </a>
            <Link href="/quiz" className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors">
              Check Your Dog&apos;s Protection Level
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
