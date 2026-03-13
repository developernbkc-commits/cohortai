# Phase E2 Context

## Goal
Move the platform from a visual/admin scaffold toward real operator workflows while retaining the premium public website experience.

## What changed
- Admin surfaces are now role-gated behind `/admin-access`.
- Program Studio now supports creating governed program shells in fallback mode.
- Coupon Governance now supports creating request records with the approved business rules.
- Operational notifications are prepared as a function boundary for Resend wiring.

## Why this matters
This reduces context drift and starts separating:
- public learner experience
- admin-only operations
- future Finance-controlled discount publishing

## Next recommended phase
Phase E3 should wire:
- real Supabase reads into Program Studio and Coupon Governance
- Resend notifications
- Finance approval actions
- Razorpay order/payment flow
- admin audit views
