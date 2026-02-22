import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { useSchedule } from "../lib/schedule";

export default function Locations() {
  const schedule = useSchedule();

  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Locations & schedule"
            title="Hybrid coaching across cities"
            desc="Choose online or offline. Next batch dates can be updated anytime via schedule.json (no redeploy)."
          />
          <div className="mt-6 flex gap-3 flex-col sm:flex-row">
            <Button href="/contact">Reserve your seat</Button>
            <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {site.cities.map((c) => (
              <div key={c} className="card card-3d rounded-3xl p-6">
                <div className="text-lg font-semibold text-slate-950">{c}</div>
                <div className="mt-2 text-sm text-slate-800">
                  Next batch: <span className="font-semibold text-slate-950">{schedule.byCity?.[c] || "TBD"}</span>
                </div>
                <div className="mt-4 text-sm text-slate-800">
                  Placeholder: add offline center address, landmark, timings, and classroom capacity.
                </div>
                <div className="mt-6 flex gap-3">
                  <Button href="/contact">Get timings</Button>
                  <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">
                    WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 card card-3d rounded-3xl p-8">
            <div className="text-xs tracking-[0.22em] uppercase text-slate-800">How to update schedule</div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">Edit schedule.json in Git</div>
            <p className="mt-3 text-slate-800">
              Update this file in your images repo: <span className="font-mono">{site.scheduleUrl}</span>.
            </p>
            <pre className="mt-4 overflow-auto rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-xs text-slate-800">
{`{
  "updatedAt": "2026-02-21",
  "byCity": {
    "Hyderabad": "2 March 2026",
    "Pune": "TBD",
    "Vijayawada": "TBD",
    "Guntur": "TBD",
    "Vizag": "TBD"
  }
}`}
            </pre>
          </div>
        </Container>
      </section>
    </div>
  );
}
