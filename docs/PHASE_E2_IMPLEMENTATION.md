# Phase E2 Implementation

This package advances the platform from Phase E1 scaffolding into an operationally safer admin layer.

## Included in this phase
- Protected admin route guard with role selection entry (`/admin-access`)
- Program Studio create form with fallback persistence
- Coupon request form with role checks and Finance-aware workflow messaging
- New edge-function scaffolds:
  - `admin-list-programs`
  - `admin-list-coupon-requests`
  - `notify-ops`
- Improved compatibility between frontend payloads and Phase E1 edge functions

## Business rules carried forward
- Programs are admin-defined assets, not hardcoded website blocks.
- Coupon requests may be created by:
  - Super Admin
  - Admissions Admin
  - Approver
  - Counselor
- Finance is the publishing authority.
- Coupon publishing should auto-trigger after Finance approval.
- Coupons may be open, email-bound, or phone-bound.

## Manual work after drop-in
1. Add/update environment variables in Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `ADMIN_NOTIFICATION_EMAIL`
2. Deploy Supabase Edge Functions:
   - `admin-upsert-program`
   - `admin-list-programs`
   - `request-coupon`
   - `admin-list-coupon-requests`
   - `finance-publish-coupon`
   - `notify-ops`
3. Apply the Supabase schema if not already applied.
4. Replace the local admin-role selector with real Supabase Auth and RBAC in the next phase.

## Notes
This phase stays deploy-safe by keeping fallback mode available when remote services are not yet fully wired.
