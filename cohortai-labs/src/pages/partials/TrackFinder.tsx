import React from "react";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";
import {
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Mail,
  Phone,
  HeartHandshake,
  Trophy,
  Zap,
  Gift,
  Gauge,
  Target,
  CalendarClock,
  Download,
  Star,
  Flame,
  Rocket,
} from "lucide-react";

type Persona = "Beginner / Non-tech" | "Business / Self-employed" | "Tech / IT";
type Goal = "Career upgrade" | "Business growth" | "Productivity";
type TrackName = "Everyday AI" | "Business AI" | "Tech & Data AI";
type TrackMode = "Auto" | TrackName;
type TimeCommitment = "2–4 hrs/week" | "5–8 hrs/week" | "9+ hrs/week";
type DeliveryPref = "Hybrid (Auto)" | "Online only" | "Offline preferred";

type Tier = {
  value: number;
  label: string;
  short: string;
  duration: string;
  bestFor: string;
};

const tiers: Tier[] = [
  { value: 5000, label: "₹5,000 (AI Starter)", short: "AI Starter", duration: "1–2 weeks", bestFor: "absolute beginners" },
  { value: 10000, label: "₹10,000 (AI Productivity Pro)", short: "Productivity Pro", duration: "2 weeks", bestFor: "working people" },
  { value: 15000, label: "₹15,000 (Specialization Cohort 1)", short: "Specialization 1", duration: "3 weeks", bestFor: "track foundations" },
  { value: 20000, label: "₹20,000 (Specialization Cohort 2)", short: "Specialization 2", duration: "4 weeks", bestFor: "systems + automation" },
  { value: 25000, label: "₹25,000 (Project Builder)", short: "Project Builder", duration: "5–6 weeks", bestFor: "portfolio deliverables" },
  { value: 30000, label: "₹30,000 (Portfolio + Interview)", short: "Portfolio + Interview", duration: "6–8 weeks", bestFor: "serious outcomes" },
  { value: 35000, label: "₹35,000 (Flagship Premium Cohort)", short: "Flagship", duration: "8+ weeks", bestFor: "end-to-end mastery" },
];

const LS_KEY = "cohortai_gamify_v416";

type GamifyState = {
  streak: number;
  lastActiveDate?: string;
  xp: number;
  actions: string[];
  challengeLeads: number;
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function ydayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function readGamify(): GamifyState {
  if (typeof window === "undefined") return { streak: 0, xp: 0, actions: [], challengeLeads: 0 };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { streak: 0, xp: 0, actions: [], challengeLeads: 0 };
    const parsed = JSON.parse(raw);
    return {
      streak: Number(parsed?.streak || 0),
      lastActiveDate: parsed?.lastActiveDate,
      xp: Number(parsed?.xp || 0),
      actions: Array.isArray(parsed?.actions) ? parsed.actions.slice(-30) : [],
      challengeLeads: Number(parsed?.challengeLeads || 0),
    };
  } catch {
    return { streak: 0, xp: 0, actions: [], challengeLeads: 0 };
  }
}
function writeGamify(next: GamifyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_KEY, JSON.stringify(next));
}
function addXpAndStreak(action: string, xpDelta: number) {
  const state = readGamify();
  const t = todayKey();
  let streak = state.streak || 0;
  if (state.lastActiveDate !== t) {
    streak = state.lastActiveDate === ydayKey() ? streak + 1 : 1;
  }
  const next: GamifyState = {
    ...state,
    streak,
    lastActiveDate: t,
    xp: Math.min(500, Math.max(0, (state.xp || 0) + xpDelta)),
    actions: [...(state.actions || []), `${t}:${action}`].slice(-30),
  };
  writeGamify(next);
  return next;
}
function nearestTier(value: number) {
  let best = tiers[0];
  let diff = Math.abs(value - best.value);
  for (const t of tiers) {
    const d = Math.abs(value - t.value);
    if (d < diff) {
      best = t;
      diff = d;
    }
  }
  return best;
}
function personaToTrack(persona: Persona): TrackName {
  if (persona === "Business / Self-employed") return "Business AI";
  if (persona === "Tech / IT") return "Tech & Data AI";
  return "Everyday AI";
}
function minBudgetForTrack(track: TrackName) {
  if (track === "Tech & Data AI") return 15000;
  if (track === "Business AI") return 10000;
  return 5000;
}
function fitScore(input: { persona: Persona; goal: Goal; budget: number; track: TrackName; timeCommitment: TimeCommitment }) {
  let score = 70;
  const expected = personaToTrack(input.persona);
  if (expected === input.track) score += 10;
  if (input.goal === "Career upgrade" && input.track === "Tech & Data AI") score += 8;
  if (input.goal === "Business growth" && input.track === "Business AI") score += 8;
  if (input.goal === "Productivity" && input.track === "Everyday AI") score += 8;
  if (input.track === "Tech & Data AI" && input.budget >= 15000) score += 6;
  if (input.track === "Business AI" && input.budget >= 10000) score += 5;
  if (input.track === "Everyday AI" && input.budget >= 5000) score += 4;
  if (input.timeCommitment === "9+ hrs/week" && input.track === "Tech & Data AI") score += 5;
  if (input.timeCommitment === "2–4 hrs/week" && input.track === "Everyday AI") score += 4;
  if (input.timeCommitment === "5–8 hrs/week") score += 3;
  return Math.max(65, Math.min(99, score));
}
function recommendation(persona: Persona, goal: Goal, budget: number, trackMode: TrackMode) {
  const track = (trackMode === "Auto" ? personaToTrack(persona) : trackMode) as TrackName;
  const budgetFloor = minBudgetForTrack(track);
  const effectiveBudget = Math.max(budget, budgetFloor);
  const tier = nearestTier(effectiveBudget);

  const note =
    goal === "Productivity"
      ? "Focus on practical workflows, templates, and confidence-building first. Then level up into specialization."
      : goal === "Business growth"
      ? "Start with content + lead systems, then add follow-up automation and reporting workflows."
      : "Start with a track-fit cohort, then build portfolio outcomes with reviews and interview-ready projects.";

  const why =
    track === "Everyday AI"
      ? "Best for beginners, students, and homemakers who want a mentor-led start and real confidence."
      : track === "Business AI"
      ? "Best for founders, creators, and self-employed professionals focused on growth and automation."
      : "Best for IT professionals who want projects, tooling workflows, data thinking, and career outcomes.";

  return { track, tier, note, why };
}
function challengeFor(track: TrackName, goal: Goal) {
  if (track === "Everyday AI") {
    return {
      title: "7-Day Everyday AI Starter Challenge",
      task: "Complete 1 prompt-based daily task for 7 days and share 2 outputs.",
      reward: "Mentor-reviewed starter path + batch recommendation",
      checkpoint: "Day 3: Email + WhatsApp drafting",
    };
  }
  if (track === "Business AI") {
    return {
      title: "7-Day Business AI Sprint",
      task: "Create a mini content calendar + one follow-up sequence using AI.",
      reward: "Business AI cohort fit + automation roadmap",
      checkpoint: "Day 4: Lead follow-up prompt stack",
    };
  }
  return {
    title: "7-Day Tech & Data AI Build Sprint",
    task: "Build one small use-case (code/data/dashboard) and document your approach.",
    reward: "Project-first learning path + mentor review slot suggestion",
    checkpoint: "Day 5: Project write-up + review prep",
  };
}
function milestoneFrom(score: number, xp: number) {
  const base = score >= 92 ? "AI Practitioner" : score >= 84 ? "Project Finisher" : score >= 76 ? "Workflow Builder" : "Starter";
  if (xp >= 240 && base !== "AI Practitioner") return "AI Practitioner";
  return base;
}
function unlocks(xp: number) {
  return [
    { xp: 20, title: "Explorer Unlocked", desc: "You’ve started your AI journey on the right track." },
    { xp: 60, title: "Consistency Badge", desc: "You’re building momentum. Daily effort beats random bursts." },
    { xp: 120, title: "Workflow Builder", desc: "You’re ready for guided projects and mentor reviews." },
    { xp: 200, title: "Fast-Track Ready", desc: "Book a human recommendation and convert effort into outcomes." },
  ];
}
function xpPct(xp: number) {
  return Math.max(0, Math.min(100, Math.round((Math.min(xp, 250) / 250) * 100)));
}
function waPlanText(args: {
  persona: Persona;
  goal: Goal;
  track: TrackName;
  tier: Tier;
  budget: number;
  timeCommitment: TimeCommitment;
  deliveryPref: DeliveryPref;
  fit: number;
  milestone: string;
  streak: number;
}) {
  return `Hi CohortAI Labs! I used the Track Finder and would like a human recommendation.
Persona: ${args.persona}
Goal: ${args.goal}
Recommended Track: ${args.track}
Budget: ₹${args.budget.toLocaleString("en-IN")} (Suggested: ${args.tier.short})
Time Commitment: ${args.timeCommitment}
Preferred Mode: ${args.deliveryPref}
Fit Score: ${args.fit}%
Milestone: ${args.milestone}
Current Streak: ${args.streak} day(s)

Please suggest the best cohort, start date, and next step.`;
}

export default function TrackFinder() {
  const [persona, setPersona] = React.useState<Persona>("Beginner / Non-tech");
  const [goal, setGoal] = React.useState<Goal>("Career upgrade");
  const [budget, setBudget] = React.useState<number>(10000);
  const [trackMode, setTrackMode] = React.useState<TrackMode>("Auto");
  const [timeCommitment, setTimeCommitment] = React.useState<TimeCommitment>("5–8 hrs/week");
  const [deliveryPref, setDeliveryPref] = React.useState<DeliveryPref>("Hybrid (Auto)");
  const [gamify, setGamify] = React.useState<GamifyState>({ streak: 0, xp: 0, actions: [], challengeLeads: 0 });
  const [animatedXp, setAnimatedXp] = React.useState(0);
  const [inlineMessage, setInlineMessage] = React.useState<string>("");

  React.useEffect(() => {
    setGamify(readGamify());
  }, []);

  const rec = React.useMemo(() => recommendation(persona, goal, budget, trackMode), [persona, goal, budget, trackMode]);
  const fit = React.useMemo(
    () =>
      fitScore({
        persona,
        goal,
        budget,
        track: rec.track,
        timeCommitment,
      }),
    [persona, goal, budget, rec.track, timeCommitment]
  );
  const challenge = React.useMemo(() => challengeFor(rec.track, goal), [rec.track, goal]);
  const milestone = milestoneFrom(fit, gamify.xp);
  const unlocked = unlocks(gamify.xp).filter((u) => gamify.xp >= u.xp);
  const nextUnlock = unlocks(gamify.xp).find((u) => gamify.xp < u.xp);

  React.useEffect(() => {
    const target = xpPct(gamify.xp);
    const step = target > animatedXp ? 2 : -2;
    if (target === animatedXp) return;
    const id = window.setInterval(() => {
      setAnimatedXp((prev) => {
        if ((step > 0 && prev >= target) || (step < 0 && prev <= target)) {
          window.clearInterval(id);
          return target;
        }
        return prev + step;
      });
    }, 12);
    return () => window.clearInterval(id);
  }, [gamify.xp]); // eslint-disable-line react-hooks/exhaustive-deps

  function award(action: string, xpDelta: number, message?: string) {
    const next = addXpAndStreak(action, xpDelta);
    setGamify(next);
    if (message) {
      setInlineMessage(message);
      window.setTimeout(() => setInlineMessage(""), 2500);
    }
  }

  function onGenerate() {
    award("trackfinder_generate", 10, "Plan updated + XP earned!");
  }

  function onLeadMagnetIntent() {
    award("challenge_pdf_open", 12, "Challenge unlocked! Submit the form to receive the PDF.");
  }

  const waHref = React.useMemo(() => {
    const msg = waPlanText({
      persona,
      goal,
      track: rec.track,
      tier: rec.tier,
      budget,
      timeCommitment,
      deliveryPref,
      fit,
      milestone,
      streak: gamify.streak || 0,
    });
    return `https://wa.me/91${site.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [persona, goal, rec, budget, timeCommitment, deliveryPref, fit, milestone, gamify.streak]);

  const email = (site as any).email || "info.cohortai.labs@itprofessional.pro";

  const journey = {
    baseName: milestone,
    challenge: challenge.task,
    reward: challenge.reward,
    consistencyTip:
      timeCommitment === "2–4 hrs/week"
        ? "Choose 20–30 minute daily sessions. Consistency builds confidence faster than marathon sessions."
        : timeCommitment === "5–8 hrs/week"
        ? "Use 3 focused sessions each week and submit one small output for review."
        : "Split your week into build + review + reflection blocks to avoid burnout.",
  };

  const budgetTier = nearestTier(budget);

  return (
    <section id="track-finder" className="py-14 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT: controls */}
          <div className="card card-3d rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700">
                  Track Finder
                </div>
                <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-950">
                  Find your best starting track, budget band, and challenge path
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Answer a few questions and get a fit score, milestone, 7-day challenge, and a human-friendly recommendation.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 min-w-[220px]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-600">Your streak</div>
                    <div className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-950">
                      <Flame size={15} className="text-orange-500" />
                      {gamify.streak || 0} day{(gamify.streak || 0) === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-600">XP</div>
                    <div className="mt-1 text-sm font-semibold text-slate-950">{gamify.xp || 0}/250</div>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${animatedXp}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-slate-600">XP progress to Fast-Track Ready</div>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <SelectorGroup
                label="Background"
                values={["Beginner / Non-tech", "Business / Self-employed", "Tech / IT"] as const}
                selected={persona}
                onChange={(v) => {
                  setPersona(v);
                  award("persona_change", 2);
                }}
                pillBase="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-white"
                active="ring-2 ring-cyan-200 border-cyan-200 text-slate-950"
              />

              <SelectorGroup
                label="Primary goal"
                values={["Career upgrade", "Business growth", "Productivity"] as const}
                selected={goal}
                onChange={(v) => {
                  setGoal(v);
                  award("goal_change", 2);
                }}
                pillBase="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-white"
                active="ring-2 ring-violet-200 border-violet-200 text-slate-950"
              />

              <SelectorGroup
                label="Preferred track"
                values={["Auto", "Everyday AI", "Business AI", "Tech & Data AI"] as const}
                selected={trackMode}
                onChange={(v) => {
                  setTrackMode(v);
                  award("track_pref_change", 2);
                }}
                pillBase="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-white"
                active="ring-2 ring-emerald-200 border-emerald-200 text-slate-950"
              />

              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-slate-800">Budget (₹)</div>
                <div className="mt-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-950">₹{budget.toLocaleString("en-IN")}</div>
                    <div className="text-xs text-slate-600">Nearest tier: {budgetTier.short}</div>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={35000}
                    step={5000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    onMouseUp={() => award("budget_adjust", 3)}
                    onTouchEnd={() => award("budget_adjust", 3)}
                    className="mt-3 w-full accent-violet-500"
                    aria-label="Budget slider"
                  />
                  <div className="mt-2 grid grid-cols-4 sm:grid-cols-7 gap-1 text-[10px] text-slate-600">
                    {tiers.map((t) => (
                      <div key={t.value} className={cn("truncate", budget === t.value && "text-slate-950 font-semibold")}>
                        {t.value >= 10000 ? `₹${t.value/1000}k` : `₹${t.value}`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <SelectorGroup
                  label="Time commitment"
                  values={["2–4 hrs/week", "5–8 hrs/week", "9+ hrs/week"] as const}
                  selected={timeCommitment}
                  onChange={(v) => {
                    setTimeCommitment(v);
                    award("time_commit_change", 2);
                  }}
                  pillBase="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-white"
                  active="ring-2 ring-cyan-200 border-cyan-200 text-slate-950"
                />

                <SelectorGroup
                  label="Preferred mode"
                  values={["Hybrid (Auto)", "Online only", "Offline preferred"] as const}
                  selected={deliveryPref}
                  onChange={(v) => {
                    setDeliveryPref(v);
                    award("delivery_pref_change", 2);
                  }}
                  pillBase="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-white"
                  active="ring-2 ring-violet-200 border-violet-200 text-slate-950"
                />
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-r from-cyan-50/80 via-violet-50/70 to-emerald-50/80 p-4">
                <div className="flex items-start gap-2">
                  <Target size={16} className="mt-0.5 text-violet-700" />
                  <div>
                    <div className="text-sm font-semibold text-slate-950">Conversion-focused recommendation flow</div>
                    <p className="mt-1 text-xs text-slate-700">
                      Generate your plan first → unlock a 7-day challenge → send the result to WhatsApp for a friendly human recommendation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onGenerate}
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
                >
                  <Gauge className="mr-2" size={18} />
                  Unlock my plan
                </button>
                <a
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-white/80 border border-slate-200/80 hover:bg-white transition"
                  onClick={() => award("open_quiz_from_trackfinder", 6)}
                >
                  <Rocket className="mr-2" size={18} />
                  Take AI Readiness Assessment
                </a>
                {inlineMessage && (
                  <div className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                    {inlineMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: result */}
          <div className="card card-3d rounded-3xl p-5 sm:p-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800">
              <CheckCircle2 size={16} className="mr-2 text-emerald-600" />
              Recommendation
            </div>

            <div className="mt-4 rounded-2xl bg-white/80 border border-slate-200/80 p-4">
              <div className="text-xs text-slate-700">Best track</div>
              <div className="mt-1 text-lg font-semibold text-slate-950">{rec.track}</div>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed">{rec.why}</p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 border border-slate-200/80 p-4">
                <div className="text-xs text-slate-700">Suggested plan</div>
                <div className="mt-1 text-sm font-semibold text-slate-950">{rec.tier.label}</div>
                <div className="mt-1 text-xs text-slate-600">{rec.tier.duration} • {rec.tier.bestFor}</div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200/80 p-4">
                <div className="text-xs text-slate-700">Fit score</div>
                <div className="mt-1 text-sm font-semibold text-slate-950">{fit}%</div>
                <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400" style={{ width: `${fit}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-800">{rec.note}</div>

            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <Trophy size={16} className="text-violet-700" />
                Your current milestone badge
              </div>
              <div className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-gradient-to-r from-cyan-50 via-violet-50 to-emerald-50 px-3 py-1.5 text-xs font-semibold text-slate-900">
                {journey.baseName}
              </div>
              <div className="mt-3 grid gap-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <Zap size={14} className="mt-0.5 text-cyan-700" />
                  <span>{journey.challenge}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Gift size={14} className="mt-0.5 text-emerald-700" />
                  <span>Reward if you start now: {journey.reward}</span>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Consistency tip:</span> {journey.consistencyTip}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/85 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <Star size={16} className="text-amber-500" />
                Milestone unlock banners
              </div>
              <div className="mt-3 grid gap-2">
                {unlocked.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-700">
                    Start by clicking <span className="font-semibold text-slate-900">Unlock my plan</span> to earn your first XP and banner.
                  </div>
                ) : (
                  unlocked.map((u) => (
                    <div key={u.xp} className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2">
                      <div className="text-xs font-semibold text-emerald-900">{u.title}</div>
                      <div className="mt-0.5 text-[11px] text-emerald-800">{u.desc}</div>
                    </div>
                  ))
                )}
                {nextUnlock && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-700">
                    Next unlock at <span className="font-semibold text-slate-900">{nextUnlock.xp} XP</span>: {nextUnlock.title}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-cyan-50/80 via-violet-50/70 to-emerald-50/80 p-4">
              <div className="flex items-start gap-2">
                <HeartHandshake size={16} className="mt-0.5 text-violet-700" />
                <div>
                  <div className="text-sm font-semibold text-slate-950">Need help choosing?</div>
                  <p className="mt-1 text-xs text-slate-700">
                    Our team is friendly and used to guiding beginners, professionals, and business owners without pressure. We’ll suggest the right track, timing, and budget fit.
                  </p>
                </div>
              </div>
            </div>

            {/* Lead magnet capture */}
            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/85 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-950">
                    {(site as any).leadMagnet?.challengePdfTitle || "7-Day AI Starter Challenge PDF"}
                  </div>
                  <p className="mt-1 text-xs text-slate-700">
                    {(site as any).leadMagnet?.challengePdfSubtitle ||
                      "Get a day-by-day challenge with prompts, checkpoints, and a WhatsApp-friendly progress checklist."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onLeadMagnetIntent}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                >
                  <Download size={14} className="mr-1.5 text-violet-700" />
                  Unlock
                </button>
              </div>

              <form
                name={(site as any).leadMagnet?.challengePdfFormName || "cohortai-7day-ai-challenge"}
                method="POST"
                data-netlify="true"
                action="/thanks"
                className="mt-4 grid gap-2"
                onSubmit={() => {
                  const next = addXpAndStreak("challenge_pdf_submit", 18);
                  next.challengeLeads = (next.challengeLeads || 0) + 1;
                  writeGamify(next);
                  setGamify(next);
                }}
              >
                <input type="hidden" name="form-name" value={(site as any).leadMagnet?.challengePdfFormName || "cohortai-7day-ai-challenge"} />
                <input type="hidden" name="track" value={rec.track} />
                <input type="hidden" name="persona" value={persona} />
                <input type="hidden" name="goal" value={goal} />
                <input type="hidden" name="budget" value={String(budget)} />
                <input type="hidden" name="delivery" value={deliveryPref} />
                <input type="hidden" name="timeCommitment" value={timeCommitment} />
                <input type="hidden" name="fitScore" value={String(fit)} />

                <div className="grid sm:grid-cols-2 gap-2">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-300"
                  />
                  <input
                    name="phone"
                    required
                    placeholder="Phone / WhatsApp"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-300"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email (for challenge PDF)"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-300"
                />
                <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-700">
                    Includes: day-wise tasks, beginner prompts, track-specific checkpoints, and an optional mentor follow-up.
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition"
                  >
                    Send me the challenge PDF
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 grid gap-2">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => award("whatsapp_plan", 14)}
                className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
              >
                <MessageCircle className="mr-2" size={18} />
                WhatsApp my plan + badge
              </a>

              <a
                href="/recommendation"
                onClick={() => award("human_recommendation_click", 12)}
                className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-white/80 border border-slate-200/80 hover:bg-white transition"
              >
                <HeartHandshake className="mr-2" size={18} />
                Get a human recommendation
              </a>

              <a
                href={`tel:${site.phone}`}
                onClick={() => award("call_click", 8)}
                className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-white/80 border border-slate-200/80 hover:bg-white transition"
              >
                <Phone className="mr-2" size={18} />
                Call
              </a>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent(`CohortAI Track Recommendation - ${rec.track}`)}&body=${encodeURIComponent(
                  waPlanText({ persona, goal, track: rec.track, tier: rec.tier, budget, timeCommitment, deliveryPref, fit, milestone, streak: gamify.streak || 0 })
                )}`}
                onClick={() => award("email_click", 8)}
                className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-white/80 border border-slate-200/80 hover:bg-white transition"
              >
                <Mail className="mr-2" size={18} />
                Email
              </a>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
              <div className="flex items-start gap-2 text-xs text-slate-700">
                <CalendarClock size={14} className="mt-0.5 text-cyan-700" />
                <div>
                  Batches start {site.startDate}. Hybrid (online + offline). After you WhatsApp your plan, our team can suggest the best city and schedule.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectorGroup<T extends string>({
  label,
  values,
  selected,
  onChange,
  pillBase,
  active,
}: {
  label: string;
  values: readonly T[];
  selected: T;
  onChange: (value: T) => void;
  pillBase: string;
  active: string;
}) {
  return (
    <div>
      <div className="text-xs tracking-[0.22em] uppercase text-slate-800">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            className={cn(pillBase, selected === value && active)}
            onClick={() => onChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
