import React from "react";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";
import { awardXP, readState } from "../../gamification/engine";
import { CheckCircle2, Sparkles, Trophy, Zap } from "lucide-react";

type Persona = "Beginner / Non-tech" | "Business / Self-employed" | "Tech / IT";
type Goal = "Career upgrade" | "Business growth" | "Productivity";
type Mode = "Hybrid (Auto)" | "Online only" | "Offline preferred";

function recommendation(persona: Persona, goal: Goal, budget: number, mode: Mode) {
  let track = site.tracks[0].name;
  if (persona === "Business / Self-employed") track = "Business AI";
  if (persona === "Tech / IT") track = "Tech & Data AI";
  if (goal === "Productivity" && persona !== "Tech / IT") track = "Everyday AI";

  const tiers = [5000, 10000, 15000, 20000, 25000, 30000, 35000];
  const nearest = tiers.reduce((prev, cur) => Math.abs(cur - budget) < Math.abs(prev - budget) ? cur : prev, tiers[0]);

  let start = "₹5,000 (AI Starter)";
  if (nearest >= 10000) start = "₹10,000 (AI Productivity Pro)";
  if (nearest >= 15000) start = "₹15,000 (Specialization Cohort 1)";
  if (nearest >= 25000) start = "₹25,000 (Project Builder)";
  if (nearest >= 35000) start = "₹35,000 (Flagship Premium Cohort)";

  const fit = Math.min(96, 62 + (persona === "Tech / IT" ? 12 : 8) + (goal === "Career upgrade" ? 10 : goal === "Business growth" ? 14 : 8) + (mode === "Hybrid (Auto)" ? 7 : 4));
  const challenge = goal === "Business growth" ? "Publish 1 AI-assisted lead magnet and 3 follow-up messages." : goal === "Career upgrade" ? "Complete one guided project and share a portfolio-ready summary." : "Ship one AI workflow that saves you 30 minutes daily.";
  const milestone = budget >= 25000 ? "Portfolio Builder" : budget >= 10000 ? "Project Finisher" : "Explorer";

  return { track, start, fit, challenge, milestone, nearest };
}

export default function TrackFinder() {
  const [persona, setPersona] = React.useState<Persona>("Beginner / Non-tech");
  const [goal, setGoal] = React.useState<Goal>("Career upgrade");
  const [mode, setMode] = React.useState<Mode>("Hybrid (Auto)");
  const [budget, setBudget] = React.useState(10000);
  const [state, setState] = React.useState(readState());

  const rec = recommendation(persona, goal, budget, mode);

  const unlockPlan = () => setState(awardXP({ type: "advisor_unlock", points: 20 }, rec.milestone));

  const pill = "rounded-full px-4 py-2 text-sm border border-slate-700/80 bg-white/5 hover:bg-white/10 transition";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card card-3d rounded-3xl p-6 lg:col-span-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-300" /> AI Track Finder
            </div>
            <div className="mt-2 text-sm text-slate-400">Answer a few prompts to get a best-fit track, plan tier, 7-day challenge, and unlockable milestone badge.</div>
          </div>
          <div className="rounded-2xl border border-slate-700/80 bg-white/5 px-4 py-3 min-w-[170px]">
            <div className="text-xs text-slate-500">Your streak</div>
            <div className="mt-2 flex items-center justify-between text-white font-semibold"><span>{state.streakDays} days</span><span>{state.xp}/250 XP</span></div>
            <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" style={{ width: `${Math.min(100, (state.xp / 250) * 100)}%` }} /></div>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Background</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Beginner / Non-tech", "Business / Self-employed", "Tech / IT"] as Persona[]).map((p) => (
                <button key={p} className={cn(pill, persona === p && "border-cyan-300/40 text-white accent-ring")} onClick={() => setPersona(p)}>{p}</button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Primary goal</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Career upgrade", "Business growth", "Productivity"] as Goal[]).map((g) => (
                <button key={g} className={cn(pill, goal === g && "border-violet-300/40 text-white accent-ring")} onClick={() => setGoal(g)}>{g}</button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Preferred mode</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Hybrid (Auto)", "Online only", "Offline preferred"] as Mode[]).map((m) => (
                <button key={m} className={cn(pill, mode === m && "border-emerald-300/40 text-white accent-ring")} onClick={() => setMode(m)}>{m}</button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Budget (₹)</div>
              <div className="text-sm text-white font-semibold">₹{budget.toLocaleString("en-IN")}</div>
            </div>
            <input type="range" min={5000} max={35000} step={5000} value={budget} onChange={(e) => setBudget(parseInt(e.target.value, 10))} className="mt-4 w-full accent-cyan-300" />
            <div className="mt-2 text-xs text-slate-500">Nearest tier: {rec.start}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="card rounded-3xl p-6">
          <div className="text-sm font-semibold text-white flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-300" /> Recommendation</div>
          <div className="mt-4 rounded-3xl border border-slate-700/70 bg-white/5 p-5">
            <div className="text-xs text-slate-500">Best track</div>
            <div className="mt-1 text-3xl font-semibold text-white">{rec.track}</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4">
                <div className="text-xs text-slate-500">Suggested plan</div>
                <div className="mt-2 text-lg font-semibold text-white">{rec.start}</div>
              </div>
              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4">
                <div className="text-xs text-slate-500">Fit score</div>
                <div className="mt-2 text-lg font-semibold text-white">{rec.fit}%</div>
                <div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" style={{ width: `${rec.fit}%` }} /></div>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-300">Start with a track-fit cohort, then build real outputs with mentor reviews and visible milestone unlocks.</div>
          </div>
        </div>

        <div className="card rounded-3xl p-6">
          <div className="flex items-center gap-2 text-white font-semibold"><Trophy size={18} className="text-violet-300" /> Your current milestone badge</div>
          <div className="mt-3 inline-flex rounded-full bg-emerald-300/12 border border-emerald-300/20 px-3 py-2 text-sm text-emerald-200">{state.unlocked.at(-1) ?? rec.milestone}</div>
          <div className="mt-4 text-sm text-slate-300">{rec.challenge}</div>
          <div className="mt-4 rounded-2xl border border-slate-700/70 bg-white/5 p-4 text-sm text-slate-400">Consistency tip: use 3 focused sessions each week and submit one small output for review.</div>
          <button onClick={unlockPlan} className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 neon-edge"><Zap size={16} /> Unlock my plan (+20 XP)</button>
        </div>
      </div>
    </div>
  );
}
