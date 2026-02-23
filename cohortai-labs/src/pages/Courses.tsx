import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Ladder from "./partials/Ladder";
import Tracks from "./partials/Tracks";
import Button from "../components/Button";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";

export default function Courses() {
  
  const location = useLocation();
return (
<div>
  <Helmet>
    <title>Courses | CohortAI Labs</title>
    <meta name="description" content="Explore CohortAI Labs course ladder from INR 5,000 to 35,000 across Everyday AI, Business AI, and Tech & Data AI tracks." />
    <link rel="canonical" href={canonical(location.pathname)} />
    <meta property="og:title" content="Courses | CohortAI Labs" />
    <meta property="og:description" content="Explore CohortAI Labs course ladder from INR 5,000 to 35,000 across Everyday AI, Business AI, and Tech & Data AI tracks." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical(location.pathname)} />
    <meta property="og:image" content={seoDefaults.ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>

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

      <section className="py-14 border-t border-slate-200/70">
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

      <section className="py-14 border-t border-slate-200/70">
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