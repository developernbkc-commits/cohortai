import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Ladder from "./partials/Ladder";
import Tracks from "./partials/Tracks";
import Button from "../components/Button";

export default function Courses() {
  const [focus, setFocus] = React.useState(site.tracks[0].name);

  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle eyebrow="Courses" title="A premium ladder from starter to flagship cohort" desc={`Batches start ${site.startDate}. Explore a track, switch it live, and choose the right level based on your goals.`} />
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/contact">Get a batch schedule</Button>
            <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">WhatsApp us</Button>
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <div className="card rounded-3xl p-5 mb-8">
            <div className="text-xs tracking-[0.22em] uppercase text-cyan-700/80">Quick compare</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {site.tracks.map((t) => <button key={t.name} onClick={() => setFocus(t.name)} className={`rounded-full px-4 py-2 text-sm ${focus === t.name ? "bg-slate-950 text-white" : "chip text-slate-700"}`}>{t.name}</button>)}
            </div>
            <div className="mt-4 text-sm text-slate-600">Current focus: <span className="font-semibold text-slate-950">{focus}</span></div>
          </div>
          <SectionTitle eyebrow="Tracks" title="Choose your track" desc="The same price ladder, customized outcomes per persona." />
          <div className="mt-8"><Tracks /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Pricing" title="Transparent pricing with deliverables and reviews" desc="Outcome-first. Deliverable-driven. Mentor-reviewed." />
          <div className="mt-8"><Ladder /></div>
        </Container>
      </section>
    </div>
  );
}
