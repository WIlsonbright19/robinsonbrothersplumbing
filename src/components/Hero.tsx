import { useEffect, useState } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import heroBg from '../assets/images/hero_utility_craft_1790925238995.jpg';

interface HeroProps {
  ready: boolean;
  onNavigateToBooking: () => void;
}

export function Hero({ ready, onNavigateToBooking }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-end pb-24 md:pb-32 lg:pb-36 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Image Container with subtle scroll movement */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        data-cursor-image="true"
      >
        <img
          src={heroBg}
          alt="Professional plumbing copper pipework and mechanical utility setup in Santa Ana"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(0, ${scrollY * 0.12}px, 0) scale(1.05)`,
            filter: 'brightness(0.72) contrast(1.08)',
          }}
          referrerPolicy="no-referrer"
        />

        {/* Restrained directional vignette and negative-space gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent w-full md:w-3/4" />
      </div>

      {/* Content Layer sitting in negative space */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full pt-32">
        <div className="max-w-2xl">
          {/* Eyebrow / Small Label */}
          <div
            className={`transition-all duration-500 ${
              ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '100ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.22em] text-neutral-400 uppercase font-medium">
              Santa Ana Plumbing
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`mt-4 sm:mt-5 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.02] text-balance transition-all duration-700 ${
              ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-11'
            }`}
            style={{
              transitionDelay: '180ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            Plumbing.<br />
            Handled properly.
          </h1>

          {/* Supporting Text */}
          <p
            className={`mt-6 sm:mt-7 text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-xl transition-all duration-500 ${
              ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              transitionDelay: '280ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            Repairs, water heaters, leaks, drains and emergency plumbing.
          </p>

          {/* CTAs */}
          <div
            className={`mt-8 sm:mt-10 flex flex-wrap items-center gap-4 transition-all duration-500 ${
              ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '360ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Primary CTA */}
            <a
              href="tel:6573002460"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-[#0a0a0a] text-sm sm:text-base font-medium rounded-md hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200"
              data-cursor-cta="true"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            {/* Secondary CTA */}
            <button
              onClick={onNavigateToBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white bg-transparent border border-white/30 hover:border-white/70 hover:bg-white/5 text-sm sm:text-base font-normal rounded-md transition-all duration-200"
              data-cursor-cta="true"
            >
              <span>Get Service</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>
          </div>

          {/* Quick Location & Availability Note */}
          <div
            className={`mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400 font-mono transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '460ms' }}
          >
            <span>930 CEDAR ST · SANTA ANA, CA</span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span>RESIDENTIAL & COMMERCIAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
