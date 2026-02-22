import React from "react";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const src = site.logoUrl ? imgUrl(site.logoUrl) : "/logo.svg";

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-2xl px-2 py-1 bg-white/80 border border-slate-200/80 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
        <img
          src={src}
          alt={site.brand}
          className="block"
          style={{
            width: compact ? 320 : 420,
            height: compact ? 58 : 74,
            objectFit: "contain",
            filter: "drop-shadow(0 10px 16px rgba(15,23,42,0.16))",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/logo.svg";
          }}
        />
      </div>

      {!compact && (
        <div className="leading-tight hidden sm:block">
          <div className="text-xs text-slate-700">{site.tagline}</div>
        </div>
      )}
    </div>
  );
}
