import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import Container from "./Container";
import Logo from "./Logo";

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
      <div className="border-b border-white/60 bg-white/76 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/70">
        <Container>
          <div className="flex h-[86px] items-center justify-between gap-4">
            <Link to="/" className="group flex min-w-0 items-center" aria-label="CohortAI Labs home">
              <Logo compact />
            </Link>

            <nav className="hidden items-center gap-7 text-sm md:flex">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      "relative font-medium text-slate-600 transition hover:text-slate-950 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-cyan-400 after:via-violet-400 after:to-emerald-400 after:transition-transform hover:after:scale-x-100",
                      isActive && "text-slate-950 after:scale-x-100"
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <a
                href={`https://wa.me/918374617625`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 shadow-[0_10px_30px_rgba(86,214,255,0.22)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                WhatsApp
              </a>
              <a
                href="tel:8374617625"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              >
                Call
              </a>
            </nav>

            <button
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 p-3 text-slate-700 transition hover:bg-white md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {open && (
            <div className="pb-4 md:hidden">
              <div className="rounded-3xl border border-white/70 bg-white/90 p-3 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <div className="flex flex-col">
                  {nav.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950",
                          isActive && "bg-slate-900 text-white"
                        )
                      }
                    >
                      {n.label}
                    </NavLink>
                  ))}
                  <a
                    href={`https://wa.me/918374617625`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950"
                  >
                    WhatsApp
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
