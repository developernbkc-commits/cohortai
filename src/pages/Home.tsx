import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Users, Workflow, Database, Wallet, UserCog, MousePointerClick, Star, Clock3, BadgeCheck } from "lucide-react";
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
import GalleryStrip from "../components/GalleryStrip";
import ConversionFunnel from "./partials/ConversionFunnel";
import SuccessStories from "./partials/SuccessStories";
import GamifiedJourney from "./partials/GamifiedJourney";
import AICareerSnapshot from "../components/AICareerSnapshot";

const platformCards = [
  { icon: Database, title: "Admissions data in DB", desc: "Every lead, registration, payment, approval, and batch assignment becomes structured operational data." },
  { icon: Wallet, title: "UPI-led checkout", desc: "Registrations move into review only after verified payment, reducing manual reconciliation." },
  { icon: UserCog, title: "RBAC admin console", desc: "Admissions, finance, mentors, and admins get role-aware dashboards and workflows." },
];

const stat = [
  { icon: Users, label: "Cohort model", value: "Small batches" },
  { icon: Workflow, label: "Hands-on", value: "Real deliverables" },
  { icon: ShieldCheck, label: "Mentor reviews", value: "Structured feedback" },
  { icon: MousePointerClick, label: "Interactive journey", value: "Advisor + XP" },
];

const proof = [
  { icon: Star, title: "Trust-first positioning", desc: "Proof, outcomes, and clarity appear before heavy selling so the brand feels premium instead of pushy." },
  { icon: Clock3, title: "Fast lead routing", desc: "Users always see the next step: advisor, counselling, registration, or WhatsApp—never a dead-end brochure page." },
  { icon: BadgeCheck, title: "Visible value", desc: "Pricing, deliverables, badges, and learning milestones are engineered to reduce decision friction." },
];

export default function Home() {
  return (
    <div className="page-shell relative">
      <section className="relative overflow-hidden pt-20 sm:pt-28 pb-14">
        <GlowBg />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 glass-pearl px-4 py-2 text-xs text-slate-700">
                <Sparkles size={14} className="text-cyan-600" />
                <span>
                  Premium cohort experience • Next batch <span className="font-semibold text-slate-950">{site.startDate}</span>
                </span>
              </div>

              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.045em] text-slate-950 text-balance leading-[0.94]">
                Build an <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">AI career edge</span> with a premium,
                mentor-led learning system.
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-xl leading-8 text-slate-600">
                {site.brand} blends live cohorts, guided labs, interactive learning paths, social proof, and gamified momentum so learners stay engaged and actually finish.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="#advisor">
                  Start AI Advisor <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button href="/contact" variant="secondary" className="!bg-white !text-slate-900 !border-slate-300 hover:!bg-slate-50">
                  Book Free Counselling
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stat.map((s) => (
                  <div key={s.label} className="glass-pearl interactive-card rounded-3xl p-4 ring-soft">
                    <s.icon className="text-cyan-600" size={18} />
                    <div className="mt-3 text-sm font-semibold text-slate-950">{s.value}</div>
                    <div className="mt-1 text-xs text-slate-500">{s.label}</div>
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
              <div className="glass rounded-[36px] p-7 ring-soft">
                <div className="text-sm tracking-[0.28em] uppercase text-cyan-300">3D cohort command center</div>
                <div className="mt-3 text-4xl font-semibold text-white text-balance">Conversion-led premium experience</div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 interactive-card">
                    <div className="text-sm text-slate-400">Conversion stack</div>
                    <div className="mt-3 text-3xl font-semibold text-white leading-tight">Advisor → Proof → Seat booking</div>
                    <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" />
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 interactive-card">
                    <div className="text-sm text-slate-400">Learner momentum</div>
                    <div className="mt-3 text-3xl font-semibold text-white leading-tight">XP streaks + unlocks</div>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-300">
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200">7-day challenge</span>
                      <span className="rounded-full bg-violet-400/15 px-3 py-1 text-violet-200">Milestone badges</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
                  <div className="text-sm text-emerald-300">Suggested starter plan</div>
                  <div className="mt-2 text-3xl font-semibold text-white">AI Productivity Pro</div>
                  <p className="mt-3 max-w-md text-slate-300 leading-7">
                    For working people who need fast wins, visible outputs, and a clear path into higher-value projects and premium cohorts.
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[["Fit", "87%"], ["Mode", "Hybrid"], ["Start", "₹10k"]].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white/6 p-4 text-center interactive-card">
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
                        <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 inset-0 blur-3xl opacity-60 animate-floaty" style={{ background: "radial-gradient(circle at 60% 40%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(circle at 30% 70%, rgba(167,139,250,0.20), transparent 55%)" }} />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {proof.map((item, idx) => (
              <motion.div
                key={item.title}
                className="glass-pearl interactive-card rounded-3xl p-5 ring-soft"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <item.icon className="text-cyan-600" size={20} />
                <div className="mt-4 text-lg font-semibold text-slate-950">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>


      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="AI wow factor" title="Make the first interaction feel intelligent, useful, and memorable" desc="This visual AI block gives the visitor a fast, personalized direction so the website immediately feels modern, premium, and genuinely helpful—not just decorative." />
          <div className="mt-8"><AICareerSnapshot /></div>
        </Container>
      </section>

      <section id="advisor" className="py-14 section-divider scroll-mt-28">
        <Container>
          <SectionTitle eyebrow="Find your path" title="AI advisor with visible recommendations, fit score, and challenge path" desc="This section stays interactive by design: users can click through persona, goal, budget, and mode to get a recommendation they can act on immediately." />
          <div className="mt-8"><TrackFinder /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Learner journey" title="Give every serious learner a clearer next step" desc="The homepage now helps potential learners understand fit, outcomes, location options, pricing clarity, and the safest next action instead of overwhelming them with brochure-style copy." />
          <div className="mt-8"><ConversionFunnel /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Tracks" title="Interactive learning paths for beginners, operators, and technical talent" desc="Each card is designed to feel clickable and outcome-led so the page behaves more like a guided journey than a brochure." />
          <div className="mt-8"><Tracks /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Gamified momentum" title="Visible progress keeps learners active, consistent, and more likely to complete" desc="This section adds energy and progression so the experience feels dynamic for both first-time visitors and returning leads." />
          <div className="mt-8"><GamifiedJourney /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Course ladder" title="Start small, then level up with projects, reviews, and portfolio depth" desc="Transparent pricing from ₹5,000 to ₹35,000. Each step adds outcomes, accountability, and premium support." />
          <div className="mt-8"><Ladder /></div>
        </Container>
      </section>

      <GalleryStrip />
      <SuccessStories />

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Platform upgrade" title="Ready for registrations, UPI payments, batch operations, and admin workflows" desc="We preserved the useful platform direction from later commits while keeping the baseline sales story intact." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {platformCards.map((card) => (
              <div key={card.title} className="glass-pearl interactive-card rounded-3xl p-6 ring-soft">
                <card.icon className="text-cyan-600" size={20} />
                <div className="mt-4 text-lg font-semibold text-slate-950">{card.title}</div>
                <div className="mt-2 text-sm text-slate-600 leading-7">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/register">Try self-registration</Button>
            <Button href="/admin" variant="secondary" className="!bg-white !text-slate-900 !border-slate-300 hover:!bg-slate-50">View admin console</Button>
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Social proof" title="What learners love about cohort-based learning" desc="A premium learning experience that stays focused on outcomes, accountability, and visible value." />
          <div className="mt-8"><Testimonials /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Quick answers" desc="If you have more questions, message us and we’ll guide you." />
          <div className="mt-8"><FAQ /></div>
        </Container>
      </section>

      <CTA />
    </div>
  );
}
