import { Footer } from '@/components/Footer';

export function PageShell({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <>
      <main className="static-page">
        <section className="static-page__hero">
          <h1>{title}</h1>
        </section>
        <section className="static-page__content">{children}</section>
      </main>
      <Footer />
    </>
  );
}
