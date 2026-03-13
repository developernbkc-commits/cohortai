import React from 'react';
import { Sparkles, Wand2, BadgeCheck, ArrowRight } from 'lucide-react';
import Button from './Button';

type Snapshot = {
  title: string;
  horizon: string;
  program: string;
  wow: string;
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
      wow: 'You could walk away with a live content + lead follow-up workflow for your business.',
    };
  }
  if (role === 'Developer / Analyst' || goal === 'Portfolio projects') {
    return {
      title: 'AI Project Builder',
      horizon: time === 'Weekend only' ? '8-week project lane' : '5-week build lane',
      program: budget === 'Under ₹10k' ? 'AI Productivity Pro + Project Starter' : 'Tech & Data AI Portfolio Cohort',
      wow: 'You could showcase a portfolio-grade AI workflow or dashboard within your first cohort window.',
    };
  }
  if (goal === 'Career switch') {
    return {
      title: 'AI Career Transition',
      horizon: budget === 'Under ₹10k' ? '2-week confidence starter' : '6-week guided ladder',
      program: budget === 'Under ₹10k' ? 'AI Productivity Pro' : 'Everyday AI + Career Kit',
      wow: 'You could gain a clear AI career story, practical outputs, and a mentor-reviewed next-step plan.',
    };
  }
  return {
    title: 'AI Productivity Accelerator',
    horizon: time === '2–4 hrs/week' ? '14-day quick-win plan' : '30-day momentum plan',
    program: 'AI Productivity Pro',
    wow: 'You could automate repetitive work, write faster, and leave with reusable AI templates.',
  };
}

export default function AICareerSnapshot() {
  const [role, setRole] = React.useState(roleOptions[1]);
  const [goal, setGoal] = React.useState(goalOptions[0]);
  const [budget, setBudget] = React.useState(budgetOptions[1]);
  const [time, setTime] = React.useState(timeOptions[1]);
  const snapshot = deriveSnapshot(role, goal, budget, time);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="glass-pearl interactive-card rounded-[32px] p-6 ring-soft">
        <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-900">
          <Sparkles className="mr-2 h-4 w-4" /> AI surprise demo
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Instant AI Career Snapshot</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">This is the landing-page wow block: a guided micro-experience that shows how AI can personalize a learning path in seconds—without sending users into a dead end.</p>
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

      <div className="glass rounded-[36px] p-6 ring-soft">
        <div className="flex items-center gap-2 text-sm tracking-[0.24em] uppercase text-cyan-300">
          <Wand2 className="h-4 w-4" /> Snapshot generated
        </div>
        <div className="mt-5 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.22)]">
          <div className="text-sm text-slate-400">Suggested direction</div>
          <div className="mt-2 text-4xl font-semibold text-white leading-tight">{snapshot.title}</div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Metric label="Timeline" value={snapshot.horizon} />
            <Metric label="Recommended path" value={snapshot.program} />
            <Metric label="Confidence" value="High-fit" />
          </div>
          <div className="mt-5 rounded-[24px] bg-slate-950/50 p-5 text-sm leading-7 text-slate-200">
            {snapshot.wow}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">Personalized path</span>
            <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold text-violet-200">Immediate next step</span>
            <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">AI-powered feel</span>
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
