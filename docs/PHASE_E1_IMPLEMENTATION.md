# Phase E1 Implementation

This package advances the platform from Phase D scaffolding into operational Phase E1.

## Included
- Program Studio scaffolding for admin-defined Programs
- Coupon Governance scaffolding with Finance approval + auto-publish model
- Updated Supabase schema for programs, coupon requests, coupons, redemptions, and Finance role
- Edge Function scaffolds:
  - `admin-upsert-program`
  - `request-coupon`
  - `finance-publish-coupon`
- `.env.example` for Netlify and Supabase secrets

## Business decisions applied
- Programs are admin-defined and data-driven
- Finance is a first-class role
- Coupons can be bound to email or phone, or be open campaign codes
- Allowed request roles: Super Admin, Admissions Admin, Approver, Counselor
- Coupon publish should happen automatically after Finance approval
- Razorpay remains the first payment provider to wire

## Manual setup needed
1. Add Netlify env vars from `.env.example`
2. Apply `supabase/schema.sql`
3. Deploy new Supabase Edge Functions
4. Replace placeholder RLS policies with final claim-driven versions
5. Connect Program Studio and Coupon Governance UI to live API calls

## Recommended next build
- Role-protected admin route guards
- Real Supabase client data loading for Program Studio and Coupon Governance
- Resend internal notifications for coupon approval and registration alerts
- Razorpay order/payment verification wiring
