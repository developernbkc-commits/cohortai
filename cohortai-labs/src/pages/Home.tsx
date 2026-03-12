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
      <section className="relative pt-16 sm:pt-24 pb-14 overflow-hidden hero-surface">
        <GlowBg />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full chip px-4 py-2 text-xs text-slate-700">
                <Sparkles size={14} className="text-cyan-300" />
                <span>
                  Premium cohort experience • Next batch <span className="text-white font-semibold">{site.startDate}</span>
                </span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-white text-balance leading-[0.96] max-w-4xl">
                Build an <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">AI career edge</span> with a lighter, more premium, mentor-led learning system.
              </h1>

              <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl leading-8">
                {site.brand} blends live cohorts, guided labs, interactive learning paths, and gamified momentum so learners stay engaged, explore every section, and actually finish.
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
                {stat.map((s, idx) => (
                  <motion.div key={s.label} className="card card-3d rounded-2xl p-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                    <s.icon className="text-cyan-700" size={18} />
                    <div className="mt-3 text-sm font-semibold text-slate-950">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative min-h-[520px]"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 mesh-line rounded-[36px] opacity-25" />
              <motion.div className="card-dark rounded-[32px] p-6 absolute inset-x-5 top-8 neon-edge"
                animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">3D cohort command center</div>
                    <div className="mt-2 text-2xl font-semibold text-white">Lead-ready premium experience</div>
                  </div>
                  <Orbit className="text-violet-300" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button className="rounded-2xl border border-slate-700/70 bg-slate-900/55 p-4 text-left transition hover:border-cyan-300/35 hover:-translate-y-1">
                    <div className="text-xs text-slate-400">Conversion stack</div>
                    <div className="mt-2 text-white font-semibold">Advisor → Path → Seat booking</div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" /></div>
                  </button>
                  <button className="rounded-2xl border border-slate-700/70 bg-slate-900/55 p-4 text-left transition hover:border-violet-300/35 hover:-translate-y-1">
                    <div className="text-xs text-slate-400">Learner momentum</div>
                    <div className="mt-2 text-white font-semibold">XP streaks + unlocks</div>
                    <div className="mt-3 flex gap-2 text-xs text-slate-300"><span className="chip px-3 py-1 rounded-full">7-day challenge</span><span className="chip px-3 py-1 rounded-full">Mentor review</span></div>
                  </button>
                </div>
              </motion.div>
              <motion.div className="card-dark absolute right-0 bottom-6 w-[78%] rounded-[28px] p-5"
                animate={{ y: [0, 10, 0], rotate: [0, -1.5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                <div className="flex items-center gap-3 text-slate-300 text-sm"><Target size={16} className="text-emerald-300" /> Suggested starter plan</div>
                <div className="mt-3 text-xl font-semibold text-white">AI Productivity Pro</div>
                <div className="mt-2 text-sm text-slate-400">For working people who need fast wins, real outputs, and a visible path into higher-value projects.</div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <button className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition"><div className="text-xs text-slate-400">Fit</div><div className="text-white font-semibold mt-1">87%</div></button>
                  <button className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition"><div className="text-xs text-slate-400">Mode</div><div className="text-white font-semibold mt-1">Hybrid</div></button>
                  <button className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition"><div className="text-xs text-slate-400">Start</div><div className="text-white font-semibold mt-1">₹10k</div></button>
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
            desc="This section now behaves more like a premium guided consultation than a static selector."
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
            desc="Click paths, reveal milestones, and preview outcomes so each learner feels invited into the right journey."
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
            desc="Every track card now includes more hover depth and selection behaviour so the page feels active, not read-only."
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
            desc="Use the ladder interactively to compare what unlocks next and which tier suits your budget."
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
            title="A premium story around outcomes, accountability, and confidence"
            desc="Rotate stories, compare wins, and keep the section lively so social proof feels earned."
          />
          <div className="mt-8">
            <Testimonials />
          </div>
        </Container>
      </section>

      <section className="py-16 section-divider">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Quick answers" desc="If you have more questions, open each answer and we’ll guide you toward the right next step." />
          <div className="mt-8">
            <FAQ />
          </div>
        </Container>
      </section>

      <CTA />
    </div>
  );
}
