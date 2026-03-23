import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { buildMetadata } from '@/lib/seo/metadata'
import { Analytics } from '@/lib/analytics'

/* ── Fonts ─────────────────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

/* ── Site-wide metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  ...buildMetadata({
    title: 'New Dog Owner Guide – Expert Advice for First-Time Dog Parents',
    description:
      'Science-backed guides, research-backed advice, and real-owner insights to help you give your new dog the best possible start.',
    canonical: '/',
  }),
  // Pinterest domain verification
  other: {
    'p:domain_verify': '491a8e5377496a269ea13135a1b7e8ca',
  },
}

export const viewport: Viewport = {
  themeColor: '#e07820',
  width: 'device-width',
  initialScale: 1,
}

/* ── Root layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-neutral-800 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 btn-primary"
        >
          Skip to content
        </a>

        <Navigation />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />

        <Analytics />
      </body>
    </html>
  )
}
