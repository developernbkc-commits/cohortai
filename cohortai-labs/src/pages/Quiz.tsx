import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";

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

function badge(score: number) {
  if (score < 70) return { name: "Explorer", desc: "Start with AI fundamentals and build confidence." };
  if (score < 110) return { name: "Builder", desc: "You’re ready for hands-on deliverables and reviews." };
  return { name: "Pro", desc: "Aim for portfolio projects, interviews, and a capstone." };
}

export default function Quiz() {
  const [answers, setAnswers] = React.useState<number[]>(Array(questions.length).fill(-1));
  const done = answers.every((a) => a >= 0);
  const total = done ? answers.reduce((a, b) => a + b, 0) : 0;
  const b = badge(total);

  function pick(i: number, s: number) {
    setAnswers((prev) => prev.map((v, idx) => (idx === i ? s : v)));
  }

  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="2-minute assessment"
            title="Find your best AI starting point"
            desc="Answer a few questions. Get a score + a badge. Share it on WhatsApp to get your recommended track and batch schedule."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card card-3d rounded-3xl p-6">
              <div className="text-sm font-semibold text-slate-950">Questions</div>
              <div className="mt-5 grid gap-6">
                {questions.map((q, idx) => (
                  <div key={q.q}>
                    <div className="text-sm font-semibold text-slate-950">
                      {idx + 1}. {q.q}
                    </div>
                    <div className="mt-3 grid gap-2">
                      {q.options.map((o) => (
                        <button
                          key={o.label}
                          onClick={() => pick(idx, o.score)}
                          className={`text-left rounded-2xl px-4 py-3 border transition ${
                            answers[idx] === o.score
                              ? "border-cyan-300 bg-cyan-50"
                              : "border-slate-200/80 bg-white/80 hover:bg-white"
                          }`}
                        >
                          <div className="text-sm font-semibold text-slate-950">{o.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-3d rounded-3xl p-6">
              <div className="text-sm font-semibold text-slate-950">Your result</div>

              {!done ? (
                <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-slate-800">
                  Answer all questions to unlock your AI Skill Score and badge.
                </div>
              ) : (
                <div className="mt-5">
                  <div className="rounded-3xl bg-gradient-to-r from-cyan-300/20 via-violet-300/15 to-emerald-300/18 border border-slate-200/80 p-6">
                    <div className="text-xs tracking-[0.22em] uppercase text-slate-700">AI Skill Score</div>
                    <div className="mt-2 text-4xl font-semibold text-slate-950">{total}</div>
                    <div className="mt-4 text-sm text-slate-800">
                      Badge: <span className="font-semibold text-slate-950">{b.name}</span> — {b.desc}
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-slate-800">
                    Next step: WhatsApp “AI” and share your badge to get a recommended track + batch schedule.
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button href="/contact">Get batch schedule</Button>
                    <Button
                      href={`https://wa.me/91${site.whatsapp}?text=${encodeURIComponent(
                        `Hi CohortAI Labs! My AI Skill Score is ${total} and my badge is ${b.name}. Please recommend the best track and batch schedule.`
                      )}`}
                      variant="secondary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp my result
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 text-xs text-slate-700">
                Tip: This is a friendly assessment. Your result doesn’t limit you—it's only a recommendation.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
