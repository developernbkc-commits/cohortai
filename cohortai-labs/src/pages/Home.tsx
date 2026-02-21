import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Users, Workflow } from "lucide-react";
import Container from "../components/Container";
import GlowBg from "../components/GlowBg";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";
import TrackFinder from "./partials/TrackFinder";
import Tracks from "./partials/Tracks";
import Ladder from "./partials/Ladder";
import Testimonials from "./partials/Testimonials";
import FAQ from "./partials/FAQ";
import CTA from "./partials/CTA";

const stat = [
  { icon: Users, label: "Cohort model", value: "Small batches" },
  { icon: Workflow, label: "Hands-on", value: "Real deliverables" },
  { icon: ShieldCheck, label: "Mentor reviews", value: "Structured feedback" },
];

export default function Home() {
  return (
    <div className="relative">
      <section className="relative pt-14 sm:pt-20 pb-10">
        <GlowBg />
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 chip px-4 py-2 text-xs text-slate-700">
                <Sparkles size={14} className="text-cyan-200" />
                <span>
                  Batches start <span className="text-slate-950 font-semibold">{site.startDate}</span> • {site.cities.join(" • ")}
                </span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950 text-balance">
                Learn AI the <span className="bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 bg-clip-text text-transparent">practical</span> way—
                with mentor-led cohorts and real projects.
              </h1>

              <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-xl">
                {site.brand} delivers a premium learning experience for beginners, business owners, and tech professionals.
                Choose your track, build deliverables, and leave with confidence.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button href="/courses">
                  Explore Courses <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button href="/contact" variant="secondary">
                  Talk to us
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stat.map((s) => (
                  <div key={s.label} className="card rounded-2xl p-4 ">
                    <s.icon className="text-cyan-200" size={18} />
                    <div className="mt-3 text-sm font-semibold">{s.value}</div>
                    <div className="text-xs text-slate-600 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="card rounded-3xl p-6 ">
                <div className="text-sm text-slate-700">Hybrid learning experience</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">Online + Offline Cohorts</div>
                <p className="mt-2 text-slate-600 text-sm">
                  Live mentor sessions, guided labs, and structured reviews. Choose weekend or weekday batches.
                </p>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl bg-white/70 border border-slate-200/80 p-4">
                    <div className="text-xs text-slate-600">What you get</div>
                    <ul className="mt-2 text-sm text-slate-200 grid gap-2">
                      <li>• Templates, toolkits, and practice exercises</li>
                      <li>• Weekly submissions + review rubric</li>
                      <li>• Portfolio-ready deliverables</li>
                      <li>• Community + accountability pods</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-cyan-300/15 via-violet-300/10 to-emerald-300/15 border border-slate-700/60 p-4">
                    <div className="text-xs text-slate-700">Fast start</div>
                    <div className="mt-1 text-sm text-slate-950 font-semibold">
                      Next cohort begins {site.startDate}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      DM “AI” or call {site.phone} to reserve a seat.
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 inset-0 blur-3xl opacity-40 animate-floaty"
                   style={{ background: "radial-gradient(circle at 60% 40%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(circle at 30% 70%, rgba(167,139,250,0.20), transparent 55%)" }}
              />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <SectionTitle
            eyebrow="Find your path"
            title="Not sure which AI track fits you?"
            desc="Answer a few quick questions and we’ll recommend the best starting point."
          />
          <div className="mt-8">
            <TrackFinder />
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <SectionTitle
            eyebrow="Tracks"
            title="Designed for beginners, business owners, and tech professionals"
            desc="Pick the track that matches your background and goals—then build deliverables with mentor reviews."
          />
          <div className="mt-8">
            <Tracks />
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <SectionTitle
            eyebrow="Course ladder"
            title="Start small, then level up with projects and reviews"
            desc="Transparent pricing from ₹5,000 to ₹35,000. Each step adds outcomes, reviews, and portfolio depth."
          />
          <div className="mt-8">
            <Ladder />
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <SectionTitle
            eyebrow="Social proof"
            title="What learners love about cohort-based learning"
            desc="A premium learning experience that stays focused on outcomes and accountability."
          />
          <div className="mt-8">
            <Testimonials />
          </div>
        </Container>
      </section>

      <section className="py-14 border-t border-slate-200/70">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Quick answers"
            desc="If you have more questions, message us and we’ll guide you."
          />
          <div className="mt-8">
            <FAQ />
          </div>
        </Container>
      </section>

      <CTA />
    </div>
  );
}
