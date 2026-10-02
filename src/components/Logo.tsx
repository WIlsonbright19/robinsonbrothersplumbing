interface LogoProps {
  className?: string;
  isScrolled?: boolean;
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({
  className = '',
  isScrolled = false,
  inverted = false,
  size = 'md',
}: LogoProps) {
  // Determine color scheme
  const isDark = inverted || !isScrolled;
  const strokeColor = isDark ? '#ffffff' : '#0a0a0a';
  const textColor = isDark ? 'text-white' : 'text-[#0a0a0a]';
  const subtextColor = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const badgeBg = isDark ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/15';

  if (size === 'lg') {
    return (
      <div className={`flex flex-col items-start gap-3 select-none ${className}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-md border ${badgeBg} flex items-center justify-center p-1.5 shrink-0`}>
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 4V12C4 15.3137 6.68629 18 10 18H20"
                stroke={strokeColor}
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                d="M10 4V9C10 10.6569 11.3431 12 13 12H20"
                stroke={strokeColor}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeOpacity="0.5"
              />
              <circle cx="4" cy="4" r="1.5" fill={strokeColor} />
              <circle cx="20" cy="18" r="1.5" fill={strokeColor} />
            </svg>
          </div>
          <div>
            <span className={`block font-sans text-lg sm:text-xl font-medium tracking-[0.16em] uppercase ${textColor} leading-none`}>
              Robinson Brothers
            </span>
            <span className={`block font-mono text-[9px] tracking-[0.28em] uppercase ${subtextColor} mt-1 leading-none`}>
              Plumbing · Santa Ana, CA
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Precision Geometric Manifold Emblem */}
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md border ${badgeBg} flex items-center justify-center p-1 sm:p-1.5 shrink-0 transition-colors duration-200`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Primary flow conduit */}
          <path
            d="M4 4V12C4 15.3137 6.68629 18 10 18H20"
            stroke={strokeColor}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Secondary parallel pressure channel */}
          <path
            d="M10 4V9C10 10.6569 11.3431 12 13 12H20"
            stroke={strokeColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />
          <circle cx="4" cy="4" r="1.5" fill={strokeColor} />
          <circle cx="20" cy="18" r="1.5" fill={strokeColor} />
        </svg>
      </div>

      {/* Bespoke Editorial Typographic Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-sans text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase ${textColor} transition-colors duration-200`}
        >
          Robinson Brothers
        </span>
      </div>
    </div>
  );
}
