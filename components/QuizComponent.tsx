'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { fetchLink } from '@/lib/config'
import {
  trackQuizStart,
  trackQuizStep,
  trackQuizEmailCapture,
  trackQuizComplete,
  trackEmailSignup,
  trackFetchClick,
} from '@/lib/analytics'

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 'intro' | 'pet-type' | 'age' | 'size' | 'zip' | 'email' | 'results'

interface Answers {
  petType: 'dog' | 'cat' | null
  age:     'puppy' | 'young' | 'adult' | 'senior' | null
  size:    'small' | 'medium' | 'large' | 'giant' | null
  zip:     string
  email:   string
}

interface RiskResult {
  level:     'medium' | 'high' | 'very-high'
  headline:  string
  summary:   string
  scenarios: { label: string; cost: string }[]
}

const STEP_NUMBERS: Partial<Record<Step, number>> = {
  'pet-type': 1, age: 2, size: 3, zip: 4, email: 5,
}

function progressPercent(step: Step): number {
  const map: Record<Step, number> = {
    intro: 0, 'pet-type': 20, age: 40, size: 60, zip: 80, email: 90, results: 100,
  }
  return map[step] ?? 0
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function QuizComponent() {
  const router = useRouter()
  const [step,       setStep]       = useState<Step>('intro')
  const [answers,    setAnswers]    = useState<Answers>({ petType: null, age: null, size: null, zip: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState<string | null>(null)
  const [result,     setResult]     = useState<RiskResult | null>(null)

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  function goTo(next: Step) {
    const num = STEP_NUMBERS[next]
    if (num !== undefined) trackQuizStep(num, next)
    setStep(next)
  }

  async function submitQuiz() {
    setSubmitting(true)
    setError(null)
    try {
      const res  = await fetch('/api/quiz', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:    answers.email,
          pet_type: answers.petType,
          pet_age:  answers.age,
          dog_size: answers.size,
          zip_code: answers.zip || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); setSubmitting(false); return }
      setResult(data.result)
      setStep('results')
      trackQuizComplete({
        pet_type:   answers.petType ?? 'unknown',
        pet_age:    answers.age    ?? 'unknown',
        dog_size:   answers.size,
        risk_level: data.result?.level ?? 'unknown',
      })
      trackEmailSignup('quiz')
      // Redirect to the full results page only after a successful submission
      router.push('/quiz-results')
    } catch {
      setError('Network error. Please try again.')
    }
    setSubmitting(false)
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress bar */}
      {step !== 'intro' && step !== 'results' && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-neutral-500 mb-2">
            <span>Your protection report</span>
            <span>{progressPercent(step)}% complete</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent(step)}%` }}
            />
          </div>
        </div>
      )}

      {/* ── INTRO ── */}
      {step === 'intro' && (
        <div className="text-center py-4">
          <div className="text-7xl mb-6">🐾</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Could you afford a $5,000 vet bill for your dog?
          </h2>
          <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
            Answer 4 quick questions and we'll show you your dog's real financial risk profile — and what you can do about it.
          </p>
          <button
            onClick={() => { trackQuizStart(); goTo('pet-type') }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg px-10 py-4 rounded-2xl transition-colors shadow-lg"
          >
            Start My Free Report →
          </button>
          <p className="mt-4 text-sm text-neutral-400">Takes 2 minutes · 100% free</p>
        </div>
      )}

      {/* ── STEP 1: PET TYPE ── */}
      {step === 'pet-type' && (
        <QuizStep title="What kind of pet do you have?">
          <div className="grid grid-cols-2 gap-4">
            {([['dog', '🐕', 'Dog'], ['cat', '🐈', 'Cat']] as const).map(([val, emoji, label]) => (
              <button
                key={val}
                onClick={() => { set('petType', val); goTo('age') }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-neutral-200 hover:border-brand-400 hover:bg-brand-50 transition-all group"
              >
                <span className="text-5xl">{emoji}</span>
                <span className="font-semibold text-neutral-800 group-hover:text-brand-600">{label}</span>
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {/* ── STEP 2: AGE ── */}
      {step === 'age' && (
        <QuizStep title={`How old is your ${answers.petType ?? 'pet'}?`} onBack={() => goTo('pet-type')}>
          <div className="grid grid-cols-2 gap-3">
            {([
              ['puppy',  '🐣', 'Puppy',       '0–12 months'],
              ['young',  '🌱', 'Young adult',  '1–3 years'],
              ['adult',  '🐶', 'Adult',        '3–8 years'],
              ['senior', '🦳', 'Senior',       '8+ years'],
            ] as const).map(([val, emoji, label, sub]) => (
              <button
                key={val}
                onClick={() => { set('age', val); goTo(answers.petType === 'dog' ? 'size' : 'zip') }}
                className="flex flex-col items-start gap-1 p-4 rounded-2xl border-2 border-neutral-200 hover:border-brand-400 hover:bg-brand-50 transition-all text-left group"
              >
                <span className="text-3xl">{emoji}</span>
                <span className="font-semibold text-neutral-800 group-hover:text-brand-600">{label}</span>
                <span className="text-xs text-neutral-400">{sub}</span>
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {/* ── STEP 3: SIZE (dogs only) ── */}
      {step === 'size' && (
        <QuizStep title="What size is your dog?" onBack={() => goTo('age')}>
          <div className="grid grid-cols-2 gap-3">
            {([
              ['small',  '🐩', 'Small',   'Under 20 lbs'],
              ['medium', '🐕', 'Medium',  '20–60 lbs'],
              ['large',  '🦮', 'Large',   '60–100 lbs'],
              ['giant',  '🐘', 'Giant',   '100+ lbs'],
            ] as const).map(([val, emoji, label, sub]) => (
              <button
                key={val}
                onClick={() => { set('size', val); goTo('zip') }}
                className="flex flex-col items-start gap-1 p-4 rounded-2xl border-2 border-neutral-200 hover:border-brand-400 hover:bg-brand-50 transition-all text-left group"
              >
                <span className="text-3xl">{emoji}</span>
                <span className="font-semibold text-neutral-800 group-hover:text-brand-600">{label}</span>
                <span className="text-xs text-neutral-400">{sub}</span>
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {/* ── STEP 4: ZIP ── */}
      {step === 'zip' && (
        <QuizStep title="What's your ZIP code?" subtitle="This helps us show you local vet cost data." onBack={() => goTo(answers.petType === 'dog' ? 'size' : 'age')}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            placeholder="e.g. 90210"
            value={answers.zip}
            onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
            className="w-full rounded-2xl border-2 border-neutral-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 px-5 py-4 text-lg text-center tracking-widest outline-none transition"
          />
          <button
            onClick={() => { trackQuizEmailCapture(); goTo('email') }}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-colors mt-4"
          >
            Continue →
          </button>
          <button onClick={() => { trackQuizEmailCapture(); goTo('email') }} className="w-full text-sm text-neutral-400 hover:text-neutral-600 mt-2 transition-colors">
            Skip this step
          </button>
        </QuizStep>
      )}

      {/* ── EMAIL GATE ── */}
      {step === 'email' && (
        <QuizStep
          title="Where should we send your report?"
          subtitle="Enter your email to see your dog's personalized risk profile and protection recommendations."
          onBack={() => goTo('zip')}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={answers.email}
            onChange={(e) => set('email', e.target.value)}
            className="w-full rounded-2xl border-2 border-neutral-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 px-5 py-4 text-base outline-none transition"
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <button
            onClick={submitQuiz}
            disabled={!answers.email.trim() || submitting}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-colors mt-4"
          >
            {submitting ? 'Generating your report…' : 'See My Protection Report →'}
          </button>
          <p className="text-xs text-neutral-400 text-center mt-3">
            No spam. Unsubscribe anytime.{' '}
            <Link href="/legal/privacy-policy" className="underline">Privacy policy.</Link>
          </p>
        </QuizStep>
      )}

      {/* ── RESULTS ── */}
      {step === 'results' && result && (
        <div className="text-center py-4">
          {/* Risk badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 ${
            result.level === 'very-high' ? 'bg-red-100 text-red-700' :
            result.level === 'high'      ? 'bg-orange-100 text-orange-700' :
                                           'bg-yellow-100 text-yellow-700'
          }`}>
            {result.level === 'very-high' ? '⚠️ Very High Risk' :
             result.level === 'high'      ? '⚠️ High Risk' :
                                            '⚡ Moderate Risk'}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            {result.headline}
          </h2>
          <p className="text-neutral-600 mb-8 leading-relaxed">{result.summary}</p>

          {/* Cost scenarios */}
          <div className="bg-neutral-50 rounded-2xl p-5 mb-8 text-left space-y-3">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              What dogs like yours typically face
            </p>
            {result.scenarios.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <span className="text-sm text-neutral-700">{s.label}</span>
                <span className="font-bold text-neutral-900 text-sm">{s.cost}</span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="bg-gradient-to-br from-brand-50 to-orange-50 border-2 border-brand-200 rounded-2xl p-6 mb-6">
            <p className="font-serif text-xl font-bold text-neutral-900 mb-2">
              Protect your dog with Fetch Pet Insurance
            </p>
            <p className="text-sm text-neutral-600 mb-5">
              Get a personalised quote in under 2 minutes. Covers accidents, illness, surgery, and emergency care.
            </p>
            <a
              href={fetchLink.quiz}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackFetchClick('quiz_results')}
              className="block w-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-base py-4 rounded-xl transition-colors"
            >
              Get My Free Fetch Quote →
            </a>
            <p className="text-xs text-neutral-400 mt-3">
              Sponsored.{' '}
              <Link href="/legal/affiliate-disclosure" className="underline">Affiliate disclosure.</Link>
            </p>
          </div>

          <Link href="/category/pet-insurance" className="text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors">
            Compare all pet insurance options →
          </Link>
        </div>
      )}
    </div>
  )
}

// ── Helper sub-component ────────────────────────────────────────────────────

function QuizStep({
  title,
  subtitle,
  onBack,
  children,
}: {
  title:     string
  subtitle?: string
  onBack?:   () => void
  children:  React.ReactNode
}) {
  return (
    <div>
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 mb-6 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back
        </button>
      )}
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{title}</h2>
      {subtitle && <p className="text-neutral-500 mb-6 leading-relaxed">{subtitle}</p>}
      {!subtitle && <div className="mb-6" />}
      {children}
    </div>
  )
}
