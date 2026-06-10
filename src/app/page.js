'use client';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ActiveCompaniesSidebar, MainSection, ProfileSidebar } from '@/components/layout';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const authChecked = useSelector((state) => state.user.authChecked);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.replace('/landing');
    }
  }, [authChecked, isAuthenticated, router]);

  if (!authChecked || !isAuthenticated) {
    return null;
  }

  return (
    <Box
      component="main"
      className="page"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'minmax(240px, 0.95fr) minmax(0, 1.8fr) minmax(260px, 1fr)',
        },
        gap: { xs: 2, lg: 2.5 },
        p: { xs: 1.5, md: 2 },
        alignItems: 'start',
        position: 'relative',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box component="section" sx={{ minWidth: 0, order: { xs: 2, lg: 1 }, position: 'relative', zIndex: 1 }}>
        <ProfileSidebar />
      </Box>

      <Box
        component="section"
        sx={{
          minWidth: 0,
          order: { xs: 1, lg: 2 },
          position: 'relative',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <MainSection />
      </Box>

      <Box component="section" sx={{ minWidth: 0, order: { xs: 3, lg: 3 }, position: 'relative', zIndex: 1 }}>
        <ActiveCompaniesSidebar />
      </Box>
    </Box>
  );
}
