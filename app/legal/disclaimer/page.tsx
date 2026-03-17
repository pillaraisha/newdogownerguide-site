import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Disclaimer – New Dog Owner Guide',
  description: 'Medical and financial disclaimer for content published on NewDogOwnerGuide.com.',
  canonical: '/legal/disclaimer',
})

export default function DisclaimerPage() {
  return (
    <div className="bg-white">
      <div className="bg-neutral-950 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-white">Disclaimer</h1>
          <p className="text-white/60 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-14">
        <article className="article-prose">
          <div className="not-prose bg-brand-50 border-l-4 border-brand-400 rounded-r-xl p-5 mb-8">
            <p className="font-semibold text-neutral-900 mb-1">Important Notice</p>
            <p className="text-sm text-neutral-700 leading-relaxed">Content on this website is for informational and educational purposes only. It is <strong>not</strong> a substitute for professional veterinary advice, diagnosis, or treatment. Always consult a licensed veterinarian for your dog&apos;s health needs.</p>
          </div>

          <h2>Veterinary / Medical Disclaimer</h2>
          <p>All health-related content on NewDogOwnerGuide.com is provided for general informational purposes only. While we make every effort to ensure accuracy and work with veterinary professionals to review content, this information:</p>
          <ul>
            <li>Does not constitute veterinary advice or diagnosis.</li>
            <li>Cannot account for your individual dog&apos;s health history or circumstances.</li>
            <li>Should not be used as a substitute for professional veterinary care.</li>
            <li>May not reflect the most current research or clinical guidelines.</li>
          </ul>
          <p>If your dog is unwell, injured, or you have any concern about their health, contact your veterinarian or an emergency animal hospital immediately.</p>

          <h2>Cost Information Disclaimer</h2>
          <p>Veterinary cost estimates on this site are approximate national averages based on published data and industry surveys. Actual costs vary significantly based on:</p>
          <ul>
            <li>Geographic location and local cost of living.</li>
            <li>Individual clinic pricing and equipment.</li>
            <li>The severity of the condition.</li>
            <li>Your dog&apos;s size, breed, and health history.</li>
          </ul>
          <p>Cost figures should be used as a general guide only and not relied upon for financial planning without consulting your veterinarian directly.</p>

          <h2>Financial / Insurance Disclaimer</h2>
          <p>Information about pet insurance is provided for educational purposes only and does not constitute financial or insurance advice. Insurance products vary by provider, policy terms, and state regulations. Always read policy documents carefully before purchasing.</p>

          <h2>No Guarantees</h2>
          <p>NewDogOwnerGuide.com makes no warranties or guarantees about the accuracy, completeness, or suitability of any content for any particular purpose. Use of this site is at your own risk.</p>

          <h2>Contact</h2>
          <p>Questions about this disclaimer? <a href="/contact">Contact us</a>.</p>
        </article>
      </div>
    </div>
  )
}
