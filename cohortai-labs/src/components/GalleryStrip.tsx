import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";
import { motion } from "framer-motion";

export default function GalleryStrip() {
  const imgs: string[] = site.images?.gallery || [];
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
              key={f}
              className="card card-3d rounded-3xl overflow-hidden border border-slate-200/80"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
            >
              <img src={imgUrl(f)} alt={`Gallery ${idx + 1}`} className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="text-sm font-semibold text-slate-950">Placeholder</div>
                <div className="mt-1 text-sm text-slate-800">
                  Replace this image with a real photo to increase conversions.
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
