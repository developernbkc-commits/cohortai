import React from "react";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const src = site.logoUrl ? imgUrl(site.logoUrl) : "/logo.svg";
  const fit = (site as any).logoFit || "cover";

  const w = compact ? 300 : 380;
  const h = compact ? 54 : 64;

  return (
    <div className="flex items-center">
      <div className="rounded-2xl px-2 py-1 bg-white/80 border border-slate-200/80 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
        <img
          src={src}
          alt={site.brand}
          className="block"
          style={{
            width: w,
            height: h,
            objectFit: fit,
            objectPosition: "left center",
            filter: "drop-shadow(0 10px 16px rgba(15,23,42,0.16))",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/logo.svg";
          }}
        />
      </div>
    </div>
  );
}
