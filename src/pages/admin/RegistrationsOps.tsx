import { CalendarRange, ClipboardCheck, MailCheck, Users } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell';

const states = [
  'submitted',
  'under_review',
  'approved',
  'payment_pending',
  'paid',
  'batch_assigned',
  'enrolled',
  'rejected',
];

const actions = [
  { icon: Users, title: 'Admissions review', body: 'Review profile, chosen program, counselor notes, and any unique coupon or referral context.' },
  { icon: ClipboardCheck, title: 'Approval action', body: 'Move the learner into approved or rejected states with a controlled audit trail.' },
  { icon: CalendarRange, title: 'Batch allocation', body: 'Assign the actual batch, timing, and slot once payment is verified and operations confirms capacity.' },
  { icon: MailCheck, title: 'Enrollment confirmation', body: 'Trigger the final learner email only after the batch and slot are allocated by admin.' },
];

export default function RegistrationsOps() {
  return (
    <AdminShell
      title="Registration lifecycle and batch operations"
      blurb="This surface keeps the admissions process operationally clean: application, approval, payment, batch assignment, and enrollment confirmation stay separate, auditable steps."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          {actions.map((action) => (
            <div key={action.title} className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3 text-slate-950">
                <action.icon className="h-5 w-5 text-cyan-700" />
                <div className="text-lg font-semibold">{action.title}</div>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{action.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white/82 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)]">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-500">State model</div>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">Enterprise registration progression</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {states.map((state, index) => (
              <div key={state} className="rounded-[24px] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(246,250,255,0.92))] p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Step {index + 1}</div>
                <div className="mt-2 font-semibold text-slate-950">{state}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
            Enrollment emails must remain admin-triggered. Payment success alone should not finalize learner admission, because batch assignment and operations checks still need to happen.
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
