import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire up to backend when email API is ready
    alert('Thank you! Your message has been sent.');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div className="page-content">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="content">
          <div className="left-section">
            <div className="email-section">
              <h2><i className="fas fa-envelope" /> Email Us</h2>
              <p>
                Have a question or need help? Our team is ready to assist you with any inquiries
                you may have about our services.
                <br />
                <strong>Email:</strong>{' '}
                <a href="mailto:support@taxipilot.com">support@taxipilot.com</a>
              </p>
            </div>

            <h2><i className="fas fa-paper-plane" /> Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    className="sm-input"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="sm-input"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    className="message sm-input"
                    name="message"
                    rows={8}
                    placeholder="Write your message here"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
