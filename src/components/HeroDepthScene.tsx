import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Orbit, Sparkles, Trophy } from "lucide-react";

export default function HeroDepthScene() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-140, 140], [8, -8]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-140, 140], [-10, 10]), { stiffness: 120, damping: 14 });
  const glowX = useTransform(mx, [-180, 180], [30, 70]);
  const glowY = useTransform(my, [-180, 180], [35, 65]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative mx-auto h-[520px] w-full max-w-[620px] [perspective:1600px]"
    >
      <motion.div
        className="absolute inset-6 rounded-[42px] border border-white/12 glass p-7 ring-soft"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[42px]"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(99,102,241,0.26), transparent 26%), radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(34,211,238,0.22), transparent 28%)`
            ),
          }}
        />

        <div className="relative z-10" style={{ transform: "translateZ(36px)" }}>
          <div className="text-sm tracking-[0.3em] uppercase text-cyan-300">Immersive AI growth cockpit</div>
          <div className="mt-3 text-4xl font-semibold text-white leading-tight">A premium admissions experience with real product depth</div>
          <p className="mt-4 max-w-xl text-slate-300 leading-7">
            This is where 3D should feel useful: layered proof, guided exploration, live pricing intent, and visible learner momentum—not just decorative motion.
          </p>
        </div>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2" style={{ transformStyle: "preserve-3d" }}>
          {[
            { icon: Orbit, title: "AI Advisor Orbit", text: "Inputs turn into fit scores, track suggestions, and the next best CTA.", depth: 70 },
            { icon: Trophy, title: "Reward Layer", text: "XP, quests, and streak unlocks turn progress into visible momentum.", depth: 98 },
            { icon: Cpu, title: "Program Studio", text: "Admins publish programs, pricing, and seat rules without hardcoding new pages.", depth: 84 },
            { icon: Sparkles, title: "Proof Engine", text: "Stories, reviews, and outcomes build trust before the user has to ask.", depth: 54 },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6 }}
              className="rounded-[28px] border border-white/12 bg-white/6 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.28)]"
              style={{ transform: `translateZ(${card.depth}px)` }}
            >
              <card.icon size={20} className="text-cyan-200" />
              <div className="mt-3 text-lg font-semibold text-white">{card.title}</div>
              <div className="mt-2 text-sm text-slate-300 leading-7">{card.text}</div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-6 right-6 rounded-[28px] border border-white/12 bg-slate-950/55 px-5 py-4 text-sm text-slate-200 shadow-[0_16px_42px_rgba(15,23,42,0.25)]" style={{ transform: "translateZ(110px)" }}>
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-300">Phase D focus</div>
          <div className="mt-2 font-semibold text-white">Programs • Finance approvals • Secure registration ops</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
