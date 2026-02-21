import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Ladder from "./partials/Ladder";
import Tracks from "./partials/Tracks";
import Button from "../components/Button";

export default function Courses() {
  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Courses"
            title="A clear ladder from starter to flagship cohort"
            desc={`Batches start ${site.startDate}. Choose a track and a level based on your goals.`}
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/contact">Get a batch schedule</Button>
            <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-800/60">
        <Container>
          <SectionTitle
            eyebrow="Tracks"
            title="Choose your track"
            desc="The same price ladder, customized outcomes per persona."
          />
          <div className="mt-8">
            <Tracks />
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-800/60">
        <Container>
          <SectionTitle
            eyebrow="Pricing"
            title="Transparent pricing with deliverables and reviews"
            desc="Outcome-first. Deliverable-driven. Mentor-reviewed."
          />
          <div className="mt-8">
            <Ladder />
          </div>
        </Container>
      </section>
    </div>
  );
}
