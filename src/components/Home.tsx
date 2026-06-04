'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import bgImage1 from '@/assets/bg-images/1.jpg';
import bgImage2 from '@/assets/bg-images/2.jpg';
import bgImage3 from '@/assets/bg-images/3.jpg';
import cityTourImage from '@/assets/home-page/city-tour.jpg';
import corporateTravelImage from '@/assets/home-page/corporate-travel.jpg';
import groupTravelImage from '@/assets/home-page/group-travel.jpg';
import gatwickPickupImage from '@/assets/home-page/person-getting-into-taxi.jpg';
import { Footer } from '@/components/Footer';
import { QuoteAirport } from '@/components/QuoteAirport';
import { useSiteState } from '@/lib/site-state';

const heroBackgrounds = [bgImage1, bgImage2, bgImage3];

export function Home() {
  const { showQuoteWindow, setShowQuoteWindow } = useSiteState();

  if (showQuoteWindow) {
    return (
      <div className="map-container">
        <QuoteAirport />
      </div>
    );
  }

  return (
    <div className="welcome-section-container">
      <div className="welcome-section-container-absolute">
        <div className="quote-welcom-container">
          <HomeHero onQuote={() => setShowQuoteWindow(true)} />
        </div>
      </div>
      <div className="homepage-container">
        <OurService />
        <WhyChooseUs />
        <CustomerSay />
        <OurCommitment />
        <div className="anim cta-section">
          <h2>Book Your Ride Today!</h2>
          <div className="div-wrapper">
            <p>
              Experience the comfort and reliability of TaxiPilot. Whether you&apos;re heading to the airport,
              going on a city tour, or need corporate transport, we&apos;ve got you covered. Book now and enjoy
              the best taxi service in town.
            </p>
            <button type="button" onClick={() => setShowQuoteWindow(true)} className="cta-button sm-btn sm-btn-primary">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <MessageBar />
      <Footer />
      <CookieBanner />
    </div>
  );
}

function HomeHero({ onQuote }: { onQuote: () => void }) {
  const [heroBackground, setHeroBackground] = useState(heroBackgrounds[0]);
  useEffect(() => { setHeroBackground(heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)]); }, []);




  return (
    <section className="hero">
      <Image
        src={heroBackground}
        alt=""
        className="hero__bg"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__rule" aria-hidden="true" />
        <h1>
          Gatwick airport
          <span>transfers you deserve</span>
        </h1>
        <p className="hero__lead">
          Book your airport transfer, city ride, or executive car with TaxiPilot, the trusted choice for Gatwick
          journeys, business travel, and private hire across London.
        </p>
        <div className="hero__actions">
          <button type="button" className="hero__quote-button" onClick={onQuote}>
            Get a quote <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function OurService() {
  const services = [
    {
      image: gatwickPickupImage,
      title: 'Gatwick Pickup',
      alt: 'Passenger getting into a taxi',
      text: 'Arrive stress-free with our Gatwick Airport pickup. Our professional drivers greet you at the terminal and assist with luggage for a comfortable start to your journey.',
    },
    {
      image: corporateTravelImage,
      title: 'Corporate Travel',
      alt: 'Corporate taxi travel',
      text: 'Our corporate travel service offers efficiency, comfort, and professionalism with modern vehicles and experienced drivers available 24/7.',
    },
    {
      image: groupTravelImage,
      title: 'Group Travel',
      alt: 'Group taxi travel',
      text: 'Spacious vehicles and professional drivers for events, tours, and group occasions, with flexible booking options for every party size.',
    },
    {
      image: cityTourImage,
      title: 'City Tours',
      alt: 'London city tour taxi service',
      text: 'Make the most of your transit time with a quick London city tour designed around airport pickups and drop-offs.',
    },
  ];

  return (
    <div className="anim icon-camera services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map(({ image, title, alt, text }) => (
          <div className="service-item" key={title}>
            <Image src={image} alt={alt} width={420} height={260} />
            <div className="p-desc"><p><strong>{title}:</strong> {text}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyChooseUs() {
  return (
    <div className="anim why-choose-us-section">
      <h2>Why Choose TaxiPilot?</h2>
      <p>At TaxiPilot, we go the extra mile to ensure our passengers enjoy a comfortable and safe journey. Here&apos;s why we stand out:</p>
      <ul>
        <li><i className="fa fa-clock-o" /><h3>24/7 Availability:</h3><p>No matter when you need a ride, our services are available around the clock.</p></li>
        <li><i className="fa fa-user" /><h3>Professional Drivers</h3><p>All our drivers are fully licensed, experienced, and committed to your safety and comfort.</p></li>
        <li><i className="fa fa-car" /><h3>Modern Fleet</h3><p>Our fleet of vehicles is regularly maintained, ensuring reliability and comfort during every ride.</p></li>
        <li><i className="fa fa-mobile" /><h3>Flexible Booking</h3><p>Book your ride easily through our online platform, mobile app, or by phone.</p></li>
        <li><i className="fa fa-envelope" /><h3>Customer Support</h3><p>Our dedicated support team is always available to assist with your queries or special requests.</p></li>
      </ul>
    </div>
  );
}

function CustomerSay() {
  return (
    <div className="anim testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-container">
        <div className="testimonial-item"><p>&quot;TaxiPilot has been my go-to taxi service for years! The drivers are always punctual, polite, and the cars are spotless.&quot;</p><span>- Sarah J.</span></div>
        <div className="testimonial-item"><p>&quot;I travel frequently for business and I always rely on TaxiPilot for my airport transfers. They&apos;re always on time and the service is excellent.&quot;</p><span>- Michael P.</span></div>
        <div className="testimonial-item"><p>&quot;The best part of TaxiPilot is their drivers. They are friendly and professional, and I always feel safe during the ride.&quot;</p><span>- Rachel L.</span></div>
      </div>
    </div>
  );
}

function OurCommitment() {
  return (
    <div className="anim safety-commitment-section">
      <h2>Our Commitment to Your Safety</h2>
      <p>At TaxiPilot, we take your safety seriously. Our vehicles are equipped with the latest safety features, and all our drivers are rigorously trained and vetted to ensure your peace of mind.</p>
    </div>
  );
}

function MessageBar() {
  return <div className="message-bar">Need help with a booking? Call us or request a quote online.</div>;
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(localStorage.getItem('cookie-ok') !== '1'); }, []);
  if (!visible) return null;
  return (
    <div className="cookie-container">
      <p>We use cookies to improve your TaxiPilot booking experience.</p>
      <button type="button" onClick={() => { localStorage.setItem('cookie-ok', '1'); setVisible(false); }}>Accept</button>
    </div>
  );
}
