import type { Metadata } from 'next';
import { StoresClient } from '@/components/stores/stores-client';

export const metadata: Metadata = {
  title: 'Find a Store',
  description: 'Find 181 Lounge locations near you. Over 100 stores nationwide.',
};

export default function StoresPage() {
  return <StoresClient />;
}
