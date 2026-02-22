import React from "react";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const src = site.logoUrl ? imgUrl(site.logoUrl) : "/logo.svg";
  // If your logo PNG has extra transparent padding, upload a tightly-cropped PNG for best results.
  const w = compact ? 260 : 320;
  const h = compact ? 50 : 60;

  return (
    <div className="flex items-center">
      <img
        src={src}
        alt={site.brand}
        className="block"
        style={{
          width: w,
          height: h,
          objectFit: "contain",
          objectPosition: "left center",
          // Keep subtle shadow so the logo doesn't look washed out on the pearl background
          filter: "drop-shadow(0 10px 16px rgba(15,23,42,0.14))",
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/logo.svg";
        }}
      />
    </div>
  );
}
