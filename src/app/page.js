"use client";
import { InfoPrfileSidebar, MainSection } from '@/components/layout';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasToken = Boolean(window.localStorage.getItem('profit_connect_token'));
    
    if (!hasToken) {
      router.push('/landing'); 
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // منع عرض محتوى الصفحة أثناء التحقق من التوكن لتجنب الوميض (Flicker)
  if (isChecking) return <div>جاري التحميل...</div>;

  return (
    
    <main className="page" style={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
      <section style={{ width: '25%', height: '100vh' }}>
        <InfoPrfileSidebar />
      </section>

      <section style={{ width: '75%', height: '100vh', overflowY: 'scroll' }}>
        <MainSection />
      </section>
    </main>
 
  );
}

