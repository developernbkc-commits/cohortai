create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text unique not null,
  phone_e164 text unique,
  phone_country_code text,
  phone_national_number text,
  country text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(profile_id, role_id)
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  track text not null,
  price_inr integer not null,
  duration_label text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  scope text not null default 'public',
  discount_type text not null default 'flat',
  discount_value integer not null,
  valid_from timestamptz,
  valid_until timestamptz,
  max_redemptions integer,
  per_user_limit integer default 1,
  is_active boolean not null default true,
  email_binding text,
  phone_binding_e164 text,
  created_at timestamptz not null default now()
);

create table if not exists public.referral_codes (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references public.profiles(id),
  code text unique not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id),
  status text not null default 'submitted',
  preferred_mode text,
  learner_note text,
  lead_source text,
  promo_code_entered text,
  referral_code_entered text,
  total_amount_inr integer not null default 0,
  discounted_amount_inr integer not null default 0,
  payment_status text not null default 'pending',
  assigned_batch_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.registration_modules (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.registrations(id) on delete cascade,
  module_id uuid not null references public.course_modules(id),
  price_inr integer not null,
  unique(registration_id, module_id)
);

create table if not exists public.promo_code_redemptions (
  id uuid primary key default gen_random_uuid(),
  promo_code_id uuid not null references public.promo_codes(id),
  registration_id uuid not null references public.registrations(id),
  profile_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.registrations(id),
  provider text not null default 'razorpay',
  provider_payment_link_id text,
  provider_payment_id text,
  amount_inr integer not null,
  status text not null default 'created',
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.batches (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_date date not null,
  slot_label text not null,
  capacity integer not null,
  seats_filled integer not null default 0,
  mentor_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.review_submissions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id),
  full_name text not null,
  email text not null,
  city text,
  country text,
  course_name text not null,
  role_title text,
  rating integer not null check (rating between 1 and 5),
  headline text not null,
  review_text text not null,
  profile_image_url text,
  consent_to_publish boolean not null default false,
  moderation_status text not null default 'pending_approval',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by_profile_id uuid references public.profiles(id)
);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  registration_id uuid references public.registrations(id),
  review_submission_id uuid references public.review_submissions(id),
  recipient_email text not null,
  provider text not null default 'resend',
  provider_message_id text,
  status text not null default 'queued',
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.registrations enable row level security;
alter table public.registration_modules enable row level security;
alter table public.payments enable row level security;
alter table public.batches enable row level security;
alter table public.review_submissions enable row level security;
alter table public.email_events enable row level security;
alter table public.audit_logs enable row level security;

create policy if not exists "Learners can read own profile" on public.profiles
for select using (auth.uid() = auth_user_id);

create policy if not exists "Learners can read own registrations" on public.registrations
for select using (profile_id in (select id from public.profiles where auth_user_id = auth.uid()));

create policy if not exists "Learners can read own reviews" on public.review_submissions
for select using (profile_id in (select id from public.profiles where auth_user_id = auth.uid()));
