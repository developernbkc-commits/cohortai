import React from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { site } from "../../lib/site";

const quickPicks = ["Career switch", "Business growth", "Productivity upgrade"];

export default function CTA() {
  const [pick, setPick] = React.useState(quickPicks[0]);

  return (
    <section className="py-16 section-divider">
      <Container>
        <div className="card card-3d rounded-[28px] p-8 sm:p-10 neon-edge">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-cyan-700/80">Ready to start?</div>
              <div className="mt-2 text-3xl font-semibold text-slate-950 text-balance">
                Reserve your seat for the {site.startDate} cohort.
              </div>
              <div className="mt-3 text-slate-600">
                Pick your goal below to make the closing section feel active and tailored, not generic.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {quickPicks.map((item) => (
                  <button key={item} onClick={() => setPick(item)} className={`rounded-full px-4 py-2 text-sm ${pick === item ? "bg-slate-950 text-white" : "chip text-slate-700"}`}>{item}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-3 lg:justify-end">
              <div className="rounded-2xl bg-slate-950 px-5 py-4 text-sm text-slate-200 w-full sm:w-auto">Current interest: <span className="font-semibold text-white">{pick}</span></div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button href="/contact">Get batch schedule</Button>
                <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">
                  WhatsApp +91 {site.whatsapp}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
