'use client'

import { useState } from 'react'
import { trackEmailSignup } from '@/lib/analytics'

interface EmailSignupProps {
  heading?:        string
  body?:           string
  /** Text shown on the submit button */
  buttonText?:     string
  /** Overrides the API success message shown to the user */
  successMessage?: string
  /** signup_source value stored in Supabase email_subscribers */
  source?:         string
  className?:      string
  variant?:        'dark' | 'light'
}

export default function EmailSignup({
  heading        = 'Get the Free New Dog Owner Starter Checklist',
  body           = 'Join thousands of dog owners who get our weekly research-backed guides, checklists, and money-saving vet cost tips.',
  buttonText     = 'Get the Free Checklist',
  successMessage = "Thanks! You'll receive helpful dog owner tips soon.",
  source         = 'unknown',
  className      = '',
  variant        = 'dark',
}: EmailSignupProps) {
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      // Read UTM params from the current URL if available
      const params = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : ''
      )
      const res = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          utm_source:   params.get('utm_source'),
          utm_medium:   params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      // Prefer the component's successMessage prop over the raw API message
      setStatus('success')
      setMessage(successMessage)
      setEmail('')

      trackEmailSignup(source)
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const isDark = variant === 'dark'

  return (
    <section
      aria-label="Email signup"
      className={`py-16 md:py-20 ${isDark ? 'bg-neutral-950' : 'bg-brand-50 border-y border-brand-100'} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl text-center">
        {/* Eyebrow label */}
        <p className={`text-xs font-bold uppercase tracking-[0.1em] mb-3 ${isDark ? 'text-brand-300' : 'text-brand-500'}`}>
          Free resource
        </p>

        <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-3 text-balance tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
          {heading}
        </h2>

        <p className={`mb-8 text-balance leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
          {body}
        </p>

        {status === 'success' ? (
          <div className={`rounded-2xl p-6 text-base font-medium ${
            isDark
              ? 'bg-forest-500/15 border border-forest-500/30 text-forest-400'
              : 'bg-forest-50 border border-forest-200 text-forest-700'
          }`}>
            ✓ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
            <label htmlFor={`email-signup-${source}`} className="sr-only">
              Your email address
            </label>
            <input
              id={`email-signup-${source}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              disabled={status === 'loading'}
              className={`flex-1 rounded-xl border px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-all duration-150 disabled:opacity-60 ${
                isDark
                  ? 'bg-white/8 border-white/20 placeholder-neutral-500 text-white hover:border-white/30'
                  : 'bg-white border-neutral-200 placeholder-neutral-400 text-stone-900 hover:border-neutral-300'
              }`}
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-brand hover:shadow-brand-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none whitespace-nowrap"
            >
              {status === 'loading' ? 'Sending…' : buttonText}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-400">{message}</p>
        )}

        <p className={`mt-4 text-xs ${isDark ? 'text-neutral-600' : 'text-stone-400'}`}>
          No spam, ever. Unsubscribe in one click.{' '}
          <a
            href="/legal/privacy-policy"
            className={`underline hover:opacity-80 transition-opacity ${isDark ? '' : 'text-stone-500'}`}
          >
            Privacy policy.
          </a>
        </p>
      </div>
    </section>
  )
}
