import { useState, useCallback } from 'react';
import { Preloader } from './components/Preloader';
import { CursorFollower } from './components/CursorFollower';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CurvedImageHolder } from './components/CurvedImageHolder';
import { Services } from './components/Services';
import { StickyTechnicalSection } from './components/StickyTechnicalSection';
import { CurvedTransitionStrip } from './components/CurvedTransitionStrip';
import { TrustSection } from './components/TrustSection';
import { HorizontalServiceStrip } from './components/HorizontalServiceStrip';
import { EmergencySection } from './components/EmergencySection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { BookingSection } from './components/BookingSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingCallButton } from './components/FloatingCallButton';

export default function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [selectedService, setSelectedService] = useState('PLUMBING REPAIR');

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  const handleNavigateToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-neutral-800 selection:text-white relative">
      {/* Fluid-flow Technical Pre-loader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Desktop Cursor Follower */}
      <CursorFollower />

      {/* Minimal Top Navigation */}
      <Navbar onNavigateToBooking={() => handleNavigateToBooking()} />

      {/* Main Single Page Content */}
      <main className="relative w-full">
        {/* Cinematic Hero */}
        <Hero
          ready={heroReady}
          onNavigateToBooking={() => handleNavigateToBooking()}
        />

        {/* Signature Long Curved Image Holder with Negative-Margin Overlap */}
        <CurvedImageHolder />

        {/* Services Section */}
        <Services onSelectService={(service) => handleNavigateToBooking(service)} />

        {/* Sticky Technical Split Section */}
        <StickyTechnicalSection />

        {/* Curved Image Transition Strip with 8-12vw Offset */}
        <CurvedTransitionStrip />

        {/* Trust Section */}
        <TrustSection />

        {/* Horizontal Service Scroll Strip */}
        <HorizontalServiceStrip />

        {/* Emergency Photographic Section */}
        <EmergencySection />

        {/* Minimalist Editorial Testimonial Carousel */}
        <TestimonialCarousel />

        {/* In-Page Minimalist Booking Section (Replaces Pop-ups) */}
        <BookingSection
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />

        {/* Final Atmospheric CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer onNavigateToBooking={() => handleNavigateToBooking()} />

      {/* Floating Call Button */}
      <FloatingCallButton />
    </div>
  );
}
