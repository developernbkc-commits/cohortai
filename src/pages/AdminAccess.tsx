import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import Container from '../components/Container';
import Logo from '../components/Logo';
import { adminRoleOptions, setAdminSessionRole, type AdminRole } from '../lib/adminAuth';

export default function AdminAccess() {
  const [role, setRole] = useState<AdminRole>('admissions_admin');
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from || '/admin';
  }, [location.state]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_24%),linear-gradient(180deg,#f9fbff_0%,#f4f7fb_45%,#eef4fa_100%)] py-10 sm:py-14">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[34px] border border-white/80 bg-white/78 p-8 shadow-[0_28px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
            <Logo size="footer" />
            <div className="mt-8 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-900">
              <Sparkles className="mr-2 h-4 w-4" /> Admin access
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">Enter the governed operations workspace without losing the premium public-site experience.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">This route guard is now a dedicated admin entry experience. It keeps admissions, finance, coupon approvals, and program operations separate from public learner pages while preserving the light premium CohortAI Labs visual system.</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2 text-slate-950">
                  <LockKeyhole className="h-5 w-5 text-cyan-700" />
                  <div className="font-semibold">Protected admin surfaces</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• Admin Console, Program Studio, Coupon Governance, Payments, and Registrations are now grouped as a role-bound workspace.</li>
                  <li>• Finance keeps coupon publishing authority, with auto-publish immediately after Finance approval.</li>
                  <li>• This remains a deploy-safe step until full Supabase Auth + RLS enforcement is wired.</li>
                </ul>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,rgba(236,254,255,0.95),rgba(245,243,255,0.95))] p-5 shadow-[0_16px_40px_rgba(14,165,233,0.08)]">
                <div className="flex items-center gap-2 text-slate-950">
                  <ShieldCheck className="h-5 w-5 text-fuchsia-700" />
                  <div className="font-semibold">Enterprise context carried forward</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• Programs stay admin-defined, not hardcoded.</li>
                  <li>• Registrations, Razorpay payment readiness, reviews, and governed coupon flows remain aligned with the earlier roadmap.</li>
                  <li>• Public-site premium theme and conversion-first storytelling remain the baseline for every later release.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/80 bg-white/84 p-8 shadow-[0_28px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
            <div className="text-xs uppercase tracking-[0.26em] text-slate-500">Select operator role</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Choose the working role for this session</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">This is a temporary local-session access picker so you can enter the back office without blocking deployments. In the live secured version, users will sign in through Supabase Auth and the role will be read from protected claims.</p>
            <div className="mt-6 grid gap-3">
              {adminRoleOptions.filter((item) => item.value !== 'learner').map((item) => (
                <label key={item.value} className={`rounded-[24px] border p-4 transition ${role === item.value ? 'border-cyan-300 bg-cyan-50/70 shadow-[0_16px_40px_rgba(8,145,178,0.08)]' : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-slate-50/80'}`}>
                  <div className="flex items-start gap-3">
                    <input type="radio" checked={role === item.value} onChange={() => setRole(item.value)} className="mt-1" />
                    <div>
                      <div className="font-semibold text-slate-950">{item.label}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">{item.blurb}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <button
              onClick={() => {
                setAdminSessionRole(role);
                navigate(nextPath);
              }}
              className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5"
            >
              Continue as {adminRoleOptions.find((item) => item.value === role)?.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
