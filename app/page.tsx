'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page on initial load
    router.push('/auth/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="text-white text-xl">Redirecting to login...</div>
    </div>
  );
}