import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const body = await req.json().catch(() => ({}));
  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

  const payload = {
    requested_by_profile_id: body.requestedByProfileId,
    requested_by_role_code: body.requestedByRoleCode,
    coupon_code: body.couponCode,
    bind_type: body.bindType,
    bind_value: body.bindValue,
    discount_type: body.discountType,
    discount_value: body.discountValue,
    target_program_id: body.targetProgramId ?? null,
    finance_status: 'requested',
    publish_after_finance_approval: true,
    valid_from: body.validFrom ?? null,
    valid_until: body.validUntil ?? null,
    per_user_limit: body.perUserLimit ?? 1,
    max_total_uses: body.maxTotalUses ?? null,
    notes: body.notes ?? null,
  };

  const { data, error } = await supabase.from('coupon_requests').insert(payload).select().single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  await supabase.from('audit_logs').insert({
    actor_profile_id: body.requestedByProfileId,
    actor_role_code: body.requestedByRoleCode,
    entity_type: 'coupon_request',
    entity_id: data.id,
    action: 'create_coupon_request',
    details: payload,
  });

  return new Response(JSON.stringify({ couponRequestId: data.id }), { status: 200 });
});
