import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, KeyRound, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';
import Container from '../components/Container';
import Logo from '../components/Logo';
import { adminRoleOptions, setAdminSessionRole, type AdminRole, authenticateBootstrapAdmin } from '../lib/adminAuth';

const passwordPolicy = [
  'Minimum 12 characters for all future admin-managed passwords',
  'At least one uppercase letter, one lowercase letter, one number, and one special character',
  'Cannot match phone number or email',
  'MFA should be enabled once Supabase Auth is wired',
];

export default function AdminAccess() {
  const [role, setRole] = useState<AdminRole>('super_admin');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from || '/admin';
  }, [location.state]);

  function onContinue() {
    setError('');
    if (!phone.trim() || !password.trim()) {
      setError('Please enter the admin phone number and password to continue.');
      return;
    }
    if (!authenticateBootstrapAdmin(phone, password, role)) {
      setError(role !== 'super_admin'
        ? 'Temporary bootstrap access is only enabled for the Super Admin in this stabilization release.'
        : 'Invalid phone number or password. Please verify the bootstrap credentials.');
      return;
    }
    setAdminSessionRole(role);
    navigate(nextPath);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.14),transparent_24%),linear-gradient(180deg,#f9fbff_0%,#f3f6fb_45%,#edf3fa_100%)] py-10 sm:py-14">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[34px] border border-white/80 bg-white/78 p-8 shadow-[0_28px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
            <Logo size="hero" />
            <div className="mt-8 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-900">
              <Sparkles className="mr-2 h-4 w-4" /> Dedicated admin workspace
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">Operations, finance, admissions, and approvals deserve a focused entry experience.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">This page now stands apart from the public site. It gives admins a clear way into governed operations without being buried under the public footer or learner navigation.</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2 text-slate-950">
                  <ShieldCheck className="h-5 w-5 text-cyan-700" />
                  <div className="font-semibold">What is protected</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• Program Studio and admin-defined program publishing</li>
                  <li>• Coupon request workflow with Finance auto-publish authority</li>
                  <li>• Registrations, payments, batch allocation, and audit-ready ops</li>
                </ul>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,rgba(236,254,255,0.95),rgba(245,243,255,0.95))] p-5 shadow-[0_16px_40px_rgba(14,165,233,0.08)]">
                <div className="flex items-center gap-2 text-slate-950">
                  <KeyRound className="h-5 w-5 text-fuchsia-700" />
                  <div className="font-semibold">Bootstrap mode</div>
                </div>
                <div className="mt-4 text-sm leading-6 text-slate-600">This stabilization build supports a temporary Super Admin bootstrap login for initial access. In the secured version, Supabase Auth + RLS claims will replace this fallback completely.</div>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/80 bg-white/84 p-8 shadow-[0_28px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
            <div className="text-xs uppercase tracking-[0.26em] text-slate-500">Admin sign-in</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Continue into the controlled admin environment</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Use the temporary bootstrap credentials only for initial stabilization and testing. Replace this with Supabase-backed authentication in the next secured phase.</p>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <div className="text-xs text-slate-500">Role</div>
                <select value={role} onChange={(e) => setRole(e.target.value as AdminRole)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100">
                  {adminRoleOptions.filter((item) => item.value !== 'learner').map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <div className="text-xs text-slate-500">Admin phone</div>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-100">
                  <Smartphone className="h-4 w-4 text-slate-400" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent text-sm text-slate-900 outline-none" placeholder="Enter admin mobile number" />
                </div>
              </label>

              <label className="block">
                <div className="text-xs text-slate-500">Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100" placeholder="Enter admin password" />
              </label>
            </div>

            {error ? (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>{error}</div>
              </div>
            ) : null}

            <button onClick={onContinue} className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5">
              Continue to admin
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50/90 p-5">
              <div className="text-sm font-semibold text-slate-950">Password policy for the secured rollout</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {passwordPolicy.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
