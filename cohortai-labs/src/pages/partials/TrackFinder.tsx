import React from "react";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";
import { CheckCircle2, Sparkles } from "lucide-react";

type Persona = "Beginner / Non-tech" | "Business / Self-employed" | "Tech / IT";
type Goal = "Career upgrade" | "Business growth" | "Productivity";

function recommendation(persona: Persona, goal: Goal, budget: number) {
  let track = site.tracks[0].name;
  if (persona === "Business / Self-employed") track = "Business AI";
  if (persona === "Tech / IT") track = "Tech & Data AI";

  let start = "₹5,000 (AI Starter)";
  if (budget >= 10000) start = "₹10,000 (AI Productivity Pro)";
  if (budget >= 15000) start = "₹15,000 (Specialization Cohort 1)";
  if (budget >= 25000) start = "₹25,000 (Project Builder)";
  if (budget >= 35000) start = "₹35,000 (Flagship Premium Cohort)";

  const note =
    goal === "Productivity"
      ? "Focus on workflows and templates first, then add projects."
      : goal === "Business growth"
      ? "Start with content + lead systems, then add automation."
      : "Build a portfolio with reviews, then interview prep.";

  return { track, start, note };
}

export default function TrackFinder() {
  const [persona, setPersona] = React.useState<Persona>("Beginner / Non-tech");
  const [goal, setGoal] = React.useState<Goal>("Career upgrade");
  const [budget, setBudget] = React.useState(15000);

  const rec = recommendation(persona, goal, budget);

  const pill =
    "rounded-full px-4 py-2 text-sm border border-slate-700/60 bg-white/70 hover:bg-slate-800/60 transition";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card card-3d rounded-3xl p-6  lg:col-span-2">
        <div className="text-sm font-semibold text-slate-950 flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-200" />
          Track Finder
        </div>
        <div className="mt-2 text-sm text-slate-600">
          Pick your background, goal, and budget. We’ll recommend a starting point.
        </div>

        <div className="mt-6 grid gap-6">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-600">Background</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Beginner / Non-tech", "Business / Self-employed", "Tech / IT"] as Persona[]).map((p) => (
                <button
                  key={p}
                  className={cn(pill, persona === p && "border-cyan-200/50 text-slate-950")}
                  onClick={() => setPersona(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-600">Goal</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Career upgrade", "Business growth", "Productivity"] as Goal[]).map((g) => (
                <button
                  key={g}
                  className={cn(pill, goal === g && "border-violet-200/50 text-slate-950")}
                  onClick={() => setGoal(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-[0.22em] uppercase text-slate-600">Budget</div>
              <div className="text-sm text-slate-950 font-semibold">₹{budget.toLocaleString("en-IN")}</div>
            </div>
            <input
              type="range"
              min={5000}
              max={35000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value, 10))}
              className="mt-4 w-full accent-cyan-200"
            />
            <div className="mt-2 text-xs text-slate-500">
              Tip: start lower and upgrade later—your learnings carry forward.
            </div>
          </div>
        </div>
      </div>

      <div className="card card-3d rounded-3xl p-6 ">
        <div className="text-sm font-semibold text-slate-950 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-200" />
          Recommendation
        </div>

        <div className="mt-5 rounded-2xl bg-white/70 border border-slate-200/80 p-4">
          <div className="text-xs text-slate-600">Best track</div>
          <div className="mt-1 text-lg font-semibold text-slate-950">{rec.track}</div>
        </div>

        <div className="mt-3 rounded-2xl bg-white/70 border border-slate-200/80 p-4">
          <div className="text-xs text-slate-600">Start from</div>
          <div className="mt-1 text-sm font-semibold text-slate-950">{rec.start}</div>
        </div>

        <div className="mt-3 text-sm text-slate-600">{rec.note}</div>

        <a
          href="/contact"
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition accent-ring"
        >
          Get batch schedule
        </a>

        <div className="mt-3 text-xs text-slate-500">
          Batches start {site.startDate}. Hybrid (online + offline).
        </div>
      </div>
    </div>
  );
}
