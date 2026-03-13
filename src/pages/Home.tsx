import { ArrowRight, BadgeCheck, Clock3, Database, MousePointerClick, ShieldCheck, Sparkles, Star, UserCog, Users, Wallet, Workflow } from "lucide-react";
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
import HeroDepthScene from "../components/HeroDepthScene";

const platformCards = [
  { icon: Database, title: "Structured operating data", desc: "Every lead, registration, coupon approval, payment event, and batch assignment becomes usable admissions data instead of chat-history chaos." },
  { icon: Wallet, title: "Governed payment readiness", desc: "UPI, coupon validation, finance review, and enrollment decisions can flow through one governed lifecycle." },
  { icon: UserCog, title: "Role-aware operations", desc: "Counselors, admissions, finance, mentors, and admins see the right controls for their job instead of one generic dashboard." },
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
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 glass-pearl px-4 py-2 text-xs text-slate-700">
                <Sparkles size={14} className="text-cyan-600" />
                <span>
                  Premium cohort experience • Next batch <span className="font-semibold text-slate-950">{site.startDate}</span>
                </span>
              </div>

              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] text-slate-950 text-balance leading-[0.92]">
                Build an <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">AI career edge</span> with a high-trust, mentor-led platform that looks premium and runs like a real business.
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-xl leading-8 text-slate-600">
                {site.brand} blends live cohorts, guided labs, interactive learning paths, operator-grade admissions workflows, and gamified learner momentum so the brand looks serious and the outcomes feel real.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="#advisor">
                  Start AI Advisor <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button href="/register" variant="secondary" className="!bg-white !text-slate-900 !border-slate-300 hover:!bg-slate-50">
                  Self-register now
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

            <HeroDepthScene />
          </div>
        </Container>
      </section>

      <section className="py-12 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Why this version matters"
            title="Marketing polish and enterprise scaffolding should now move together"
            desc="This phase is about more than aesthetics: the same site that earns trust on the front-end should also be able to govern programs, coupons, approvals, and registrations on the back-end."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {platformCards.map((card) => (
              <div key={card.title} className="glass-pearl interactive-card rounded-[30px] p-6 ring-soft">
                <card.icon size={20} className="text-cyan-600" />
                <div className="mt-4 text-xl font-semibold text-slate-950">{card.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{card.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="advisor" className="py-12 section-divider">
        <Container>
          <SectionTitle
            eyebrow="Advisor"
            title="Interactive discovery should feel like premium guidance, not a static brochure"
            desc="Let the learner explore background, goals, budget, and path fit—then give them a recommendation they can trust and act on."
          />
          <div className="mt-8">
            <TrackFinder />
          </div>
        </Container>
      </section>

      <section className="py-12 section-divider">
        <Container>
          <SectionTitle eyebrow="Programs" title="Tracks, pricing, and outcomes should remove confusion" desc="A premium site does not overload users with options. It makes the right next step obvious." />
          <div className="mt-8">
            <Tracks />
          </div>
        </Container>
      </section>

      <section className="py-12 section-divider">
        <Container>
          <SectionTitle eyebrow="Proof" title="Every section should either build trust, create desire, or reduce friction" desc="These proof patterns are deliberately placed to help the brand feel expensive, credible, and easier to say yes to." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {proof.map((item) => (
              <div key={item.title} className="glass rounded-[28px] p-6 interactive-card ring-soft">
                <item.icon size={20} className="text-cyan-200" />
                <div className="mt-4 text-xl font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 section-divider"><Container><SuccessStories /></Container></section>
      <section className="py-12 section-divider"><Container><GamifiedJourney /></Container></section>
      <section className="py-12 section-divider"><Container><ConversionFunnel /></Container></section>
      <section className="py-12 section-divider"><Container><Ladder /></Container></section>
      <GalleryStrip />
      <section className="py-12 section-divider"><Container><Testimonials /></Container></section>
      <section className="py-12 section-divider"><Container><FAQ /></Container></section>
      <section className="py-12 section-divider"><Container><CTA /></Container></section>
    </div>
  );
}
