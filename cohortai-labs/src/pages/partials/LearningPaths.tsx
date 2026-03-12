import React from "react";
import { Compass, Rocket, Wand2 } from "lucide-react";
import { cn } from "../../lib/utils";

const paths = [
  {
    id: "everyday",
    title: "Everyday AI",
    icon: Compass,
    who: "Beginners, students, homemakers",
    milestones: ["Confidence with prompting", "Weekly productivity stack", "First mini project", "Portfolio starter"],
    outcome: "Best entry path when the goal is clarity, consistency, and early confidence.",
  },
  {
    id: "business",
    title: "Business AI",
    icon: Wand2,
    who: "Founders, freelancers, marketing teams",
    milestones: ["Content engine", "Lead capture system", "Follow-up automation", "Case study asset"],
    outcome: "Best path when the goal is lead flow, faster content, and repeatable systems.",
  },
  {
    id: "tech",
    title: "Tech & Data AI",
    icon: Rocket,
    who: "Developers, analysts, IT professionals",
    milestones: ["AI dev workflows", "Data foundations", "Project review", "Interview-ready portfolio"],
    outcome: "Best path when the goal is projects, confidence, and a sharper technical profile.",
  },
];

export default function LearningPaths() {
  const [active, setActive] = React.useState(paths[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4">
        {paths.map((path) => (
          <button key={path.id} onClick={() => setActive(path)} className={cn("card card-3d rounded-3xl p-5 text-left border", active.id === path.id && "border-cyan-300/40 accent-ring")}>
            <div className="flex items-center gap-3">
              <path.icon className="text-cyan-300" size={18} />
              <div className="font-semibold text-white">{path.title}</div>
            </div>
            <div className="mt-2 text-sm text-slate-400">{path.who}</div>
          </button>
        ))}
      </div>

      <div className="card rounded-[28px] p-6 sm:p-7">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">Interactive path preview</div>
        <div className="mt-2 text-2xl font-semibold text-white">{active.title}</div>
        <div className="mt-2 text-slate-400 max-w-2xl">{active.outcome}</div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {active.milestones.map((step, idx) => (
            <div key={step} className="rounded-3xl border border-slate-700/70 bg-white/5 p-4">
              <div className="text-xs text-slate-500">Milestone {idx + 1}</div>
              <div className="mt-2 text-white font-semibold">{step}</div>
              <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300" style={{ width: `${(idx + 1) * 24}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
