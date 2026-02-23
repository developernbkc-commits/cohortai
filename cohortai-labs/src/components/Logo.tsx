import React from "react";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";

export default function Logo({ compact = false }: { compact?: boolean }) {
  const src = site.logoUrl ? imgUrl(site.logoUrl) : "/logo.svg";

  // If your logo PNG has transparent padding, "cover" will visually zoom it.
  // If you upload a tightly-cropped logo PNG, switch to "contain".
  const fit: "cover" | "contain" = "cover";

  const w = compact ? 340 : 420;
  const h = compact ? 64 : 78;

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
          filter: "drop-shadow(0 10px 16px rgba(15,23,42,0.14))",
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/logo.svg";
        }}
      />
    </div>
  );
}
