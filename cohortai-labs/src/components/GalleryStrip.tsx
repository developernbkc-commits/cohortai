import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";
import { motion } from "framer-motion";
import { PLACEHOLDER_IMG } from "../lib/placeholders";

export default function GalleryStrip() {
  const imgs: string[] = (site as any).images?.gallery || [];
  return (
    <section className="py-14 border-t border-slate-200/70">
      <Container>
        <SectionTitle
          eyebrow="Campus + learning moments"
          title="A premium learning environment (online & offline)"
          desc="Add real classroom photos, student collaboration, demo day, and mentor reviews to build trust fast."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {imgs.map((f, idx) => (
            <motion.div
              key={f || idx}
              className="card card-3d rounded-3xl border border-slate-200/80 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
            >
              <div className="h-44 bg-white">
                <img
                  src={f ? imgUrl(f) : PLACEHOLDER_IMG}
                  alt="Gallery"
                  className="h-44 w-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG)}
                />
              </div>

              <div className="p-4">
                <div className="text-xs tracking-[0.22em] uppercase text-slate-600">Gallery</div>
                <div className="mt-2 text-sm font-semibold text-slate-950">Learning moment {idx + 1}</div>
                <div className="mt-1 text-sm text-slate-800">
                  Replace this with a real photo to increase conversions.
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
