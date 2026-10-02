import { useEffect, useRef, useState } from 'react';
import curvedImg from '../assets/images/curved_pipework_editorial_1790925252869.jpg';

export function CurvedImageHolder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate progress through viewport: -1 to 1
        const progress = (rect.top - windowHeight / 2) / windowHeight;
        // Parallax range: -3% to 3%
        setParallaxY(progress * 6);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full z-20 -mt-12 sm:-mt-16 md:-mt-24 px-4 sm:px-6 pointer-events-auto">
      {/* 70-85% viewport width on desktop, asymmetrical layout */}
      <div
        ref={containerRef}
        className="mx-auto w-full md:w-[86%] lg:w-[80%] max-w-6xl"
      >
        <div
          className="relative h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px] overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-neutral-900 transition-all"
          style={{
            clipPath: revealed ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
            transition: 'clip-path 850ms cubic-bezier(0.22, 1, 0.36, 1) 50ms',
          }}
          data-cursor-image="true"
        >
          {/* Parallax Image element */}
          <div
            className="absolute inset-0 w-full h-[112%] -top-[6%] overflow-hidden"
            style={{
              transform: `translate3d(0, ${parallaxY}%, 0) scale(${revealed ? 1 : 1.04})`,
              transition: 'transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            }}
          >
            <img
              src={curvedImg}
              alt="High-precision soldered copper supply lines and manifold installation"
              className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Minimalist Editorial Floating Badge */}
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/10 text-white font-mono text-[10px] sm:text-xs tracking-wider uppercase">
            System Specification · Clean Supply & Manifold Lines
          </div>
        </div>
      </div>
    </div>
  );
}
