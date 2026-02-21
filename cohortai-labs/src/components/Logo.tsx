import { site } from "../lib/site";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const size = compact ? 28 : 34;
  const wordmarkHeight = compact ? 24 : 28;

  return (
    <div className="flex items-center gap-3">
      <img
        src={site.logoUrl || "/logo.svg"}
        alt={site.brand}
        className="shrink-0"
        style={{ width: compact ? 140 : 160, height: compact ? 36 : 40, objectFit: "contain" }}
      />
      {!compact && (
        <div className="leading-tight">
          <div className="text-xs text-slate-400">{site.tagline}</div>
        </div>
      )}
    </div>
  );
}
