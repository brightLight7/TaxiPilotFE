import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import RegisterLogin from './RegisterLogin';

export default function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const disableGlobal = useAppStore((s) => s.disableGlobal);
  const navigate = useNavigate();

  function openSideMenu(type: 'sideMenu' | 'sideMenu1') {
    if (type === 'sideMenu1') {
      // user/login icon
      setSideMenuOpen(true);
      setShowLoginPanel(true);
    } else {
      // hamburger
      setSideMenuOpen(true);
      setShowLoginPanel(false);
    }
  }

  function closeMenu() {
    setSideMenuOpen(false);
    setShowLoginPanel(false);
  }

  function handleNavClick(path: string) {
    closeMenu();
    navigate(path);
  }

  // Close on backdrop click
  useEffect(() => {
    if (!sideMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sideMenuOpen]);

  return (
    <div id="id-navbar" className="navbar-container">
      <div className="navbar-content">
        {/* Brand */}
        <Link to="/home" className="navbar-brand" onClick={closeMenu}>
          TaxiPilot<span className="gatwick">Gatwick</span>
        </Link>

        <nav className="navbar-menu">
          {/* User icon */}
          <span className={disableGlobal ? 'disable-me' : 'enable-me'}>
            <button
              className={`my-account ${sideMenuOpen && showLoginPanel ? 'my-account-active' : ''}`}
              aria-label="Login"
              onClick={() => openSideMenu('sideMenu1')}
            >
              <i className="fa fa-user" aria-hidden="true" />
            </button>
          </span>

          {/* Hamburger */}
          <button
            className={`menu-bars ${disableGlobal ? 'disable-me' : ''} ${sideMenuOpen && !showLoginPanel ? 'my-account-active' : ''}`}
            onClick={() => openSideMenu('sideMenu')}
            aria-label="Menu"
          >
            <div className="element1" />
            <div className="element2" />
            <div className="element3" />
          </button>

          {/* Side menu backdrop + panel */}
          {sideMenuOpen && (
            <>
              <div className="side-menu-bg" onClick={closeMenu} />
              <div className="side-menu">
                {showLoginPanel ? (
                  /* Login / Register panel */
                  <div className="user-side-menu" style={{ padding: '16px' }}>
                    <RegisterLogin />
                  </div>
                ) : (
                  /* Navigation links */
                  <div className="menu-side-menu">
                    <button
                      onClick={() => handleNavClick('/home')}
                      style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(201,168,76,0.15)', width: '100%', fontSize: 15, color: '#C9A84C', height: 50, boxSizing: 'border-box' }}
                    >
                      <i className="fa fa-cab" aria-hidden="true" style={{ width: 20, fontSize: 20, color: '#C9A84C' }} />
                      <span>Book a Ride</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/privacy-policy')}
                      style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(201,168,76,0.15)', width: '100%', fontSize: 15, color: '#C9A84C', height: 50, boxSizing: 'border-box' }}
                    >
                      <i className="fa fa-book" aria-hidden="true" style={{ width: 20, fontSize: 20, color: '#C9A84C' }} />
                      <span>Privacy Policy</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/contact')}
                      style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(201,168,76,0.15)', width: '100%', fontSize: 15, color: '#C9A84C', height: 50, boxSizing: 'border-box' }}
                    >
                      <i className="fa fa-envelope" aria-hidden="true" style={{ width: 20, fontSize: 20, color: '#C9A84C' }} />
                      <span>Contact Us</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/admin-dashboard')}
                      style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(201,168,76,0.15)', width: '100%', fontSize: 15, color: '#C9A84C', height: 50, boxSizing: 'border-box' }}
                    >
                      <i className="fa fa-address-card" aria-hidden="true" style={{ width: 20, fontSize: 20, color: '#C9A84C' }} />
                      <span>Admin Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/admin-page')}
                      style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', cursor: 'pointer', width: '100%', fontSize: 15, color: '#C9A84C', height: 50, boxSizing: 'border-box' }}
                    >
                      <i className="fa fa-address-card" aria-hidden="true" style={{ width: 20, fontSize: 20, color: '#C9A84C' }} />
                      <span>Admin</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
