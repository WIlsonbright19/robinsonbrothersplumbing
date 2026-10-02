import { useEffect, useRef, useState } from 'react';
import technicalImg from '../assets/images/technical_waterheater_detail_1790925265481.jpg';

interface TechnicalItem {
  id: string;
  category: string;
  focus: string;
  diagnostic: string;
  solution: string;
}

const technicalItems: TechnicalItem[] = [
  {
    id: 'leak',
    category: '01 / LEAK REPAIR',
    focus: 'Pressurized Supply Lines & Concealed Pinholes',
    diagnostic:
      'Acoustic and thermal detection to locate the exact source of slab leaks, wall moisture, and pressurized pipe failures without tearing apart unnecessary surfaces.',
    solution:
      'Direct surgical repairs using soldered copper, cross-linked PEX replacement, and high-pressure brass valves tested to full municipal PSI specifications.',
  },
  {
    id: 'drain',
    category: '02 / DRAIN CLEARING',
    focus: 'Main Sewer Runs & Secondary Blockages',
    diagnostic:
      'In-pipe optical inspection cameras identify root intrusion, fat buildup, calcium scales, and pipe bellies causing chronic recurring backups.',
    solution:
      'Heavy-duty mechanical snake clearing and thorough line scour, restoring true gravity flow and complete drainage performance.',
  },
  {
    id: 'heater',
    category: '03 / WATER HEATERS',
    focus: 'Tank & Tankless Mechanical Units',
    diagnostic:
      'Testing burner assemblies, heating elements, thermopiles, dip tubes, and temperature-pressure relief (TPR) valves to determine true wear.',
    solution:
      'Precision component replacement or modern tankless installation with dedicated venting, gas line sizing, and expansion tank calibration.',
  },
];

export function StickyTechnicalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [imgRevealed, setImgRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImgRevealed(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="technical"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 md:py-40 bg-[#f3f3f3] text-[#0a0a0a] transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Pinned / Sticky on Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] text-neutral-500 uppercase font-medium">
              The Job
            </span>

            <h2 className="mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#0a0a0a] leading-[1.05] text-balance">
              Find the problem.<br />
              Fix the problem.
            </h2>

            <p className="mt-6 sm:mt-7 text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-md">
              From leaks and blocked drains to water heaters and larger plumbing
              issues, the goal is a proper solution—not a temporary patch.
            </p>

            {/* Diagnostic Category Selector Tabs */}
            <div className="mt-8 flex flex-col gap-2 border-t border-neutral-300 pt-6">
              {technicalItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left py-2 px-3 rounded text-xs sm:text-sm font-mono tracking-wide transition-all ${
                    activeTab === idx
                      ? 'bg-neutral-900 text-white font-medium pl-4'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                  data-cursor-cta="true"
                >
                  {item.category}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-300 text-xs font-mono text-neutral-400">
              DOCUMENTED DIAGNOSTICS · ZERO SHORTCUTS
            </div>
          </div>

          {/* Right Column: Technical Details & Cinematic Technical Photography */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Technical Detail Card */}
            <div
              key={technicalItems[activeTab].id}
              className="p-6 sm:p-8 bg-white border border-[#e5e7eb] rounded-[12px] transition-all"
              style={{
                animation: 'fadeInUp 450ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
              }}
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {technicalItems[activeTab].category}
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  0{activeTab + 1} / 03
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-medium tracking-tight text-neutral-900">
                {technicalItems[activeTab].focus}
              </h3>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Inspection & Assessment
                  </h4>
                  <p className="mt-1 text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                    {technicalItems[activeTab].diagnostic}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Engineered Resolution
                  </h4>
                  <p className="mt-1 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                    {technicalItems[activeTab].solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Image Container with Secondary Reveal: bottom to top */}
            <div
              ref={imgRef}
              className="relative h-[320px] sm:h-[420px] rounded-[16px] overflow-hidden border border-[#e5e7eb] bg-neutral-900"
              style={{
                clipPath: imgRevealed ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                transition: 'clip-path 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              data-cursor-image="true"
            >
              <img
                src={technicalImg}
                alt="Technical precision plumbing installation with copper lines and pressure valves"
                className="w-full h-full object-cover object-center filter brightness-[0.95]"
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-white font-mono text-[10px] tracking-wider uppercase border border-white/10">
                Mechanical Specification · Santa Ana
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
