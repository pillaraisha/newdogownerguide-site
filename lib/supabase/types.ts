/**
 * lib/supabase/types.ts
 * Database table types — replace with generated output from:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_ID
 */

export interface Article {
  id:              string
  slug:            string
  title:           string
  excerpt:         string
  content:         string
  category_id:     string
  author_id:       string | null
  published_at:    string | null
  updated_at:      string
  image_url:       string | null
  image_alt:       string | null
  read_time:       number
  is_published:    boolean
  is_vet_reviewed: boolean
  meta_title:      string | null
  meta_description: string | null
}

export interface Category {
  id:          string
  slug:        string
  name:        string
  description: string | null
  icon:        string | null
  sort_order:  number
}

export interface Author {
  id:          string
  name:        string
  bio:         string | null
  credentials: string | null
  avatar_url:  string | null
  is_vet:      boolean
}

/** Matches the email_subscribers table in schema.sql */
export interface EmailSubscriber {
  id:           string
  email:        string
  signup_source: string | null
  utm_source:   string | null
  utm_medium:   string | null
  utm_campaign: string | null
  created_at:   string
}

/** Matches the quiz_submissions table in schema.sql */
export interface QuizSubmission {
  id:         string
  email:      string
  pet_type:   string
  pet_age:    string
  dog_size:   string | null
  zip_code:   string | null
  created_at: string
}

/** Matches the contact_submissions table in schema.sql */
export interface ContactSubmission {
  id:         string
  name:       string
  email:      string
  subject:    string | null
  message:    string
  created_at: string
}
