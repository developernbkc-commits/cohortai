import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { Database, GitBranch, Mail, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const pillars = [
  { icon: Database, title: "Admissions CRM + DB", body: "Applicants, course bundles, payments, approvals, batch assignments, mentors, and audit logs live in one system." },
  { icon: Wallet, title: "UPI-first payments", body: "Each registration creates a payable record. Payment success updates the registration state and unlocks admin review." },
  { icon: ShieldCheck, title: "RBAC and approvals", body: "Admissions, finance, mentors, and super admins each see only the functions relevant to their responsibilities." },
  { icon: Mail, title: "Controlled enrollment mails", body: "No auto-enrollment immediately after payment. Final confirmation goes out only after admin allocates a batch date and slot." },
  { icon: GitBranch, title: "Workflow automation", body: "Use event-driven status transitions so leads move cleanly from application to payment to approval to enrollment." },
  { icon: Sparkles, title: "Tech refresh", body: "This is the right moment to move from brochure site to product-ready platform architecture and operations workflows." },
];

const phases = [
  "Phase 1: UX refresh + self-registration + modular catalog",
  "Phase 2: Database schema + authentication + admin RBAC",
  "Phase 3: UPI payment integration + webhook reconciliation",
  "Phase 4: Batch creation, seat allocation, and email templates",
  "Phase 5: Reporting, audit logs, exports, and mentor workspace",
];

export default function Platform() {
  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Solution blueprint"
            title="From marketing website to admissions and enrollment platform"
            desc="The right upgrade is not just a prettier frontend. It is a workflow platform that captures registrations, handles configurable programs, verifies payments, and gives admins operational control."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((item) => (
              <div key={item.title} className="glass rounded-3xl p-6 ring-soft">
                <item.icon className="text-cyan-200" size={20} />
                <div className="mt-4 text-lg font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm text-slate-400">{item.body}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-3xl p-6 ring-soft">
              <div className="text-sm font-semibold text-white">Recommended domain model</div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                <li>• Users, roles, and permissions</li>
                <li>• Learners and profile details</li>
                <li>• Course catalog, bundles, and optional modules</li>
                <li>• Registrations, payment attempts, and invoices</li>
                <li>• Batches, slots, mentors, and seat allocation</li>
                <li>• Notifications, templates, and audit logs</li>
              </ul>
            </div>

            <div className="glass rounded-3xl p-6 ring-soft">
              <div className="text-sm font-semibold text-white">Suggested rollout</div>
              <div className="mt-4 grid gap-3">
                {phases.map((phase) => (
                  <div key={phase} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-sm text-slate-300">
                    {phase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
