import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

const servicesData = [
  {
    num: '01',
    title: 'PLUMBING REPAIR',
    desc: 'Leaks, toilets, fixtures and pipe problems.',
    details: 'Precision detection of hidden leaks, valve rebuilds, toilet rebuilds/replacements, and copper/PEX pipe repair across Santa Ana properties.',
  },
  {
    num: '02',
    title: 'WATER HEATERS',
    desc: 'Repair and replacement.',
    details: 'Diagnostic testing of heating elements, thermostats, pressure relief valves, and full system replacements for tank and tankless units.',
  },
  {
    num: '03',
    title: 'DRAINS & SEWER',
    desc: 'Cleaning, clearing and line repair.',
    details: 'Heavy-duty cable snaking, obstruction clearing, camera pipe inspections, and complete main line diagnostics for recurring backups.',
  },
];

export function Services({ onSelectService }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 md:py-40 bg-white text-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] text-neutral-400 uppercase font-medium">
            Services
          </span>

          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#0a0a0a] leading-[1.08] text-balance">
            One call.<br />
            Many plumbing problems solved.
          </h2>
        </div>

        {/* Minimal Editorial Rows */}
        <div className="mt-14 sm:mt-20 border-t border-neutral-200">
          {servicesData.map((service, index) => {
            const isHovered = hoveredIdx === index;
            const delayMs = index * 80;

            return (
              <div
                key={service.num}
                className="relative group cursor-pointer border-b border-neutral-200"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onSelectService(service.title)}
                data-cursor-cta="true"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(22px)',
                  transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
                }}
              >
                {/* Expanding Underline on Hover */}
                <div
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#0a0a0a] origin-left transition-transform"
                  style={{
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transitionDuration: '280ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />

                {/* Service Row Content with 5px shift */}
                <div
                  className="py-8 sm:py-10 md:py-12 transition-transform"
                  style={{
                    transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                    transitionDuration: '280ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                    {/* Number */}
                    <div className="md:col-span-2">
                      <span className="font-mono text-sm sm:text-base text-neutral-400 font-light tabular-nums">
                        {service.num}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#0a0a0a]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-5">
                      <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Small Arrow with 5px shift */}
                    <div className="md:col-span-1 flex justify-start md:justify-end">
                      <span
                        className="inline-flex items-center justify-center text-neutral-400 group-hover:text-black transition-all"
                        style={{
                          transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                          transitionDuration: '280ms',
                          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Restrained Local Note */}
        <div className="mt-8 flex justify-between items-center text-xs font-mono text-neutral-400">
          <span>SELECT ANY CATEGORY TO DISPATCH AN INQUIRY</span>
          <span className="hidden sm:inline">SANTA ANA & SURROUNDING AREAS</span>
        </div>
      </div>
    </section>
  );
}
