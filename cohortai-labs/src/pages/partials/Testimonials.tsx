import { useEffect, useMemo, useState } from "react";
import { MessageSquareQuote, Star } from "lucide-react";
import { motion } from "framer-motion";

import { fetchTestimonialsPayload, fallbackTestimonials, type TestimonialItem } from "../../lib/testimonialsData";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-current text-amber-500" : "text-slate-300"}`} />
      ))}
    </div>
  );
}

function trackPillClass(track: TestimonialItem["track"]) {
  switch (track) {
    case "Everyday AI":
      return "border-cyan-200 bg-cyan-50 text-cyan-800";
    case "Business AI":
      return "border-violet-200 bg-violet-50 text-violet-800";
    case "Tech & Data AI":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "Enterprise":
      return "border-slate-300 bg-slate-100 text-slate-800";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

export default function Testimonials() {
  const [items, setItems] = useState<TestimonialItem[]>(fallbackTestimonials.items);

  useEffect(() => {
    let mounted = true;
    fetchTestimonialsPayload().then((payload) => {
      if (mounted) setItems(payload.items);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const ordered = useMemo(
    () => [...items].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    [items],
  );

  const stats = useMemo(() => {
    const total = items.length;
    const avg = total ? (items.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1) : "5.0";
    const trackCount = new Set(items.map((item) => item.track)).size;
    return { total, avg, trackCount };
  }, [items]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-600">Live-loaded from <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">public/data/testimonials.json</code></p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">{stats.total}+ testimonials</span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">Avg {stats.avg}/5</span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">{stats.trackCount} tracks</span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ordered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, delay: idx * 0.03 }}
          >
            <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="h-4 w-4 text-cyan-600" />
                  <StarRow rating={item.rating} />
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${trackPillClass(item.track)}`}>
                  {item.track}
                </span>
              </div>

              <p className="mt-4 text-[15px] leading-7 text-slate-700">“{item.quote}”</p>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="font-semibold text-slate-900">{item.name}</div>
                <div className="text-sm text-slate-600">{item.role} • {item.city}</div>
                {item.source ? <div className="mt-1 text-xs text-slate-500">Source: {item.source}</div> : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
