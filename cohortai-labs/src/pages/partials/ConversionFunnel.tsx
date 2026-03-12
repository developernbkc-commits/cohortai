import { ArrowRight, ClipboardList, MessageCircle, Rocket, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "Step 1",
    title: "Find your best starting track",
    desc: "Use the smart Track Finder to get a practical recommendation based on background, goal, and budget.",
    icon: Sparkles,
    href: "/assessment",
    cta: "Use Track Finder",
  },
  {
    step: "Step 2",
    title: "Friendly counselling call",
    desc: "Our team explains batches, timings, outcomes, and helps learners choose the right path without pressure.",
    icon: MessageCircle,
    href: "/recommendation",
    cta: "Talk to counsellor",
  },
  {
    step: "Step 3",
    title: "Choose schedule + format",
    desc: "Pick weekday/weekend and online/offline preference. We confirm availability and next cohort options.",
    icon: ClipboardList,
    href: "/locations",
    cta: "See locations",
  },
  {
    step: "Step 4",
    title: "Start cohort and build outcomes",
    desc: "Begin mentor-led sessions, submit assignments, get feedback, and leave with real deliverables.",
    icon: Trophy,
    href: "/courses",
    cta: "Explore courses",
  },
] as const;

export default function ConversionFunnel() {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[11px] tracking-[0.32em] text-slate-600 uppercase">Enrollment funnel</div>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-slate-950">
            A structured path from interest to enrollment
          </h3>
          <p className="mt-2 text-slate-600 max-w-3xl leading-7">
            This improves conversions and trust because users know exactly what happens next: recommendation → counselling → schedule → cohort.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 bg-slate-900"
        >
          <Rocket className="h-4 w-4 mr-2" />
          Request guidance
        </a>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: idx * 0.05 }}
              className="h-full"
            >
              <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] tracking-[0.22em] text-slate-700 uppercase">
                    {step.step}
                  </span>
                  <div className="rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-violet-50 p-2 text-cyan-700">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <h4 className="mt-4 text-lg font-semibold text-slate-900 leading-tight">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                <a
                  href={step.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900 hover:text-cyan-700 transition"
                >
                  {step.cta}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50/70 via-violet-50/50 to-emerald-50/70 p-4 sm:p-5">
        <p className="text-xs tracking-[0.28em] text-slate-600 uppercase">Operations note</p>
        <p className="mt-2 text-sm sm:text-base leading-7 text-slate-700">
          Your counselling / sales team can mirror this exact flow in WhatsApp and calls for a consistent, professional lead experience.
        </p>
      </div>
    </div>
  );
}
