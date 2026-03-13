import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async () => {
  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
  const { data, error } = await supabase
    .from('coupon_requests')
    .select('*, coupons(id, publish_status, published_at)')
    .order('created_at', { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  const items = (data ?? []).map((item: any) => ({
    ...item,
    publish_status: Array.isArray(item.coupons) ? item.coupons[0]?.publish_status ?? null : item.coupons?.publish_status ?? null,
    published_at: Array.isArray(item.coupons) ? item.coupons[0]?.published_at ?? null : item.coupons?.published_at ?? null,
  }));

  return new Response(JSON.stringify({ items }), { status: 200 });
});
