import type { Metadata } from 'next';
import { CareersClient } from '@/components/careers/careers-client';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the 181 Lounge family. Explore career opportunities and grow with us.',
};

export default function CareersPage() {
  return <CareersClient />;
}
