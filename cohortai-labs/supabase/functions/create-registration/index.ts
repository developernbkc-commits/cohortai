import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Payload = {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNationalNumber: string;
  country?: string;
  preferredMode?: string;
  modules: string[];
  learnerGoal?: string;
  promoCode?: string;
  referralCode?: string;
  leadSource?: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const payload = (await req.json()) as Payload;
    if (!payload.fullName || !payload.email || !Array.isArray(payload.modules) || payload.modules.length === 0) {
      return json({ error: "Missing required fields" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const registrationsAlertEmail = Deno.env.get("REGISTRATIONS_ALERT_EMAIL") || "registrations@itprofessional.pro";
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "admissions@mail.itprofessional.pro";
    const phoneE164 = `${payload.phoneCountryCode}${payload.phoneNationalNumber}`.replace(/\s+/g, "");

    const profileUpsert = await db(`${supabaseUrl}/rest/v1/profiles?on_conflict=email`, serviceRole, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        full_name: payload.fullName,
        email: payload.email.toLowerCase(),
        phone_e164: phoneE164,
        phone_country_code: payload.phoneCountryCode,
        phone_national_number: payload.phoneNationalNumber,
        country: payload.country || null,
      }),
    });
    const [profile] = await profileUpsert.json();

    const modulesRes = await fetch(`${supabaseUrl}/rest/v1/course_modules?select=id,code,price_inr&code=in.(${payload.modules.join(",")})`, {
      headers: {
        apikey: serviceRole,
        Authorization: `Bearer ${serviceRole}`,
      },
    });
    const modules = await modulesRes.json();
    const total = (modules || []).reduce((sum: number, m: any) => sum + Number(m.price_inr || 0), 0);
    const discounted = payload.promoCode ? Math.max(0, total - Math.min(2000, Math.round(total * 0.1))) : total;

    const registrationRes = await db(`${supabaseUrl}/rest/v1/registrations`, serviceRole, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        profile_id: profile.id,
        status: "submitted",
        preferred_mode: payload.preferredMode || null,
        learner_note: payload.learnerGoal || null,
        lead_source: payload.leadSource || null,
        promo_code_entered: payload.promoCode || null,
        referral_code_entered: payload.referralCode || null,
        total_amount_inr: total,
        discounted_amount_inr: discounted,
        payment_status: "pending",
      }),
    });
    const [registration] = await registrationRes.json();

    if (modules?.length) {
      await db(`${supabaseUrl}/rest/v1/registration_modules`, serviceRole, {
        method: "POST",
        body: JSON.stringify(modules.map((m: any) => ({ registration_id: registration.id, module_id: m.id, price_inr: m.price_inr }))),
      });
    }

    let emailEvent: any = null;
    if (resendApiKey) {
      const emailPayload = {
        from: resendFromEmail,
        to: [registrationsAlertEmail],
        subject: `New registration: ${payload.fullName}`,
        html: `<h2>New registration captured</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phoneE164)}</p>
          <p><strong>Modules:</strong> ${escapeHtml(payload.modules.join(", "))}</p>
          <p><strong>Preferred mode:</strong> ${escapeHtml(payload.preferredMode || "Not provided")}</p>
          <p><strong>Lead source:</strong> ${escapeHtml(payload.leadSource || "Website")}</p>
          <p><strong>Total:</strong> ₹${discounted.toLocaleString("en-IN")}</p>
          <p><strong>Note:</strong> ${escapeHtml(payload.learnerGoal || "-")}</p>`,
      };

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });
      const resendJson = await resendRes.json();
      emailEvent = resendJson;

      await db(`${supabaseUrl}/rest/v1/email_events`, serviceRole, {
        method: "POST",
        body: JSON.stringify({
          event_type: "registration_alert",
          registration_id: registration.id,
          recipient_email: registrationsAlertEmail,
          provider: "resend",
          provider_message_id: resendJson?.id || null,
          status: resendRes.ok ? "sent" : "failed",
          payload: emailPayload,
        }),
      });
    }

    await db(`${supabaseUrl}/rest/v1/audit_logs`, serviceRole, {
      method: "POST",
      body: JSON.stringify({
        entity_type: "registration",
        entity_id: registration.id,
        action: "registration_submitted",
        details: { emailSent: Boolean(emailEvent), moduleCodes: payload.modules },
      }),
    });

    return json({ registrationId: registration.id, paymentUrl: null, mode: "remote" }, 200);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function db(url: string, serviceRole: string, init: RequestInit) {
  return await fetch(url, {
    ...init,
    headers: {
      apikey: serviceRole,
      Authorization: `Bearer ${serviceRole}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
