/**
 * MedicalDisclaimer
 *
 * Reusable disclaimer block shown at the top of dog health and symptom articles.
 * Renders inside article pages as a `not-prose` element so Tailwind Typography
 * styles do not interfere with its layout.
 *
 * Usage
 * -----
 * Default text (recommended for all health/symptom articles):
 *   <MedicalDisclaimer />
 *
 * Custom override text:
 *   <MedicalDisclaimer text="This article covers general care only." />
 *
 * Hidden (when medicalDisclaimer field is absent from article metadata):
 *   Do not render the component — the parent template handles the conditional.
 */

interface MedicalDisclaimerProps {
  /** Override the default disclaimer text. Defaults to the site-wide standard. */
  text?:      string
  className?: string
}

export const MEDICAL_DISCLAIMER_TEXT =
  "This content is for informational purposes only and should not replace professional veterinary advice. Always consult a licensed veterinarian for concerns about your dog\u2019s health."

export default function MedicalDisclaimer({
  text      = MEDICAL_DISCLAIMER_TEXT,
  className = '',
}: MedicalDisclaimerProps) {
  return (
    <div
      role="note"
      aria-label="Medical disclaimer"
      className={`not-prose flex gap-3 items-start rounded-xl bg-stone-50 border border-stone-200 px-5 py-4 mb-6 text-sm text-stone-600 leading-relaxed ${className}`}
    >
      {/* Info icon */}
      <svg
        className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <p>{text}</p>
    </div>
  )
}
