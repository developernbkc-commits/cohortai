import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";
import { CheckCircle2, Copy, Sparkles, Trophy, Zap, Gift, Rocket } from "lucide-react";

type Q = { q: string; options: { label: string; score: number }[] };

const questions: Q[] = [
  {
    q: "Which best describes you?",
    options: [
      { label: "Beginner / Non-tech", score: 10 },
      { label: "Business / Self-employed", score: 20 },
      { label: "Tech / IT professional", score: 30 },
    ],
  },
  {
    q: "Your primary goal?",
    options: [
      { label: "Career upgrade / job readiness", score: 30 },
      { label: "Business growth", score: 25 },
      { label: "Productivity & confidence", score: 20 },
    ],
  },
  {
    q: "How much time can you commit weekly?",
    options: [
      { label: "2–4 hours", score: 10 },
      { label: "5–7 hours", score: 20 },
      { label: "8+ hours", score: 30 },
    ],
  },
  {
    q: "What do you want at the end?",
    options: [
      { label: "Templates & workflows", score: 15 },
      { label: "Projects I can show", score: 25 },
      { label: "Portfolio + interview prep", score: 30 },
    ],
  },
  {
    q: "Preferred learning style?",
    options: [
      { label: "Step-by-step guidance", score: 15 },
      { label: "Hands-on labs + reviews", score: 25 },
      { label: "Intense cohort sprint", score: 30 },
    ],
  },
];

type BadgeResult = {
  name: "Explorer" | "Builder" | "Pro";
  desc: string;
  suggestedTrack: "Everyday AI" | "Business AI" | "Tech & Data AI";
  milestone: "Starter" | "Workflow Builder" | "Project Finisher" | "AI Practitioner";
};

function badge(score: number): BadgeResult {
  if (score < 70) {
    return {
      name: "Explorer",
      desc: "Start with AI fundamentals and build confidence.",
      suggestedTrack: "Everyday AI",
      milestone: "Starter",
    };
  }
  if (score < 110) {
    return {
      name: "Builder",
      desc: "You’re ready for hands-on deliverables and reviews.",
      suggestedTrack: "Business AI",
      milestone: "Workflow Builder",
    };
  }
  return {
    name: "Pro",
    desc: "Aim for portfolio projects, interviews, and a capstone.",
    suggestedTrack: "Tech & Data AI",
    milestone: "Project Finisher",
  };
}

function levelProgress(score: number) {
  const clamped = Math.max(50, Math.min(150, score));
  const pct = Math.round(((clamped - 50) / 100) * 100);
  return Math.max(0, Math.min(100, pct));
}

function challengeForTrack(track: BadgeResult["suggestedTrack"]) {
  if (track === "Everyday AI") {
    return [
      "Try 10 practical prompts for daily productivity",
      "Improve one email/resume/profile using AI",
      "Create one reusable personal workflow template",
    ] as const;
  }
  if (track === "Business AI") {
    return [
      "Draft a 7-day content calendar with AI",
      "Create a lead follow-up message sequence",
      "Build one no-code automation idea outline",
    ] as const;
  }
  return [
    "Build one mini dev/data use-case",
    "Document your approach and assumptions",
    "Get mentor review on your solution path",
  ] as const;
}

export default function Quiz() {
  const location = useLocation();
  const [answers, setAnswers] = React.useState<number[]>(Array(questions.length).fill(-1));
  const [copied, setCopied] = React.useState(false);

  const answeredCount = answers.filter((a) => a >= 0).length;
  const done = answeredCount === questions.length;
  const total = done ? answers.reduce((a, b) => a + b, 0) : 0;
  const b = badge(total);
  const progress = Math.round((answeredCount / questions.length) * 100);
  const lp = done ? levelProgress(total) : 0;

  function pick(i: number, s: number) {
    setAnswers((prev) => prev.map((v, idx) => (idx === i ? s : v)));
  }

  const shareText = done
    ? `Hi CohortAI Labs! My AI Skill Score is ${total}. Badge: ${b.name}. Milestone: ${b.milestone}. Suggested track: ${b.suggestedTrack}. Please recommend the best batch schedule.`
    : "";

  async function copyResult() {
    if (!done || !shareText) return;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  const waHref =
    done && shareText
      ? `https://wa.me/91${site.whatsapp}?text=${encodeURIComponent(shareText)}`
      : `https://wa.me/91${site.whatsapp}?text=${encodeURIComponent("Hi CohortAI Labs! I want help choosing the right AI track.")}`;

  const miniChallenges = done ? challengeForTrack(b.suggestedTrack) : ([] as readonly string[]);

  return (
    <div>
      <Helmet>
        <title>AI Track Assessment | CohortAI Labs</title>
        <meta
          name="description"
          content="Take a quick 2-minute assessment to find your best AI track. Get a score, badge, and next-step recommendation."
        />
        <link rel="canonical" href={canonical(location.pathname)} />
        <meta property="og:title" content="AI Track Assessment | CohortAI Labs" />
        <meta
          property="og:description"
          content="Take a quick 2-minute assessment to find your best AI track. Get a score, badge, and next-step recommendation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical(location.pathname)} />
        <meta property="og:image" content={seoDefaults.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="2-minute assessment"
            title="Find your best AI starting point"
            desc="Answer a few questions to unlock your AI Skill Score, badge, and suggested track. Friendly, practical, and beginner-safe."
          />
          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-950">Assessment progress</div>
              <div className="text-xs text-slate-700">
                {answeredCount}/{questions.length} answered • {progress}%
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card card-3d rounded-3xl p-6">
              <div className="text-sm font-semibold text-slate-950">Questions</div>
              <div className="mt-5 grid gap-6">
                {questions.map((q, idx) => {
                  const isAnswered = answers[idx] >= 0;
                  return (
                    <div key={q.q} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-950">
                          {idx + 1}. {q.q}
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border ${
                            isAnswered
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                          }`}
                        >
                          {isAnswered ? "Done" : "Pending"}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2">
                        {q.options.map((o) => (
                          <button
                            key={o.label}
                            type="button"
                            onClick={() => pick(idx, o.score)}
                            className={`text-left rounded-2xl px-4 py-3 border transition ${
                              answers[idx] === o.score
                                ? "border-cyan-300 bg-gradient-to-r from-cyan-50 via-violet-50/70 to-emerald-50 text-slate-950"
                                : "border-slate-200/80 bg-white/80 hover:bg-white"
                            }`}
                          >
                            <div className="text-sm font-semibold text-slate-950">{o.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card card-3d rounded-3xl p-6">
              <div className="text-sm font-semibold text-slate-950">Your result</div>

              {!done ? (
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-slate-800">
                    Answer all questions to unlock your AI Skill Score, badge, and suggested track.
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5">
                    <div className="flex items-start gap-3">
                      <Sparkles size={18} className="mt-0.5 text-violet-700" />
                      <div>
                        <div className="text-sm font-semibold text-slate-950">What you’ll unlock</div>
                        <ul className="mt-2 grid gap-1.5 text-xs text-slate-700">
                          <li>• AI Skill Score + badge</li>
                          <li>• Suggested track (Everyday / Business / Tech & Data AI)</li>
                          <li>• Mini challenge steps to get started quickly</li>
                          <li>• WhatsApp-ready result summary</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="rounded-3xl bg-gradient-to-r from-cyan-300/20 via-violet-300/15 to-emerald-300/18 border border-slate-200/80 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="text-xs tracking-[0.22em] uppercase text-slate-700">AI Skill Score</div>
                        <div className="mt-2 text-4xl font-semibold text-slate-950">{total}</div>
                        <div className="mt-3 text-sm text-slate-800">
                          Badge: <span className="font-semibold text-slate-950">{b.name}</span> — {b.desc}
                        </div>
                      </div>
                      <div className="min-w-[150px] rounded-2xl border border-slate-200/80 bg-white/70 p-4">
                        <div className="text-xs text-slate-700">Milestone</div>
                        <div className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                          <Trophy size={16} className="text-violet-700" />
                          {b.milestone}
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400"
                            style={{ width: `${lp}%` }}
                          />
                        </div>
                        <div className="mt-2 text-[11px] text-slate-600">Progress score band: {lp}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                      <div className="text-xs text-slate-700">Suggested track</div>
                      <div className="mt-1 text-sm font-semibold text-slate-950">{b.suggestedTrack}</div>
                      <p className="mt-2 text-xs text-slate-700">
                        We can adapt this recommendation based on your budget, schedule, and preferred learning mode.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <Gift size={14} className="text-emerald-700" />
                        Starter reward path
                      </div>
                      <p className="mt-2 text-xs text-slate-700">
                        Share your score on WhatsApp to receive a recommended track + batch schedule + next-step guidance.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <Zap size={16} className="text-cyan-700" />
                      Mini challenge to start this week
                    </div>
                    <div className="mt-3 grid gap-2">
                      {miniChallenges.map((task, idx) => (
                        <div key={task} className="flex items-start gap-2 rounded-xl border border-slate-200/70 bg-slate-50/80 px-3 py-2">
                          <CheckCircle2 size={14} className="mt-0.5 text-emerald-700" />
                          <div className="text-xs text-slate-800">
                            <span className="font-semibold">Task {idx + 1}:</span> {task}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                    <div className="text-xs tracking-[0.22em] uppercase text-slate-700">Share-ready summary</div>
                    <p className="mt-2 text-xs text-slate-700 leading-relaxed">{shareText}</p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={copyResult}
                        className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-950 bg-white border border-slate-200/80 hover:bg-slate-50 transition"
                      >
                        <Copy size={16} className="mr-2" />
                        {copied ? "Copied" : "Copy result"}
                      </button>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
                      >
                        WhatsApp my result
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button href="/recommendation">
                      <Rocket className="mr-2" size={18} />
                      Get a human recommendation
                    </Button>
                    <Button href="/courses" variant="secondary">
                      Explore courses
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 text-xs text-slate-700">
                Tip: This is a friendly assessment. Your result doesn’t limit you—it&#39;s only a recommendation to help you start faster.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
