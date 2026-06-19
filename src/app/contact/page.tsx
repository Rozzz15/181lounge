import type { Metadata } from 'next';
import { ContactClient } from '@/components/contact/contact-client';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with 181 Lounge. We\'d love to hear from you.',
};

export default function ContactPage() {
  return <ContactClient />;
}
