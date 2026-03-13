# Phase E3 Implementation

## Focus
Phase E3 converts the earlier admin scaffolds into live operational foundations:

- Program Studio can read live records from Supabase.
- Coupon Governance can read live request queues from Supabase.
- Finance can approve and auto-publish coupon requests.
- Operational notifications can be sent through Resend when configured.
- Registration submission now writes to Supabase and notifies operations.

## Manual steps
1. Deploy/replace these Supabase Edge Functions:
   - `create-registration`
   - `notify-ops`
   - `finance-publish-coupon`
   - `admin-list-coupon-requests`
2. Ensure these environment variables exist in Supabase and Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `PUBLIC_FROM_EMAIL`
   - `ADMIN_NOTIFICATION_EMAIL`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
3. Keep Netlify configuration:
   - Base directory: `cohortai-labs`
   - Package directory: blank
   - Publish directory: `dist`

## Current state
- Live payment link creation is still intentionally conservative.
- Razorpay should be wired next as a protected server-side payment-link workflow.
- Admin route access remains session-role-based until Supabase Auth claims are introduced.
