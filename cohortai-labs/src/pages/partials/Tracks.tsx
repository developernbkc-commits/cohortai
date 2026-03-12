import { motion } from "framer-motion";
import { site } from "../../lib/site";

export default function Tracks() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {site.tracks.map((track, idx) => (
        <motion.div
          key={track.name}
          className="card card-3d rounded-3xl p-6"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.06 }}
        >
          <div className="text-xs tracking-[0.22em] uppercase text-cyan-300/80">{track.who}</div>
          <div className="mt-3 text-2xl font-semibold text-white">{track.name}</div>
          <div className="mt-3 text-sm text-slate-400">{track.outcome}</div>
          <div className="mt-5 grid gap-2 text-sm text-slate-200">
            {track.bullets.map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 border border-slate-700/70">• {item}</div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
