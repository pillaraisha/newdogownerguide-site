/**
 * mdx-components.tsx
 * Required by @next/mdx when using the App Router.
 *
 * Two roles:
 *   1. Override HTML elements (h1, p, table, etc.) with styled versions.
 *   2. Register shared editorial components globally so MDX authors can use
 *      <VetCostBlock /> and <ProtectionCTA /> without an explicit import in
 *      each file. Local imports in an MDX file always take precedence.
 */
import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link          from 'next/link'
import VetCostBlock  from '@/components/VetCostBlock'
import ProtectionCTA from '@/components/ProtectionCTA'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ── Typography ─────────────────────────────────────────────────────────
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl font-bold text-stone-900 mt-10 mb-4 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl font-bold text-stone-900 mt-10 mb-4 leading-tight tracking-tight border-b border-stone-200 pb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl font-bold text-stone-900 mt-8 mb-3 leading-snug tracking-editorial-sm">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-serif text-lg font-semibold text-stone-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-stone-800 leading-[1.78] mb-5">{children}</p>
    ),

    // ── Links ──────────────────────────────────────────────────────────────
    a: ({ href, children }) => {
      const isExternal = href?.startsWith('http')
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 font-medium underline underline-offset-3 decoration-brand-300 hover:text-brand-700 hover:decoration-brand-500 transition-colors"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href ?? '#'}
          className="text-brand-600 font-medium underline underline-offset-3 decoration-brand-300 hover:text-brand-700 hover:decoration-brand-500 transition-colors"
        >
          {children}
        </Link>
      )
    },

    // ── Media ──────────────────────────────────────────────────────────────
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        alt={props.alt ?? ''}
        width={800}
        height={450}
        className="rounded-xl w-full h-auto my-8 shadow-sm ring-1 ring-neutral-100"
      />
    ),

    // ── Code ───────────────────────────────────────────────────────────────
    pre: ({ children }) => (
      <pre className="bg-stone-900 text-stone-100 rounded-xl p-5 overflow-x-auto text-sm my-8 shadow-sm">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-stone-100 text-stone-800 rounded-md px-1.5 py-0.5 text-[0.875em] font-mono">
        {children}
      </code>
    ),

    // ── Lists ──────────────────────────────────────────────────────────────
    ul: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-stone-800">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-stone-800">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-[1.7]">{children}</li>,

    // ── Callout / Blockquote ───────────────────────────────────────────────
    blockquote: ({ children }) => (
      <blockquote className="not-italic border-l-[3px] border-brand-400 pl-6 my-8 bg-brand-50 py-4 pr-5 rounded-r-xl text-stone-800">
        {children}
      </blockquote>
    ),

    // ── Horizontal rule ────────────────────────────────────────────────────
    hr: () => <hr className="border-stone-200 my-10" />,

    // ── Tables ─────────────────────────────────────────────────────────────
    table: ({ children }) => (
      <div className="overflow-x-auto my-8 rounded-xl border border-stone-200 shadow-sm">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-stone-100 text-stone-700 font-semibold">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-stone-100 bg-white">{children}</tbody>
    ),
    tr: ({ children }) => <tr className="hover:bg-stone-50 transition-colors">{children}</tr>,
    th: ({ children }) => (
      <th className="text-left px-4 py-3 font-semibold text-stone-600 text-xs uppercase tracking-wide border-b border-stone-200">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-stone-700 align-top">{children}</td>
    ),

    // ── Global editorial components ────────────────────────────────────────
    // Available in every MDX file without an explicit import.
    // Local imports in the MDX file override these via the spread below.
    VetCostBlock,
    ProtectionCTA,

    // ── Merge consumer-provided overrides ─────────────────────────────────
    ...components,
  }
}
