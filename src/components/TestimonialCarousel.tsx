import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  service: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '01',
    quote:
      'Robinson Brothers diagnosed the main water shutoff failure in fifteen minutes and had our entire copper line rebuilt before dinner. Clean, quiet, and completely upfront.',
    author: 'Marcus & Clara Sterling',
    location: 'Floral Park, Santa Ana',
    service: 'Copper Repipe & Main Shutoff',
  },
  {
    id: '02',
    quote:
      'When our tankless system threw an ignition failure code on a Saturday evening, they were on site in forty minutes. No inflated emergency penalties, just precision troubleshooting.',
    author: 'David K. Chen',
    location: 'Downtown Historic District',
    service: 'Tankless Water Heater Diagnostic',
  },
  {
    id: '03',
    quote:
      'We manage three multifamily properties in Central Santa Ana. Robinson Brothers handles our backflow certification, camera scoping, and mainline clearances with absolute rigor.',
    author: 'Elena Rostova',
    location: 'French Park Properties',
    service: 'Commercial Diagnostics & Hydro-Jetting',
  },
  {
    id: '04',
    quote:
      'The cleanest plumbing technicians I have hired in thirty years of homeownership. Protective floor runners, spotless soldering joints, and clear explanation of every valve.',
    author: 'Robert A. Miller',
    location: 'Washington Square, Santa Ana',
    service: 'Water Heater Replacement & Regulator',
  },
];

const AUTOPLAY_INTERVAL = 7000;

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (animating || nextIndex === displayedIndex) return;
      setAnimating(true);

      // Fade out phase
      const timeout = window.setTimeout(() => {
        setDisplayedIndex(nextIndex);
        setCurrentIndex(nextIndex);
        // Fade in phase
        requestAnimationFrame(() => {
          setAnimating(false);
        });
      }, 350);

      return () => clearTimeout(timeout);
    },
    [animating, displayedIndex]
  );

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % TESTIMONIALS.length;
    goToSlide(next);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    goToSlide(prev);
  }, [currentIndex, goToSlide]);

  // Autoplay loop
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const current = TESTIMONIALS[displayedIndex];

  return (
    <section
      aria-label="Client Testimonials"
      className="relative w-full py-24 sm:py-32 md:py-40 bg-[#0f0f0f] text-white border-t border-neutral-800/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-neutral-800">
          <div>
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] text-neutral-400 uppercase font-medium">
              Voices & Verification
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-normal tracking-tight text-white">
              Field observations from Santa Ana.
            </h2>
          </div>

          {/* Minimalist Carousel Controls */}
          <div className="flex items-center gap-4 select-none">
            <span className="font-mono text-xs text-neutral-400 tracking-wider">
              <span className="text-white font-medium">0{displayedIndex + 1}</span>
              <span className="text-neutral-600 mx-1.5">/</span>
              <span>0{TESTIMONIALS.length}</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                aria-label="Previous quote"
                className="w-10 h-10 rounded-md border border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-all active:scale-95"
                data-cursor-cta="true"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next quote"
                className="w-10 h-10 rounded-md border border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-all active:scale-95"
                data-cursor-cta="true"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Fade Quote Viewport */}
        <div className="relative pt-12 sm:pt-16 md:pt-20 min-h-[320px] sm:min-h-[280px] md:min-h-[300px] flex flex-col justify-between">
          <div
            className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(12px) scale(0.995)' : 'translateY(0) scale(1)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* The Quote */}
            <blockquote className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-light tracking-tight text-neutral-100 leading-[1.28] sm:leading-[1.24] max-w-5xl">
              “{current.quote}”
            </blockquote>

            {/* Attribution */}
            <div className="mt-10 sm:mt-14 pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-base sm:text-lg font-normal text-white tracking-tight">
                  {current.author}
                </p>
                <p className="font-mono text-xs text-neutral-400 mt-1">
                  {current.location}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-500 bg-neutral-900/80 px-3.5 py-1.5 rounded-md border border-neutral-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
                <span>{current.service}</span>
              </div>
            </div>
          </div>

          {/* Thin Progress Timeline Bar */}
          <div className="mt-12 w-full h-[2px] bg-neutral-800/80 rounded-full overflow-hidden">
            <div
              key={displayedIndex}
              className="h-full bg-white transition-all duration-[7000ms] ease-linear"
              style={{
                width: isPaused ? '100%' : '100%',
                animation: isPaused ? 'none' : 'timelineFill 7000ms linear forwards',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes timelineFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
