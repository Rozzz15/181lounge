import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { useEffect } from 'react';

export default function Admin() {
  useEffect(() => { document.title = 'Admin Dashboard | 181 Lounge'; }, []);
  return <AdminDashboard />;
}
