import { MenuClient } from '@/components/menu/menu-client';
import { useEffect } from 'react';

export default function Menu() {
  useEffect(() => { document.title = 'Menu | 181 Lounge'; }, []);
  return <MenuClient />;
}
