import { BranchFranchiseClient } from '@/components/franchise/franchise-client';
import { useEffect } from 'react';

export default function Franchise() {
  useEffect(() => { document.title = 'Get a Branch | 181 Lounge'; }, []);
  return <BranchFranchiseClient />;
}
