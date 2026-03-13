import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { modules } from "../lib/catalog";
import { CheckCircle2, CircleDollarSign, Layers3, ShieldCheck, UserRound } from "lucide-react";
import { cn } from "../lib/utils";
import { submitRegistration } from "../lib/api";

const steps = [
  { icon: Layers3, label: "Choose modules" },
  { icon: UserRound, label: "Learner details" },
  { icon: CircleDollarSign, label: "Payment intent" },
  { icon: CheckCircle2, label: "Admin review" },
];

const initialForm = {
  fullName: "",
  email: "",
  phoneCountryCode: "+91",
  phoneNationalNumber: "",
  country: "India",
  preferredMode: "Weekend online",
  learnerGoal: "",
  promoCode: "",
  referralCode: "",
  leadSource: "Website homepage",
};

export default function Register() {
  const [selected, setSelected] = React.useState<string[]>(["foundation-ai", "career-kit"]);
  const [step, setStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState<null | { mode: string; paymentUrl?: string; error?: string }>(null);
  const [form, setForm] = React.useState(initialForm);

  const total = modules.filter((m) => selected.includes(m.id)).reduce((sum, item) => sum + item.price, 0);
  const promoDiscount = form.promoCode.trim() ? Math.min(2000, Math.round(total * 0.1)) : 0;
  const payable = Math.max(0, total - promoDiscount);

  const toggle = (id: string) => {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitRegistration({ ...form, modules: selected });
    setSubmitting(false);
    setSubmitted({ mode: result.mode, paymentUrl: result.data?.paymentUrl, error: result.error });
    if (result.ok) setStep(3);
  }

  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Self-registration"
            title="Let learners mix, match, register, and move into a real admissions workflow"
            desc="Phase B wires this registration flow for real backend persistence. It now captures learner details, global phone code, modules, promo/referral codes, and lead source so the record can enter admissions review cleanly."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <form onSubmit={onSubmit} className="glass-pearl rounded-3xl p-6 ring-soft">
              <div className="grid gap-3 md:grid-cols-4">
                {steps.map((s, idx) => (
                  <div key={s.label} className={cn("rounded-2xl border p-4", idx <= step ? "border-cyan-200/70 bg-white shadow-sm" : "border-slate-200/70 bg-white/70")}>
                    <s.icon size={18} className="text-cyan-700" />
                    <div className="mt-3 text-sm font-semibold text-slate-950">{s.label}</div>
                    <div className="mt-1 text-xs text-slate-600">Step {idx + 1}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="text-sm font-semibold text-slate-950">1. Choose your course stack</div>
                <div className="mt-2 text-sm text-slate-600">Learners can combine business, everyday, and tech modules into a personalized path. Pricing rolls up automatically and can accept promo or referral logic later.</div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {modules.map((module) => {
                    const active = selected.includes(module.id);
                    return (
                      <button
                        type="button"
                        key={module.id}
                        onClick={() => toggle(module.id)}
                        className={cn(
                          "text-left rounded-3xl border p-5 transition",
                          active ? "border-cyan-300 bg-white neon-edge shadow-sm" : "border-slate-200 bg-white/80 hover:bg-white"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs tracking-[0.2em] uppercase text-slate-600">{module.track}</div>
                            <div className="mt-2 text-lg font-semibold text-slate-950">{module.title}</div>
                          </div>
                          <div className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">{module.level}</div>
                        </div>
                        <div className="mt-2 text-sm text-slate-600">{module.duration} • ₹{module.price.toLocaleString("en-IN")}</div>
                        <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                          {module.outcomes.map((item) => <li key={item}>• {item}</li>)}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Field label="Full name"><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputClass} required placeholder="Learner full name" /></Field>
                <Field label="Email"><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} required type="email" placeholder="name@example.com" /></Field>
                <Field label="Country code"><input value={form.phoneCountryCode} onChange={(e) => setForm({ ...form, phoneCountryCode: e.target.value })} className={inputClass} required placeholder="+91" /></Field>
                <Field label="Phone number"><input value={form.phoneNationalNumber} onChange={(e) => setForm({ ...form, phoneNationalNumber: e.target.value })} className={inputClass} required placeholder="8374617625" /></Field>
                <Field label="Country"><input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} required placeholder="India" /></Field>
                <Field label="Preferred format">
                  <select value={form.preferredMode} onChange={(e) => setForm({ ...form, preferredMode: e.target.value })} className={inputClass}>
                    <option>Weekend online</option>
                    <option>Weekday evening online</option>
                    <option>Offline classroom</option>
                    <option>Hybrid</option>
                  </select>
                </Field>
                <Field label="Promo code"><input value={form.promoCode} onChange={(e) => setForm({ ...form, promoCode: e.target.value.toUpperCase() })} className={inputClass} placeholder="WELCOME10" /></Field>
                <Field label="Referral code"><input value={form.referralCode} onChange={(e) => setForm({ ...form, referralCode: e.target.value.toUpperCase() })} className={inputClass} placeholder="FRIEND-ABC123" /></Field>
                <div className="md:col-span-2">
                  <Field label="Lead source"><input value={form.leadSource} onChange={(e) => setForm({ ...form, leadSource: e.target.value })} className={inputClass} placeholder="Homepage, WhatsApp, campaign, counselor..." /></Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Goals / customization note"><textarea value={form.learnerGoal} onChange={(e) => setForm({ ...form, learnerGoal: e.target.value })} rows={4} className={inputClass} placeholder="Example: I want business content automation plus a beginner Python foundation for freelancing." /></Field>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50/90 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-emerald-700 shrink-0" size={20} />
                  <div>
                    <div className="text-sm font-semibold text-slate-950">Backend-ready behavior</div>
                    <div className="mt-2 text-sm text-slate-700">
                      With Supabase + Resend configured, submission will create the learner profile, registration, registration items, and an internal alert email to <span className="font-semibold text-slate-950">registrations@itprofessional.pro</span>. Payment verification and final enrollment mail remain a controlled admin workflow.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 neon-edge disabled:opacity-70">
                  {submitting ? "Submitting..." : "Create registration"}
                </button>
                <button type="button" onClick={() => setStep(2)} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-900 border border-slate-300 bg-white/85">
                  Review payment stage
                </button>
              </div>

              {submitted && (
                <div className={`mt-6 rounded-3xl border p-5 ${submitted.error ? "border-amber-300/50 bg-amber-50 text-amber-900" : "border-cyan-200 bg-cyan-50 text-slate-950"}`}>
                  <div className="flex items-center gap-3 text-lg font-semibold">
                    <CheckCircle2 className={submitted.error ? "text-amber-700" : "text-emerald-700"} />
                    {submitted.error ? "Remote save failed" : "Registration captured successfully"}
                  </div>
                  <div className={`mt-3 text-sm ${submitted.error ? "text-amber-900" : "text-slate-700"}`}>
                    {submitted.error
                      ? `The payload was preserved in fallback mode. Once the backend credentials are fixed, retry submission. Error: ${submitted.error}`
                      : submitted.mode === "remote"
                      ? "The learner record is now in the live admissions queue and the internal registration email should have been triggered."
                      : "The record was stored locally as a safe fallback. Wire Supabase and Resend to move this into the real admissions queue."}
                  </div>
                  {submitted.paymentUrl && (
                    <a href={submitted.paymentUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                      Open payment link
                    </a>
                  )}
                </div>
              )}
            </form>

            <div className="space-y-6">
              <div className="glass-pearl rounded-3xl p-6 ring-soft">
                <div className="text-sm font-semibold text-slate-950">Selected modules</div>
                <div className="mt-4 grid gap-3">
                  {modules.filter((m) => selected.includes(m.id)).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="text-sm font-semibold text-slate-950">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-600">{item.track} • {item.duration}</div>
                      <div className="mt-3 text-sm text-cyan-700">₹{item.price.toLocaleString("en-IN")}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
                  <div className="flex items-center justify-between text-slate-600"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                  <div className="flex items-center justify-between text-emerald-700"><span>Promo preview</span><span>- ₹{promoDiscount.toLocaleString("en-IN")}</span></div>
                  <div className="flex items-center justify-between text-slate-950 text-xl font-semibold"><span>Estimated payable</span><span>₹{payable.toLocaleString("en-IN")}</span></div>
                </div>
              </div>

              <div className="glass-pearl rounded-3xl p-6 ring-soft">
                <div className="text-sm font-semibold text-slate-950">Phase B live backend behavior</div>
                <ul className="mt-4 grid gap-3 text-sm text-slate-700">
                  <li>• Create or reuse learner profile</li>
                  <li>• Save registration + module bundle in Postgres</li>
                  <li>• Record promo/referral intent for future pricing rules</li>
                  <li>• Trigger internal email to registrations inbox</li>
                  <li>• Keep payment + final enrollment as admin-controlled steps</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs text-slate-600">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass = "w-full rounded-2xl bg-white/85 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100";
