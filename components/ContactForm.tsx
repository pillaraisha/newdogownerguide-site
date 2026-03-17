'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactForm() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: 'Reader question', message: '' })
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function update(k: keyof typeof form, v: string) {
    setForm((p) => ({ ...p, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setMessage(data.error ?? 'Something went wrong.'); return }
      setStatus('success')
      setMessage(data.message)
      setForm({ name: '', email: '', subject: 'Reader question', message: '' })
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-forest-50 border border-forest-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-semibold text-forest-800 text-lg mb-1">Message sent!</p>
        <p className="text-forest-700">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">Your name</label>
        <input id="name" type="text" required value={form.name} onChange={(e) => update('name', e.target.value)}
          placeholder="Jane Smith"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">Email address</label>
        <input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
          placeholder="jane@example.com"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1.5">Subject</label>
        <select id="subject" value={form.subject} onChange={(e) => update('subject', e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-700 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition bg-white">
          {['Reader question', 'Editorial inquiry', 'Partnership / sponsorship', 'Vet / expert collaboration', 'Other'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">Message</label>
        <textarea id="message" required rows={5} value={form.message} onChange={(e) => update('message', e.target.value)}
          placeholder="Tell us what's on your mind…"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition resize-none" />
      </div>
      {status === 'error' && <p className="text-sm text-red-500">{message}</p>}
      <button type="submit" disabled={status === 'loading'}
        className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
      <p className="text-sm text-neutral-400 text-center">
        We aim to reply within 2 business days.{' '}
        <Link href="/legal/privacy-policy" className="underline hover:text-neutral-600">Privacy policy.</Link>
      </p>
    </form>
  )
}
