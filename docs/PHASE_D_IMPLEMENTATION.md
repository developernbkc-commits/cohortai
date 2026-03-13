# Phase D Implementation Notes

## Included in this drop-in
- Premium UI baseline retained.
- Stronger 3D hero and depth language.
- Admin console expanded for program governance and finance-approved coupon publishing.
- Content refinement across public pages.
- Program master + coupon workflow sample data.

## Next backend wiring steps
1. Create `programs`, `program_course_map`, `coupon_requests`, `coupon_rules`, and `coupon_publications` tables.
2. Add RBAC checks so only allowed requestor roles can create coupon requests.
3. Require Finance approval before coupon status can move to `published`.
4. Bind unique coupons to `normalized_phone` or `normalized_email`.
5. Persist program publish state and expose only published programs on public pages.

## UX rules
- Every page should guide the user to an action.
- Stronger 3D only in hero, proof, and gamification areas.
- Keep content outcome-led, premium, and specific.
