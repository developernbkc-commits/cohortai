import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import { CheckCircle2, GraduationCap, MapPin, Timer, Trophy, Sparkles } from "lucide-react";

const points = [
  { icon: GraduationCap, title: "Senior mentorship", desc: "Industry-experienced mentors focus on practical skills, business context, and clarity." },
  { icon: CheckCircle2, title: "Deliverables", desc: "Every module produces outputs you can show, reuse, or demo in work, interviews, or client meetings." },
  { icon: Timer, title: "Cohort accountability", desc: "Small batches, weekly reviews, and progress tracking keep learners moving forward." },
  { icon: MapPin, title: "Hybrid access", desc: "Online + offline options across Hyderabad, Vijayawada, and Guntur." },
  { icon: Trophy, title: "Gamified momentum", desc: "XP, streaks, badges, and milestones increase completion and make learning feel dynamic." },
  { icon: Sparkles, title: "Premium positioning", desc: "The site and offer structure are being shaped to feel high-trust, premium, and conversion-ready." },
];

export default function About() {
  return (
    <div className="page-shell">
      <section className="pt-14 pb-10">
        <Container>
          <SectionTitle
            eyebrow="About"
            title={`Why ${site.brand}?`}
            desc="We built CohortAI Labs for learners who want outcomes, structure, and premium guidance—not random lectures or passive video courses."
          />
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {points.map((p) => (
              <div key={p.title} className="glass-pearl interactive-card rounded-3xl p-6 ring-soft">
                <p.icon className="text-cyan-600" size={20} />
                <div className="mt-3 text-lg font-semibold text-slate-950">{p.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{p.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
