/**
 * lib/quiz.ts
 * Quiz risk computation logic — decoupled from the HTTP handler so it can be
 * tested, updated, and imported independently of the API route.
 */

export interface RiskInputs {
  pet_type: string
  pet_age:  string
  dog_size: string | null
}

export interface RiskScenario {
  label: string
  cost:  string
}

export interface RiskResult {
  level:     'medium' | 'high' | 'very-high'
  headline:  string
  summary:   string
  scenarios: RiskScenario[]
}

export function computeRiskResult({ pet_type, pet_age, dog_size }: RiskInputs): RiskResult {
  const isLarge  = dog_size === 'large' || dog_size === 'giant'
  const isSenior = pet_age === 'senior'
  const isPuppy  = pet_age === 'puppy'

  // Large + senior: highest risk combination
  if (isSenior && isLarge) {
    return {
      level:    'very-high',
      headline: 'Your dog has a very high financial risk profile.',
      summary:  'Large senior dogs have a significantly elevated risk of joint issues, cancer, and organ failure — conditions that can cost $3,000–$12,000 to treat.',
      scenarios: [
        { label: 'ACL / Joint surgery',          cost: '$3,000–$7,000' },
        { label: 'Cancer diagnosis & treatment',  cost: '$5,000–$15,000' },
        { label: 'Emergency hospitalisation',     cost: '$2,000–$6,000' },
      ],
    }
  }

  // Senior (any size)
  if (isSenior) {
    return {
      level:    'high',
      headline: 'Your dog has a high financial risk profile.',
      summary:  'Senior dogs of all sizes face an increased risk of cancer, heart disease, and diabetes — unexpected bills typically range from $2,000 to $10,000.',
      scenarios: [
        { label: 'Dental disease treatment',        cost: '$500–$2,000' },
        { label: `Cushing's / thyroid disease`,     cost: '$1,500–$5,000' },
        { label: 'Tumour removal',                  cost: '$2,000–$8,000' },
      ],
    }
  }

  // Puppy
  if (isPuppy) {
    return {
      level:    'high',
      headline: 'Puppies carry a surprisingly high financial risk.',
      summary:  `Puppies love swallowing things they shouldn't, catching infections, and injuring themselves exploring. A single incident can easily cost $2,000–$5,000.`,
      scenarios: [
        { label: 'Foreign body removal (surgery)', cost: '$2,000–$5,000' },
        { label: 'Parvovirus hospitalisation',     cost: '$1,500–$4,000' },
        { label: 'Broken bone / fracture',         cost: '$1,500–$4,000' },
      ],
    }
  }

  // Large/giant adult
  if (isLarge) {
    return {
      level:    'high',
      headline: 'Large dogs face higher-than-average vet costs.',
      summary:  'Large and giant breeds are predisposed to joint problems, bloat, and cardiac conditions — and their treatments cost significantly more due to larger drug doses and longer surgeries.',
      scenarios: [
        { label: 'ACL / CCL surgery (TPLO)',   cost: '$3,500–$7,000' },
        { label: 'Gastric dilatation (bloat)',  cost: '$3,000–$7,500' },
        { label: 'Hip dysplasia surgery',       cost: '$3,500–$7,000' },
      ],
    }
  }

  // Default: medium risk
  return {
    level:    'medium',
    headline: 'Your dog has a moderate financial risk profile.',
    summary:  'Even healthy adult dogs face unexpected accidents and illnesses. The average dog has a surprise vet bill of $1,000–$3,000 at some point in their life.',
    scenarios: [
      { label: 'Allergies / skin condition',  cost: '$500–$2,000/year' },
      { label: 'ACL / soft tissue injury',    cost: '$2,000–$5,000' },
      { label: 'Intestinal obstruction',      cost: '$2,000–$5,000' },
    ],
  }
}
