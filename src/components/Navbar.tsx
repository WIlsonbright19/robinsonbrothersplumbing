import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigateToBooking: () => void;
}

export function Navbar({ onNavigateToBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile/tablet menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    onNavigateToBooking();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-250 ${
          scrolled
            ? 'bg-white/96 text-[#0a0a0a] border-b border-neutral-200/80 backdrop-blur-md py-3.5 translate-y-0 shadow-xs'
            : 'bg-transparent text-white py-5 md:py-6 -translate-y-0.5'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Bespoke Architectural Brand Lockup */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:opacity-90 transition-opacity focus:outline-none"
            aria-label="Robinson Brothers Plumbing Home"
          >
            <Logo isScrolled={scrolled} size="md" />
          </a>

          {/* Zone 2: Navigation links (Desktop only, >= lg: 1024px) */}
          <nav className="hidden lg:flex items-center gap-2 lg:gap-3 text-sm font-normal tracking-wide">
            <button
              onClick={() => scrollToSection('services')}
              className={`px-3.5 py-1.5 rounded-md transition-all duration-200 font-medium ${
                scrolled
                  ? 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
              data-cursor-cta="true"
            >
              Plumbing
            </button>
            <button
              onClick={() => scrollToSection('technical')}
              className={`px-3.5 py-1.5 rounded-md transition-all duration-200 font-medium ${
                scrolled
                  ? 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
              data-cursor-cta="true"
            >
              Water Heaters
            </button>
            <button
              onClick={handleContactClick}
              className={`px-3.5 py-1.5 rounded-md transition-all duration-200 font-medium ${
                scrolled
                  ? 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
              data-cursor-cta="true"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action & Tablet/Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            {/* Desktop "Get Service" CTA */}
            <button
              onClick={onNavigateToBooking}
              className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium tracking-wide rounded-md transition-all whitespace-nowrap ${
                scrolled
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm'
              }`}
              data-cursor-cta="true"
            >
              <span>Get Service</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Mobile & Tablet Slide-in Drawer Toggle (< lg: 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={`lg:hidden flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                scrolled
                  ? 'text-neutral-900 bg-neutral-100/80 hover:bg-neutral-200/80'
                  : 'text-white bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs'
              }`}
              data-cursor-cta="true"
            >
              <Menu className="w-5 h-5 stroke-[1.75]" />
              <span className="font-mono text-xs uppercase tracking-wider hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Slide-in Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile & Tablet Slide-in Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile and Tablet Navigation"
        className={`fixed top-0 right-0 bottom-0 w-[86vw] sm:w-[60vw] md:w-[48vw] max-w-md z-50 bg-[#0a0a0a] text-white border-l border-neutral-800 p-6 sm:p-8 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <Logo inverted={true} size="sm" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-neutral-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Nav Links with Rich Hover State */}
          <nav className="mt-8 flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('services')}
              className="flex items-center justify-between text-left py-3 px-3.5 rounded-lg border border-transparent hover:border-neutral-800 hover:bg-neutral-900/80 transition-all duration-200 group"
              data-cursor-cta="true"
            >
              <span className="text-lg sm:text-xl font-light tracking-tight text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                Plumbing
              </span>
              <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">01</span>
            </button>
            <button
              onClick={() => scrollToSection('technical')}
              className="flex items-center justify-between text-left py-3 px-3.5 rounded-lg border border-transparent hover:border-neutral-800 hover:bg-neutral-900/80 transition-all duration-200 group"
              data-cursor-cta="true"
            >
              <span className="text-lg sm:text-xl font-light tracking-tight text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                Water Heaters
              </span>
              <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">02</span>
            </button>
            <button
              onClick={handleContactClick}
              className="flex items-center justify-between text-left py-3 px-3.5 rounded-lg border border-transparent hover:border-neutral-800 hover:bg-neutral-900/80 transition-all duration-200 group"
              data-cursor-cta="true"
            >
              <span className="text-lg sm:text-xl font-light tracking-tight text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                Contact
              </span>
              <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">03</span>
            </button>
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <button
            onClick={handleContactClick}
            className="w-full py-3.5 bg-white text-[#0a0a0a] text-xs font-mono uppercase tracking-wider rounded-md font-medium hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
          >
            <span>Request Service</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <a
            href="tel:6573002460"
            className="w-full py-3.5 bg-neutral-900 border border-neutral-700/80 text-white text-xs font-mono uppercase tracking-wider rounded-md font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>(657) 300-2460</span>
          </a>

          <div className="text-[11px] font-mono text-neutral-500 leading-relaxed pt-1">
            930 Cedar St, Santa Ana, CA 92701<br />
            Residential & Commercial
          </div>
        </div>
      </div>
    </>
  );
}
