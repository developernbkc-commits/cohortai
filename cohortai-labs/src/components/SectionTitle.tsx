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
      <div className="text-xs tracking-[0.22em] uppercase text-slate-600">{eyebrow}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-950 text-balance">{title}</h2>
      {desc && <p className="mt-3 text-slate-600 text-sm sm:text-base">{desc}</p>}
    </div>
  );
}
