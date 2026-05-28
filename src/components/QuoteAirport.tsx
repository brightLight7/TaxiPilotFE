'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import eightSeatersImage from '@/assets/icons/8seaters.jpg';
import executiveImage from '@/assets/icons/executive.jpg';
import saloonImage from '@/assets/icons/saloon.jpg';
import estateImage from '@/assets/icons/estate.jpg';
import mpv5Image from '@/assets/icons/mpv5.jpg';
import wcImage from '@/assets/icons/wc.jpg';
import { useSiteState } from '@/lib/site-state';

type JourneyDirection = 'from-gatwick' | 'to-gatwick';

const gatwickTerminals = [
  'Gatwick North Terminal',
  'Gatwick South Terminal',
];

const services = [
  {
    name: 'Saloon',
    image: saloonImage,
    people: 4,
    bags: 2,
    selected: true,
  },
  {
    name: 'Estate',
    image: estateImage,
    people: 4,
    bags: 2,
  },
  {
    name: 'Executive',
    image: executiveImage,
    people: 4,
    bags: 2,
  },
  {
    name: 'Wheelchair',
    image: wcImage,
    people: 4,
    bags: 4,
  },
  {
    name: 'MPV 5 Seater',
    image: mpv5Image,
    people: 5,
    bags: 4,
  },
  {
    name: '8 Seater MPV',
    image: eightSeatersImage,
    people: 8,
    bags: 6,
  },
];

export function QuoteAirport() {
  const { setShowQuoteWindow } = useSiteState();
  const [submitted, setSubmitted] = useState(false);
  const [journeyDirection, setJourneyDirection] = useState<JourneyDirection>('from-gatwick');
  const fromGatwick = journeyDirection === 'from-gatwick';

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="quote-window-page">
      <div className="quote-window-shell">
        <div className="quote-window-main">
          <div className="quote-mode-tabs" aria-label="Booking type">
            <button type="button" className="quote-mode-tabs__item quote-mode-tabs__item--active">
              <i className="fa fa-car" aria-hidden="true" />
              Book a Car
            </button>
            <button type="button" className="quote-mode-tabs__item">
              <i className="fa fa-truck" aria-hidden="true" />
              Multi-leg
            </button>
            <button type="button" className="quote-mode-tabs__item">
              <i className="fa fa-plane" aria-hidden="true" />
              Airport Pick Up
            </button>
            <button type="button" className="quote-mode-tabs__item">
              <i className="fa fa-cube" aria-hidden="true" />
              Book a Courier
            </button>
          </div>

          <div className="quote-account-tabs" aria-label="Gatwick journey direction">
            <button
              type="button"
              className={fromGatwick ? 'quote-account-tabs__active' : ''}
              onClick={() => setJourneyDirection('from-gatwick')}
            >
              From Gatwick
            </button>
            <button
              type="button"
              className={!fromGatwick ? 'quote-account-tabs__active' : ''}
              onClick={() => setJourneyDirection('to-gatwick')}
            >
              To Gatwick
            </button>
          </div>

          <form id="quote-window-form" onSubmit={onSubmit}>
            <section className="quote-panel journey-panel">
              <h2>Journey Details</h2>

              <JourneyField
                icon={fromGatwick ? 'fa-plane' : 'fa-map-marker'}
                iconTone="muted"
                label="Pick Up"
                placeholder={fromGatwick ? 'Select terminal' : 'Enter location'}
                name="pickup"
                options={fromGatwick ? gatwickTerminals : undefined}
              />

              <JourneyField
                icon={fromGatwick ? 'fa-map-marker' : 'fa-plane'}
                iconTone="dark"
                label="Drop Off"
                placeholder={fromGatwick ? 'Enter destination' : 'Select terminal'}
                name="dropoff"
                options={fromGatwick ? undefined : gatwickTerminals}
              />

              <JourneyField
                icon="fa-calendar-o"
                iconTone="yellow"
                label="Date of Journey"
                placeholder="ASAP"
                name="date"
              />

              <div className="journey-panel__footer">
                <button type="button">
                  More Options <i className="fa fa-caret-down" aria-hidden="true" />
                </button>
                <button type="button">Add Note</button>
              </div>
            </section>

            <section className="quote-panel service-panel">
              <h2>Choose Your Service</h2>
              <div className="service-options">
                {services.map((service) => (
                  <label
                    className={`service-option ${service.selected ? 'service-option--selected' : ''}`}
                    key={service.name}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.name}
                      defaultChecked={service.selected}
                    />
                    <span className="service-option__image">
                      <Image src={service.image} alt="" width={180} height={86} />
                    </span>
                    <span className="service-option__info-icon" aria-hidden="true">
                      <i className="fa fa-info" />
                    </span>
                    <span className="service-option__content">
                      <span className="service-option__title">{service.name}</span>
                      <span className="service-option__meta">
                        <span><i className="fa fa-users" aria-hidden="true" /> {service.people}</span>
                        <span><i className="fa fa-suitcase" aria-hidden="true" /> {service.bags}</span>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {submitted && (
              <p className="quote-window-success">Your booking details are ready to submit.</p>
            )}

            <button className="quote-window-mobile-submit" type="submit">
              Book Now
            </button>
          </form>
        </div>

        <aside className="quote-window-side">
          <div className="quote-map">
            <Image src="/assets/city-trafic.jpg" alt="London map preview" fill sizes="270px" />
            <div className="quote-map__label">London</div>
            <div className="quote-map__google">Google</div>
          </div>

          <div className="quote-progress-card">
            <div className="quote-steps">
              <QuoteStep active title="From" value="Information required" />
              <QuoteStep title="To" value="Information required" />
              <QuoteStep checked title="Service Type" value="Select" />
              <QuoteStep title="Passenger Details" value="Information required" />
              <QuoteStep title="Payment Details" value="Information required" />
            </div>

            <div className="quote-promo">
              Have a promo? Please <a href="/registration-login">sign in</a> to use
            </div>

            <button className="quote-book-button" type="submit" form="quote-window-form">
              Book Now
            </button>

            <p className="quote-terms">
              By booking you agree to our <a href="/privacy-policy">terms and conditions</a>
            </p>
          </div>
        </aside>
      </div>

      <button type="button" className="quote-window-back" onClick={() => setShowQuoteWindow(false)}>
        <i className="fa fa-arrow-left" aria-hidden="true" /> Back
      </button>
    </section>
  );
}

function JourneyField({
  icon,
  iconTone,
  label,
  placeholder,
  name,
  options,
}: {
  icon: string;
  iconTone: 'muted' | 'dark' | 'yellow';
  label: string;
  placeholder: string;
  name: string;
  options?: string[];
}) {
  const hasOptions = Boolean(options?.length);

  return (
    <div className="journey-field-wrap">
      <label className="journey-field">
        <span className={`journey-field__icon journey-field__icon--${iconTone}`}>
          <i className={`fa ${icon}`} aria-hidden="true" />
        </span>
        <span className="journey-field__body">
          <span className="journey-field__label">{label}</span>
          {hasOptions ? (
            <select name={name} defaultValue="">
              <option value="" disabled>{placeholder}</option>
              {options?.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input name={name} placeholder={placeholder} />
          )}
        </span>
        {hasOptions && (
          <span className="journey-field__caret">
            <i className="fa fa-caret-down" aria-hidden="true" />
          </span>
        )}
      </label>
      <button className="journey-field__edit" type="button">Edit Address</button>
    </div>
  );
}

function QuoteStep({
  title,
  value,
  active = false,
  checked = false,
}: {
  title: string;
  value: string;
  active?: boolean;
  checked?: boolean;
}) {
  return (
    <div className={`quote-step ${active ? 'quote-step--active' : ''} ${checked ? 'quote-step--checked' : ''}`}>
      <span className="quote-step__dot">{checked ? <i className="fa fa-check" aria-hidden="true" /> : null}</span>
      <span className="quote-step__content">
        <strong>{title}</strong>
        <span>{value}</span>
      </span>
    </div>
  );
}
