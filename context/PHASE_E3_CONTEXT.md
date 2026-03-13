# Phase E3 Context

## What changed
This phase consolidates live operational reads and first-step notifications:

- Program Studio refreshes from live Supabase data where available.
- Coupon Governance refreshes from live Supabase data where available.
- Finance can approve and publish coupons from the queue UI.
- Resend is now the notification boundary for operations and coupon publication alerts.
- Registration submission now persists a profile + registration record and can notify `registrations@itprofessional.pro`.

## Important business rules retained
- Programs are admin-defined, not hardcoded.
- Eligible coupon request roles: Super Admin, Admissions Admin, Approver, Counselor.
- Finance is required to approve coupons.
- Coupon publishing is automatic after Finance approval.
- Coupons can target open, email-bound, or phone-bound audiences.

## Next recommended phase
- Real Razorpay payment link/order generation tied to registration totals.
- Supabase Auth and JWT/RLS-driven admin access.
- Admin review queue actions for approve / reject / hold.
- Batch assignment and enrollment confirmation emails.
