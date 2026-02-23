import React from "react";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";
import { CheckCircle2, Sparkles, MessageCircle, Mail, Phone } from "lucide-react";

type Persona = "Beginner / Non-tech" | "Business / Self-employed" | "Tech / IT";
type Goal = "Career upgrade" | "Business growth" | "Productivity";
type TrackName = "Everyday AI" | "Business AI" | "Tech & Data AI";
type TrackMode = "Auto" | TrackName;

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

  // Make sure start tier aligns with budget
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

export default function TrackFinder() {
  const [persona, setPersona] = React.useState<Persona>("Beginner / Non-tech");
  const [goal, setGoal] = React.useState<Goal>("Career upgrade");
  const [trackMode, setTrackMode] = React.useState<TrackMode>("Auto");

  // Budget is tiered. Default: 15k
  const [budget, setBudget] = React.useState(15000);

  // Auto-track follows persona unless user explicitly chooses a track
  React.useEffect(() => {
    if (trackMode !== "Auto") return;
    const next = personaToTrack(persona);
    const min = minBudgetForTrack(next);
    if (budget < min) setBudget(min);
    // keep tier rounding
    setBudget((b) => nearestTier(b).value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona, trackMode]);

  // If user selects a track explicitly, enforce min budget for that track and snap to tier
  React.useEffect(() => {
    if (trackMode === "Auto") return;
    const min = minBudgetForTrack(trackMode);
    setBudget((b) => nearestTier(Math.max(b, min)).value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackMode]);

  const rec = recommendation(persona, goal, budget, trackMode);

  const pillBase =
    "rounded-full px-4 py-2 text-sm border border-slate-300/80 bg-white/70 hover:bg-white transition shadow-[0_14px_40px_rgba(15,23,42,0.06)]";

  const active =
    "border-transparent text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200";

  const sliderMin = trackMode === "Auto" ? minBudgetForTrack(personaToTrack(persona)) : minBudgetForTrack(trackMode);

  const waHref = (() => {
    const msg = encodeURIComponent(
      `Hi CohortAI Labs! My recommendation:
Track: ${rec.track}
Goal: ${goal}
Budget: ₹${budget.toLocaleString(
        "en-IN"
      )} (${rec.tier.short})
Background: ${persona}
Please share timings + seat availability and next steps.`
    );
    return `https://wa.me/91${site.whatsapp}?text=${msg}`;
  })();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card card-3d rounded-3xl p-6  lg:col-span-2">
        <div className="text-sm font-semibold text-slate-950 flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-700" />
          Track Finder
        </div>
        <div className="mt-2 text-sm text-slate-800">
          Pick your background, goal, and budget. You can also select a track to see a tailored starting point.
        </div>

        <div className="mt-6 grid gap-6">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-800">Background</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Beginner / Non-tech", "Business / Self-employed", "Tech / IT"] as Persona[]).map((p) => (
                <button
                  key={p}
                  className={cn(pillBase, persona === p && active)}
                  onClick={() => {
                    setPersona(p);
                    if (trackMode === "Auto") {
                      // keep budget aligned via effect
                    }
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-800">Goal</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Career upgrade", "Business growth", "Productivity"] as Goal[]).map((g) => (
                <button key={g} className={cn(pillBase, goal === g && active)} onClick={() => setGoal(g)}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-800">Track</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Auto", "Everyday AI", "Business AI", "Tech & Data AI"] as TrackMode[]).map((t) => (
                <button
                  key={t}
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
          </div>
        </div>
      </div>

      <div className="card card-3d rounded-3xl p-6 ">
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
        </div>

        <div className="mt-3 text-sm text-slate-800">{rec.note}</div>

        <div className="mt-6 grid gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
          >
            <MessageCircle className="mr-2" size={18} />
            WhatsApp my plan
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
