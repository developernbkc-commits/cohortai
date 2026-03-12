import { motion } from "framer-motion";
import { ArrowRight, Orbit, ShieldCheck, Sparkles, Target, Trophy, Users, Workflow } from "lucide-react";
import Container from "../components/Container";
import GlowBg from "../components/GlowBg";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import TrackFinder from "./partials/TrackFinder";
import Tracks from "./partials/Tracks";
import Ladder from "./partials/Ladder";
import Testimonials from "./partials/Testimonials";
import FAQ from "./partials/FAQ";
import CTA from "./partials/CTA";
import LearningPaths from "./partials/LearningPaths";
import ProofStrip from "./partials/ProofStrip";

const stat = [
  { icon: Users, label: "Cohort model", value: "Small batches" },
  { icon: Workflow, label: "Hands-on", value: "Real deliverables" },
  { icon: ShieldCheck, label: "Mentor reviews", value: "Structured feedback" },
  { icon: Trophy, label: "Gamified", value: "XP + streaks" },
];

export default function Home() {
  return (
    <div className="relative">
      <section className="relative pt-14 sm:pt-20 pb-12 overflow-hidden">
        <GlowBg />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full chip px-4 py-2 text-xs text-slate-300">
                <Sparkles size={14} className="text-cyan-300" />
                <span>
                  New premium cohort experience • Next batch <span className="text-white font-semibold">{site.startDate}</span>
                </span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight text-white text-balance leading-tight">
                Build an <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">AI career edge</span> with a premium, mentor-led learning system.
              </h1>

              <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl">
                {site.brand} blends live cohorts, guided labs, interactive learning paths, and gamified momentum so learners stay engaged and actually finish.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button href="#advisor">
                  Start AI Advisor <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button href="/contact" variant="secondary">
                  Book Free Counselling
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {stat.map((s) => (
                  <div key={s.label} className="card card-3d rounded-2xl p-4">
                    <s.icon className="text-cyan-300" size={18} />
                    <div className="mt-3 text-sm font-semibold text-white">{s.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative min-h-[470px]"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 mesh-line rounded-[36px] opacity-25" />
              <motion.div className="card rounded-[32px] p-6 absolute inset-x-5 top-8 neon-edge"
                animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">3D cohort command center</div>
                    <div className="mt-2 text-2xl font-semibold text-white">Lead-ready premium experience</div>
                  </div>
                  <Orbit className="text-violet-300" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                    <div className="text-xs text-slate-400">Conversion stack</div>
                    <div className="mt-2 text-white font-semibold">Advisor → Path → Seat booking</div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" /></div>
                  </div>
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                    <div className="text-xs text-slate-400">Learner momentum</div>
                    <div className="mt-2 text-white font-semibold">XP streaks + unlocks</div>
                    <div className="mt-3 flex gap-2 text-xs text-slate-300"><span className="chip px-3 py-1 rounded-full">7-day challenge</span><span className="chip px-3 py-1 rounded-full">Mentor review</span></div>
                  </div>
                </div>
              </motion.div>
              <motion.div className="card absolute right-0 bottom-6 w-[78%] rounded-[28px] p-5"
                animate={{ y: [0, 10, 0], rotate: [0, -1.5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                <div className="flex items-center gap-3 text-slate-300 text-sm"><Target size={16} className="text-emerald-300" /> Suggested starter plan</div>
                <div className="mt-3 text-xl font-semibold text-white">AI Productivity Pro</div>
                <div className="mt-2 text-sm text-slate-400">For working people who need fast wins, real outputs, and a visible path into higher-value projects.</div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white/5 p-3"><div className="text-xs text-slate-400">Fit</div><div className="text-white font-semibold mt-1">87%</div></div>
                  <div className="rounded-2xl bg-white/5 p-3"><div className="text-xs text-slate-400">Mode</div><div className="text-white font-semibold mt-1">Hybrid</div></div>
                  <div className="rounded-2xl bg-white/5 p-3"><div className="text-xs text-slate-400">Start</div><div className="text-white font-semibold mt-1">₹10k</div></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      <ProofStrip />

      <section id="advisor" className="py-16 section-divider">
        <Container>
          <SectionTitle
            eyebrow="AI course advisor"
            title="Interactive advisor that recommends the right track, milestone, and budget band"
            desc="This replaces the flat course selector with a more premium, high-conversion guidance experience."
          />
          <div className="mt-8">
            <TrackFinder />
          </div>
        </Container>
      </section>

      <section className="py-16 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Interactive learning paths"
            title="Each path feels like a journey, not just a list of modules"
            desc="Show outcomes, milestones, unlocks, and the next recommended step for each learner type."
          />
          <div className="mt-8">
            <LearningPaths />
          </div>
        </Container>
      </section>

      <section className="py-16 section-divider">
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

      <section className="py-16 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Course ladder"
            title="Transparent pricing with visible progression and milestone value"
            desc="Start small, then level up with projects, reviews, and portfolio outcomes."
          />
          <div className="mt-8">
            <Ladder />
          </div>
        </Container>
      </section>

      <section className="py-16 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Social proof"
            title="A more premium story around outcomes, accountability, and confidence"
            desc="The site now sells a guided transformation—not just a class schedule."
          />
          <div className="mt-8">
            <Testimonials />
          </div>
        </Container>
      </section>

      <section className="py-16 section-divider">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Quick answers" desc="If you have more questions, message us and we’ll guide you." />
          <div className="mt-8">
            <FAQ />
          </div>
        </Container>
      </section>

      <CTA />
    </div>
  );
}
