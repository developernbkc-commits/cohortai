const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const body = await req.json().catch(() => ({}));
  const adminEmail = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') ?? 'registrations@itprofessional.pro';
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('PUBLIC_FROM_EMAIL') ?? 'admissions@mail.itprofessional.pro';

  if (!resendApiKey) {
    return json({ queued: true, mode: 'dry-run', to: adminEmail, subject: body.subject ?? 'Operational notification' });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [adminEmail],
      subject: body.subject ?? 'Operational notification',
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>${escapeHtml(body.subject ?? 'Operational notification')}</h2><p><strong>Actor role:</strong> ${escapeHtml(body.actorRole ?? 'unknown')}</p><p>${escapeHtml(body.body ?? 'No message provided.')}</p></div>`,
    }),
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    return json({ error: payload?.message || 'Failed to queue email' }, 400);
  }

  return json({ queued: true, mode: 'remote', to: adminEmail, id: payload?.id ?? null });
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
