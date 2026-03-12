import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import Container from "./Container";
import Logo from "./Logo";
import { site } from "../lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-slate-200/70 bg-[#f7f5f0]/82 backdrop-blur-xl shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
        <Container>
          <div className="h-20 flex items-center justify-between gap-4">
            <Link to="/" className="group">
              <Logo compact />
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-sm">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      "relative text-slate-700 hover:text-slate-950 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-cyan-400 after:via-violet-400 after:to-emerald-400 after:transition-all hover:after:w-full",
                      isActive && "text-slate-950 after:w-full"
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <a
                href={`https://wa.me/91${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition accent-ring"
              >
                <Sparkles size={16} /> WhatsApp
              </a>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-900 border border-slate-200 bg-white/85 hover:bg-white transition premium-outline"
              >
                <Phone size={16} /> Call
              </a>
            </nav>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-white/70 premium-outline"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {open && (
            <div className="md:hidden pb-4">
              <div className="card rounded-2xl p-3">
                <div className="flex flex-col">
                  {nav.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "px-3 py-3 rounded-xl text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                          isActive && "bg-slate-50 text-slate-950"
                        )
                      }
                    >
                      {n.label}
                    </NavLink>
                  ))}
                  <a href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 accent-ring">WhatsApp</a>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
}
