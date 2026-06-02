import { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import QuoteAirport from '../components/QuoteAirport';
import OurService from '../components/sections/OurService';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import MessageBar from '../components/MessageBar';
import Footer from '../components/Footer';
import Cookie from '../components/Cookie';

const BG_IMAGES = ['/bg-images/1.jpg', '/bg-images/2.jpg', '/bg-images/3.jpg'];

export default function Home() {
  const showQuoteWindow = useAppStore((s) => s.showQuoteWindow);
  const setShowQuoteWindow = useAppStore((s) => s.setShowQuoteWindow);
  const setDisableGlobal = useAppStore((s) => s.setDisableGlobal);

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    setBgIndex(Math.floor(Math.random() * BG_IMAGES.length));
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % BG_IMAGES.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  function openQuoteWindow() {
    setShowQuoteWindow(true);
    setDisableGlobal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="page-content" style={{ paddingTop: 0 }}>
      {/* Quote window — full-screen block below navbar */}
      {showQuoteWindow && (
        <div className="map-container">
          <QuoteAirport />
        </div>
      )}

      <div className="welcome-section-container">
        {/* Hero with rotating background */}
        {!showQuoteWindow && (
          <div className="welcome-section-container-absolute">
            <div className="quote-welcom-container">
              {/* Background image with dark overlay */}
              <div className="bgImg-container">
                <img
                  src={BG_IMAGES[bgIndex]}
                  alt="Taxi service background"
                  className="bgImg-image"
                />
                <div className="overlay" />
              </div>

              {/* Glass panel — absolutely positioned over bg */}
              <div className="hero-flex-container">
                <div className="left-panel">
                  <h1>
                    Welcome to{' '}
                    <span className="brand">
                      TaxiPilot<span className="gatwick-text">Gatwick</span>
                    </span>{' '}
                    – Your Trusted Ride!
                  </h1>
                  <p>
                    Reliable, affordable, and professional taxi services for Gatwick Airport &amp;
                    beyond. Whether you're heading to the airport, a meeting, or just around town,
                    we ensure on-time pickups, safe journeys, and transparent pricing.
                  </p>
                  <ul className="hero-features">
                    <li>24/7 Availability</li>
                    <li>Comfortable &amp; Safe Rides</li>
                    <li>Easy Online Booking</li>
                  </ul>
                  <button className="hero-btn" onClick={openQuoteWindow}>
                    Book Your Ride
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content sections — visible, no hidden CTA/testimonials */}
        {!showQuoteWindow && (
          <div className="homepage-container">
            <OurService />
            <WhyChooseUs />
          </div>
        )}

        <MessageBar />
        {!showQuoteWindow && <Footer />}
        <Cookie />
      </div>
    </div>
  );
}
