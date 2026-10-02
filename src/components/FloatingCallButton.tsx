import { Phone } from 'lucide-react';

export function FloatingCallButton() {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <a
        href="tel:6573002460"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 bg-[#0a0a0a] text-white border border-neutral-700/80 rounded-full shadow-2xl hover:border-neutral-500 hover:bg-neutral-900 active:scale-[0.96] transition-all duration-200"
        data-cursor-cta="true"
        aria-label="Call Robinson Brothers Plumbing at (657) 300-2460"
      >
        {/* Pulsing indicator node */}
        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#0a0a0a]" />
        </span>

        <Phone className="w-5 h-5 opacity-90 transition-transform group-hover:rotate-12 duration-200" />
      </a>
    </aside>
  );
}
