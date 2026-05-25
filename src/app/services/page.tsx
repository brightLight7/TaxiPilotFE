import { PageShell } from '@/components/PageShell';

const services = ['Gatwick airport pickup', 'Gatwick airport drop-off', 'Corporate travel', 'Group travel', 'City tours', 'Meet and greet'];

export default function Page() {
  return (
    <PageShell title="Our Services">
      <div className="service-list">
        {services.map((service) => (
          <article key={service}>
            <h2>{service}</h2>
            <p>Reliable TaxiPilot transport with professional drivers, clear fares, and journey support.</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
