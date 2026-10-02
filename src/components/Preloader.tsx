import { useState, useEffect } from 'react';
import { Logo } from './Logo';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  // Stage 1: bg visible
  // Stage 2: Central vertical line appears scaleY: 0 -> 1 (bottom -> top)
  // Stage 3: Fluid indicator travels upward
  // Stage 4: Loading text
  // Stage 5: Collapse upward and fade out
  const [stage, setStage] = useState<number>(1);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    // Stage 1: 0ms -> background visible
    // Stage 2: 100ms -> line grows upward
    const t2 = setTimeout(() => setStage(2), 100);
    // Stage 3: 350ms -> fluid indicator rises
    const t3 = setTimeout(() => setStage(3), 350);
    // Stage 4: 550ms -> text reveals
    const t4 = setTimeout(() => setStage(4), 550);
    // Stage 5: 1250ms -> line collapses upward
    const t5 = setTimeout(() => setStage(5), 1250);
    // Stage 6: 1550ms -> fade out overlay & trigger hero reveal
    const t6 = setTimeout(() => {
      setStage(6);
      onComplete();
    }, 1550);
    // Completely unmount after transition
    const t7 = setTimeout(() => {
      setHidden(true);
    }, 1850);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-[#0a0a0a] transition-opacity duration-300 pointer-events-none select-none ${
        stage >= 6 ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-hidden={stage >= 6}
    >
      {/* Top Brand Indicator */}
      <div
        className={`pt-12 md:pt-16 flex justify-center transition-all duration-500 ${
          stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <Logo isScrolled={true} size="sm" />
      </div>

      {/* Central Fluid Pipe Indicator */}
      <div className="relative flex flex-col items-center justify-center my-auto w-12 h-44">
        {/* Background track (subtle boundary) */}
        <div className="absolute w-[1px] h-full bg-neutral-200" />

        {/* Central vertical filling line */}
        <div
          className="absolute w-[1.5px] bg-[#0a0a0a] transition-transform"
          style={{
            height: '100%',
            transformOrigin: stage >= 5 ? 'top' : 'bottom',
            transform: stage < 2 ? 'scaleY(0)' : stage >= 5 ? 'scaleY(0)' : 'scaleY(1)',
            transitionDuration: stage >= 5 ? '450ms' : '500ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Fluid pressure pulse node */}
        <div
          className="absolute w-2 h-2 rounded-full bg-[#0a0a0a] transition-all"
          style={{
            transform:
              stage < 3
                ? 'translateY(36px) scale(0.6)'
                : stage >= 5
                ? 'translateY(-60px) scale(0)'
                : 'translateY(0) scale(1)',
            opacity: stage < 3 ? 0 : stage >= 5 ? 0 : 1,
            transitionDuration: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Fluid side ticks - technical instrument feel */}
        <div className="absolute inset-y-0 flex flex-col justify-between py-2 text-[8px] font-mono text-neutral-300 pointer-events-none select-none -right-6">
          <span>01</span>
          <span>02</span>
          <span>03</span>
        </div>
      </div>

      {/* Bottom Technical Indicator */}
      <div
        className={`pb-12 md:pb-16 text-center transition-all duration-300 ${
          stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <span className="font-mono text-[10px] tracking-[0.32em] text-neutral-500 uppercase">
          Initializing System
        </span>
      </div>
    </div>
  );
}
