import { useMemo, useState } from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { listCouponRequestsFallback, requestCoupon, notifyOps } from '../lib/opsApi';
import { BadgeIndianRupee, Mail, Phone, ShieldCheck, Stamp, WalletCards } from 'lucide-react';
import { canPublishCoupons, canRequestCoupon, getAdminSessionRole } from '../lib/adminAuth';

const financeRules = [
  'Eligible creators: Super Admin, Admissions Admin, Approver, Counselor.',
  'Finance is the publishing authority and approval is mandatory before activation.',
  'After Finance approval, coupon publication should happen automatically.',
  'Unique coupons can be bound to an exact email address or a normalized E.164 phone number.',
];

const initialDraft = {
  code: '',
  bindType: 'email' as 'email' | 'phone' | 'open',
  bindValue: '',
  discountLabel: '',
  validUntil: '',
  notes: '',
};

export default function CouponGovernance() {
  const [draft, setDraft] = useState(initialDraft);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const role = getAdminSessionRole();
  const items = useMemo(() => listCouponRequestsFallback(), [message]);

  const submit = async () => {
    setSaving(true);
    setMessage('');
    const result = await requestCoupon(draft);
    if (result.ok) {
      await notifyOps('Coupon request submitted', `Role ${role} requested coupon ${draft.code || '[auto-code]'}.`);
      setMessage(`Coupon request saved in ${result.mode} mode. Finance approval remains mandatory before publishing.`);
      setDraft(initialDraft);
    } else {
      setMessage(result.error);
    }
    setSaving(false);
  };

  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Coupon governance"
            title="Finance-approved discount controls for enterprise-grade admissions operations"
            desc="Unique coupons can be generated against a phone number or email, requested by authorized roles, and auto-published only after Finance approval."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-5">
              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-slate-950">
                  <ShieldCheck className="text-cyan-700" size={20} />
                  <h3 className="text-lg font-semibold">Workflow rules</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {financeRules.map((rule) => (
                    <li key={rule}>• {rule}</li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-slate-950">
                  <BadgeIndianRupee className="text-emerald-700" size={20} />
                  <h3 className="text-lg font-semibold">Supported coupon models</h3>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">Unique learner recovery offers tied to email or phone.</div>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">Campaign codes with publish windows and per-user usage limits.</div>
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">Program-specific or course-specific offers controlled by Finance.</div>
                </div>
              </div>

              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-slate-950">
                  <WalletCards className="text-fuchsia-700" size={20} />
                  <h3 className="text-lg font-semibold">Request a new coupon</h3>
                </div>
                {canRequestCoupon(role) ? (
                  <div className="mt-4 grid gap-3">
                    <input value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value.toUpperCase() })} placeholder="Coupon code" className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <select value={draft.bindType} onChange={(e) => setDraft({ ...draft, bindType: e.target.value as any })} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950">
                        <option value="email">Bind to email</option>
                        <option value="phone">Bind to phone</option>
                        <option value="open">Open / campaign coupon</option>
                      </select>
                      <input value={draft.bindValue} onChange={(e) => setDraft({ ...draft, bindValue: e.target.value })} placeholder={draft.bindType === 'phone' ? '+919876543210' : draft.bindType === 'email' ? 'learner@example.com' : 'Optional audience note'} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <input value={draft.discountLabel} onChange={(e) => setDraft({ ...draft, discountLabel: e.target.value })} placeholder='e.g. ₹5,000 off or 10% off' className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                      <input type="date" value={draft.validUntil} onChange={(e) => setDraft({ ...draft, validUntil: e.target.value })} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                    </div>
                    <textarea value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Why is this discount needed? Include lead context, program, counselor notes, or recovery reason." className="min-h-[104px] rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950" />
                    <button onClick={submit} disabled={saving || !draft.discountLabel || !draft.validUntil} className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
                      {saving ? 'Saving...' : 'Submit coupon request'}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Current role cannot request coupons. Use Super Admin, Admissions Admin, Approver, or Counselor.
                  </div>
                )}
                {message && <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">{message}</div>}
                {canPublishCoupons(role) && (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                    Finance role detected. Finance approvals should auto-publish coupons once wired to the live backend.
                  </div>
                )}
              </div>
            </div>

            <div className="glass rounded-[28px] p-6 ring-soft overflow-x-auto">
              <div className="flex items-center gap-3 text-slate-950">
                <Stamp className="text-fuchsia-700" size={20} />
                <h3 className="text-lg font-semibold">Coupon review queue</h3>
              </div>
              <table className="mt-5 w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="pb-3 pr-4">Code</th>
                    <th className="pb-3 pr-4">Binding</th>
                    <th className="pb-3 pr-4">Requested by</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Offer</th>
                    <th className="pb-3">Validity</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: any) => (
                    <tr key={item.id} className="border-b border-slate-200 text-slate-700">
                      <td className="py-4 pr-4 font-semibold text-slate-950">{item.code}</td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          {item.bindType === 'email' ? <Mail size={14} className="text-cyan-700" /> : item.bindType === 'phone' ? <Phone size={14} className="text-cyan-700" /> : <Stamp size={14} className="text-cyan-700" />}
                          <span>{item.bindValue}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">{item.requestedBy}</td>
                      <td className="py-4 pr-4">{item.financeStatus}</td>
                      <td className="py-4 pr-4">{item.discountLabel}</td>
                      <td className="py-4">{item.validUntil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
