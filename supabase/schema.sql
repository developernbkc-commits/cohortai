create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text unique not null,
  phone text,
  city text,
  created_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  can_manage_programs boolean not null default false,
  can_request_coupons boolean not null default false,
  can_publish_coupons boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(profile_id, role_id)
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text,
  long_description text,
  mode text not null default 'Hybrid',
  duration_label text,
  price_inr integer not null default 0,
  is_featured boolean not null default false,
  publish_status text not null default 'draft',
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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

create table if not exists public.program_modules (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  module_id uuid not null references public.course_modules(id) on delete cascade,
  sequence_no integer not null default 1,
  is_mandatory boolean not null default true,
  unique(program_id, module_id)
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id),
  program_id uuid references public.programs(id),
  status text not null default 'draft',
  preferred_mode text,
  learner_note text,
  total_amount_inr integer not null default 0,
  payment_status text not null default 'pending',
  lead_source text,
  referral_code text,
  promo_code text,
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
  program_id uuid references public.programs(id),
  start_date date not null,
  slot_label text not null,
  capacity integer not null,
  seats_filled integer not null default 0,
  mentor_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.coupon_requests (
  id uuid primary key default gen_random_uuid(),
  requested_by_profile_id uuid not null references public.profiles(id),
  requested_by_role_code text not null,
  coupon_code text unique not null,
  bind_type text not null check (bind_type in ('open', 'email', 'phone')),
  bind_value text,
  discount_type text not null check (discount_type in ('flat', 'percent')),
  discount_value numeric(10,2) not null,
  target_program_id uuid references public.programs(id),
  target_module_id uuid references public.course_modules(id),
  finance_status text not null default 'requested',
  publish_after_finance_approval boolean not null default true,
  valid_from timestamptz,
  valid_until timestamptz,
  per_user_limit integer not null default 1,
  max_total_uses integer,
  notes text,
  finance_reviewer_profile_id uuid references public.profiles(id),
  finance_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  coupon_request_id uuid not null unique references public.coupon_requests(id) on delete cascade,
  publish_status text not null default 'published',
  published_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references public.coupons(id) on delete cascade,
  registration_id uuid references public.registrations(id) on delete set null,
  redeemed_by_profile_id uuid references public.profiles(id) on delete set null,
  redeemed_at timestamptz not null default now(),
  applied_discount_amount numeric(10,2) not null default 0
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  course_name text not null,
  headline text not null,
  review_text text not null,
  rating integer not null check (rating between 1 and 5),
  profile_image_url text,
  consent_to_publish boolean not null default false,
  moderation_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id),
  actor_role_code text,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

insert into public.roles (code, name, can_manage_programs, can_request_coupons, can_publish_coupons)
values
  ('super_admin', 'Super Admin', true, true, true),
  ('admissions_admin', 'Admissions Admin', true, true, false),
  ('approver', 'Approver', false, true, false),
  ('counselor', 'Counselor', false, true, false),
  ('finance', 'Finance', false, false, true),
  ('trainer', 'Trainer', false, false, false),
  ('operations', 'Operations', false, false, false),
  ('learner', 'Learner', false, false, false)
on conflict (code) do update set
  name = excluded.name,
  can_manage_programs = excluded.can_manage_programs,
  can_request_coupons = excluded.can_request_coupons,
  can_publish_coupons = excluded.can_publish_coupons;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.programs enable row level security;
alter table public.program_modules enable row level security;
alter table public.registrations enable row level security;
alter table public.registration_modules enable row level security;
alter table public.payments enable row level security;
alter table public.batches enable row level security;
alter table public.coupon_requests enable row level security;
alter table public.coupons enable row level security;
alter table public.coupon_redemptions enable row level security;
alter table public.reviews enable row level security;
alter table public.audit_logs enable row level security;

create policy if not exists "Learners can read own profile" on public.profiles
for select using (auth.uid() = auth_user_id);

create policy if not exists "Learners can read own registrations" on public.registrations
for select using (
  profile_id in (select id from public.profiles where auth_user_id = auth.uid())
);

-- Replace these placeholders with final JWT claim-driven policies.
create policy if not exists "Admins can read programs" on public.programs
for select using (true);

create policy if not exists "Admins can read coupon requests" on public.coupon_requests
for select using (true);
