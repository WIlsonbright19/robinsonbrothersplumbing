import { useEffect, useRef, useState } from 'react';

export function TrustSection() {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-28 sm:py-36 md:py-48 bg-white text-[#0a0a0a] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          className="max-w-4xl transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Small label */}
          <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] text-neutral-400 uppercase font-medium">
            Why People Call
          </span>

          {/* Large headline */}
          <h2 className="mt-6 sm:mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#0a0a0a] leading-[1.04] text-balance">
            Fast response.<br />
            Clear answers.<br />
            Proper repairs.
          </h2>

          {/* Supporting text */}
          <p className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl text-neutral-600 font-light leading-relaxed max-w-2xl">
            Customers frequently describe responsive service, clear communication
            and thorough work.
          </p>

          {/* Quiet proof indicators with zero-pill discipline */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-neutral-200 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs sm:text-sm font-mono text-neutral-500">
            <span>SANTA ANA LICENSED PLUMBING</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>SAME-DAY & EMERGENCY DISPATCH</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>UPFRONT DIAGNOSTIC ESTIMATES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
