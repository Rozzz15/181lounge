import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { FeaturedCarousel } from '@/components/home/featured-carousel';
import { ExperienceSection } from '@/components/home/experience-section';
import { BestSellersSection } from '@/components/home/best-sellers-section';
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel';
import { PromoBanner } from '@/components/home/promo-banner';
import { DeliverySection } from '@/components/home/delivery-section';
import { BranchSection } from '@/components/home/branch-section';
import { PhotoGallery } from '@/components/ui/gallery';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => { document.title = '181 Lounge | Coffee, Books & Boardgames'; }, []);
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedCarousel />
      <ExperienceSection />
      <BestSellersSection />
      <TestimonialsCarousel />
      <PromoBanner />
      <DeliverySection />
      <BranchSection />
      <PhotoGallery />
    </>
  );
}
