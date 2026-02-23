import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Ladder from "./partials/Ladder";
import Tracks from "./partials/Tracks";
import Button from "../components/Button";
import TrackComparisonTable from "../components/TrackComparisonTable";
import SeatAvailabilityPanel from "../components/SeatAvailabilityPanel";
import LeadCounsellingBanner from "../components/LeadCounsellingBanner";
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

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <SectionTitle
            eyebrow="Compare"
            title="Compare tracks before you enroll"
            desc="Use this quick matrix to choose a starting budget and learning path."
          />
          <div className="mt-8">
            <TrackComparisonTable />
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <SeatAvailabilityPanel />
            <LeadCounsellingBanner />
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <div className="rounded-3xl section-shell p-5 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-700">
                  Enterprise cohorts
                </div>
                <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-950">
                  Need custom AI training for your team?
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-700">
                  We provide custom timelines, role-wise curricula, scoring exams, secure digital certificates, and program management support for enterprise customers.
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-800">
                  <li>• Dedicated Program Manager</li>
                  <li>• Customized course timelines & outcomes</li>
                  <li>• Online scoring exams + reporting</li>
                  <li>• Custom material + secure digital certificates</li>
                </ul>
              </div>
              <div className="card rounded-2xl p-5">
                <div className="text-sm font-semibold text-slate-950">Request an enterprise quote</div>
                <p className="mt-2 text-sm text-slate-700">
                  Share team size, roles, preferred delivery mode, and timeline. We’ll propose a custom quote.
                </p>
                <div className="mt-4 grid gap-3">
                  <Button href="/enterprise" className="w-full">Request a quote</Button>
                  <Button href="/contact" variant="secondary" className="w-full">Talk to our team</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}