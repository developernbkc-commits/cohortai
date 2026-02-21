import Container from "./Container";
import Logo from "./Logo";
import { site } from "../lib/site";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950">
      <Container>
        <div className="py-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-slate-400 max-w-sm">
              Mentor-led cohorts. Real projects. Hybrid learning. Built for beginners and professionals alike.
            </p>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-slate-200 mb-3">Quick Links</div>
            <div className="grid gap-2 text-slate-400">
              <Link to="/courses" className="hover:text-white">Courses</Link>
              <Link to="/about" className="hover:text-white">About</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-slate-200 mb-3">Get in touch</div>
            <div className="grid gap-2 text-slate-400">
              <a className="hover:text-white" href={`tel:${site.phone}`}>Call: {site.phone}</a>
              <a className="hover:text-white" href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp: +91 {site.whatsapp}
              </a>
              <div>Locations: {site.cities.join(" • ")}</div>
              <div>Batches start: {site.startDate}</div>
            </div>
          </div>
        </div>
        <div className="pb-10 text-xs text-slate-500">
          © {new Date().getFullYear()} {site.brand}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
