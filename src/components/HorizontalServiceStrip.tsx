import { useEffect, useRef, useState } from 'react';

const serviceItems = [
  { name: 'Leaks', subtitle: 'Acoustic detection & line fixes' },
  { name: 'Drains', subtitle: 'Camera scour & block removals' },
  { name: 'Water Heaters', subtitle: 'Repairs & tankless upgrades' },
  { name: 'Sewer Lines', subtitle: 'Mainline clearing & replacements' },
  { name: 'Water Lines', subtitle: 'Copper & PEX repiping' },
];

export function HorizontalServiceStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    // Only on desktop screen width
    const isDesktop = window.innerWidth >= 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || reducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate progress 0 to 1
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        // translateX(0) to translateX(-20vw)
        setScrollOffset(-progress * 20);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full py-16 sm:py-24 bg-white border-y border-neutral-200 overflow-hidden"
    >
      {/* Editorial Label */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8 sm:mb-12">
        <span className="font-mono text-xs tracking-[0.24em] text-neutral-400 uppercase font-medium">
          Service Range
        </span>
      </div>

      {/* Horizontal Strip Container */}
      <div className="relative w-full overflow-x-auto no-scrollbar">
        <div
          className="flex items-stretch transition-transform duration-100 ease-out min-w-max px-5 sm:px-8"
          style={{
            transform: `translate3d(${scrollOffset}vw, 0, 0)`,
            willChange: 'transform',
          }}
        >
          {serviceItems.map((item, index) => (
            <div
              key={item.name}
              className={`flex flex-col justify-center py-6 sm:py-10 px-6 sm:px-12 lg:px-16 ${
                index !== 0 ? 'border-l border-neutral-200' : ''
              }`}
            >
              <span className="font-mono text-xs sm:text-sm text-neutral-400 mb-2">
                0{index + 1}
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#0a0a0a] whitespace-nowrap">
                {item.name}
              </h3>
              <p className="mt-3 text-xs sm:text-sm font-mono text-neutral-500 whitespace-nowrap uppercase tracking-wider">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
