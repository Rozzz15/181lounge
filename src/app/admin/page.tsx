import type { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: '181 Lounge admin dashboard for managing products, stores, careers, and more.',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
