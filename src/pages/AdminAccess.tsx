import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { adminRoleOptions, setAdminSessionRole, type AdminRole } from '../lib/adminAuth';
import { LockKeyhole, ShieldCheck } from 'lucide-react';

export default function AdminAccess() {
  const [role, setRole] = useState<AdminRole>('admissions_admin');
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from || '/admin';
  }, [location.state]);

  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Admin access"
            title="Choose an authorized operator role to enter the admissions workspace"
            desc="This route guard keeps admin surfaces separate from public learner pages. In the live version, this selector will be replaced by secure authentication and role-bound sessions from Supabase."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="glass rounded-[28px] p-6 ring-soft">
              <div className="flex items-center gap-3 text-slate-950">
                <LockKeyhole className="text-cyan-700" size={20} />
                <h3 className="text-lg font-semibold">Protected admin surfaces</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                <li>• Admin Console, Program Studio, and Coupon Governance now require an authorized role.</li>
                <li>• Finance retains coupon publishing authority and auto-publish happens after Finance approval.</li>
                <li>• This local guard is a deploy-safe stepping stone until Supabase Auth + RLS is fully wired.</li>
              </ul>
            </div>

            <div className="glass rounded-[28px] p-6 ring-soft">
              <div className="flex items-center gap-3 text-slate-950">
                <ShieldCheck className="text-fuchsia-700" size={20} />
                <h3 className="text-lg font-semibold">Select your working role</h3>
              </div>
              <div className="mt-5 grid gap-3">
                {adminRoleOptions.filter((item) => item.value !== 'learner').map((item) => (
                  <label key={item.value} className={`rounded-2xl border p-4 transition ${role === item.value ? 'border-cyan-400 bg-cyan-50/70' : 'border-slate-200 bg-white/70'}`}>
                    <div className="flex items-start gap-3">
                      <input type="radio" checked={role === item.value} onChange={() => setRole(item.value)} className="mt-1" />
                      <div>
                        <div className="font-semibold text-slate-950">{item.label}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-700">{item.blurb}</div>
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
                className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              >
                Continue as {adminRoleOptions.find((item) => item.value === role)?.label}
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
