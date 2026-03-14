import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";

const groups = [
  {
    title: "Learner journey",
    links: [
      ["Home", "/"],
      ["Courses & programs", "/courses"],
      ["AI Advisor recommendation", "/recommendation"],
      ["Register", "/register"],
      ["Reviews", "/reviews"],
      ["Contact & counselling", "/contact"],
    ],
  },
  {
    title: "About the brand",
    links: [
      ["About", "/about"],
      ["Platform vision", "/platform"],
      ["Quiz", "/quiz"],
      ["Thanks page", "/thanks"],
    ],
  },
  {
    title: "Admin surfaces",
    links: [
      ["Admin access", "/admin-access"],
      ["Admin dashboard", "/admin"],
      ["Program Studio", "/admin/program-studio"],
      ["Coupon Governance", "/admin/coupons"],
      ["Registrations Ops", "/admin/registrations"],
      ["Payments Ops", "/admin/payments"],
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionTitle
          eyebrow="Site map"
          title="Find every important page in one place"
          desc="This page helps learners, parents, and team members quickly understand the structure of the website and jump straight to the page they need."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group.title} className="glass-pearl rounded-3xl p-6 ring-soft">
              <h2 className="text-xl font-semibold text-slate-950">{group.title}</h2>
              <div className="mt-4 grid gap-3 text-sm">
                {group.links.map(([label, href]) => (
                  <a key={href} href={href} className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-slate-700 transition hover:-translate-y-0.5 hover:text-slate-950 hover:shadow-sm">
                    {label}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
