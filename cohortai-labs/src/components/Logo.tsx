import { site } from "../lib/site";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center">
      <img
        src={site.logoUrl || "/logo.svg"}
        alt={site.brand}
        className="shrink-0 drop-shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
        style={{
          width: compact ? 220 : 280,
          height: compact ? 58 : 72,
          objectFit: "contain",
          objectPosition: "left center",
        }}
      />
    </div>
  );
}
