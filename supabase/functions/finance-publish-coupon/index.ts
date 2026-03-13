import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const body = await req.json().catch(() => ({}));
  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

  const { data: requestRow, error: requestError } = await supabase
    .from('coupon_requests')
    .update({
      finance_status: 'approved',
      finance_reviewer_profile_id: body.financeReviewerProfileId,
      finance_reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', body.couponRequestId)
    .select()
    .single();

  if (requestError) {
    return new Response(JSON.stringify({ error: requestError.message }), { status: 400 });
  }

  const { data: couponRow, error: couponError } = await supabase
    .from('coupons')
    .insert({ coupon_request_id: requestRow.id, publish_status: 'published' })
    .select()
    .single();

  if (couponError) {
    return new Response(JSON.stringify({ error: couponError.message }), { status: 400 });
  }

  await supabase.from('audit_logs').insert({
    actor_profile_id: body.financeReviewerProfileId,
    actor_role_code: 'finance',
    entity_type: 'coupon',
    entity_id: couponRow.id,
    action: 'finance_approved_and_published_coupon',
    details: { couponRequestId: requestRow.id },
  });

  return new Response(JSON.stringify({ couponId: couponRow.id, publishStatus: couponRow.publish_status }), { status: 200 });
});
