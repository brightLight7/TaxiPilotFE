'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useSiteState } from '@/lib/site-state';

export function Navbar() {
  const pathname = usePathname();
  const { showQuoteWindow, setShowQuoteWindow } = useSiteState();
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const isOnQuoteRoute = pathname === '/' || pathname.startsWith('/home');

  useEffect(() => {
    document.body.style.overflow = showLoginOverlay ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoginOverlay]);

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowLoginOverlay(false);
  }

  return (
    <>
      <div id="id-navbar" className={`navbar-container ${isOnQuoteRoute && !showQuoteWindow ? 'navbar-container--home' : ''}`}>
        <div className="navbar-content">
          <div className="brand-row">
            <button type="button" className="nav-menu-button" aria-label="Open menu">
              <i className="fa fa-bars" aria-hidden="true" />
              <span>Menu</span>
            </button>
            <Link href="/home" className="brand-name">
              <span className="brand-name-title">TaxiPilot</span>
              <span className="brand-name-desc">Gatwick Airport Transfers</span>
            </Link>
            <div className="nav-left-links">
              <Link
                href="/home"
                className={`cta-quote ${showQuoteWindow && isOnQuoteRoute ? 'is-disabled' : ''}`}
                onClick={() => setShowQuoteWindow(true)}
              >
                Get a quote
              </Link>
              <Link href="/contact" className={`nav-pill ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
              <Link href="/careers" className={`nav-pill ${pathname === '/careers' ? 'active' : ''}`}>Careers</Link>
            </div>
          </div>

          <nav className="navbar-menu">
            <div className="nav-links" />
            <span className="enable-me">
              <div className="auth-buttons">
                <button
                  type="button"
                  id="id-user-login"
                  aria-label="Login"
                  className="auth-btn auth-btn-login"
                  onClick={() => setShowLoginOverlay(true)}
                >
                  Sign in
                </button>
                <Link href="/registration-login" className="auth-btn auth-btn-signup" aria-label="Sign up">
                  Book now
                </Link>
              </div>
            </span>
          </nav>
        </div>
      </div>

      {showLoginOverlay && (
        <div className="login-overlay">
          <div className="login-overlay__panel">
            <button type="button" className="login-overlay__close" aria-label="Close login" onClick={() => setShowLoginOverlay(false)}>
              <i className="fa fa-times" aria-hidden="true" />
            </button>
            <div className="login-overlay__header">
              <h2>Welcome back</h2>
              <p>Sign in to access your bookings and quick shortcuts.</p>
            </div>
            <form className="login-overlay__form" onSubmit={handleLoginSubmit}>
              <label className="login-overlay__field">
                <span>Email or Username</span>
                <input type="text" name="login-username" autoComplete="username" required placeholder="you@example.com" />
              </label>
              <label className="login-overlay__field">
                <span>Password</span>
                <input type="password" name="login-password" autoComplete="current-password" required placeholder="Enter your password" />
              </label>
              <label className="login-overlay__checkbox">
                <input type="checkbox" name="stay-logged-in" />
                <span>Stay logged in</span>
              </label>
              <div className="login-overlay__links">
                <Link href="/registration-login" onClick={() => setShowLoginOverlay(false)}>Create an account</Link>
                <Link href="/forgot-password" onClick={() => setShowLoginOverlay(false)}>Forgot password?</Link>
              </div>
              <button type="submit" className="login-overlay__submit">Log in</button>
              <button type="button" className="login-overlay__secondary" onClick={() => setShowLoginOverlay(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
