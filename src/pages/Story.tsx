import { OurStoryClient } from '@/components/story/our-story-client';
import { useEffect } from 'react';

export default function Story() {
  useEffect(() => { document.title = 'Our Story | 181 Lounge'; }, []);
  return <OurStoryClient />;
}
