import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { modules } from "../lib/catalog";
import { CheckCircle2, CircleDollarSign, Layers3, ShieldCheck, UserRound } from "lucide-react";
import { cn } from "../lib/utils";

const steps = [
  { icon: Layers3, label: "Choose modules" },
  { icon: UserRound, label: "Your details" },
  { icon: CircleDollarSign, label: "UPI payment" },
  { icon: CheckCircle2, label: "Admin approval" },
];

export default function Register() {
  const [selected, setSelected] = React.useState<string[]>(["foundation-ai", "career-kit"]);
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);

  const total = modules
    .filter((m) => selected.includes(m.id))
    .reduce((sum, item) => sum + item.price, 0);

  const toggle = (id: string) => {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Self-registration"
            title="Let learners mix, match, and register without manual back-and-forth"
            desc="This upgraded flow captures learner data, supports modular course selection, creates a payment-ready registration, and then pushes the record into admin review for batch allocation."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="glass rounded-3xl p-6 ring-soft">
              <div className="grid gap-3 md:grid-cols-4">
                {steps.map((s, idx) => (
                  <div key={s.label} className={cn("rounded-2xl border p-4", idx <= step ? "border-cyan-200/40 bg-slate-900/80" : "border-slate-800/60 bg-slate-950/40")}>
                    <s.icon size={18} className="text-cyan-200" />
                    <div className="mt-3 text-sm font-semibold text-white">{s.label}</div>
                    <div className="mt-1 text-xs text-slate-400">Step {idx + 1}</div>
                  </div>
                ))}
              </div>

              {!submitted ? (
                <>
                  <div className="mt-8">
                    <div className="text-sm font-semibold text-white">1. Choose your course stack</div>
                    <div className="mt-2 text-sm text-slate-400">Learners can combine business, everyday, and tech modules into a personalized path. Pricing rolls up automatically.</div>
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
                              active ? "border-cyan-200/50 bg-slate-900/80 neon-edge" : "border-slate-800/60 bg-slate-950/40 hover:bg-slate-900/60"
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-xs tracking-[0.2em] uppercase text-slate-400">{module.track}</div>
                                <div className="mt-2 text-lg font-semibold text-white">{module.title}</div>
                              </div>
                              <div className="rounded-full border border-slate-700/60 px-3 py-1 text-xs text-slate-300">{module.level}</div>
                            </div>
                            <div className="mt-2 text-sm text-slate-400">{module.duration} • ₹{module.price.toLocaleString("en-IN")}</div>
                            <ul className="mt-4 grid gap-2 text-sm text-slate-200">
                              {module.outcomes.map((item) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs text-slate-400">Full name</label>
                      <input className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white" placeholder="Learner full name" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Email</label>
                      <input className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white" placeholder="name@example.com" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Phone</label>
                      <input className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white" placeholder="10-digit mobile" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Preferred format</label>
                      <select className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white">
                        <option>Weekend online</option>
                        <option>Weekday evening online</option>
                        <option>Offline classroom</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs text-slate-400">Goals / customization note</label>
                      <textarea rows={4} className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white" placeholder="Example: I want business content automation plus a beginner Python foundation for freelancing." />
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-emerald-200/20 bg-emerald-300/10 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="text-emerald-200 shrink-0" size={20} />
                      <div>
                        <div className="text-sm font-semibold text-white">UPI payment + admin approval flow</div>
                        <div className="mt-2 text-sm text-slate-300">
                          On production, this step should create a registration record, generate a UPI payment link, verify the payment via webhook, and move the learner into the admissions review queue. Enrollment email goes only after admin assigns the learner to a batch and slot.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => setStep(2)} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 neon-edge">
                      Continue to payment
                    </button>
                    <button onClick={() => setSubmitted(true)} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white border border-slate-700/60 bg-slate-900/60">
                      Demo complete registration
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-8 rounded-3xl border border-cyan-200/30 bg-slate-900/80 p-6">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-emerald-200" />
                    <div className="text-lg font-semibold">Registration captured successfully</div>
                  </div>
                  <div className="mt-3 text-sm text-slate-300">
                    The learner record is now marked as <span className="text-white font-semibold">Paid / Pending admin review</span>. Next step is batch allocation, counselor notes, and the enrollment confirmation email from the admin console.
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="text-sm font-semibold text-white">Selected modules</div>
                <div className="mt-4 grid gap-3">
                  {modules.filter((m) => selected.includes(m.id)).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4">
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.track} • {item.duration}</div>
                      <div className="mt-3 text-sm text-cyan-200">₹{item.price.toLocaleString("en-IN")}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-800/60 pt-4">
                  <div className="text-sm text-slate-400">Estimated total</div>
                  <div className="text-xl font-semibold text-white">₹{total.toLocaleString("en-IN")}</div>
                </div>
              </div>

              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="text-sm font-semibold text-white">Production behavior</div>
                <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                  <li>• Save learner + course bundle into the database</li>
                  <li>• Create a UPI payment link against that registration</li>
                  <li>• Mark payment status from webhook verification</li>
                  <li>• Send admin task to review documents and assign batch</li>
                  <li>• Trigger final enrollment email after slot allocation</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
