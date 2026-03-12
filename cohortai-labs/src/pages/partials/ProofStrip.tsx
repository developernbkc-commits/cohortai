import Container from "../../components/Container";

const proof = [
  { label: "Designed for", value: "Beginners → Tech pros" },
  { label: "Batch format", value: "Online + offline hybrid" },
  { label: "Conversion focus", value: "Advisor-led lead capture" },
  { label: "Momentum", value: "XP streaks + unlocks" },
];

export default function ProofStrip() {
  return (
    <section className="section-divider py-6">
      <Container>
        <div className="grid gap-3 md:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="chip rounded-2xl px-4 py-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</div>
              <div className="mt-2 text-sm font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
