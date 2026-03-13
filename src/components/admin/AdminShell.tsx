import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, TicketsPercent, Boxes, CreditCard, CalendarRange, LogOut } from 'lucide-react';
import Logo from '../Logo';
import { clearAdminSessionRole, getAdminSessionRole, adminRoleOptions } from '../../lib/adminAuth';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/program-studio', label: 'Programs', icon: Boxes },
  { to: '/admin/coupons', label: 'Coupons', icon: TicketsPercent },
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/registrations', label: 'Registrations', icon: CalendarRange },
];

export default function AdminShell({ children, title, blurb }: { children: ReactNode; title: string; blurb: string }) {
  const role = getAdminSessionRole();
  const roleLabel = adminRoleOptions.find((r) => r.value === role)?.label || 'Authorized operator';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_22%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#f3f6fb_45%,#eef3f9_100%)] text-slate-900">
      <div className="mx-auto max-w-[1360px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-white/70 bg-white/78 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 border-b border-slate-200/80 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-4">
              <Link to="/" aria-label="CohortAI Labs home">
                <Logo compact className="origin-left" />
              </Link>
              <div className="hidden h-10 w-px bg-slate-200 lg:block" />
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-slate-500">Admin workspace</div>
                <div className="mt-1 text-sm font-medium text-slate-700">{roleLabel}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/admin-access" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                Switch role
              </Link>
              <button
                onClick={() => {
                  clearAdminSessionRole();
                  window.location.href = '/admin-access';
                }}
                className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
              >
                <LogOut className="mr-2 h-4 w-4" /> Exit admin
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="border-b border-slate-200/80 px-5 py-6 lg:min-h-[calc(100vh-170px)] lg:border-b-0 lg:border-r lg:px-6">
              <div className="rounded-[26px] border border-cyan-100 bg-[linear-gradient(135deg,rgba(224,247,255,0.9),rgba(245,243,255,0.9))] p-5 shadow-[0_18px_50px_rgba(80,160,255,0.12)]">
                <div className="flex items-center gap-2 text-cyan-900">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">Context locked</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">This workspace keeps the premium brand theme while exposing governed operations for programs, coupons, finance approvals, payments, and enrollment workflows.</p>
              </div>

              <nav className="mt-6 space-y-2">
                {links.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-slate-950 text-white shadow-[0_16px_40px_rgba(15,23,42,0.15)]' : 'text-slate-700 hover:bg-white hover:text-slate-950'}`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </aside>

            <div className="px-5 py-6 lg:px-8 lg:py-8">
              <div className="rounded-[30px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_14px_44px_rgba(15,23,42,0.05)]">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Enterprise operations</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{blurb}</p>
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
