import { useMemo, useState } from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { adminRoles, sampleApplicants } from "../lib/catalog";
import { couponApprovalRole, couponAllowedRequestors, couponRequests } from "../lib/couponWorkflow";
import { programDefinitions } from "../lib/programs";
import { Activity, BadgeCheck, CalendarRange, CreditCard, LayoutDashboard, Shield, UserCog, Users, WalletCards, FolderKanban } from "lucide-react";

const tiles = [
  { icon: LayoutDashboard, title: "Dashboard", text: "Admissions funnel, finance approvals, conversion by track, upcoming batches" },
  { icon: Users, title: "Admissions process", text: "Lead intake, counseling notes, registration review, status movement" },
  { icon: BadgeCheck, title: "Approvals process", text: "Exceptions, approvals, payment checks, and readiness signals" },
  { icon: CreditCard, title: "Registration", text: "Payment verification, enrollment fee handling, refund and reconciliation states" },
  { icon: CalendarRange, title: "Batch allocation", text: "Create batches, assign start dates, slot capacity, mentor mapping" },
  { icon: UserCog, title: "User management", text: "Add, edit, deactivate users with RBAC and audit visibility" },
];

const tabs = ["overview", "programs", "coupons"] as const;
type Tab = (typeof tabs)[number];

export default function AdminConsole() {
  const [tab, setTab] = useState<Tab>("overview");
  const financeReady = useMemo(() => couponRequests.filter((x) => x.status === "under_finance_review" || x.status === "approved"), []);

  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Admin console"
            title="A role-based back office for admissions, program publishing, coupon governance, and batch operations"
            desc="This page now reflects Phase D priorities: admin-defined programs, finance-approved coupon publishing, and operations that feel enterprise-grade instead of improvised."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${tab === item ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white/85 text-slate-700 hover:bg-white"}`}
              >
                {item === "overview" ? "Operations overview" : item === "programs" ? "Program studio" : "Coupon governance"}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Shield className="text-cyan-200" size={18} />
                  Personalized RBAC
                </div>
                <div className="mt-4 grid gap-3">
                  {adminRoles.map((item) => (
                    <div key={item.role} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4">
                      <div className="text-sm font-semibold text-white">{item.role}</div>
                      <div className="mt-1 text-sm text-slate-400">{item.scope}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Activity className="text-emerald-200" size={18} />
                  Operational states
                </div>
                <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                  <li>• draft → submitted → under_review → approved</li>
                  <li>• payment_pending → paid → batch_assigned → enrolled</li>
                  <li>• coupon requested → finance review → published</li>
                  <li>• waitlisted / rejected / refunded for controlled edge cases</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {tab === "overview" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {tiles.map((tile) => (
                      <div key={tile.title} className="glass rounded-3xl p-5 ring-soft">
                        <tile.icon className="text-cyan-200" size={20} />
                        <div className="mt-4 text-lg font-semibold text-white">{tile.title}</div>
                        <div className="mt-2 text-sm text-slate-400">{tile.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="glass rounded-3xl p-6 ring-soft overflow-x-auto">
                    <div className="text-sm font-semibold text-white">Admissions review queue</div>
                    <table className="mt-4 w-full text-sm min-w-[680px]">
                      <thead>
                        <tr className="text-left text-slate-400 border-b border-slate-800/60">
                          <th className="pb-3 pr-4">Applicant</th>
                          <th className="pb-3 pr-4">Program</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3 pr-4">Payment</th>
                          <th className="pb-3">Batch slot</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleApplicants.map((row) => (
                          <tr key={row.name} className="border-b border-slate-900/80 text-slate-200">
                            <td className="py-4 pr-4">{row.name}</td>
                            <td className="py-4 pr-4">{row.track}</td>
                            <td className="py-4 pr-4">{row.status}</td>
                            <td className="py-4 pr-4">{row.payment}</td>
                            <td className="py-4">{row.slot}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {tab === "programs" && (
                <div className="glass rounded-3xl p-6 ring-soft">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <FolderKanban className="text-cyan-200" size={18} /> Program studio
                  </div>
                  <div className="mt-2 text-sm text-slate-400">Programs should now be site-operator/admin defined instead of hardcoded into public pages. Published items become public; draft/review items stay internal.</div>
                  <div className="mt-5 grid gap-4">
                    {programDefinitions.map((program) => (
                      <div key={program.id} className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-lg font-semibold text-white">{program.name}</div>
                            <div className="mt-1 text-sm text-slate-400">{program.audience}</div>
                          </div>
                          <div className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">{program.status}</div>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm text-slate-300">
                          <div><span className="text-slate-500">Mode:</span> {program.mode}</div>
                          <div><span className="text-slate-500">Duration:</span> {program.duration}</div>
                          <div><span className="text-slate-500">Fee band:</span> {program.feeBand}</div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {program.outcomes.map((item) => (
                            <span key={item} className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-200">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "coupons" && (
                <div className="glass rounded-3xl p-6 ring-soft">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <WalletCards className="text-emerald-200" size={18} /> Coupon governance
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    Requestors: {couponAllowedRequestors.join(", ")}. Publishing approver: <span className="font-semibold text-white">{couponApprovalRole}</span>.
                  </div>
                  <div className="mt-5 grid gap-4">
                    {couponRequests.map((item) => (
                      <div key={item.code} className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-lg font-semibold text-white">{item.code}</div>
                            <div className="mt-1 text-sm text-slate-400">{item.discount} • {item.program}</div>
                          </div>
                          <div className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">{item.status}</div>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-slate-300">
                          <div><span className="text-slate-500">Bound to:</span> {item.bindType} / {item.bindValue}</div>
                          <div><span className="text-slate-500">Requested by:</span> {item.requestedBy}</div>
                          <div><span className="text-slate-500">Validity:</span> {item.validity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                    Finance workload preview: {financeReady.length} coupon items currently need approval or publishing attention.
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
