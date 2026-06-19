import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SplashScreen } from '@/components/splash-screen';

export const metadata: Metadata = {
  title: {
    default: "181 Lounge | Premium Coffee Experience",
    template: "%s | 181 Lounge",
  },
  description:
    "Experience premium coffee, delicious food, and warm hospitality at 181 Lounge.",
  keywords: [
    'coffee',
    '181 Lounge',
    'cafe',
    'espresso',
    'coffee shop',
    'premium coffee',
    'lounge',
  ],
  openGraph: {
    title: "181 Lounge",
    description: 'Experience the smooth, rich taste of premium coffee.',
    type: 'website',
    locale: 'en_PH',
    siteName: "181 Lounge",
  },
  twitter: {
    card: 'summary_large_image',
    title: "181 Lounge",
    description: 'Experience the smooth, rich taste of premium coffee.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SplashScreen />
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
