import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Ladder from "./partials/Ladder";
import Tracks from "./partials/Tracks";
import Button from "../components/Button";
import GalleryStrip from "../components/GalleryStrip";

export default function Courses() {
  return (
    <div className="page-shell">
      <section className="pt-14 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Courses"
            title="A clear ladder from starter to flagship cohort"
            desc={`Batches start ${site.startDate}. Choose a track and a level based on your goals, current confidence, and the kind of outcomes you want to show.`}
          />
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
