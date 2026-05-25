import { PageShell } from '@/components/PageShell';

export default function Page() {
  return (
    <PageShell title="Contact Us">
      <div className="contact-grid">
        <form className="contact-form">
          <label><span>Name</span><input name="name" /></label>
          <label><span>Email</span><input name="email" type="email" /></label>
          <label><span>Message</span><textarea name="message" rows={5} /></label>
          <button className="sm-btn sm-btn-primary" type="submit">Send Message</button>
        </form>
        <div className="contact-card">
          <h2>TaxiPilot support</h2>
          <p>Email: info@taxipilot.co.uk</p>
          <p>Phone: +44 0000 000000</p>
          <p>Available for airport transfers, private hire, and account enquiries.</p>
        </div>
      </div>
    </PageShell>
  );
}
