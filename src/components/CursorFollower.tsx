import { useEffect, useState, useRef } from 'react';

export function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const magnetOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on desktop pointer devices & without reduced motion
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering an image or image container
      const imgContainer = target.closest('img, [data-cursor-image="true"]');
      setIsHoveringImage(!!imgContainer);

      // Check if hovering CTA button or interactive link
      const ctaElement = target.closest('button, a, [data-cursor-cta="true"]');
      if (ctaElement) {
        setIsHoveringCTA(true);
        const rect = ctaElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Subtle magnetic pull (max 6-8px)
        const dx = (centerX - e.clientX) * 0.15;
        const dy = (centerY - e.clientY) * 0.15;
        magnetOffset.current = {
          x: Math.max(-7, Math.min(7, dx)),
          y: Math.max(-7, Math.min(7, dy)),
        };
      } else {
        setIsHoveringCTA(false);
        magnetOffset.current = { x: 0, y: 0 };
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;

    const animate = () => {
      // Smooth interpolation ~180-220ms feel (factor ~0.14)
      const factor = 0.16;
      currentPos.current.x += (targetPos.current.x + magnetOffset.current.x - currentPos.current.x) * factor;
      currentPos.current.y += (targetPos.current.y + magnetOffset.current.y - currentPos.current.y) * factor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 z-40 pointer-events-none transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHoveringImage
            ? 'w-10 h-10 border-white/60 bg-white/10 backdrop-invert-0 scale-[1.12]'
            : isHoveringCTA
            ? 'w-7 h-7 border-neutral-400 bg-neutral-900/10'
            : 'w-5 h-5 border-neutral-400/50 bg-transparent'
        }`}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isHoveringImage
              ? 'w-1 h-1 bg-white'
              : isHoveringCTA
              ? 'w-1.5 h-1.5 bg-neutral-900 dark:bg-white'
              : 'w-1 h-1 bg-neutral-500'
          }`}
        />
      </div>
    </div>
  );
}
