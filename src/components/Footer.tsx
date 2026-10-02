import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigateToBooking: () => void;
}

export function Footer({ onNavigateToBooking }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white border-t border-neutral-800/80 pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 sm:pb-24 border-b border-neutral-800/80">
          {/* Column 1: Brand & Office Location (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo inverted={true} size="lg" />
            <div className="text-sm text-neutral-400 font-light leading-relaxed pt-2">
              <p>930 Cedar St</p>
              <p>Santa Ana, CA 92701</p>
            </div>
            <div className="pt-1">
              <a
                href="tel:6573002460"
                className="inline-flex items-center gap-2 font-mono text-sm text-neutral-200 hover:text-white transition-colors group"
                data-cursor-cta="true"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>(657) 300-2460</span>
              </a>
            </div>
          </div>

          {/* Column 2: Minimal Navigation Index (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500 block font-medium">
              Navigation
            </span>
            <nav className="flex flex-col space-y-2.5 text-sm font-light text-neutral-400">
              <button
                onClick={() => scrollTo('services')}
                className="hover:text-white transition-colors text-left flex items-center justify-between group py-0.5"
                data-cursor-cta="true"
              >
                <span>Plumbing</span>
                <span className="font-mono text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">01</span>
              </button>
              <button
                onClick={() => scrollTo('technical')}
                className="hover:text-white transition-colors text-left flex items-center justify-between group py-0.5"
                data-cursor-cta="true"
              >
                <span>Water Heaters</span>
                <span className="font-mono text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">02</span>
              </button>
              <button
                onClick={onNavigateToBooking}
                className="hover:text-white transition-colors text-left flex items-center justify-between group py-0.5"
                data-cursor-cta="true"
              >
                <span>Contact</span>
                <span className="font-mono text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">03</span>
              </button>
            </nav>
          </div>

          {/* Column 3: Discreet 'Follow' Section (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500 block font-medium">
              Follow
            </span>
            <ul className="flex flex-col space-y-2 text-sm font-light text-neutral-400">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Robinson+Brothers+Plumbing+Santa+Ana+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group py-0.5"
                  data-cursor-cta="true"
                >
                  <span>Google Business</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.yelp.com/search?find_desc=Robinson+Brothers+Plumbing&find_loc=Santa+Ana%2C+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group py-0.5"
                  data-cursor-cta="true"
                >
                  <span>Yelp</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group py-0.5"
                  data-cursor-cta="true"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group py-0.5"
                  data-cursor-cta="true"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group py-0.5"
                  data-cursor-cta="true"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                </a>
              </li>
            </ul>
          </div>


          {/* Column 5: Back to Top (Span 1) */}
          <div className="lg:col-span-1 flex flex-col justify-start lg:items-end space-y-4">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500 block font-medium">
              Top
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center w-9 h-9 border border-neutral-800 hover:border-neutral-600 rounded-md text-neutral-400 hover:text-white transition-all group"
              data-cursor-cta="true"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-neutral-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Robinson Brothers Plumbing. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-neutral-500">
            <span>930 Cedar St, Santa Ana, CA 92701</span>
            <span aria-hidden="true">·</span>
            <span>(657) 300-2460</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
