import React from "react";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const src = site.logoUrl ? imgUrl(site.logoUrl) : "/logo.svg";
  const fit: "cover" | "contain" = "cover";

  const w = compact ? 360 : 440;
  const h = compact ? 66 : 80;

  return (
    <div className="flex items-center">
      <img
        src={src}
        alt={site.brand}
        className="block"
        style={{
          width: w,
          height: h,
          objectFit: fit,
          objectPosition: "left center",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/logo.svg";
        }}
      />
    </div>
  );
}
