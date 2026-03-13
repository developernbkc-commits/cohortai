# Phase E1 Context Lock

## Source of truth
Use the latest premium pearl UI baseline and keep admin operations additive.

## New enterprise rules
- Programs are created by Site Operator/Admin and are not hardcoded.
- Coupon requests can be created by Super Admin, Admissions Admin, Approver, and Counselor.
- Finance approval is mandatory before publish.
- Publish is automatic after Finance approval.
- Coupons may be bound to email or phone, and phone should be normalized to E.164.

## Security posture
- Do not expose service-role keys or Resend secrets in the frontend.
- Replace permissive placeholder RLS policies before production use.
- Admin routes should be guarded by role claims.
- Finance actions should always generate audit logs.

## Content direction
Page content should continue to feel premium, mentor-led, and outcome-led.
3D should be selective and purposeful: hero, advisor, proof wall, and program cards.

## Next context update should include
- Final program/course master data
- Final coupon policy details
- Actual email templates
- Live role claim structure for Supabase JWTs
