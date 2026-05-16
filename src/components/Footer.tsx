export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* About */}
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            TaxiPilot is committed to delivering exceptional, around-the-clock taxi services with a
            focus on <em>reliability</em>, <em>safety</em>, and <em>comfort</em>. Available 24/7,
            our service is tailored to meet your schedule—whether it's an early-morning airport
            pickup, a late-night drop-off, or your daily commute. With a modern, well-maintained
            fleet and professional drivers dedicated to customer care, we ensure every journey is
            smooth, <em>pleasant</em>, and <em>punctual</em>.
          </p>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <span>
            <img src="/assets/icons/whatsapp-icon.png" alt="WhatsApp" />
            <p>+4475088xxxxx</p>
          </span>
          <span>
            <img src="/assets/icons/envelope.png" alt="Email" />
            <p>support@taxipilot.com</p>
          </span>
        </div>

        {/* Social */}
        <div>
          <h3>Follow Us</h3>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TaxiPilot. All rights reserved.</p>
      </div>
    </footer>
  );
}
