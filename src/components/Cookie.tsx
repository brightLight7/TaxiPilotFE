import { useState, useEffect } from 'react';

const COOKIE_KEY = 'taxipilot_cookie_accepted';

export default function Cookie() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="banner">
      <p>
        We use cookies to improve your experience on our site. By continuing to use this site, you
        accept our use of cookies.{' '}
        <a href="/privacy-policy" style={{ color: '#ffc107' }}>
          Learn more
        </a>
      </p>
      <button className="sm-btn sm-btn-taxi sm-btn-md" onClick={accept}>
        Continue
      </button>
    </div>
  );
}
