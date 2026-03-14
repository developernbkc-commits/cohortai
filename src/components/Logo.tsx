import { site } from "../lib/site";

type LogoProps = {
  compact?: boolean;
  size?: "nav" | "hero" | "footer" | "admin";
  className?: string;
  variant?: "light" | "dark";
};

export default function Logo({ compact = false, size = "nav", className = "", variant = "dark" }: LogoProps) {
  const dimensions = compact
    ? { width: 280, height: 92 }
    : size === "hero"
    ? { width: 420, height: 118 }
    : size === "footer"
    ? { width: 310, height: 96 }
    : size === "admin"
    ? { width: 360, height: 108 }
    : { width: 340, height: 104 };

  const src = variant === "light" ? (site.logoUrl || "/logo-light.svg") : (site.logoDarkUrl || "/logo-dark.svg");

  return (
    <div className={`flex items-center ${className}`.trim()}>
      <img
        src={src}
        alt={site.brand}
        className="shrink-0 object-contain object-left drop-shadow-[0_16px_40px_rgba(15,23,42,0.14)]"
        style={{ width: dimensions.width, height: dimensions.height }}
      />
    </div>
  );
}
