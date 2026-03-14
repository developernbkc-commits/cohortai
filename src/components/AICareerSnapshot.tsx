import React from 'react';
import { Sparkles, Wand2, BadgeCheck, ArrowRight, Orbit, BrainCircuit, Stars } from 'lucide-react';
import Button from './Button';

type Snapshot = {
  title: string;
  horizon: string;
  program: string;
  wow: string;
  locationMode: string;
};

const roleOptions = ['Student / Beginner', 'Working Professional', 'Founder / Business Owner', 'Developer / Analyst'];
const goalOptions = ['Career switch', 'Productivity boost', 'Business growth', 'Portfolio projects'];
const budgetOptions = ['Under ₹10k', '₹10k–₹20k', '₹20k–₹35k', 'Need custom plan'];
const timeOptions = ['2–4 hrs/week', '5–8 hrs/week', 'Weekend only', 'Fast-track'];

function deriveSnapshot(role: string, goal: string, budget: string, time: string): Snapshot {
  if (goal === 'Business growth') {
    return {
      title: 'AI Business Operator',
      horizon: time === 'Fast-track' ? '21-day sprint' : '45-day implementation path',
      program: budget === 'Need custom plan' ? 'Business AI Custom Bundle' : 'Business AI Growth Cohort',
      wow: 'Launch a content + lead follow-up workflow that saves time and gives your business visible AI leverage from week one.',
      locationMode: 'Online-first with optional counselling support',
    };
  }
  if (role === 'Developer / Analyst' || goal === 'Portfolio projects') {
    return {
      title: 'AI Project Builder',
      horizon: time === 'Weekend only' ? '8-week project lane' : '5-week build lane',
      program: budget === 'Under ₹10k' ? 'AI Productivity Pro + Project Starter' : 'Tech & Data AI Portfolio Cohort',
      wow: 'Build a portfolio-grade AI workflow, project case study, or dashboard you can actually showcase in interviews or client meetings.',
      locationMode: 'Hybrid where city batches are available',
    };
  }
  if (goal === 'Career switch') {
    return {
      title: 'AI Career Transition',
      horizon: budget === 'Under ₹10k' ? '2-week confidence starter' : '6-week guided ladder',
      program: budget === 'Under ₹10k' ? 'AI Productivity Pro' : 'Everyday AI + Career Kit',
      wow: 'Get a realistic AI path, mentor-led proof of work, and a clearer story for your next role instead of random course hopping.',
      locationMode: 'Best started online, then upgraded to hybrid if needed',
    };
  }
  return {
    title: 'AI Productivity Accelerator',
    horizon: time === '2–4 hrs/week' ? '14-day quick-win plan' : '30-day momentum plan',
    program: 'AI Productivity Pro',
    wow: 'Automate repetitive work, learn better prompting, and leave with reusable templates that improve your output immediately.',
    locationMode: 'Online or city-specific weekend batch',
  };
}

export default function AICareerSnapshot() {
  const [role, setRole] = React.useState(roleOptions[1]);
  const [goal, setGoal] = React.useState(goalOptions[0]);
  const [budget, setBudget] = React.useState(budgetOptions[1]);
  const [time, setTime] = React.useState(timeOptions[1]);
  const snapshot = deriveSnapshot(role, goal, budget, time);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="glass-pearl interactive-card rounded-[32px] p-6 ring-soft">
        <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-900">
          <Sparkles className="mr-2 h-4 w-4" /> AI surprise demo
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Instant AI Career Snapshot</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">A fast, visually rich AI-style experience that helps a first-time visitor feel understood before they even explore the full catalogue.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[['Current role', role, setRole, roleOptions], ['Primary goal', goal, setGoal, goalOptions], ['Budget', budget, setBudget, budgetOptions], ['Time commitment', time, setTime, timeOptions]].map(([label, value, setter, options]) => (
            <label key={label as string} className="block">
              <div className="text-xs text-slate-500">{label as string}</div>
              <select value={value as string} onChange={(e) => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100">
                {(options as string[]).map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
        </div>
      </div>

      <div className="glass relative overflow-hidden rounded-[36px] p-6 ring-soft">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(34,211,238,0.25),transparent_18%),radial-gradient(circle_at_78%_26%,rgba(167,139,250,0.28),transparent_22%),radial-gradient(circle_at_48%_80%,rgba(16,185,129,0.18),transparent_24%)]" />
        <div className="pointer-events-none absolute right-6 top-8 hidden h-40 w-40 rounded-full border border-white/10 bg-white/5 blur-[2px] sm:block" />
        <div className="pointer-events-none absolute right-14 top-16 hidden h-24 w-24 animate-pulse rounded-full border border-cyan-300/40 bg-cyan-300/10 sm:block" />
        <div className="relative flex items-center gap-2 text-sm tracking-[0.24em] uppercase text-cyan-200">
          <Wand2 className="h-4 w-4" /> Snapshot generated
        </div>
        <div className="relative mt-5 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.22)] backdrop-blur-lg">
            <div className="text-sm text-slate-300">Suggested direction</div>
            <div className="mt-2 text-4xl font-semibold text-white leading-tight">{snapshot.title}</div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Metric label="Timeline" value={snapshot.horizon} />
              <Metric label="Recommended path" value={snapshot.program} />
              <Metric label="Format" value={snapshot.locationMode} />
            </div>
            <div className="mt-5 rounded-[24px] bg-slate-950/50 p-5 text-sm leading-7 text-slate-200">
              {snapshot.wow}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">Personalized path</span>
              <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold text-violet-200">Immediate next step</span>
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">AI-powered feel</span>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-950/55 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.28)]">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Live signal</div>
              <Stars className="h-4 w-4 text-violet-300" />
            </div>
            <div className="mt-4 space-y-4">
              <SignalCard icon={BrainCircuit} label="AI fit score" value="86%" tone="from-cyan-300 to-cyan-500" />
              <SignalCard icon={Orbit} label="Momentum path" value="Fast, practical, mentor-led" tone="from-violet-300 to-fuchsia-500" />
              <SignalCard icon={BadgeCheck} label="Likely first win" value="A real output in 7–14 days" tone="from-emerald-300 to-emerald-500" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/recommendation">Get my full recommendation <ArrowRight className="ml-2" size={18} /></Button>
              <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                <BadgeCheck className="mr-2 h-4 w-4" /> Great for first-time visitors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/6 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white leading-snug">{value}</div>
    </div>
  );
}

function SignalCard({ icon: Icon, label, value, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
      <div className="flex items-center gap-3">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-slate-950`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
          <div className="mt-1 text-sm font-semibold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}
