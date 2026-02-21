import React from "react";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const src = site.logoUrl ? imgUrl(site.logoUrl) : "/logo.svg";
  return (
    <div className="flex items-center gap-3">
      <img
        src={src}
        alt={site.brand}
        className="shrink-0"
        style={{
          width: compact ? 240 : 300,
          height: compact ? 44 : 56,
          objectFit: "contain",
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/logo.svg";
        }}
      />
      {!compact && (
        <div className="leading-tight hidden sm:block">
          <div className="text-xs text-slate-600">{site.tagline}</div>
        </div>
      )}
    </div>
  );
}
