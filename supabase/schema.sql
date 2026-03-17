-- ─────────────────────────────────────────────────────────────────────────────
-- newdogownerguide.com — Supabase Schema
-- Run this in your Supabase SQL Editor or via `supabase db push`
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Email Subscribers ────────────────────────────────────────────────────────
create table if not exists email_subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text not null unique,
  signup_source text,                -- e.g. 'homepage_hero', 'article_end', 'quiz'
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  created_at   timestamptz not null default now()
);

-- Lowercase all emails on insert for deduplication
create or replace function lowercase_email()
returns trigger language plpgsql as $$
begin
  new.email = lower(trim(new.email));
  return new;
end;
$$;

create trigger trg_email_subscribers_lowercase
  before insert or update on email_subscribers
  for each row execute function lowercase_email();

-- ── Quiz Submissions ─────────────────────────────────────────────────────────
create table if not exists quiz_submissions (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  pet_type    text not null,           -- 'dog' | 'cat'
  pet_age     text not null,           -- 'puppy' | 'young' | 'adult' | 'senior'
  dog_size    text,                    -- 'small' | 'medium' | 'large' | 'giant'
  zip_code    text,
  created_at  timestamptz not null default now()
);

-- ── Contact Submissions ──────────────────────────────────────────────────────
create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Row-Level Security
-- Allow anonymous inserts (form submissions); restrict reads to authenticated users.
-- ─────────────────────────────────────────────────────────────────────────────

alter table email_subscribers  enable row level security;
alter table quiz_submissions    enable row level security;
alter table contact_submissions enable row level security;

-- Public can INSERT
create policy "public_insert_email_subscribers"
  on email_subscribers for insert to anon with check (true);

create policy "public_insert_quiz_submissions"
  on quiz_submissions for insert to anon with check (true);

create policy "public_insert_contact_submissions"
  on contact_submissions for insert to anon with check (true);

-- Authenticated (admin) can SELECT
create policy "auth_select_email_subscribers"
  on email_subscribers for select to authenticated using (true);

create policy "auth_select_quiz_submissions"
  on quiz_submissions for select to authenticated using (true);

create policy "auth_select_contact_submissions"
  on contact_submissions for select to authenticated using (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────────────────────
create index if not exists idx_email_subscribers_email      on email_subscribers (email);
create index if not exists idx_email_subscribers_created    on email_subscribers (created_at desc);
create index if not exists idx_quiz_submissions_email       on quiz_submissions (email);
create index if not exists idx_quiz_submissions_created     on quiz_submissions (created_at desc);
create index if not exists idx_contact_submissions_created  on contact_submissions (created_at desc);
