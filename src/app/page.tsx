import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { FeaturedCarousel } from '@/components/home/featured-carousel';
import { ExperienceSection } from '@/components/home/experience-section';
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel';
import { PromoBanner } from '@/components/home/promo-banner';
import { DeliverySection } from '@/components/home/delivery-section';
import { PhotoGallery } from '@/components/ui/gallery';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedCarousel />
      <ExperienceSection />
      <TestimonialsCarousel />
      <PromoBanner />
      <DeliverySection />
      <PhotoGallery />
    </>
  );
}
