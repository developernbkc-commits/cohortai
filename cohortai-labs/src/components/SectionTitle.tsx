export default function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs tracking-[0.22em] uppercase text-slate-400">{eyebrow}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white text-balance">{title}</h2>
      {desc && <p className="mt-3 text-slate-400 text-sm sm:text-base">{desc}</p>}
    </div>
  );
}
