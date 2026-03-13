# Admin Bootstrap Warning

Phase E4.1 includes a temporary bootstrap login path for the initial Super Admin so the admin surface can be tested without blocking the rest of the platform work.

## Important
This is a temporary stabilization measure only.

Before public launch of the admin workspace:
- remove client-side bootstrap credential checks
- move admin authentication to Supabase Auth
- enforce role claims server-side
- enable MFA for admin roles
- force password rotation for the first seeded Super Admin

## Recommended secured replacement
1. Create the Super Admin in Supabase Auth.
2. Assign the `super_admin` role in the database.
3. Read role claims from the backend.
4. Replace the bootstrap login page with real authenticated login.
