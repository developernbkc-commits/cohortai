import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const body = await req.json().catch(() => ({}));
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const payload = {
    slug: body.slug,
    title: body.title ?? body.name,
    short_description: body.shortDescription ?? body.audience ?? null,
    long_description: body.longDescription ?? null,
    mode: body.mode,
    duration_label: body.durationLabel ?? body.duration,
    price_inr: body.priceInr ?? 0,
    is_featured: Boolean(body.isFeatured ?? body.featured),
    publish_status: body.publishStatus ?? 'draft',
  };

  const { data, error } = await supabase.from('programs').upsert(payload, { onConflict: 'slug' }).select().single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  await supabase.from('audit_logs').insert({
    actor_role_code: body.actorRoleCode ?? body.actorRole ?? 'unknown',
    entity_type: 'program',
    entity_id: data.id,
    action: 'upsert_program',
    details: payload,
  });

  return new Response(JSON.stringify({ id: data.id, programId: data.id }), { status: 200 });
});
