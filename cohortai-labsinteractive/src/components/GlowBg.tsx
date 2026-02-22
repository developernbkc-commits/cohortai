import { motion } from "framer-motion";

export default function GlowBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-44 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.26), transparent 55%), radial-gradient(circle at 70% 60%, rgba(167,139,250,0.22), transparent 55%), radial-gradient(circle at 40% 85%, rgba(16,185,129,0.16), transparent 55%)",
        }}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(rgba(15,23,42,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 22%, black 38%, transparent 72%)",
        }}
      />
    </div>
  );
}
