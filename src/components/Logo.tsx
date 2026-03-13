import { site } from "../lib/site";

type LogoProps = {
  compact?: boolean;
  size?: "nav" | "hero" | "footer";
  className?: string;
};

export default function Logo({ compact = false, size = "nav", className = "" }: LogoProps) {
  const width = compact ? 260 : size === "hero" ? 420 : size === "footer" ? 300 : 330;
  const height = compact ? 82 : size === "hero" ? 112 : size === "footer" ? 92 : 98;

  return (
    <div className={`flex items-center ${className}`.trim()}>
      <img
        src={site.logoUrl || "/logo.svg"}
        alt={site.brand}
        className="shrink-0 object-contain object-left drop-shadow-[0_16px_40px_rgba(15,23,42,0.16)]"
        style={{ width, height }}
      />
    </div>
  );
}
