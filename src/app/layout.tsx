import type { Metadata } from 'next';
import 'font-awesome/css/font-awesome.min.css';
import './globals.scss';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'TaxiPilot',
  description: 'TaxiPilot airport transfers and private hire.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="under-construction">
          <h3>This site is under construction...</h3>
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
