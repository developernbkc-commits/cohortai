import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import { CheckCircle2, GraduationCap, MapPin, Timer } from "lucide-react";
import { cn } from "../lib/utils";

const points = [
  { icon: GraduationCap, title: "Senior mentorship", desc: "Industry-experienced mentors focus on practical skills and clarity." },
  { icon: CheckCircle2, title: "Deliverables", desc: "Every module produces outputs you can show, reuse, or demo." },
  { icon: Timer, title: "Cohort accountability", desc: "Small batches, weekly reviews, progress tracking, and gamified momentum." },
  { icon: MapPin, title: "Hybrid access", desc: "Online + offline options across Hyderabad, Vijayawada, and Guntur." },
];

export default function About() {
  const [active, setActive] = React.useState(points[0].title);

  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle eyebrow="About" title={`Why ${site.brand}?`} desc="We built CohortAI Labs for learners who want outcomes—not just lectures. The About page is now interactive so visitors can explore the operating model instead of just reading about it." />
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {points.map((p) => (
                <button key={p.title} onClick={() => setActive(p.title)} className={cn("card card-3d rounded-3xl p-6 text-left", active === p.title && "bg-white border-cyan-300/35 accent-ring")}>
                  <p.icon className="text-cyan-700" size={20} />
                  <div className="mt-3 text-lg font-semibold text-slate-950">{p.title}</div>
                  <div className="mt-2 text-sm text-slate-600">{p.desc}</div>
                </button>
              ))}
            </div>
            <div className="card rounded-3xl p-8">
              {points.filter((p) => p.title === active).map((p) => (
                <div key={p.title}>
                  <div className="text-xs tracking-[0.22em] uppercase text-cyan-700/80">Interactive company canvas</div>
                  <div className="mt-3 text-3xl font-semibold text-slate-950">{p.title}</div>
                  <div className="mt-4 text-slate-600 leading-8">{p.desc}</div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-950 px-5 py-5 text-white">
                      <div className="text-xs text-slate-300">Premium signal</div>
                      <div className="mt-2 text-lg font-semibold">Human review, not just video access</div>
                    </div>
                    <div className="rounded-2xl bg-white px-5 py-5 premium-outline">
                      <div className="text-xs text-slate-500">Why it matters</div>
                      <div className="mt-2 text-lg font-semibold text-slate-950">More trust, stronger completion, better lead quality</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
