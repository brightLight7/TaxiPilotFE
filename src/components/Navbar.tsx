'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteState } from '@/lib/site-state';

export function Navbar() {
  const pathname = usePathname();
  const { showQuoteWindow, setShowQuoteWindow } = useSiteState();
  const isOnQuoteRoute = pathname === '/' || pathname.startsWith('/home');

  // useEffect(() => {
  //   document.body.style.overflow = showLoginOverlay ? 'hidden' : '';
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, [showLoginOverlay]);

  return (
    <>
      <div
        id="id-navbar"
        className={`navbar-container ${isOnQuoteRoute && !showQuoteWindow ? 'navbar-container--home' : ''}`}
      >
        <div className="navbar-content">
          <div className="brand-row">
            <button
              type="button"
              className="nav-menu-button"
              aria-label="Open menu"
            >
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
              <Link
                href="/contact"
                className={`nav-pill ${pathname === '/contact' ? 'active' : ''}`}
              >
                Contact
              </Link>
              <Link
                href="/careers"
                className={`nav-pill ${pathname === '/careers' ? 'active' : ''}`}
              >
                Careers
              </Link>
            </div>
          </div>

          <nav className="navbar-menu">
            <div className="nav-links" />
            <span className="enable-me">
              <div className="auth-buttons">
                <Link
                  href="/sign-in"
                  className="auth-btn auth-btn-login"
                  aria-label="Sign in"
                >
                  Sign in
                </Link>
                <Link
                  href="/registration-login"
                  className="auth-btn auth-btn-signup"
                  aria-label="Sign up"
                >
                  Book now
                </Link>
              </div>
            </span>
          </nav>
        </div>
      </div>
    </>
  );
}
