import React from "react";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";
import { CheckCircle2, Sparkles, MessageCircle, Mail, Phone, HeartHandshake, Trophy, Zap, Gift } from "lucide-react";

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

function nearestTier(value: number) {
  const sorted = [...tiers].sort((a, b) => a.value - b.value);
  let best = sorted[0];
  let bestDiff = Math.abs(value - best.value);
  for (const t of sorted) {
    const d = Math.abs(value - t.value);
    if (d < bestDiff) {
      best = t;
      bestDiff = d;
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

function recommendation(persona: Persona, goal: Goal, budget: number, trackMode: TrackMode) {
  const track: TrackName = trackMode === "Auto" ? personaToTrack(persona) : trackMode;
  const tier = nearestTier(budget);

  const note =
    goal === "Productivity"
      ? "Focus on workflows, templates, and quick wins—then add projects when ready."
      : goal === "Business growth"
      ? "Start with content + lead systems, then add follow-up automation and reporting."
      : "Build portfolio deliverables with reviews—then optimize for interviews.";

  const why =
    track === "Everyday AI"
      ? "Best for beginners: confidence + habit-building with practical templates."
      : track === "Business AI"
      ? "Best for growth: content systems, leads, follow-ups, and automation."
      : "Best for tech: dev workflow, data foundations, dashboards, and project reviews.";

  return { track, tier, note, why };
}

function fitScore({
  persona,
  goal,
  budget,
  track,
  timeCommitment,
}: {
  persona: Persona;
  goal: Goal;
  budget: number;
  track: TrackName;
  timeCommitment: TimeCommitment;
}) {
  let score = 70;
  const expectedTrack = personaToTrack(persona);
  if (expectedTrack === track) score += 10;
  if (goal === "Career upgrade" && track === "Tech & Data AI") score += 8;
  if (goal === "Business growth" && track === "Business AI") score += 8;
  if (goal === "Productivity" && track === "Everyday AI") score += 8;
  if (track === "Tech & Data AI" && budget >= 15000) score += 6;
  if (track === "Business AI" && budget >= 10000) score += 5;
  if (timeCommitment === "9+ hrs/week") score += 4;
  if (timeCommitment === "2–4 hrs/week" && track === "Tech & Data AI" && budget < 25000) score -= 5;
  return Math.max(60, Math.min(98, score));
}

function journeyBadge({
  score,
  track,
  timeCommitment,
}: {
  score: number;
  track: TrackName;
  timeCommitment: TimeCommitment;
}) {
  const baseName =
    score >= 92 ? "AI Practitioner" : score >= 84 ? "Project Finisher" : score >= 75 ? "Workflow Builder" : "Starter";
  const challenge =
    track === "Everyday AI"
      ? "Complete the 7-Day Everyday AI challenge and submit 1 mini workflow."
      : track === "Business AI"
      ? "Build 1 content + follow-up automation workflow and share your draft."
      : "Build 1 dev/data mini project and get mentor review on your approach.";
  const reward =
    score >= 90
      ? "Fast-track to mentor-reviewed project plan"
      : score >= 80
      ? "Recommended challenge pack + cohort roadmap"
      : "Beginner-safe starter prompts + orientation guidance";

  const consistencyTip =
    timeCommitment === "2–4 hrs/week"
      ? "Keep it sustainable: 25–40 min sessions, 4 days/week."
      : timeCommitment === "5–8 hrs/week"
      ? "Ideal pace: 3 focused sessions + 1 practice/review block."
      : "Use your higher time budget for projects + portfolio polishing.";

  return { baseName, challenge, reward, consistencyTip };
}

export default function TrackFinder() {
  const [persona, setPersona] = React.useState<Persona>("Beginner / Non-tech");
  const [goal, setGoal] = React.useState<Goal>("Career upgrade");
  const [trackMode, setTrackMode] = React.useState<TrackMode>("Auto");
  const [timeCommitment, setTimeCommitment] = React.useState<TimeCommitment>("5–8 hrs/week");
  const [deliveryPref, setDeliveryPref] = React.useState<DeliveryPref>("Hybrid (Auto)");
  const [budget, setBudget] = React.useState(15000);

  React.useEffect(() => {
    if (trackMode !== "Auto") return;
    const next = personaToTrack(persona);
    const min = minBudgetForTrack(next);
    if (budget < min) setBudget(min);
    setBudget((b) => nearestTier(b).value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona, trackMode]);

  React.useEffect(() => {
    if (trackMode === "Auto") return;
    const min = minBudgetForTrack(trackMode);
    setBudget((b) => nearestTier(Math.max(b, min)).value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackMode]);

  const rec = recommendation(persona, goal, budget, trackMode);
  const effectiveTrack = rec.track;
  const score = fitScore({ persona, goal, budget, track: effectiveTrack, timeCommitment });
  const journey = journeyBadge({ score, track: effectiveTrack, timeCommitment });

  const pillBase =
    "rounded-full px-4 py-2 text-sm border border-slate-300/80 bg-white/70 hover:bg-white transition shadow-[0_14px_40px_rgba(15,23,42,0.06)]";
  const active =
    "border-transparent text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200";
  const sliderMin = trackMode === "Auto" ? minBudgetForTrack(personaToTrack(persona)) : minBudgetForTrack(trackMode);

  const waHref = (() => {
    const msg = encodeURIComponent(
      `Hi CohortAI Labs! Please help me with a course recommendation.\n` +
        `Track: ${rec.track}\n` +
        `Goal: ${goal}\n` +
        `Budget: ₹${budget.toLocaleString("en-IN")} (${rec.tier.short})\n` +
        `Background: ${persona}\n` +
        `Time commitment: ${timeCommitment}\n` +
        `Preferred mode: ${deliveryPref}\n` +
        `Please share timings, seat availability, and the best next step.`
    );
    return `https://wa.me/91${site.whatsapp}?text=${msg}`;
  })();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card card-3d rounded-3xl p-6 lg:col-span-2">
        <div className="text-sm font-semibold text-slate-950 flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-700" />
          Track Finder
        </div>
        <div className="mt-2 text-sm text-slate-800">
          Pick your background, goal, budget, and schedule comfort. We’ll suggest a practical starting point.
        </div>

        <div className="mt-6 grid gap-6">
          <SelectorGroup<Persona>
            label="Background"
            values={["Beginner / Non-tech", "Business / Self-employed", "Tech / IT"]}
            selected={persona}
            onChange={(v) => setPersona(v)}
            pillBase={pillBase}
            active={active}
          />

          <SelectorGroup<Goal>
            label="Goal"
            values={["Career upgrade", "Business growth", "Productivity"]}
            selected={goal}
            onChange={(v) => setGoal(v)}
            pillBase={pillBase}
            active={active}
          />

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-800">Track</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Auto", "Everyday AI", "Business AI", "Tech & Data AI"] as TrackMode[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={cn(pillBase, trackMode === t && active)}
                  onClick={() => setTrackMode(t)}
                  title={t === "Auto" ? "Auto-pick based on background" : "Lock track selection"}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-slate-600">
              Tip: keep <b>Auto</b> for beginners. Select a track if you already know your direction.
            </div>
          </div>

          <SelectorGroup<TimeCommitment>
            label="Weekly time commitment"
            values={["2–4 hrs/week", "5–8 hrs/week", "9+ hrs/week"]}
            selected={timeCommitment}
            onChange={(v) => setTimeCommitment(v)}
            pillBase={pillBase}
            active={active}
          />

          <SelectorGroup<DeliveryPref>
            label="Preferred mode"
            values={["Hybrid (Auto)", "Online only", "Offline preferred"]}
            selected={deliveryPref}
            onChange={(v) => setDeliveryPref(v)}
            pillBase={pillBase}
            active={active}
          />

          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-slate-800">Budget</div>
                <div className="mt-1 text-xs text-slate-600">Snaps to package tiers • Minimum adjusts by track</div>
              </div>
              <div className="text-sm text-slate-950 font-semibold">₹{budget.toLocaleString("en-IN")}</div>
            </div>

            <input
              type="range"
              min={sliderMin}
              max={35000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(nearestTier(parseInt(e.target.value, 10)).value)}
              className="mt-4 w-full accent-cyan-500"
            />

            <div className="mt-3 grid grid-cols-4 text-xs text-slate-600">
              <div>₹{sliderMin.toLocaleString("en-IN")}</div>
              <div className="text-center">₹15,000</div>
              <div className="text-center">₹25,000</div>
              <div className="text-right">₹35,000</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
            <div className="text-sm font-semibold text-slate-950">What you’ll get at {rec.tier.short}</div>
            <div className="mt-2 text-sm text-slate-800">
              Duration: <b>{rec.tier.duration}</b> • Best for: <b>{rec.tier.bestFor}</b>
            </div>
            <div className="mt-2 text-sm text-slate-700">{rec.why}</div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Recommendation fit score</span>
                <span className="font-semibold text-slate-900">{score}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-3d rounded-3xl p-6">
        <div className="text-sm font-semibold text-slate-950 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600" />
          Recommendation
        </div>

        <div className="mt-5 rounded-2xl bg-white/80 border border-slate-200/80 p-4">
          <div className="text-xs text-slate-700">Best track</div>
          <div className="mt-1 text-lg font-semibold text-slate-950">{rec.track}</div>
        </div>

        <div className="mt-3 rounded-2xl bg-white/80 border border-slate-200/80 p-4">
          <div className="text-xs text-slate-700">Start from</div>
          <div className="mt-1 text-sm font-semibold text-slate-950">{rec.tier.label}</div>
          <div className="mt-1 text-xs text-slate-600">
            {timeCommitment} • {deliveryPref}
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

        <div className="mt-4 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-cyan-50/80 via-violet-50/70 to-emerald-50/80 p-4">
          <div className="flex items-start gap-2">
            <HeartHandshake size={16} className="mt-0.5 text-violet-700" />
            <div>
              <div className="text-sm font-semibold text-slate-950">Need help choosing?</div>
              <p className="mt-1 text-xs text-slate-700">
                Our team is friendly and used to guiding beginners, professionals, and business owners without pressure.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
          >
            <MessageCircle className="mr-2" size={18} />
            WhatsApp my plan + badge
          </a>

          <a
            href="/recommendation"
            className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-white/80 border border-slate-200/80 hover:bg-white transition"
          >
            Get a human recommendation
          </a>

          <a
            href={`tel:${site.phone}`}
            className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-white/80 border border-slate-200/80 hover:bg-white transition"
          >
            <Phone className="mr-2" size={18} />
            Call
          </a>

          <a
            href={`mailto:${(site as any).email || "info.cohortai.labs@itprofessional.pro"}`}
            className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-white/80 border border-slate-200/80 hover:bg-white transition"
          >
            <Mail className="mr-2" size={18} />
            Email
          </a>
        </div>

        <div className="mt-3 text-xs text-slate-600">
          Batches start {site.startDate}. Hybrid (online + offline).
        </div>
      </div>
    </div>
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
