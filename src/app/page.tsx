import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { BestSellersSection } from '@/components/home/best-sellers-section';
import { PromoBanner } from '@/components/home/promo-banner';
import { StoreLocatorPreview } from '@/components/home/store-locator-preview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BestSellersSection />
      <PromoBanner />
      <StoreLocatorPreview />
    </>
  );
}
