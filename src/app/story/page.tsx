import type { Metadata } from 'next';
import { OurStoryClient } from '@/components/story/our-story-client';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about 181 Lounge - our history, mission, and commitment to serving premium coffee.',
};

export default function StoryPage() {
  return <OurStoryClient />;
}
