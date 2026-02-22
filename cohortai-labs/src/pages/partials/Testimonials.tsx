import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const items = [
  { name: "Working professional", quote: "The cohort structure kept me consistent. Weekly reviews made a huge difference—no more random learning." },
  { name: "Small business owner", quote: "I finally built a content + follow-up system that saves time every day. Clear steps, real outputs." },
  { name: "Fresher / student", quote: "I liked the mentor feedback on submissions. I now have projects I can confidently show in interviews." },
];

export default function Testimonials() {
  const [i, setI] = React.useState(0);
  const cur = items[i];

  return (
    <div className="card card-3d rounded-3xl p-8 ">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-950">Learner stories</div>
          <div className="text-xs text-slate-800 mt-1">What people say about CohortAI Labs</div>
        </div>
        <Quote className="text-cyan-200" size={20} />
      </div>

      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="mt-6">
        <div className="text-lg text-slate-950 leading-relaxed">“{cur.quote}”</div>
        <div className="mt-4 text-sm text-slate-800">— {cur.name}</div>
      </motion.div>

      <div className="mt-6 flex items-center gap-2">
        <button className="rounded-xl p-2 bg-white/70 border border-slate-200/80 hover:bg-slate-800/70" onClick={() => setI((v) => (v - 1 + items.length) % items.length)} aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <button className="rounded-xl p-2 bg-white/70 border border-slate-200/80 hover:bg-slate-800/70" onClick={() => setI((v) => (v + 1) % items.length)} aria-label="Next">
          <ChevronRight size={18} />
        </button>
        <div className="ml-auto text-xs text-slate-500">{i + 1} / {items.length}</div>
      </div>
    </div>
  );
}
