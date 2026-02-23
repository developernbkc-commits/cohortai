import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import Container from "./Container";
import Logo from "./Logo";
import { site } from "../lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/quiz", label: "Assessment" },
  { to: "/about", label: "About" },
  { to: "/mentors", label: "Mentors" },
  { to: "/locations", label: "Locations" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => setOpen(false), [location.pathname]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="bg-white/85 backdrop-blur-xl border-b border-slate-200/70">
        <Container>
          <div className="h-[104px] flex items-center justify-between gap-4">
            <Link to="/" className="group">
              <Logo compact />
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-sm">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      "relative text-slate-800 hover:text-slate-950 transition",
                      isActive && "text-slate-950 font-semibold"
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="inline-flex flex-col">
                      <span>{n.label}</span>
                      <motion.span
                        className="h-[2px] rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                        initial={false}
                        animate={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    </span>
                  )}
                </NavLink>
              ))}

              <motion.a
                href={`https://wa.me/91${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-950 bg-white/90 hover:bg-white border border-slate-200/80 shadow-[0_18px_55px_rgba(15,23,42,0.10)]"
              >
                WhatsApp
              </motion.a>

              <motion.a
                href={`tel:${site.phone}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition accent-ring"
              >
                Call {site.phone}
              </motion.a>
            </nav>

            <button
              className="lg:hidden inline-flex items-center justify-center rounded-xl p-3 text-slate-800 hover:bg-slate-100"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="lg:hidden pb-4 overflow-hidden"
              >
                <div className="card rounded-2xl p-3">
                  <div className="flex flex-col">
                    {nav.map((n) => (
                      <NavLink
                        key={n.to}
                        to={n.to}
                        className={({ isActive }) =>
                          cn(
                            "px-3 py-3 rounded-xl text-sm text-slate-800 hover:bg-slate-100 hover:text-slate-950",
                            isActive && "bg-slate-100 text-slate-950 font-semibold"
                          )
                        }
                      >
                        {n.label}
                      </NavLink>
                    ))}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <a
                        href={`https://wa.me/91${site.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-950 bg-white/90 hover:bg-white border border-slate-200/80 shadow-[0_18px_55px_rgba(15,23,42,0.10)]"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${site.phone}`}
                        className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 accent-ring"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </motion.header>
  );
}
