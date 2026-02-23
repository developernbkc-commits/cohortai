import { motion } from "framer-motion";
import { site } from "../../lib/site";
import { imgUrl } from "../../lib/images";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Tracks() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {site.tracks.map((t, idx) => (
        <motion.div
          key={t.name}
          className="card card-3d rounded-3xl p-6 hover:accent-ring transition"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
        >
          <div className="text-sm font-semibold text-slate-950 flex items-center justify-between">
            <span>{t.name}</span>
            <ArrowUpRight size={18} className="text-slate-800" />
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80 shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
            <img
              src={imgUrl(
                t.name === "Everyday AI"
                  ? site.images.tracks.everyday
                  : t.name === "Business AI"
                  ? site.images.tracks.business
                  : site.images.tracks.tech
              )}
              alt={t.name}
              className="h-36 w-full object-cover"
            />
          </div>
          <div className="mt-4 text-xs text-slate-800">{t.who}</div>
          <div className="mt-4 text-sm text-slate-800">{t.outcome}</div>
          <ul className="mt-5 grid gap-2 text-sm text-slate-800">
            {t.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          <Link to="/recommendation" className="mt-6 inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:border-cyan-200 hover:bg-white transition">
            Get a recommendation
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
