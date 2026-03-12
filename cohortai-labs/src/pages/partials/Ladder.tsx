import React from "react";
import { motion } from "framer-motion";
import { site } from "../../lib/site";

export default function Ladder() {
  const [active, setActive] = React.useState(site.ladder[1]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="grid gap-4 lg:grid-cols-2">
        {site.ladder.map((s, idx) => (
          <motion.button
            key={s.title}
            onClick={() => setActive(s)}
            className={`card card-3d rounded-3xl p-6 text-left ${active.title === s.title ? "border-cyan-300/40 accent-ring bg-white" : ""}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-cyan-700/80">{s.duration}</div>
                <div className="mt-2 text-xl font-semibold text-slate-950">{s.title}</div>
                <div className="mt-2 text-sm text-slate-600">{s.highlight}</div>
              </div>
              <div className="shrink-0 rounded-2xl px-4 py-3 bg-slate-950 text-white">
                <div className="text-sm font-semibold">{s.price}</div>
                <div className="text-xs text-slate-300 mt-1">Start here</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="card rounded-3xl p-6 sticky top-24 h-fit">
        <div className="text-xs tracking-[0.22em] uppercase text-cyan-700/80">Selected plan preview</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{active.title}</div>
        <div className="mt-2 text-slate-600">{active.highlight}</div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-4 text-white">
          <div>
            <div className="text-xs text-slate-300">Investment</div>
            <div className="mt-1 text-xl font-semibold">{active.price}</div>
          </div>
          <div>
            <div className="text-xs text-slate-300">Duration</div>
            <div className="mt-1 text-base font-semibold">{active.duration}</div>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {active.includes.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">• {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
