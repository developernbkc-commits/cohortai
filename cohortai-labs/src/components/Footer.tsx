import Container from "./Container";
import Logo from "./Logo";
import { site } from "../lib/site";
import { Link } from "react-router-dom";
import { useSchedule } from "../lib/schedule";

export default function Footer() {
  const schedule = useSchedule();
  const cities = site.cities || Object.keys(schedule.byCity || {});
  return (
    <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur">
      <Container>
        <div className="py-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-slate-700 max-w-sm">
              Mentor-led cohorts. Real projects. Hybrid learning. Built for beginners and professionals alike.
            </p>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-slate-950 mb-3">Quick Links</div>
            <div className="grid gap-2 text-slate-700">
              <Link to="/courses" className="hover:text-slate-950">Courses</Link>
              <Link to="/about" className="hover:text-slate-950">About</Link>
              <Link to="/mentors" className="hover:text-slate-950">Mentors</Link>
              <Link to="/locations" className="hover:text-slate-950">Locations & Schedule</Link>
              <Link to="/contact" className="hover:text-slate-950">Contact</Link>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-slate-950 mb-3">Get in touch
            </div>
            <div className="grid gap-2 text-slate-700">
              <a className="hover:text-slate-950" href={`tel:${site.phone}`}>Call: {site.phone}</a>
              <a className="hover:text-slate-950" href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp: +91 {site.whatsapp}
              </a>
              <div>Locations: {site.cities.join(" • ")}</div>

              <div className="mt-2">
                <div className="text-xs text-slate-600">Next batches (editable via schedule.json)</div>
                <div className="mt-1 grid gap-1">
                  {cities.map((c) => (
                    <div key={c} className="text-sm">
                      <span className="font-semibold text-slate-950">{c}:</span>{" "}
                      <span className="text-slate-700">{schedule.byCity?.[c] || "TBD"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10 text-xs text-slate-500">
          © {new Date().getFullYear()} {site.brand}. All rights reserved. • <span className="font-mono">Build: {(site as any).buildVersion}</span>
        </div>
      </Container>
    </footer>
  );
}
