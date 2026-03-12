import React from "react";
import { cn } from "../lib/utils";

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary" }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none";
  const styles =
    variant === "primary"
      ? "text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 neon-edge"
      : "text-white bg-white/5 hover:bg-white/10 border border-slate-700/80";

  return (
    <a href={href} className={cn(base, styles, className)} {...rest}>
      {children}
    </a>
  );
}
