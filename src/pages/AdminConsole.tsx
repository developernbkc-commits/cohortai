import { Link } from "react-router-dom";
import { Activity, BadgeCheck, CalendarRange, CreditCard, LayoutDashboard, Shield, UserCog, Users } from "lucide-react";
import { adminRoles, sampleApplicants } from "../lib/catalog";
import AdminShell from "../components/admin/AdminShell";

const quickLinks = [
  { title: "Program Studio", href: "/admin/program-studio" },
  { title: "Coupon Governance", href: "/admin/coupons" },
  { title: "Payments", href: "/admin/payments" },
  { title: "Registrations", href: "/admin/registrations" },
];

const tiles = [
  { icon: LayoutDashboard, title: "Dashboard", text: "Admissions funnel, revenue, upcoming batches, conversion by track" },
  { icon: Users, title: "Admissions process", text: "Lead intake, counseling notes, document collection, status changes" },
  { icon: BadgeCheck, title: "Approvals process", text: "Review paid applications, approve or reject, assign counselors" },
  { icon: CreditCard, title: "Registration", text: "Payment verification, learner contracts, refund and reconciliation states" },
  { icon: CalendarRange, title: "Batch allocation", text: "Create batches, assign start dates, slot capacity, mentor mapping" },
  { icon: UserCog, title: "User management", text: "Add, edit, deactivate users with RBAC and audit visibility" },
];

export default function AdminConsole() {
  return (
    <AdminShell
      title="A role-based back office for admissions, approvals, registrations, and batch operations"
      blurb="This workspace now becomes the single internal operating surface. It carries forward the premium site context from the public experience while separating governed operations for Finance, Admissions, Programs, Payments, and Batch workflows."
    >
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white/82 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-2 text-slate-950 font-semibold">
              <Shield className="text-cyan-700" size={18} />
              Personalized RBAC
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {quickLinks.map((item) => (
                <Link key={item.href} to={item.href} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              {adminRoles.map((item) => (
                <div key={item.role} className="rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(246,250,255,0.92))] p-4">
                  <div className="text-sm font-semibold text-slate-950">{item.role}</div>
                  <div className="mt-1 text-sm text-slate-600">{item.scope}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white/82 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-2 text-slate-950 font-semibold">
              <Activity className="text-emerald-700" size={18} />
              Operational states
            </div>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700">
              <li>• New lead</li>
              <li>• Application in progress</li>
              <li>• Payment initiated</li>
              <li>• Paid / under review</li>
              <li>• Approved / slot pending</li>
              <li>• Enrolled / email sent</li>
              <li>• Waitlisted / rejected / refunded</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tiles.map((tile) => (
              <div key={tile.title} className="rounded-[28px] border border-slate-200 bg-white/82 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.05)]">
                <tile.icon className="text-cyan-700" size={20} />
                <div className="mt-4 text-lg font-semibold text-slate-950">{tile.title}</div>
                <div className="mt-2 text-sm text-slate-600">{tile.text}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white/82 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)] overflow-x-auto">
            <div className="text-sm font-semibold text-slate-950">Admissions review queue</div>
            <table className="mt-4 w-full text-sm min-w-[680px]">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-3 pr-4">Applicant</th>
                  <th className="pb-3 pr-4">Program</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Payment</th>
                  <th className="pb-3">Batch slot</th>
                </tr>
              </thead>
              <tbody>
                {sampleApplicants.map((row) => (
                  <tr key={row.name} className="border-b border-slate-100 text-slate-700">
                    <td className="py-4 pr-4 font-semibold text-slate-950">{row.name}</td>
                    <td className="py-4 pr-4">{row.track}</td>
                    <td className="py-4 pr-4">{row.status}</td>
                    <td className="py-4 pr-4">{row.payment}</td>
                    <td className="py-4">{row.slot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
