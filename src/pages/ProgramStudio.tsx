import { Link } from 'react-router-dom';
import { Layers3, Sparkles, Wand2 } from 'lucide-react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { samplePrograms } from '../lib/programStudioData';

export default function ProgramStudio() {
  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Program studio"
            title="Programs are now designed as admin-defined assets, not hardcoded website blocks"
            desc="Site Operators and Admins can create, stage, publish, and retire Programs without shipping a code release. This is the Phase E1 foundation for a data-driven catalog."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              {samplePrograms.map((program) => (
                <div key={program.id} className="glass rounded-[28px] p-6 ring-soft hover:-translate-y-0.5 transition-transform">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                      {program.status}
                    </span>
                    {program.featured && (
                      <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{program.name}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{program.audience}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm text-slate-200">
                      <div>{program.mode}</div>
                      <div className="mt-1 font-semibold text-white">₹{program.priceInr.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Duration</div>
                      <div className="mt-2 text-lg font-semibold text-white">{program.duration}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Courses mapped</div>
                      <div className="mt-2 text-lg font-semibold text-white">{program.courseCount}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Slug</div>
                      <div className="mt-2 text-sm font-semibold text-white">/{program.slug}</div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {program.outcomes.map((outcome) => (
                      <span key={outcome} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-white">
                  <Layers3 className="text-cyan-200" size={20} />
                  <h3 className="text-lg font-semibold">Operator controls</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li>• Create program shells, map courses, and control publish state.</li>
                  <li>• Mark featured programs and push them into the homepage hero, advisor, and registration funnel.</li>
                  <li>• Keep draft programs hidden until Finance, Operations, and Marketing are ready.</li>
                </ul>
              </div>

              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-white">
                  <Sparkles className="text-fuchsia-200" size={20} />
                  <h3 className="text-lg font-semibold">Enterprise guardrails</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li>• Program changes should create audit logs with actor role, action, and before/after payload.</li>
                  <li>• Published programs become read-only for non-authorized roles.</li>
                  <li>• Batches, pricing, and coupon applicability all reference the same Program ID.</li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/5 to-fuchsia-300/10 p-6 shadow-[0_20px_80px_rgba(34,211,238,0.12)]">
                <div className="flex items-center gap-3 text-white">
                  <Wand2 className="text-cyan-100" size={20} />
                  <h3 className="text-lg font-semibold">Next operational step</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Wire this page to Supabase so Programs become real records, then connect them to public pages, the AI advisor, registrations, coupon applicability, and batch management.
                </p>
                <Link to="/admin" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                  Back to Admin Console
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
