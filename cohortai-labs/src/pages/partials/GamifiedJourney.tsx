import { Gamepad2, Trophy, Zap, Sparkles, ArrowRight, Gift } from "lucide-react";
import Button from "../../components/Button";

const badges = [
  {
    name: "Starter",
    tag: "Confidence",
    desc: "Learn prompting, AI safety, and daily productivity basics.",
  },
  {
    name: "Workflow Builder",
    tag: "Automation",
    desc: "Build repeatable workflows for study, business, or work tasks.",
  },
  {
    name: "Project Finisher",
    tag: "Portfolio",
    desc: "Complete mentor-reviewed outputs you can showcase confidently.",
  },
  {
    name: "AI Practitioner",
    tag: "Capstone",
    desc: "Present a final use case, case study, or project with review.",
  },
] as const;

const challenges = [
  "Day 1: AI tools setup + safe prompting",
  "Day 2: 10 prompts for daily work/life",
  "Day 3: Build 1 workflow (notes/content/analysis)",
  "Day 4: Improve your resume/email/profile using AI",
  "Day 5: Mini project with mentor feedback",
  "Day 6: Share your result + get next-step roadmap",
  "Day 7: Choose your cohort track and batch",
] as const;

export default function GamifiedJourney() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="card card-3d rounded-3xl p-6 sm:p-7">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
          <Gamepad2 size={18} className="text-violet-700" />
          Gamified learning path
        </div>
        <p className="mt-2 text-sm text-slate-800">
          Learning feels easier when progress is visible. We use a milestone-style approach so learners stay motivated,
          collect wins, and move from curiosity to real outcomes.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {badges.map((badge, idx) => (
            <div key={badge.name} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Trophy size={14} className="text-cyan-700" />
                  Level {idx + 1}
                </div>
                <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold border border-slate-200 bg-slate-50 text-slate-700">
                  {badge.tag}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-950">{badge.name}</div>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-cyan-50/90 via-violet-50/70 to-emerald-50/80 p-4">
          <div className="flex items-start gap-3">
            <Gift size={18} className="mt-0.5 text-emerald-700" />
            <div>
              <div className="text-sm font-semibold text-slate-950">Engagement = better outcomes</div>
              <p className="mt-1 text-xs text-slate-700">
                Small wins, visible milestones, and mentor feedback loops help beginners, homemakers, creators, and professionals
                stay consistent without feeling overwhelmed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button href="/quiz">
            Take the AI Assessment <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button href="/recommendation" variant="secondary">
            Get a human recommendation
          </Button>
        </div>
      </div>

      <div className="card card-3d rounded-3xl p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
          <Zap size={18} className="text-cyan-700" />
          7-Day AI Starter Challenge
        </div>
        <p className="mt-2 text-sm text-slate-800">
          A friendly challenge format that makes AI learning feel fun, structured, and shareable.
        </p>

        <div className="mt-5 grid gap-2">
          {challenges.map((item, idx) => (
            <div
              key={item}
              className="rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2.5 text-xs text-slate-800 flex items-start gap-3"
            >
              <span className="mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-semibold">
                {idx + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
          <div className="text-xs tracking-[0.22em] uppercase text-slate-700">Best for</div>
          <div className="mt-2 text-sm text-slate-950 font-semibold">
            Beginners • Students • Homemakers • Working professionals
          </div>
          <p className="mt-2 text-xs text-slate-700">
            We can adapt the challenge path for business owners and tech professionals too.
          </p>
        </div>

        <a
          href="/quiz"
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
        >
          <Sparkles className="mr-2" size={18} />
          Start with assessment
        </a>
      </div>
    </div>
  );
}
