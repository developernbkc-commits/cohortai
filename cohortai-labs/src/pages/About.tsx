import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import { CheckCircle2, GraduationCap, MapPin, Timer } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";

const points = [
  { icon: GraduationCap, title: "Senior mentorship", desc: "Industry-experienced mentors focus on practical skills and clarity." },
  { icon: CheckCircle2, title: "Deliverables", desc: "Every module produces outputs you can show, reuse, or demo." },
  { icon: Timer, title: "Cohort accountability", desc: "Small batches, weekly reviews, and progress tracking." },
  { icon: MapPin, title: "Hybrid access", desc: "Online + offline options across Hyderabad, Vijayawada, and Guntur." },
];

export default function About() {
  
  const location = useLocation();
return (
    
<Helmet>
  <title>About | CohortAI Labs</title>
  <meta name="description" content="CohortAI Labs delivers premium AI coaching with mentor-led cohorts, accountability, and portfolio-ready deliverables." />
  <link rel="canonical" href={canonical(location.pathname)} />
  <meta property="og:title" content="About | CohortAI Labs" />
  <meta property="og:description" content="CohortAI Labs delivers premium AI coaching with mentor-led cohorts, accountability, and portfolio-ready deliverables." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical(location.pathname)} />
  <meta property="og:image" content={seoDefaults.ogImage} />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>

<div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="About"
            title={`Why ${site.brand}?`}
            desc="We built CohortAI Labs for learners who want outcomes—not just lectures. Our model is structured, mentor-led, and deliverable-driven."
          />
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {points.map((p) => (
              <div key={p.title} className="card card-3d rounded-3xl p-6 ">
                <p.icon className="text-cyan-200" size={20} />
                <div className="mt-3 text-lg font-semibold text-slate-950">{p.title}</div>
                <div className="mt-2 text-sm text-slate-800">{p.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}