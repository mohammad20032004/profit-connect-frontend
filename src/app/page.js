"use client";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ProfileSidebar, MainSection } from '@/components/layout';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const authChecked = useSelector((state) => state.user.authChecked);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.replace('/landing');
    }
  }, [authChecked, isAuthenticated, router]);

  if (!authChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="page" style={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
      <section style={{ width: '25%', height: '100vh' }}>
        <ProfileSidebar />
      </section>

      <section style={{ width: '75%', height: '100vh', overflowY: 'scroll' }}>
        <MainSection />
      </section>
    </main>
  );
}
