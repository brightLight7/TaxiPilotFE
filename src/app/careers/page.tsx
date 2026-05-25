import { PageShell } from '@/components/PageShell';

export default function Page() {
  return (
    <PageShell title="Careers">
      <p>Join TaxiPilot as a professional driver, dispatcher, or customer support specialist.</p>
      <div className="career-list">
        <article><h2>Licensed Drivers</h2><p>Work with airport and private hire passengers across Gatwick and surrounding areas.</p></article>
        <article><h2>Dispatch Support</h2><p>Help coordinate journeys, monitor flights, and keep customers informed.</p></article>
      </div>
    </PageShell>
  );
}
