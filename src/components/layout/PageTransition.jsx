'use client';

import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <main
      key={pathname}
      data-aos="fade-up"
      data-aos-duration="450"
      data-aos-easing="ease-out-cubic"
      data-aos-once="false"
    >
      {children}
    </main>
  );
}
