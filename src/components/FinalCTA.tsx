import { useEffect, useRef, useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import ctaBg from '../assets/images/cta_quiet_plumbing_space_1790925277198.jpg';

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (rect.top - windowHeight / 2) / windowHeight;
        setParallaxY(progress * -4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 sm:py-44 md:py-52 bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        data-cursor-image="true"
      >
        <img
          src={ctaBg}
          alt="Quiet architectural residential plumbing environment with natural shadows"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.4] contrast-[1.1]"
          style={{
            transform: `translate3d(0, ${parallaxY}%, 0) scale(1.05)`,
            willChange: 'transform',
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.02] text-balance">
            Need a plumber?
          </h2>

          {/* Supporting Text */}
          <div className="mt-6 sm:mt-8 space-y-1">
            <p className="text-lg sm:text-xl font-medium text-white tracking-wide">
              Robinson Brothers Plumbing
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Santa Ana, California
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-light font-mono">
              930 Cedar St, Santa Ana, CA 92701
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Primary CTA */}
            <a
              href="tel:6573002460"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white text-[#0a0a0a] text-sm sm:text-base font-medium rounded-md hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200"
              data-cursor-cta="true"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            {/* Secondary link: Get Directions */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Robinson+Brothers+Plumbing+930+Cedar+St+Santa+Ana+CA+92701"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white bg-transparent border border-white/20 hover:border-white/60 hover:bg-white/5 text-sm sm:text-base font-normal rounded-md transition-all duration-200"
              data-cursor-cta="true"
            >
              <MapPin className="w-4 h-4 opacity-70" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 font-mono text-xs text-neutral-400">
            DIRECT PHONE: (657) 300-2460
          </div>
        </div>
      </div>
    </section>
  );
}
