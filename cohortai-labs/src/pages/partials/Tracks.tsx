import React from "react";
import { motion } from "framer-motion";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";

export default function Tracks() {
  const [active, setActive] = React.useState(site.tracks[0].name);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] xl:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4">
        {site.tracks.map((track, idx) => (
          <motion.button
            key={track.name}
            onClick={() => setActive(track.name)}
            className={cn("card card-3d rounded-3xl p-6 text-left", active === track.name && "bg-white border-cyan-300/40 accent-ring")}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
          >
            <div className="text-xs tracking-[0.22em] uppercase text-cyan-700/80">{track.who}</div>
            <div className="mt-3 text-2xl font-semibold text-slate-950">{track.name}</div>
            <div className="mt-3 text-sm text-slate-600">{track.outcome}</div>
          </motion.button>
        ))}
      </div>

      <div className="card rounded-3xl p-6">
        {site.tracks.filter((track) => track.name === active).map((track) => (
          <div key={track.name}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-cyan-700/80">Interactive track canvas</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">{track.name}</div>
              </div>
              <div className="rounded-full chip px-4 py-2 text-sm text-slate-700">Hover + click to compare</div>
            </div>
            <div className="mt-4 text-sm text-slate-600">{track.outcome}</div>
            <div className="mt-5 grid gap-3">
              {track.bullets.map((item, idx) => (
                <button key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:-translate-y-1 hover:border-violet-300/35">
                  <div className="text-xs text-slate-500">Outcome {idx + 1}</div>
                  <div className="mt-1 font-semibold text-slate-950">{item}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
