import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
      <div className="bg-slate-950/60 backdrop-blur-xl border-b border-slate-800/50">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="group">
              <Logo compact />
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-sm">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn("text-slate-300 hover:text-white transition", isActive && "text-white")
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition neon-edge"
              >
                Call {site.phone}
              </a>
            </nav>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-slate-800/50"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {open && (
            <div className="md:hidden pb-4">
              <div className="glass rounded-2xl p-3">
                <div className="flex flex-col">
                  {nav.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "px-3 py-3 rounded-xl text-sm text-slate-300 hover:bg-slate-800/40 hover:text-white",
                          isActive && "bg-slate-800/60 text-white"
                        )
                      }
                    >
                      {n.label}
                    </NavLink>
                  ))}
                  <a
                    href={`tel:${site.phone}`}
                    className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 neon-edge"
                  >
                    Call {site.phone}
                  </a>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
}
