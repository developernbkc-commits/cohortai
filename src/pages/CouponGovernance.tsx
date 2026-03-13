import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { sampleCouponRequests } from '../lib/programStudioData';
import { BadgeIndianRupee, Mail, Phone, ShieldCheck, Stamp } from 'lucide-react';

const financeRules = [
  'Eligible creators: Super Admin, Admissions Admin, Approver, Counselor.',
  'Finance is the publishing authority and approval is mandatory before activation.',
  'After Finance approval, coupon publication should happen automatically.',
  'Unique coupons can be bound to an exact email address or a normalized E.164 phone number.',
];

export default function CouponGovernance() {
  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Coupon governance"
            title="Finance-approved discount controls for enterprise-grade admissions operations"
            desc="This scaffold shows the business workflow for unique coupons, phone/email-bound offers, and controlled publishing."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-5">
              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-white">
                  <ShieldCheck className="text-cyan-200" size={20} />
                  <h3 className="text-lg font-semibold">Workflow rules</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  {financeRules.map((rule) => (
                    <li key={rule}>• {rule}</li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-[28px] p-6 ring-soft">
                <div className="flex items-center gap-3 text-white">
                  <BadgeIndianRupee className="text-emerald-200" size={20} />
                  <h3 className="text-lg font-semibold">Supported coupon models</h3>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Unique learner recovery offers tied to email or phone.</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Campaign codes with publish windows and per-user usage limits.</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Program-specific or course-specific offers controlled by Finance.</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-[28px] p-6 ring-soft overflow-x-auto">
              <div className="flex items-center gap-3 text-white">
                <Stamp className="text-fuchsia-200" size={20} />
                <h3 className="text-lg font-semibold">Coupon review queue</h3>
              </div>
              <table className="mt-5 w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="pb-3 pr-4">Code</th>
                    <th className="pb-3 pr-4">Binding</th>
                    <th className="pb-3 pr-4">Requested by</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Offer</th>
                    <th className="pb-3">Validity</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleCouponRequests.map((item) => (
                    <tr key={item.id} className="border-b border-white/10 text-slate-200">
                      <td className="py-4 pr-4 font-semibold text-white">{item.code}</td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          {item.bindType === 'email' ? <Mail size={14} className="text-cyan-200" /> : item.bindType === 'phone' ? <Phone size={14} className="text-cyan-200" /> : <Stamp size={14} className="text-cyan-200" />}
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
