import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { site } from "../lib/site";
import { cn } from "../lib/utils";

const primary = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/quiz", label: "Assessment" },
  { to: "/enterprise", label: "Enterprise" },
  { to: "/locations", label: "Locations" },
  { to: "/contact", label: "Contact" },
];

const company = [
  { to: "/about", label: "About" },
  { to: "/mentors", label: "Mentors" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [companyOpen, setCompanyOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
    setCompanyOpen(false);
  }, [location.pathname]);

  const email = (site as any).email || "info.cohortai.labs@itprofessional.pro";

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="bg-slate-950 border-b border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
        <Container>
          <div className="h-[104px] flex items-center justify-between gap-4">
            <Link to="/" className="group shrink-0">
              <Logo compact />
            </Link>

            <nav className="hidden lg:flex items-center gap-5 text-sm">
              {primary.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      "relative text-white/85 hover:text-white transition",
                      isActive && "text-white font-semibold"
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="inline-flex flex-col">
                      <span>{n.label}</span>
                      <motion.span
                        className="h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400"
                        initial={false}
                        animate={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="relative">
                <button
                  onClick={() => setCompanyOpen((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition",
                    companyOpen && "bg-white/5 text-white"
                  )}
                  aria-label="Company menu"
                >
                  Company <ChevronDown size={16} className={cn("transition", companyOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {companyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden"
                    >
                      {company.map((n) => (
                        <NavLink
                          key={n.to}
                          to={n.to}
                          className={({ isActive }) =>
                            cn(
                              "block px-4 py-3 text-sm text-white/85 hover:text-white hover:bg-white/5",
                              isActive && "text-white font-semibold bg-white/5"
                            )
                          }
                        >
                          {n.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href={`https://wa.me/91${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-white/12 hover:bg-white/16 border border-white/12"
              >
                WhatsApp
              </a>

              <a
                href={`tel:${site.phone}`}
                className="group inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition accent-ring relative"
              >
                Call
                <span className="absolute -bottom-10 right-0 hidden group-hover:block whitespace-nowrap rounded-xl bg-slate-950 text-white text-xs px-3 py-2 border border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
                  {site.phone}
                </span>
              </a>
            </nav>

            <button
              className="lg:hidden inline-flex items-center justify-center rounded-xl p-3 text-white/85 hover:bg-white/5"
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
                <div className="rounded-2xl p-3 border border-white/10 bg-white/5">
                  <div className="flex flex-col">
                    {primary.map((n) => (
                      <NavLink
                        key={n.to}
                        to={n.to}
                        className={({ isActive }) =>
                          cn(
                            "px-3 py-3 rounded-xl text-sm text-white/85 hover:bg-white/5 hover:text-white",
                            isActive && "bg-white/5 text-white font-semibold"
                          )
                        }
                      >
                        {n.label}
                      </NavLink>
                    ))}
                    <div className="mt-2 text-xs tracking-[0.22em] uppercase text-slate-400 px-3">Company</div>
                    {company.map((n) => (
                      <NavLink
                        key={n.to}
                        to={n.to}
                        className={({ isActive }) =>
                          cn(
                            "px-3 py-3 rounded-xl text-sm text-white/85 hover:bg-white/5 hover:text-white",
                            isActive && "bg-white/5 text-white font-semibold"
                          )
                        }
                      >
                        {n.label}
                      </NavLink>
                    ))}

                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <a
                        href={`https://wa.me/91${site.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold text-white bg-white/12 hover:bg-white/16 border border-white/12"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${site.phone}`}
                        className="inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300"
                      >
                        Call
                      </a>
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold text-white bg-white/12 hover:bg-white/16 border border-white/12"
                      >
                        Email
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
