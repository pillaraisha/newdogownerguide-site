import { buildMetadata } from '@/lib/seo/metadata'
import QuizComponent from '@/components/QuizComponent'

export const metadata = buildMetadata({
  title: 'Could You Afford a $5,000 Vet Bill? – Free Dog Protection Quiz',
  description: 'Answer 4 quick questions to get your dog\'s personalized financial risk profile and see if you\'re protected against unexpected vet bills.',
  canonical: '/quiz',
})

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-950 py-14 md:py-18">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-6">
            🕐 Takes 2 minutes · 100% free
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Could You Afford a $5,000 Vet Bill for Your Dog?
          </h1>
          <p className="text-lg text-white/60">
            Get your dog&apos;s personalized financial risk profile in under 2 minutes.
          </p>
        </div>
      </div>

      {/* Quiz */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 md:p-10">
          <QuizComponent />
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Your data is private and never sold.{' '}
          <a href="/legal/privacy-policy" className="underline hover:text-neutral-600 transition-colors">Privacy policy.</a>
        </p>
      </div>
    </div>
  )
}
