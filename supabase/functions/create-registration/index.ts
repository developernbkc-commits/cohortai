import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const payload = await req.json();
    if (!payload.fullName || !payload.email || !payload.phoneCountryCode || !payload.phoneNationalNumber) {
      return json({ error: 'Missing required registration fields' }, 400);
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const email = String(payload.email).trim().toLowerCase();
    const phone = `${String(payload.phoneCountryCode).trim()}${String(payload.phoneNationalNumber).trim()}`;

    const { data: existingProfile } = await supabase.from('profiles').select('*').eq('email', email).maybeSingle();
    let profileId = existingProfile?.id as string | undefined;
    if (!profileId) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          full_name: payload.fullName,
          email,
          phone,
          city: payload.city ?? null,
        })
        .select()
        .single();
      if (profileError) return json({ error: profileError.message }, 400);
      profileId = profile.id;
    }

    const { data: registration, error: registrationError } = await supabase
      .from('registrations')
      .insert({
        profile_id: profileId,
        status: 'submitted',
        preferred_mode: payload.preferredMode ?? null,
        learner_note: payload.learnerGoal ?? null,
        lead_source: payload.leadSource ?? null,
        referral_code: payload.referralCode ?? null,
        promo_code: payload.promoCode ?? null,
        payment_status: 'pending',
      })
      .select()
      .single();
    if (registrationError) return json({ error: registrationError.message }, 400);

    await supabase.from('audit_logs').insert({
      actor_profile_id: profileId,
      actor_role_code: 'learner',
      entity_type: 'registration',
      entity_id: registration.id,
      action: 'registration_submitted',
      details: {
        selectedModules: payload.modules ?? [],
        preferredMode: payload.preferredMode ?? null,
      },
    });

    const adminEmail = Deno.env.get('ADMIN_NOTIFICATION_EMAIL');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('PUBLIC_FROM_EMAIL') ?? 'admissions@mail.itprofessional.pro';
    if (adminEmail && resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          subject: `New registration: ${payload.fullName}`,
          html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>New registration received</h2><p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Preferred mode:</strong> ${escapeHtml(payload.preferredMode ?? 'Not provided')}</p><p><strong>Promo code:</strong> ${escapeHtml(payload.promoCode ?? 'None')}</p><p><strong>Referral code:</strong> ${escapeHtml(payload.referralCode ?? 'None')}</p></div>`,
        }),
      }).catch(() => null);
    }

    return json({ registrationId: registration.id }, 200);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Unexpected error' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
