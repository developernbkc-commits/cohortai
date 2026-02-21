import { Phone, MessageCircle } from "lucide-react";
import { site } from "../lib/site";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/91${site.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="card card-3d flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-950 accent-ring"
        aria-label="WhatsApp CohortAI Labs"
      >
        <MessageCircle size={18} className="text-emerald-600" />
        WhatsApp
      </a>
      <a
        href={`tel:${site.phone}`}
        className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition accent-ring"
        aria-label="Call CohortAI Labs"
      >
        <Phone size={18} />
        Call
      </a>
    </div>
  );
}
