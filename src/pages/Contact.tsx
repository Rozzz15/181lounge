import { ContactClient } from '@/components/contact/contact-client';
import { useEffect } from 'react';

export default function Contact() {
  useEffect(() => { document.title = 'Contact Us | 181 Lounge'; }, []);
  return <ContactClient />;
}
