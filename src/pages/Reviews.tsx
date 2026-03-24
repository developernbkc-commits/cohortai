import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { submitReview } from "../lib/api";
import { CheckCircle2, ImagePlus, ShieldCheck, Star } from "lucide-react";

const initial = {
  fullName: "",
  email: "",
  city: "",
  country: "India",
  courseName: "AI Productivity Pro",
  roleTitle: "",
  rating: 5,
  headline: "",
  reviewText: "",
  profileImageUrl: "",
  consentToPublish: true,
};

export default function Reviews() {
  const [form, setForm] = React.useState(initial);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState<null | { mode: string; error?: string }>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitReview(form);
    setSubmitting(false);
    setDone({ mode: result.mode, error: result.error });
    if (result.ok) setForm(initial);
  }

  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Public proof"
            title="Let learners share their experience for review and approval"
            desc="Learners can submit their review, an optional profile image URL, and consent to publish. Every submission is reviewed by the team before it appears on the public site."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <form onSubmit={onSubmit} className="glass rounded-3xl p-6 ring-soft space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name"><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required className={inputClass} /></Field>
                <Field label="Email"><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required className={inputClass} /></Field>
                <Field label="City"><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} /></Field>
                <Field label="Country"><input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} /></Field>
                <Field label="Course / program"><input value={form.courseName} onChange={(e) => setForm({ ...form, courseName: e.target.value })} required className={inputClass} /></Field>
                <Field label="Role / title"><input value={form.roleTitle} onChange={(e) => setForm({ ...form, roleTitle: e.target.value })} className={inputClass} placeholder="Student, Founder, Analyst..." /></Field>
              </div>

              <Field label="Headline">
                <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} required className={inputClass} placeholder="Example: Best AI course for practical career growth" />
              </Field>

              <Field label="Review text">
                <textarea value={form.reviewText} onChange={(e) => setForm({ ...form, reviewText: e.target.value })} required rows={5} className={inputClass} placeholder="What changed for you? Mention outcomes, mentor support, confidence, projects, or business impact." />
              </Field>

              <div className="grid gap-4 md:grid-cols-[0.5fr_1fr]">
                <Field label="Rating">
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className={inputClass}>
                    {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} / 5</option>)}
                  </select>
                </Field>
                <Field label="Profile image URL (optional)">
                  <input value={form.profileImageUrl} onChange={(e) => setForm({ ...form, profileImageUrl: e.target.value })} className={inputClass} placeholder="Optional: add a public photo URL or profile image link" />
                </Field>
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700">
                <input type="checkbox" checked={form.consentToPublish} onChange={(e) => setForm({ ...form, consentToPublish: e.target.checked })} className="mt-0.5" />
                <span>I consent to my approved testimonial, name, and profile image being displayed publicly after admin review.</span>
              </label>

              <button disabled={submitting} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 neon-edge disabled:opacity-70">
                {submitting ? "Submitting..." : "Submit for approval"}
              </button>

              {done && (
                <div className={`rounded-2xl border px-4 py-3 text-sm ${done.error ? "border-amber-300 bg-amber-50 text-amber-900" : "border-emerald-300 bg-emerald-50 text-emerald-900"}`}>
                  {done.error
                    ? `We could not complete the submission right now. Your review was saved in temporary mode on this browser. Please retry shortly or contact the team. Error: ${done.error}`
                    : done.mode === "remote"
                    ? "Your review was received and is now waiting for team approval."
                    : "Your review was saved in temporary mode on this browser. Please retry shortly so the team can receive it properly."}
                </div>
              )}
            </form>

            <div className="space-y-6">
              <div className="glass-pearl rounded-3xl p-6 ring-soft">
                <div className="flex items-center gap-2 text-slate-950 font-semibold"><ShieldCheck size={18} /> Moderated trust system</div>
                <ul className="mt-4 grid gap-3 text-sm text-slate-600">
                  <li>• every review is checked before it is displayed publicly</li>
                  <li>• nothing appears on the site without team approval</li>
                  <li>• photo links are reviewed along with the testimonial</li>
                  <li>• approved stories help future learners choose with confidence</li>
                </ul>
              </div>

              <div className="glass-pearl rounded-3xl p-6 ring-soft">
                <div className="flex items-center gap-2 text-slate-950 font-semibold"><Star size={18} /> What strong reviews should include</div>
                <ul className="mt-4 grid gap-3 text-sm text-slate-600">
                  <li>• specific outcomes, not generic praise</li>
                  <li>• confidence, project, career, or business improvements</li>
                  <li>• mentor guidance and accountability moments</li>
                  <li>• a clear before → after transformation</li>
                </ul>
              </div>

              <div className="glass-pearl rounded-3xl p-6 ring-soft">
                <div className="flex items-center gap-2 text-slate-950 font-semibold"><ImagePlus size={18} /> Enterprise-ready next step</div>
                <div className="mt-3 text-sm text-slate-600 leading-7">
                  As the platform grows, this section will support smoother uploads, richer moderation controls, and a stronger showcase of approved learner stories.
                </div>
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
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass = "w-full rounded-2xl bg-white/80 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100";
