'use client'

/**
 * app/error.tsx
 * Catches unhandled runtime errors in any Server Component on the site.
 * Renders instead of a blank / stack-trace page.
 */

import { useEffect } from 'react'
import Link          from 'next/link'

interface ErrorPageProps {
  error:  Error & { digest?: string }
  reset:  () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to your error tracking service here (e.g. Sentry)
    console.error('[app/error]', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6" aria-hidden="true">🐾</div>

        <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          We hit an unexpected error. Our team has been notified. Please try again,
          or head back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary px-8 py-3"
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn-secondary px-8 py-3"
          >
            Go to homepage
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-neutral-400">
            Error reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>
    </div>
  )
}
