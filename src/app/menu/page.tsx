import { MenuClient } from '@/components/menu/menu-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our complete menu of premium coffees, cold drinks, breakfast, bakery, and lunch options.',
};

export default function MenuPage() {
  return <MenuClient />;
}
