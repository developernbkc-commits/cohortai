export default function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="eyebrow-chip text-[11px] tracking-[0.2em] uppercase text-slate-700">{eyebrow}</div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-950 text-balance leading-tight">{title}</h2>
      <div className="mt-3 h-px w-28 bg-gradient-to-r from-cyan-300/80 via-violet-300/70 to-emerald-300/70 rounded-full" />
      {desc && <p className="mt-4 text-slate-800 text-sm sm:text-base leading-relaxed">{desc}</p>}
    </div>
  );
}
