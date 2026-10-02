import { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import emergencyBg from '../assets/images/hero_utility_craft_1790925238995.jpg';

export function EmergencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (rect.top - windowHeight / 2) / windowHeight;
        // translateY(-4%) to 4%
        setParallaxY(progress * -4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="emergency"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 md:py-48 bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        data-cursor-image="true"
      >
        <img
          src={emergencyBg}
          alt="Emergency plumbing supply valve shutoff and line diagnostics"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.35] contrast-[1.2]"
          style={{
            transform: `translate3d(0, ${parallaxY}%, 0) scale(1.05)`,
            willChange: 'transform',
          }}
          referrerPolicy="no-referrer"
        />
        {/* Subtle monochrome dark overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          {/* Small label */}
          <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] text-neutral-400 uppercase font-medium">
            When It Can't Wait
          </span>

          {/* Large headline */}
          <h2 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.05] text-balance">
            A plumbing problem<br />
            doesn't always wait.
          </h2>

          {/* Supporting text */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-xl">
            Call when the problem needs attention.
          </p>

          {/* Direct CTA */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
            <a
              href="tel:6573002460"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white text-[#0a0a0a] text-sm sm:text-base font-medium rounded-md hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200"
              data-cursor-cta="true"
            >
              <Phone className="w-4 h-4" />
              <span>Call (657) 300-2460</span>
            </a>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-xs font-mono text-neutral-400">
            SANTA ANA DIRECT DISPATCH · BURST PIPES · SEWER BACKUPS · GAS SHUTOFFS
          </div>
        </div>
      </div>
    </section>
  );
}
