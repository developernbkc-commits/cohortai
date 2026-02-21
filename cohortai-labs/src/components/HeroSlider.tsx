import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";
import Button from "./Button";

export default function HeroSlider() {
  const slides = site.heroSlides || [];
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return null;

  const cur = slides[i];

  return (
    <div className="card card-3d rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_26px_80px_rgba(15,23,42,0.14)]">
      <div className="relative">
        <div className="aspect-[16/10] w-full bg-white">
          <AnimatePresence mode="wait">
            <motion.img
              key={cur.file}
              src={imgUrl(cur.file)}
              alt={cur.headline}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white/92 via-white/22 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="card rounded-2xl px-4 py-4">
            <div className="text-sm text-slate-700">CohortAI Labs</div>
            <div className="mt-1 text-xl sm:text-2xl font-semibold text-slate-950">{cur.headline}</div>
            <div className="mt-2 text-sm text-slate-700">{cur.sub}</div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button href={site.ctas?.primaryHref || "/contact"}>{site.ctas?.primaryLabel || "Get batch schedule"}</Button>
              <Button href={site.ctas?.demoHref || "/contact"} variant="secondary">{site.ctas?.demoLabel || "Book a free demo"}</Button>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2.5 w-2.5 rounded-full border ${idx === i ? "bg-slate-950 border-slate-950" : "bg-white/80 border-slate-300"}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
