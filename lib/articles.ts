/**
 * lib/articles.ts
 * Central registry of all published articles.
 * Metadata lives here; MDX content lives in /content/articles/.
 */

export interface TocItem {
  id:    string
  text:  string
  level: 2 | 3
}

export interface ArticleMeta {
  slug:          string
  title:         string
  excerpt:       string
  description:   string
  category:      string
  categorySlug:  string
  /** References a key in lib/authors.ts AUTHORS map */
  authorId:      string
  publishedAt:   string         // ISO date
  updatedAt:     string

  // ── Optional credibility / editorial metadata ──────────────────────────
  /** ISO date the article was last medically or editorially reviewed. */
  reviewedDate?: string
  /** Cited sources shown in a "Sources" section at the bottom of the article. */
  sources?:      string[]
  /**
   * If true, the standard medical disclaimer is shown at the top of the article body.
   * Pass a custom string to override the default disclaimer text.
   */
  medicalDisclaimer?: boolean | string

  readTime:      number         // minutes
  imageSrc?:     string         // undefined = branded placeholder rendered by components
  imageAlt?:     string
  tags:          string[]
  featured?:     boolean
  relatedSlugs?: string[]
  toc?:          TocItem[]
}

export const articles: ArticleMeta[] = [
  {
    slug:               'dog-acl-surgery-cost',
    title:              'Dog ACL Surgery Cost: What Dog Owners Should Expect',
    excerpt:            `Your vet just said your dog needs cruciate surgery. Here's the honest financial picture — diagnosis through recovery, bilateral risk, and what insurance actually covers.`,
    description:        'A full breakdown of dog ACL (CCL) surgery costs: TPLO vs. extracapsular repair, what the quote includes, hidden recovery costs, the bilateral risk most owners learn too late, and how pet insurance applies.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2025-02-15',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'American College of Veterinary Surgeons (ACVS) — Cranial Cruciate Ligament Disease (acvs.org)',
      'Merck Veterinary Manual — Musculoskeletal Disorders: Stifle Joint',
      'Cornell University College of Veterinary Medicine — Orthopaedic Conditions in Dogs',
      'VCA Animal Hospitals — Cranial Cruciate Ligament Rupture in Dogs',
      'American Veterinary Medical Association (AVMA) — Veterinary Economics and Pet Health Data',
    ],
    readTime:           11,
    imageSrc:           'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&q=80',
    imageAlt:           'Veterinarian examining a dog on an exam table',
    tags:               ['ACL surgery', 'CCL surgery', 'TPLO', 'vet costs', 'dog surgery', 'cruciate ligament', 'dog limping'],
    featured:           true,
    relatedSlugs:       ['emergency-vet-visit-cost', 'best-pet-insurance-for-puppies'],
    toc: [
      { id: 'what-is-ccl-injury',  text: 'What is a cruciate ligament injury?', level: 2 },
      { id: 'getting-a-diagnosis', text: 'Getting a diagnosis: what the vet will do', level: 2 },
      { id: 'surgical-options',    text: 'Your surgical options', level: 2 },
      { id: 'cost-breakdown',      text: 'The full cost breakdown', level: 2 },
      { id: 'hidden-costs',        text: "What the quote usually doesn't include", level: 2 },
      { id: 'recovery-costs',      text: 'Recovery: what to expect', level: 2 },
      { id: 'bilateral-risk',      text: 'The detail most owners learn too late', level: 2 },
      { id: 'insurance-coverage',  text: 'Does pet insurance cover ACL surgery?', level: 2 },
      { id: 'payment-options',     text: "What to do if you can't pay upfront", level: 2 },
    ],
  },
  {
    slug:               'emergency-vet-visit-cost',
    title:              'Emergency Vet Visit Cost: What Dog Owners Actually Pay',
    excerpt:            `The bill from an emergency vet clinic can land anywhere from $300 to $8,000. Here's a clear breakdown of what different emergencies actually cost — and what to do if you're facing one tonight.`,
    description:        'Real cost data for emergency vet visits — triage fees, common scenario costs, overnight hospitalisation, and how pet insurance handles emergency care.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2025-02-20',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'Veterinary Emergency and Critical Care Society (VECCS) — Emergency Care Standards',
      'American Veterinary Medical Association (AVMA) — Emergency Care Guidelines',
      'VCA Animal Hospitals — Emergency Care and Triage',
      'Merck Veterinary Manual — Emergency and Critical Care',
    ],
    readTime:           10,
    imageSrc:           'https://images.unsplash.com/photo-1612024782955-49852d28aeea?w=1200&q=80',
    imageAlt:           'Puppy at an emergency veterinary clinic',
    tags:               ['emergency vet', 'vet costs', 'emergency care', 'after hours vet', '24 hour vet', 'vet bill'],
    featured:           true,
    relatedSlugs:       ['dog-acl-surgery-cost', 'dog-limping-suddenly'],
    toc: [
      { id: 'when-emergency',   text: 'When dogs need emergency veterinary care', level: 2 },
      { id: 'typical-costs',    text: 'Typical emergency vet visit costs', level: 2 },
      { id: 'diagnostic-costs', text: 'Diagnostic and treatment costs', level: 2 },
      { id: 'why-escalate',     text: 'Why emergency vet bills can escalate quickly', level: 2 },
      { id: 'preparing',        text: 'Preparing for unexpected veterinary emergencies', level: 2 },
    ],
  },
  {
    slug:               'dog-limping-suddenly',
    title:              'Dog Limping Suddenly: Causes, When to Worry, and What It Costs',
    excerpt:            `Your dog was fine an hour ago. Now they're holding up a leg and won't put weight on it. Here's how to assess how serious it is, what's likely causing it, and what to do next.`,
    description:        'A practical guide to sudden dog limping: the most likely causes from minor to serious, how to decide whether to go to the emergency vet tonight or wait, what the vet examination involves, and what diagnosis and treatment will cost.',
    category:           'Dog Health',
    categorySlug:       'dog-health',
    authorId:           'sarah-mitchell',
    publishedAt:        '2025-03-01',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'American College of Veterinary Surgeons (ACVS) — Cranial Cruciate Ligament Disease',
      'Merck Veterinary Manual — Lameness in Dogs',
      'VCA Animal Hospitals — Limping in Dogs',
      'Cornell University College of Veterinary Medicine — Joint and Mobility Conditions',
    ],
    readTime:           11,
    imageSrc:           'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
    imageAlt:           'Golden retriever resting with a front paw raised',
    tags:               ['dog limping', 'dog health', 'lameness', 'leg injury', 'cruciate ligament', 'CCL tear', 'dog ACL'],
    featured:           false,
    relatedSlugs:       ['dog-acl-surgery-cost', 'emergency-vet-visit-cost'],
    toc: [
      { id: 'how-serious',     text: 'How to tell if the limp is serious', level: 2 },
      { id: 'front-vs-back',   text: 'Front leg vs back leg limping', level: 2 },
      { id: 'common-causes',   text: 'Common causes of sudden limping', level: 2 },
      { id: 'when-to-see-vet', text: 'When to see a veterinarian', level: 2 },
      { id: 'treatment-costs', text: 'Possible treatment and cost considerations', level: 2 },
    ],
  },
  {
    slug:               'best-pet-insurance-for-puppies',
    title:              'Best Pet Insurance for Puppies in 2025 (Expert Pick)',
    excerpt:            `Getting insurance before your puppy's first illness is the smartest financial move you can make. Here's our top pick and why.`,
    description:        'We compare the best puppy pet insurance plans on coverage, cost, and claims experience — including why Fetch stands out for new puppy owners.',
    category:           'Pet Insurance',
    categorySlug:       'pet-insurance',
    authorId:           'aisha-gregory',
    publishedAt:        '2025-02-10',
    updatedAt:          '2025-03-12',
    reviewedDate:       '2025-03-12',
    sources: [
      'North American Pet Health Insurance Association (NAPHIA) — 2024 State of the Industry Report',
      'Consumer Reports — Pet Insurance Ratings 2024',
      'Fetch Pet Insurance — Policy Documentation (2025)',
    ],
    readTime:           11,
    imageSrc:           'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&q=80',
    imageAlt:           'Golden retriever puppy looking at camera',
    tags:               ['pet insurance', 'puppy insurance', 'fetch pet insurance', 'best pet insurance'],
    featured:           true,
    relatedSlugs:       ['first-vet-visit-for-a-puppy', 'dog-acl-surgery-cost'],
    toc: [
      { id: 'when-to-buy',    text: 'When to get puppy insurance', level: 2 },
      { id: 'what-covered',   text: 'What puppy insurance covers', level: 2 },
      { id: 'how-much',       text: 'How much does it cost?', level: 2 },
      { id: 'fetch-review',   text: 'Why we recommend Fetch', level: 2 },
      { id: 'what-to-look',   text: 'What to look for in a policy', level: 2 },
      { id: 'faq',            text: 'Frequently asked questions', level: 2 },
    ],
  },
  {
    slug:               'first-vet-visit-for-a-puppy',
    title:              'First Vet Visit for a Puppy: What to Expect (+ Cost Breakdown)',
    excerpt:            `Your puppy's first vet appointment sets up their entire health future. Here's exactly what happens, what to bring, and what it will cost.`,
    description:        "A step-by-step guide to your puppy's first vet visit: what the vet checks, what vaccines your puppy needs, and average costs for the first year.",
    category:           'New Dog Owner',
    categorySlug:       'new-dog-owner',
    authorId:           'sarah-mitchell',
    publishedAt:        '2025-03-08',
    updatedAt:          '2025-03-10',
    reviewedDate:       '2025-03-10',
    medicalDisclaimer:  true,
    readTime:           7,
    imageSrc:           'https://images.unsplash.com/photo-1628009368231-7bb7cfcfcfbe?w=1200&q=80',
    imageAlt:           'Vet gently examining a small puppy',
    tags:               ['first vet visit', 'puppy health', 'puppy vaccinations', 'new dog owner'],
    featured:           false,
    relatedSlugs:       ['best-pet-insurance-for-puppies', 'first-week-home-with-your-dog'],
    toc: [
      { id: 'when-to-go',      text: 'When to schedule the first visit', level: 2 },
      { id: 'what-to-bring',   text: 'What to bring with you', level: 2 },
      { id: 'what-vet-checks', text: 'What the vet will examine', level: 2 },
      { id: 'vaccinations',    text: 'Vaccination schedule explained', level: 2 },
      { id: 'costs',           text: 'First-year vet cost breakdown', level: 2 },
      { id: 'health-records',  text: "Starting your puppy's health record", level: 2 },
    ],
  },
  {
    slug:               'first-week-home-with-your-dog',
    title:              "Your Dog's First Week Home: A Day-by-Day Survival Guide",
    excerpt:            'The first seven days with a new dog can feel overwhelming. This day-by-day guide tells you exactly what to do.',
    description:        'Everything new owners need to know about the critical first week with a new dog — setup, routine, toilet training, and the first vet visit.',
    category:           'New Dog Owner',
    categorySlug:       'new-dog-owner',
    authorId:           'sarah-mitchell',
    publishedAt:        '2025-03-01',
    updatedAt:          '2025-03-01',
    readTime:           8,
    imageSrc:           'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80',
    imageAlt:           'Golden retriever puppy resting on a soft blanket',
    tags:               ['new dog owner', 'first week', 'puppy guide', 'new puppy checklist'],
    featured:           false,
    relatedSlugs:       ['first-vet-visit-for-a-puppy', 'best-pet-insurance-for-puppies'],
    toc: [
      { id: 'before-home',    text: 'Before you bring them home', level: 2 },
      { id: 'day-one',        text: 'Day 1: The car ride and arrival', level: 2 },
      { id: 'days-two-three', text: 'Days 2–3: Establishing routine', level: 2 },
      { id: 'first-vet',      text: 'Days 4–5: First vet visit', level: 2 },
      { id: 'personality',    text: 'Days 6–7: First signs of personality', level: 2 },
    ],
  },
  {
    slug:               'dog-intestinal-blockage-surgery-cost',
    title:              'Dog Intestinal Blockage Surgery Cost: Treatment Options and What to Expect',
    excerpt:            `Your dog swallowed something they shouldn't have. Here's what the vet will find, what the treatment options are — from endoscopy to full resection — and what the bill will look like.`,
    description:        'A clear breakdown of intestinal blockage surgery costs in dogs — endoscopy vs. enterotomy vs. resection, what drives the cost range, hospitalisation costs, and how pet insurance covers foreign body removal.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2026-03-16',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'VCA Animal Hospitals — Foreign Body Obstruction in Dogs',
      'Merck Veterinary Manual — Intestinal Obstructions in Small Animals',
      'American Veterinary Medical Association (AVMA) — Emergency Care Guidelines',
      'Cornell University College of Veterinary Medicine — Gastrointestinal Conditions',
    ],
    readTime:           10,
    imageSrc:           'https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=1200&q=80',
    imageAlt:           'Dog at veterinary clinic for emergency examination',
    tags:               ['intestinal blockage', 'foreign body', 'dog surgery', 'vet costs', 'emergency vet', 'dog swallowed'],
    featured:           false,
    relatedSlugs:       ['emergency-vet-visit-cost', 'best-pet-insurance-for-puppies'],
    toc: [
      { id: 'causes',           text: 'What causes intestinal blockages in dogs', level: 2 },
      { id: 'symptoms',         text: 'Symptoms and when to seek immediate care', level: 2 },
      { id: 'treatment-options',text: 'Treatment options', level: 2 },
      { id: 'surgery-costs',    text: 'Typical surgery costs', level: 2 },
      { id: 'recovery',         text: 'Recovery and aftercare costs', level: 2 },
      { id: 'why-expensive',    text: 'Why this condition becomes expensive quickly', level: 2 },
      { id: 'protection',       text: 'Protecting yourself from unexpected vet bills', level: 2 },
    ],
  },
  {
    slug:               'dog-mri-cost',
    title:              'Dog MRI Cost: Why Advanced Imaging Is Expensive',
    excerpt:            `MRI is the most expensive diagnostic procedure most dog owners will ever face — and it usually arrives alongside a frightening neurological symptom. Here's what it costs, why, and what comes after.`,
    description:        'A complete guide to dog MRI costs: scan prices by region, anaesthesia and specialist consultation fees, CT comparison, post-diagnosis treatment costs for IVDD, brain tumours, and epilepsy, and how pet insurance covers advanced imaging.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2026-03-16',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'American Veterinary Medical Association (AVMA) — Advanced Diagnostic Imaging in Veterinary Medicine',
      'Merck Veterinary Manual — Neurological Examination and Imaging in Dogs: MRI and CT Applications',
      'Cornell University College of Veterinary Medicine — Veterinary Neurology and Advanced Imaging Services',
      'VCA Animal Hospitals — MRI in Dogs: Procedure, Indications, and Cost Overview',
    ],
    readTime:           10,
    tags:               ['dog MRI cost', 'dog MRI scan', 'veterinary MRI', 'dog neurology', 'IVDD', 'dog brain tumour', 'vet costs'],
    featured:           false,
    relatedSlugs:       ['dog-xray-cost', 'dog-blood-test-cost', 'is-pet-insurance-worth-it'],
    toc: [
      { id: 'when-needed',         text: 'When dogs need MRI scans', level: 2 },
      { id: 'how-mri-works',       text: 'How MRI diagnostics work', level: 2 },
      { id: 'mri-costs',           text: 'Typical MRI costs', level: 2 },
      { id: 'additional-costs',    text: 'Additional hospital costs', level: 2 },
      { id: 'financial-planning',  text: 'Financial planning for advanced veterinary care', level: 2 },
    ],
  },
  {
    slug:               'dog-blood-test-cost',
    title:              'Dog Blood Test Cost: What Diagnostics Usually Cost',
    excerpt:            `Blood work shows up in almost every significant vet visit. Here's what different panels actually test for, when they're ordered, and what you'll pay — including the ongoing monitoring costs most owners don't see coming.`,
    description:        'A complete guide to dog blood test costs: CBC and chemistry panel prices, specialty tests, pre-surgical bloodwork, long-term medication monitoring costs, and how pet insurance covers diagnostics.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2026-03-16',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'American Veterinary Medical Association (AVMA) — Preventive Care and Diagnostic Testing Guidelines',
      'Merck Veterinary Manual — Haematology and Clinical Biochemistry in Dogs',
      'Cornell University College of Veterinary Medicine — Diagnostic Laboratory Services and Reference Ranges',
      'VCA Animal Hospitals — Blood Testing in Dogs: Overview of Common Panels',
    ],
    readTime:           9,
    tags:               ['dog blood test cost', 'vet blood work', 'CBC dog', 'blood panel dog', 'vet diagnostics', 'vet costs'],
    featured:           false,
    relatedSlugs:       ['dog-xray-cost', 'dog-cancer-treatment-cost', 'is-pet-insurance-worth-it'],
    toc: [
      { id: 'why-needed',             text: 'Why dogs need blood tests', level: 2 },
      { id: 'common-panels',          text: 'Common diagnostic panels', level: 2 },
      { id: 'blood-test-costs',       text: 'Typical cost of blood tests', level: 2 },
      { id: 'additional-costs',       text: 'Additional diagnostic costs', level: 2 },
      { id: 'financial-preparation',  text: 'Financial preparation for veterinary testing', level: 2 },
    ],
  },
  {
    slug:               'dog-xray-cost',
    title:              'Dog X-Ray Cost: Typical Prices and When Dogs Need Imaging',
    excerpt:            `X-rays are often the first step in a vet workup — and rarely the last. Here's what imaging actually costs, what drives the price difference, and what the X-ray might be the beginning of.`,
    description:        'A clear guide to dog X-ray costs: standard imaging prices by body region, emergency clinic surcharges, sedation and contrast study costs, specialist interpretation, and how pet insurance covers diagnostics.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2026-03-16',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'American Veterinary Medical Association (AVMA) — Veterinary Diagnostic Imaging Standards',
      'Merck Veterinary Manual — Diagnostic Imaging: Radiography in Small Animal Practice',
      'Cornell University College of Veterinary Medicine — Radiology and Diagnostic Imaging',
      'VCA Animal Hospitals — X-Rays for Dogs: Diagnostic Overview',
    ],
    readTime:           9,
    tags:               ['dog x-ray cost', 'vet x-ray', 'dog imaging', 'radiograph', 'vet costs', 'dog diagnostics'],
    featured:           false,
    relatedSlugs:       ['dog-limping-suddenly', 'dog-intestinal-blockage-surgery-cost', 'emergency-vet-visit-cost'],
    toc: [
      { id: 'what-diagnosed',    text: 'What X-rays diagnose in dogs', level: 2 },
      { id: 'when-needed',       text: 'When dogs need imaging', level: 2 },
      { id: 'xray-costs',        text: 'Typical cost of dog X-rays', level: 2 },
      { id: 'additional-costs',  text: 'Additional diagnostic costs', level: 2 },
      { id: 'protection',        text: 'Protecting yourself from unexpected vet bills', level: 2 },
    ],
  },
  {
    slug:               'dog-cancer-treatment-cost',
    title:              'Dog Cancer Treatment Cost: What Owners Should Expect',
    excerpt:            `A cancer diagnosis means difficult decisions — and significant costs. Here's an honest breakdown of what surgery, chemotherapy, radiation, and long-term management actually cost, and how to prepare.`,
    description:        'A complete guide to dog cancer treatment costs: diagnostics and staging, surgery, chemotherapy protocols, radiation therapy, palliative care, and realistic total cost by scenario from $3,000 to $22,000+.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2026-03-16',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'American Veterinary Medical Association (AVMA) — Veterinary Cancer Statistics and Pet Health Data',
      'Merck Veterinary Manual — Neoplasia: Overview of Tumours in Dogs',
      'Cornell University College of Veterinary Medicine — Canine Oncology: Lymphoma, Osteosarcoma, Mast Cell Tumours',
      'VCA Animal Hospitals — Cancer in Dogs: Diagnosis, Treatment, and Cost Overview',
      'Veterinary Cancer Society (VCS) — Oncology Standards and Treatment Protocols',
    ],
    readTime:           12,
    tags:               ['dog cancer', 'cancer treatment cost', 'dog chemotherapy', 'dog lymphoma', 'osteosarcoma', 'vet costs', 'dog surgery'],
    featured:           false,
    relatedSlugs:       ['is-pet-insurance-worth-it', 'emergency-vet-visit-cost', 'best-pet-insurance-for-puppies'],
    toc: [
      { id: 'common-types',    text: 'Common types of cancer treatments', level: 2 },
      { id: 'diagnosis-costs', text: 'Diagnostic testing costs', level: 2 },
      { id: 'treatment-costs', text: 'Treatment and surgery costs', level: 2 },
      { id: 'ongoing-costs',   text: 'Ongoing treatment and medication costs', level: 2 },
      { id: 'why-expensive',   text: 'Why cancer treatment can become expensive', level: 2 },
      { id: 'protection',      text: 'Protecting yourself from unexpected vet bills', level: 2 },
    ],
  },
  {
    slug:               'dog-ear-infection-treatment-cost',
    title:              'Dog Ear Infection Treatment Cost: Vet Visit and Medication Costs',
    excerpt:            `Ear infections are among the most common reasons dogs see a vet — and among the most misunderstood. Here's what a visit and treatment actually costs, and why some dogs keep getting them year after year.`,
    description:        'A complete guide to dog ear infection treatment costs: vet exam, cytology, ear cleaning, prescription medications, specialist referral, allergy management costs, and why chronic otitis can escalate to surgery.',
    category:           'Vet Costs',
    categorySlug:       'vet-costs',
    authorId:           'sarah-mitchell',
    publishedAt:        '2026-03-16',
    updatedAt:          '2026-03-16',
    reviewedDate:       '2026-03-16',
    medicalDisclaimer:  true,
    sources: [
      'American Veterinary Medical Association (AVMA) — Common Skin and Ear Conditions in Dogs',
      'Merck Veterinary Manual — Otitis Externa in Dogs: Causes, Diagnosis, and Treatment',
      'Cornell University College of Veterinary Medicine — Ear Infections in Dogs: Clinical Guidance',
      'VCA Animal Hospitals — Ear Infections in Dogs: Diagnosis and Treatment Overview',
    ],
    readTime:           8,
    tags:               ['dog ear infection', 'ear infection cost', 'otitis externa', 'dog ear treatment', 'vet costs', 'dog allergies'],
    featured:           false,
    relatedSlugs:       ['is-pet-insurance-worth-it', 'first-vet-visit-for-a-puppy', 'emergency-vet-visit-cost'],
    toc: [
      { id: 'signs',                  text: 'Signs of an ear infection in dogs', level: 2 },
      { id: 'infection-types',        text: 'Types of ear infections and why it matters', level: 2 },
      { id: 'vet-visit',              text: 'What the vet visit involves', level: 2 },
      { id: 'single-infection-cost',  text: 'What an ear infection visit costs', level: 2 },
      { id: 'recurrent-infections',   text: 'Why some dogs get ear infections repeatedly', level: 2 },
      { id: 'chronic-costs',          text: 'The cost of chronic ear problems', level: 2 },
      { id: 'insurance',              text: 'Does pet insurance cover ear infections?', level: 2 },
    ],
  },
  {
    slug:               'is-pet-insurance-worth-it',
    title:              'Is Pet Insurance Worth It for Dogs? An Honest Financial Analysis',
    excerpt:            `The honest answer isn't "yes" or "no" — it's "for most dog owners, under most circumstances, yes." Here's the math, the caveats, and the one factor that matters more than any other.`,
    description:        "A rigorous financial analysis of pet insurance for dogs: premium costs vs. real vet bills, the breakeven calculation, self-insuring compared honestly, when insurance clearly isn't worth it, and the one timing factor that changes everything.",
    category:           'Pet Insurance',
    categorySlug:       'pet-insurance',
    authorId:           'aisha-gregory',
    publishedAt:        '2026-03-16',
    updatedAt:          '2026-03-16',
    sources: [
      'North American Pet Health Insurance Association (NAPHIA) — 2024 State of the Industry Report',
      'American Veterinary Medical Association (AVMA) — Veterinary Economics Data',
      'Consumer Reports — Pet Insurance Analysis',
      'National Commission on Veterinary Economic Issues — Cost of Veterinary Care',
    ],
    readTime:           12,
    imageSrc:           'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=1200&q=80',
    imageAlt:           'Dog owner reviewing documents with a financial calculator',
    tags:               ['pet insurance', 'is pet insurance worth it', 'pet insurance cost', 'dog insurance', 'vet bills'],
    featured:           true,
    relatedSlugs:       ['best-pet-insurance-for-puppies', 'dog-acl-surgery-cost'],
    toc: [
      { id: 'how-it-works',  text: 'How pet insurance works', level: 2 },
      { id: 'what-covered',  text: 'What pet insurance typically covers', level: 2 },
      { id: 'vet-costs',     text: 'Typical costs of veterinary emergencies', level: 2 },
      { id: 'case-against',  text: 'The case against pet insurance', level: 2 },
      { id: 'case-for',      text: 'The case for pet insurance', level: 2 },
      { id: 'when-worth-it', text: 'When pet insurance makes the most sense', level: 2 },
      { id: 'timing',        text: 'The most important factor: timing of coverage', level: 2 },
    ],
  },
]

// ── Query helpers ─────────────────────────────────────────────────────────────

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): ArticleMeta[] {
  return articles.filter((a) => a.categorySlug === categorySlug)
}

/** All articles written by a given authorId, sorted newest-first. */
export function getArticlesByAuthor(authorId: string): ArticleMeta[] {
  return articles
    .filter((a) => a.authorId === authorId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getFeaturedArticles(limit = 3): ArticleMeta[] {
  return articles.filter((a) => a.featured).slice(0, limit)
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const article = getArticleBySlug(slug)
  if (!article?.relatedSlugs?.length) {
    return articles.filter((a) => a.slug !== slug && a.categorySlug === article?.categorySlug).slice(0, limit)
  }
  return article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is ArticleMeta => !!a)
    .slice(0, limit)
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug)
}

export function getRecentArticles(limit = 6): ArticleMeta[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
