'use client'

import { useState } from 'react'
import type { TocItem } from '@/lib/articles'

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [open, setOpen] = useState(true)

  if (!items.length) return null

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden mb-8"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
          </svg>
          In this article
        </span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {open && (
        <ol className="px-5 pb-4 space-y-1 border-t border-neutral-200">
          {items.map((item, i) => (
            <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
              <a
                href={`#${item.id}`}
                className="flex items-start gap-2 py-1.5 text-sm text-neutral-600 hover:text-brand-500 transition-colors group"
              >
                <span className="text-neutral-300 group-hover:text-brand-300 font-mono text-xs mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}
