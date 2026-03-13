import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers3, Sparkles, Wand2, DatabaseZap, ShieldCheck, RefreshCw } from 'lucide-react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { createProgram, listPrograms, listProgramsFallback, ProgramRecord } from '../lib/opsApi';

const initialDraft = {
  name: '',
  slug: '',
  mode: 'Hybrid' as 'Online' | 'Live' | 'Hybrid',
  audience: '',
  duration: '',
  priceInr: 15000,
  outcomes: [''],
  featured: false,
};

export default function ProgramStudio() {
  const [draft, setDraft] = useState(initialDraft);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [programs, setPrograms] = useState<ProgramRecord[]>(listProgramsFallback());
  const [loading, setLoading] = useState(false);
  const [dataMode, setDataMode] = useState<'remote' | 'fallback'>('fallback');

  const loadPrograms = async () => {
    setLoading(true);
    const result = await listPrograms();
    if (result.ok) {
      setPrograms(result.data);
      setDataMode(result.mode);
      if (result.mode === 'remote') {
        setMessage('Program Studio is now reading from the live Supabase dataset.');
      }
    } else {
      setMessage(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadPrograms();
  }, []);

  const submit = async () => {
    setSaving(true);
    setMessage('');
    const result = await createProgram({
      ...draft,
      slug: draft.slug || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      outcomes: draft.outcomes.map((item) => item.trim()).filter(Boolean),
    });
    setSaving(false);
    if (result.ok) {
      setMessage(`Program saved in ${result.mode} mode.`);
      setDraft(initialDraft);
      await loadPrograms();
      return;
    }
    setMessage(result.error);
  };

  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Program studio"
            title="Admin-defined Programs now act like governed product assets instead of static website cards"
            desc="Operators can stage, publish, and retire Programs with a controlled structure for pricing, audience fit, outcomes, and future batch mappings."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white/75 px-5 py-4 text-sm text-slate-700 shadow-sm">
            <div>
              <span className="font-semibold text-slate-950">Data source:</span> {dataMode === 'remote' ? 'Live Supabase records' : 'Fallback local data'}
            </div>
            <button onClick={() => void loadPrograms()} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              {programs.map((program) => (
                <div key={program.id} className="glass rounded-[28px] p-6 ring-soft hover:-translate-y-0.5 transition-transform">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-800">
                      {program.status || program.publish_status || 'draft'}
                    </span>
                    {(program.featured || program.is_featured) && (
                      <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-800">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-950">{program.name || program.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">{program.audience || program.short_description}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 text-right text-sm text-slate-700">
                      <div>{program.mode}</div>
                      <div className="mt-1 font-semibold text-slate-950">₹{Number(program.priceInr).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <MetricCard label="Duration" value={program.duration} />
                    <MetricCard label="Courses mapped" value={String(program.courseCount ?? program.outcomes?.length ?? 0)} />
                    <MetricCard label="Slug" value={`/${program.slug}`} small />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(program.outcomes || []).map((outcome: string) => (
                      <span key={outcome} className="rounded-full border border-slate-200 bg-white/75 px-3 py-2 text-xs text-slate-700">
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-slate-950">
                  <DatabaseZap className="text-cyan-700" size={20} />
                  <h3 className="text-lg font-semibold">Create a program shell</h3>
                </div>
                <div className="mt-4 grid gap-3">
                  <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Program name" className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                  <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} placeholder="Slug (optional)" className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                  <textarea value={draft.audience} onChange={(e) => setDraft({ ...draft, audience: e.target.value })} placeholder="Who is this program for?" className="min-h-[104px] rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                  <div className="grid gap-3 md:grid-cols-3">
                    <select value={draft.mode} onChange={(e) => setDraft({ ...draft, mode: e.target.value as any })} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950">
                      <option>Online</option>
                      <option>Live</option>
                      <option>Hybrid</option>
                    </select>
                    <input value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: e.target.value })} placeholder="Duration" className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                    <input type="number" value={draft.priceInr} onChange={(e) => setDraft({ ...draft, priceInr: Number(e.target.value || 0) })} placeholder="Price" className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                  </div>
                  <div className="space-y-2">
                    {draft.outcomes.map((outcome, index) => (
                      <input
                        key={index}
                        value={outcome}
                        onChange={(e) => setDraft({ ...draft, outcomes: draft.outcomes.map((item, idx) => (idx === index ? e.target.value : item)) })}
                        placeholder={`Outcome ${index + 1}`}
                        className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950"
                      />
                    ))}
                    <button className="text-sm font-semibold text-cyan-800" onClick={() => setDraft({ ...draft, outcomes: [...draft.outcomes, ''] })}>+ Add another outcome</button>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} />
                    Mark as featured on the website
                  </label>
                  <button onClick={submit} disabled={saving || !draft.name.trim()} className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save program scaffold'}
                  </button>
                  {message && <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">{message}</div>}
                </div>
              </div>

              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-slate-950">
                  <Layers3 className="text-cyan-700" size={20} />
                  <h3 className="text-lg font-semibold">Operator controls</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  <li>• Programs are now designed to become DB-backed records so homepage sections, advisor outputs, coupon applicability, and batches all reference the same Program ID.</li>
                  <li>• Draft programs stay hidden until the operator team is ready to publish.</li>
                  <li>• Site Operators and Admins can define Programs whenever needed without shipping a new release.</li>
                </ul>
              </div>

              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-slate-950">
                  <ShieldCheck className="text-fuchsia-700" size={20} />
                  <h3 className="text-lg font-semibold">Enterprise guardrails</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  <li>• Program changes should create audit logs with actor role, action, and before/after payload.</li>
                  <li>• Published programs become read-only for non-authorized roles in later phases.</li>
                  <li>• Finance, Operations, and Marketing can consume the same record instead of duplicating spreadsheets.</li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/70 to-fuchsia-300/10 p-6 shadow-[0_20px_80px_rgba(34,211,238,0.12)]">
                <div className="flex items-center gap-3 text-slate-950">
                  <Wand2 className="text-cyan-700" size={20} />
                  <h3 className="text-lg font-semibold">Where this goes next</h3>
                </div>
                <div className="mt-4 text-sm leading-6 text-slate-700">
                  Next, these program records should drive the public site, recommendation engine, registration form, pricing rules, and batch operations. Once that happens, every team works off a single source of truth.
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to="/admin/coupons" className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950">Open coupon governance</Link>
                  <Link to="/register" className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950">See learner registration</Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-slate-950">
                  <Sparkles className="text-fuchsia-700" size={20} />
                  <h3 className="text-lg font-semibold">Why this matters commercially</h3>
                </div>
                <div className="mt-4 text-sm leading-6 text-slate-700">
                  Strong Program definitions improve conversion because the website, counselor team, promo logic, and batch planning all present the same offer. That reduces friction, removes confusion, and makes your brand look organized and premium.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function MetricCard({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className={`mt-2 font-semibold text-slate-950 ${small ? 'text-sm' : 'text-lg'}`}>{value}</div>
    </div>
  );
}
