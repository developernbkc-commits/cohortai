
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const items = [
  {
    name: "Anand Balan",
    role: "Technical Lead at KhetiBuddy AgriTech, Pune",
    course: "Generative AI",
    duration: "30 Days",
    date: "16 March 2026",
    image: "https://github.com/developernbkc-commits/cohortai_labs_images/blob/main/AnandN.png?raw=true",
    quote:
      "Material is so good that it doesn't feel exhaustive or even like putting efforts. I enjoyed it as if I'm watching a Discovery documentary :). I'm handling things very professionally now and I noticed the change in me from the first few days of starting the course.",
  },
  {
    name: "Ajay Cherukuri",
    role: "Software Engineer at Indo Mim Limited",
    course: "Generative AI",
    duration: "30 Days",
    date: "21 January 2026",
    image: "https://github.com/developernbkc-commits/cohortai_labs_images/blob/main/ajay_cherukuri.png?raw=true",
    quote:
      "Thank you for the online training provided by Cohort AI Labs. I'm now a different person at work. My productivity skyrocketed and things are much easier now.",
  },
  {
    name: "P. Shankar Raghavendra",
    role: "Aspiring ML Engineer",
    course: "Machine Learning Advanced Concepts",
    duration: "90 Days",
    date: "02 March 2026",
    image: "https://github.com/developernbkc-commits/cohortai_labs_images/blob/main/shankar_raghavendra.png?raw=true",
    quote:
      "Thank you all for tailoring the program specially for me. I'm attending interviews with great confidence now and my SaaS project gained momentum during this course.",
  },
  {
    name: "Sai Vineeth Modugavarapu",
    role: "Aspiring Data Scientist",
    course: "Data Augmentation Techniques using AI",
    duration: "45 Days",
    date: "12 March 2026",
    image: "https://github.com/developernbkc-commits/cohortai_labs_images/blob/main/sai_vineeth.png?raw=true",
    quote:
      "So much information to grasp during the course, but awesome illustrations and practicals made it very easy to understand. Thank you Sasikala Madam.",
  },
];

export default function Testimonials() {
  const [i, setI] = React.useState(0);
  const cur = items[i];

  return (
    <section className="py-14">
      <div className="glass rounded-[32px] p-6 sm:p-8 ring-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Success stories from our learners</div>
            <div className="mt-1 text-sm text-slate-300">
              Professionals first, followed by ambitious learners building real confidence and practical outcomes.
            </div>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-cyan-200">
            <Star size={14} className="fill-current" />
            Verified learner feedback
          </div>
        </div>

        <motion.div
          key={cur.name}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]"
        >
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/30 shadow-[0_18px_40px_rgba(2,6,23,0.28)]">
            <img src={cur.image} alt={cur.name} className="h-[280px] w-full object-cover object-top" loading="lazy" />
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-semibold text-white">{cur.name}</div>
                <div className="mt-1 text-sm text-slate-300">{cur.role}</div>
              </div>
              <Quote className="text-cyan-200" size={20} />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Stat label="Program / Course" value={cur.course} />
              <Stat label="Duration" value={cur.duration} />
              <Stat label="Certificate on" value={cur.date} />
            </div>

            <div className="mt-5 text-lg leading-relaxed text-white/95">“{cur.quote}”</div>
          </div>
        </motion.div>

        <div className="mt-6 flex items-center gap-2">
          <button
            className="rounded-xl border border-white/10 bg-slate-900/70 p-2 text-white hover:bg-slate-800/70"
            onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="rounded-xl border border-white/10 bg-slate-900/70 p-2 text-white hover:bg-slate-800/70"
            onClick={() => setI((v) => (v + 1) % items.length)}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
          <div className="ml-auto flex gap-2">
            {items.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setI(idx)}
                className={`h-2.5 w-8 rounded-full transition ${idx === i ? "bg-cyan-300" : "bg-white/15 hover:bg-white/25"}`}
                aria-label={`Go to ${item.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
