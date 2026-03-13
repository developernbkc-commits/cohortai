import { Link } from 'react-router-dom';
import { CreditCard, IndianRupee, ShieldCheck, Link2, CheckCircle2, Clock3 } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell';

const rows = [
  { name: 'Akhila Varma', program: 'AI Productivity Pro', amount: '₹10,000', payment: 'Payment link generated', status: 'payment_pending' },
  { name: 'Rohit Kumar', program: 'Flagship Premium Cohort', amount: '₹35,000', payment: 'Paid via UPI', status: 'paid' },
  { name: 'Sushma Reddy', program: 'Everyday AI', amount: '₹5,000', payment: 'Awaiting payment', status: 'approved' },
];

const blocks = [
  { icon: Link2, title: 'Razorpay-first workflow', text: 'Create payment links only after registration review determines the correct program, offer, and payable amount.' },
  { icon: ShieldCheck, title: 'Finance-governed discounting', text: 'Coupons affect the payable amount only after Finance-approved publishing and eligibility validation.' },
  { icon: CheckCircle2, title: 'Verified enrollment transitions', text: 'Enrollment mail should go out only after payment is verified, batch is assigned, and admin finalizes the learner record.' },
];

export default function PaymentsOps() {
  return (
    <AdminShell
      title="Payments and enrollment controls"
      blurb="Phase E4 introduces the operating surface for Razorpay payment readiness, finance-governed pricing, verification states, and the final handoff into batch allocation and enrollment confirmation."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {blocks.map((block) => (
              <div key={block.title} className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <block.icon className="h-5 w-5 text-cyan-700" />
                <div className="mt-4 text-base font-semibold text-slate-950">{block.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{block.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,rgba(236,254,255,0.95),rgba(245,243,255,0.95))] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3 text-slate-950">
              <CreditCard className="h-5 w-5 text-fuchsia-700" />
              <h3 className="text-lg font-semibold">Phase E4 payment lifecycle</h3>
            </div>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>1. Registration becomes eligible for payment only after the chosen Program and coupon validity are confirmed.</li>
              <li>2. Razorpay payment link is created server-side and persisted against the registration.</li>
              <li>3. Payment verification updates the DB record from <span className="font-semibold">payment_pending</span> to <span className="font-semibold">paid</span>.</li>
              <li>4. Batch allocation + enrollment confirmation remain controlled admin actions, not automatic side effects of payment success.</li>
            </ol>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/admin/registrations" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Open registration queue</Link>
              <Link to="/admin/coupons" className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Review coupon impact</Link>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white/82 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)] overflow-x-auto">
          <div className="flex items-center gap-2 text-slate-950">
            <IndianRupee className="h-5 w-5 text-emerald-700" />
            <h3 className="text-lg font-semibold">Payment readiness queue</h3>
          </div>
          <table className="mt-5 min-w-[720px] w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="pb-3 pr-4">Learner</th>
                <th className="pb-3 pr-4">Program</th>
                <th className="pb-3 pr-4">Payable</th>
                <th className="pb-3 pr-4">Payment state</th>
                <th className="pb-3">Registration state</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-b border-slate-100 text-slate-700">
                  <td className="py-4 pr-4 font-semibold text-slate-950">{row.name}</td>
                  <td className="py-4 pr-4">{row.program}</td>
                  <td className="py-4 pr-4">{row.amount}</td>
                  <td className="py-4 pr-4">{row.payment}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                      <Clock3 className="mr-2 h-3.5 w-3.5" /> {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
