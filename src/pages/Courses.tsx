import { useMemo, useState } from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Ladder from "./partials/Ladder";
import Tracks from "./partials/Tracks";
import Button from "../components/Button";
import GalleryStrip from "../components/GalleryStrip";
import TrackComparisonTable from "../components/TrackComparisonTable";
import ConversionFunnel from "./partials/ConversionFunnel";

const filters = ["All", "Beginner", "Business", "Tech"] as const;
type Filter = (typeof filters)[number];

export default function Courses() {
  const [filter, setFilter] = useState<Filter>("All");

  const summary = useMemo(() => {
    if (filter === "Business") return "Best for founders, creators, and growth teams who want faster content, follow-up, and workflow automation.";
    if (filter === "Tech") return "Best for developers, analysts, and IT professionals who want portfolio projects and interview-ready proof.";
    if (filter === "Beginner") return "Best for students, homemakers, and first-time learners who want confidence without overload.";
    return "Choose the path that matches your goals, confidence, and the kind of work, proof, or business outcome you want to leave with.";
  }, [filter]);

  return (
    <div className="page-shell">
      <section className="pt-16 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Courses"
            title="Programs, tracks, and pricing that feel premium—but stay easy to choose"
            desc={`Batches start ${site.startDate}. ${summary} Admin-defined program structures can later publish here without rewriting the site.`}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  filter === item
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white/85 text-slate-700 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/register">Self-register now</Button>
            <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer" className="!bg-white !text-slate-900 !border-slate-300 hover:!bg-slate-50">
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Compare"
            title="A premium site should reduce confusion, not create it"
            desc="This comparison view helps learners and counsellors choose the right track faster during web, WhatsApp, or call-based conversations."
          />
          <div className="mt-8">
            <TrackComparisonTable />
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Tracks"
            title="Choose your track"
            desc="The same price ladder, customized outcomes per persona. Each card is intentionally interactive so users explore instead of skim."
          />
          <div className="mt-8">
            <Tracks />
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Enrollment"
            title="The conversion path is built into the course page too"
            desc="Users should never need to guess what to do next after comparing tracks and pricing."
          />
          <div className="mt-8">
            <ConversionFunnel />
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Pricing"
            title="Transparent pricing with deliverables and reviews"
            desc="Outcome-first. Deliverable-driven. Mentor-reviewed. This structure is optimized for lower-friction lead conversion because users understand what each upgrade unlocks."
          />
          <div className="mt-8">
            <Ladder />
          </div>
        </Container>
      </section>

      <GalleryStrip />
    </div>
  );
}
