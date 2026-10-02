import { useEffect, useRef, useState } from 'react';
import curvedImg from '../assets/images/curved_pipework_editorial_1790925252869.jpg';

export function CurvedTransitionStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      {/* Container with 8-12vw offset on desktop, 0 on mobile */}
      <div
        ref={ref}
        className="w-full md:w-[92vw] lg:w-[88vw] md:ml-[8vw] lg:ml-[10vw] px-5 sm:px-8 md:px-0"
      >
        <div
          className="relative h-[240px] sm:h-[340px] md:h-[420px] rounded-[16px] border border-[#e5e7eb] overflow-hidden bg-neutral-900 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          data-cursor-image="true"
        >
          <img
            src={curvedImg}
            alt="Seamless residential plumbing manifold and mechanical pipework"
            className="w-full h-full object-cover object-bottom filter brightness-[0.88] contrast-[1.08] transition-transform duration-700 hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

          {/* Minimalist Editorial Title Overlay */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 max-w-md">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-300">
              Field Standard
            </span>
            <p className="mt-1 text-sm sm:text-base font-light text-white tracking-wide">
              Installed for long-term pressure stability and zero leaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
