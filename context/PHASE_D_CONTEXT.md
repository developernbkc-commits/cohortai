# Phase D Context

## Intent
Phase D converts the premium marketing site into an enterprise-grade operating foundation.

## Confirmed business rules
- Programs are admin-defined and publishable by the Site Operator/Admin.
- Coupon requests can be created by: super_admin, admissions_admin, approver, counselor.
- Coupon publishing requires Finance approval.
- Coupons must support binding against email or phone number.
- Content should be revised page-by-page for stronger clarity, trust, and conversion.
- 3D should become more profound but remain performance-conscious and conversion-friendly.

## Implementation decisions in this pack
- Added program master sample data and coupon workflow sample data.
- Added Finance role to admin-facing experience.
- Upgraded admin page to show Program Studio + Coupon Governance + operational queue.
- Upgraded home hero with stronger layered 3D depth treatment.
- Tightened page messaging on home, courses, about, contact, and reviews.

## Manual follow-ups still needed
- Connect program master and coupon workflow to Supabase.
- Finalize Finance approval policy fields.
- Decide phone normalization format (recommended E.164).
- Add protected admin routes and RLS enforcement in next backend phase.
