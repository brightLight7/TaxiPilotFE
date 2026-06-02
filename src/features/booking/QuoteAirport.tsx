import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store/appStore';
import { getGoogleMapInfo } from '../services/api';
import { getLocalItem, setLocalItem } from '../services/localStorage';
import type { GoogleMapInfo } from '../models/googleMapApi';
import MapComponent from './MapComponent';

interface Props {
  mobileLocation?: string;
  mobilePostcode?: string;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getArrivalTime(dateTimeStr: string, durationStr: string): string {
  const [datePart, timePart] = dateTimeStr.split(' ');
  if (!datePart || !timePart) return '';
  const [y, mo, d] = datePart.split('-').map(Number);
  const [h, min] = timePart.split(':').map(Number);

  const arrive = new Date(y, mo - 1, d, h, min);

  const hrMatch = durationStr.match(/(\d+)\s*hr/);
  const minMatch = durationStr.match(/(\d+)\s*min/);
  arrive.setHours(arrive.getHours() + (hrMatch ? parseInt(hrMatch[1]) : 0));
  arrive.setMinutes(arrive.getMinutes() + (minMatch ? parseInt(minMatch[1]) : 0));

  const pickup = new Date(y, mo - 1, d);
  const nextDay = arrive.toDateString() !== pickup.toDateString() ? ' (+1)' : '';

  return `${String(arrive.getHours()).padStart(2, '0')}:${String(arrive.getMinutes()).padStart(2, '0')}${nextDay}`;
}

function AutocompleteInput({
  id,
  placeholder,
  value,
  onAddressSelect,
  onLatLngSelect,
}: {
  id: string;
  placeholder: string;
  value: string;
  onAddressSelect: (addr: string) => void;
  onLatLngSelect: (lat: number, lng: number, addr: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const acRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current || !window.google) return;
    if (acRef.current) return;

    acRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      componentRestrictions: { country: 'gb' },
    });

    acRef.current.addListener('place_changed', () => {
      const place = acRef.current!.getPlace();
      const addr = place.formatted_address ?? '';
      const lat = place.geometry?.location?.lat() ?? 0;
      const lng = place.geometry?.location?.lng() ?? 0;
      onAddressSelect(addr);
      onLatLngSelect(lat, lng, addr);
    });
  }, [onAddressSelect, onLatLngSelect]);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      className="sm-input"
      placeholder={placeholder}
      defaultValue={value}
    />
  );
}

export default function QuoteAirport({ mobileLocation = '', mobilePostcode = '' }: Props) {
  const today = new Date();
  const minDate = formatDate(addDays(today, 2));
  const maxDate = formatDate(addMonths(today, 4));

  const {
    pickup, dest, datePickup, timePickup,
    setPickup, setDest, setDatePickup, setTimePickup,
    fareInfo, setFareInfo, addPlaceCoord,
    setShowQuoteWindow, setDisableGlobal, setSettingsObj,
    visitorPriceEnqCount, incrementPriceEnqCount,
  } = useAppStore();

  const [inputPickup, setInputPickup] = useState(pickup || mobileLocation);
  const [inputDest, setInputDest] = useState(dest);
  const [fCtrlDate, setFCtrlDate] = useState(datePickup || minDate);
  const [fCtrlTime, setFCtrlTime] = useState(timePickup || '09:00');

  const [isLoading, setIsLoading] = useState(false);
  const [fareInfoLocal, setFareInfoLocal] = useState<GoogleMapInfo | null>(null);
  const [distanceMiles, setDistanceMiles] = useState(0);
  const [distanceKM, setDistanceKM] = useState(0);
  const [duration, setDuration] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const showGetQuoteButton = inputPickup.trim() !== '' && inputDest.trim() !== '';

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if registration should be shown
    const counter = getLocalItem<{ counter: number }>('get-fare-clicked-counter');
    if (counter && counter.counter > 10) {
      setShowRegistration(true);
      setSettingsObj({ showLogin: true });
    }
  }, [setSettingsObj]);

  useEffect(() => {
    // Pre-fill postcode if known
    if (mobilePostcode === 'RH6 0NN') setInputPickup('Gatwick Airport - South Terminal');
    if (mobilePostcode === 'RH6 0PH') setInputPickup('Gatwick Airport - North Terminal');
  }, [mobilePostcode]);

  const handlePickupSelect = useCallback((addr: string) => {
    setInputPickup(addr);
    setPickup(addr);
  }, [setPickup]);

  const handleDestSelect = useCallback((addr: string) => {
    setInputDest(addr);
    setDest(addr);
  }, [setDest]);

  const handlePickupLatLng = useCallback((lat: number, lng: number, addr: string) => {
    addPlaceCoord({ addr, latitude: lat, longitude: lng });
  }, [addPlaceCoord]);

  const handleDestLatLng = useCallback((lat: number, lng: number, addr: string) => {
    addPlaceCoord({ addr, latitude: lat, longitude: lng });
  }, [addPlaceCoord]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const counter = getLocalItem<{ counter: number }>('get-fare-clicked-counter');
    const currentCount = counter?.counter ?? 0;

    if (currentCount > 10) {
      setShowRegistration(true);
      setSettingsObj({ showLogin: true });
      return;
    }

    if (!inputPickup || !inputDest) return;

    setIsLoading(true);

    const pickupDateTime = `${fCtrlDate} ${fCtrlTime}`;

    try {
      const info = await getGoogleMapInfo('6', '6', pickupDateTime, 'Crawley', inputPickup, inputDest);

      const miles = Math.round(parseFloat(info.distance ?? '0') * 100) / 100;
      const km    = Math.round(miles * 1.60934 * 100) / 100;

      setDistanceMiles(miles);
      setDistanceKM(km);
      setDuration(info.duration ?? '');
      setArrivalTime(getArrivalTime(pickupDateTime, info.duration ?? ''));
      setFareInfoLocal(info);
      setFareInfo(info);

      const newCount = currentCount + 1;
      incrementPriceEnqCount();
      setLocalItem('get-fare-clicked-counter', { counter: newCount });
    } catch (err) {
      console.error('Fare fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function closeQuoteWindow() {
    setShowQuoteWindow(false);
    setDisableGlobal(false);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFCtrlDate(e.target.value);
    setDatePickup(e.target.value);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [h, m] = e.target.value.split(':').map(Number);
    const roundedMin = Math.round(m / 5) * 5;
    const newTime = `${String(h).padStart(2, '0')}:${String(roundedMin).padStart(2, '0')}`;
    setFCtrlTime(newTime);
    setTimePickup(newTime);
  }

  return (
    <>
      <div className={`div-quote-container${fadeIn ? ' fade-in' : ''}`}>
        {/* Left panel */}
        <div className="left-pan">
          <div id="div-quote" className="flex-container-quote-window">
            <i
              className="fa fa-close quote-window-close"
              aria-hidden="true"
              onClick={closeQuoteWindow}
              style={{ cursor: 'pointer', position: 'absolute', top: 10, right: 10, fontSize: 16, color: '#dbd8d8', border: '1px solid #cb8888', borderRadius: '50%', padding: '2px 4px', background: '#97211d' }}
            />

            <div className="quote-header">
              <p>Quote &amp; Book</p>
              <span className="swap-icon-div">
                <i className="fa fa-sync-alt" aria-hidden="true" style={{ cursor: 'pointer', color: '#ffc107', fontSize: 18 }} />
              </span>
            </div>

            <form autoComplete="off" onSubmit={onSubmit}>
              <div id="pickup-dest-inputs" style={{ marginBottom: 8 }}>
                <div className="pickup-dest-div">
                  <div id="div-pickup">
                    {/* Pickup autocomplete */}
                    <label style={{ fontSize: 12, color: '#888', marginBottom: 2, display: 'block' }}>Pickup from</label>
                    <AutocompleteInput
                      id="pickup"
                      placeholder="Enter pickup address"
                      value={inputPickup}
                      onAddressSelect={handlePickupSelect}
                      onLatLngSelect={handlePickupLatLng}
                    />

                    {/* Destination autocomplete */}
                    <label style={{ fontSize: 12, color: '#888', marginBottom: 2, display: 'block' }}>Destination</label>
                    <AutocompleteInput
                      id="dest"
                      placeholder="Enter destination"
                      value={inputDest}
                      onAddressSelect={handleDestSelect}
                      onLatLngSelect={handleDestLatLng}
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div id="div-date-time" style={{ marginBottom: 8 }}>
                <div className="date-time-input-wrapper">
                  <div className="date-input-wrapper" style={{ flex: 1 }}>
                    <input
                      ref={dateInputRef}
                      id="inp-date"
                      type="date"
                      className="sm-input date-input"
                      min={minDate}
                      max={maxDate}
                      value={fCtrlDate}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  <input
                    ref={timeInputRef}
                    id="inp-time"
                    type="time"
                    className="sm-input"
                    value={fCtrlTime}
                    onChange={handleTimeChange}
                    style={{ width: 'auto', flex: '0 0 auto' }}
                  />
                </div>

                <input
                  type="submit"
                  className={`sm-btn sm-btn-taxi mt-0${!showGetQuoteButton ? ' disable-me' : ''}`}
                  value="Get Fare"
                  style={{ marginTop: 8 }}
                />
              </div>
            </form>

            {/* Fare info */}
            <div className="css-fare-info-parent">
              <div className="css-fare-info-child fade-in">
                {isLoading && (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
                    <i className="fa fa-spinner fa-spin" /> Calculating fare…
                  </div>
                )}

                {!isLoading && fareInfoLocal && (
                  <div className="fareInfo flex-css-fare-info">
                    <div className="fareInfo-price">
                      <div
                        className="fare-box tool-tip"
                        data-tooltip="The fare is determined by a third-party mapping tool. We may adjust it if we find it too high or too low."
                      >
                        <div className="fare">
                          <div>
                            <span className="gbp">£</span>
                            <span className="fare1">{fareInfoLocal.fare?.split(':')[0] ?? '0'}</span>
                            <span className="fare-point">.</span>
                            <span className="fare2">
                              {fareInfoLocal.fare?.split(':')[1] || '00'}
                            </span>
                          </div>
                          <span className="any-car">Any car</span>
                        </div>
                      </div>
                    </div>

                    <div className="fareInfo-otherData">
                      <div className="distance-duration">
                        <div className="distance">
                          <span>
                            <strong>Distance:</strong> {distanceMiles} miles ({distanceKM} Km)
                          </span>
                        </div>
                        <div className="duration">
                          <span>
                            <strong>Arrive by:</strong> {arrivalTime} ({duration})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel – Google Map */}
        <div className="right-pan">
          <MapComponent />
        </div>
      </div>

      {/* Registration prompt */}
      {showRegistration && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ background: 'white', padding: 32, borderRadius: 8, textAlign: 'center', maxWidth: 400 }}>
            <h4>Please register to continue</h4>
            <p>You have reached the free quote limit. Register to get unlimited quotes.</p>
            <button
              className="btn btn-danger btn-lg"
              onClick={() => setShowRegistration(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
