'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard page
    router.push('/dashboard');
  }, [router]);
  
  // Return minimal content (will only briefly show before redirect)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Redirecting to dashboard...</div>
    </div>
  );
}