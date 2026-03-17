import { buildMetadata } from '@/lib/seo/metadata'
import ContactForm from '@/components/ContactForm'

export const metadata = buildMetadata({
  title: 'Contact Us – New Dog Owner Guide',
  description: 'Get in touch with the New Dog Owner Guide team for editorial inquiries, partnerships, or reader questions.',
  canonical: '/contact',
})

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-neutral-950 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Get in Touch</h1>
          <p className="text-xl text-white/60">Reader question? Partnership inquiry? We&apos;d love to hear from you.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 max-w-xl">
        <ContactForm />
      </div>
    </div>
  )
}
