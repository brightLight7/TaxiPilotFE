import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import '@/index.css';

export const metadata: Metadata = {
  title: 'TaxiPilot Gatwick – Reliable Airport Taxi',
  description: 'TaxiPilot – Professional taxi and airport transfer service for Gatwick Airport. 24/7 availability, licensed drivers, transparent pricing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
        <div id="root">
          <Navbar />
          {children}
        </div>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
