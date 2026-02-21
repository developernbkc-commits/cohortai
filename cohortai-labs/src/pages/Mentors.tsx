import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Mentors() {
  const mentors = site.images?.mentors || [];
  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Mentors"
            title="Learn from industry-experienced trainers"
            desc="We blend clear teaching with real-world engineering experience—so you build skills you can actually use."
          />
          <div className="mt-6 flex gap-3 flex-col sm:flex-row">
            <Button href="/contact">Get a batch schedule</Button>
            <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {mentors.map((m: string, idx: number) => (
              <div key={m} className="card card-3d rounded-3xl p-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                  <img src={imgUrl(m)} alt={`Mentor ${idx + 1}`} className="h-48 w-full object-cover" />
                </div>
                <div className="mt-4 text-lg font-semibold text-slate-950">Senior Mentor {idx + 1}</div>
                <div className="mt-1 text-sm text-slate-700">20+ years industry experience • Mentor reviews • Practical projects</div>
                <div className="mt-4 text-sm text-slate-700">
                  Placeholder bio: add specialization, company background, and focus area (Everyday / Business / Tech & Data).
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
