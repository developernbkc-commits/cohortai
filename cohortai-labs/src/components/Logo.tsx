import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const src = site.logoUrl ? imgUrl(site.logoUrl) : "/logo.svg";
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-2xl bg-white/85 premium-outline backdrop-blur">
        <img
          src={src}
          alt={site.brand}
          className="h-full w-full object-contain scale-[1.16]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/logo.svg";
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-cyan-300/25" />
      </div>

      <div className="min-w-0">
        <div className="text-[17px] sm:text-[21px] leading-none font-semibold tracking-[-0.03em] text-slate-950 truncate">
          {site.brand}
        </div>
        <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-slate-500 truncate">
          {compact ? "Premium AI Learning" : site.tagline}
        </div>
      </div>
    </div>
  );
}
