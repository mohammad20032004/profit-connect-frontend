"use client";
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

  if (!authChecked) {
    return null;
  }

  if (!isAuthenticated) {
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
        background:
          'linear-gradient(180deg, #f7fbff 0%, #eef4ff 42%, #f8f6ff 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top left, rgba(56,189,248,0.22), transparent 24%), radial-gradient(circle at top center, rgba(255,255,255,0.82), transparent 32%), radial-gradient(circle at bottom right, rgba(91,33,182,0.16), transparent 26%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.35,
          pointerEvents: 'none',
        },
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
          borderRadius: { xs: 5, md: 6 },
          border: '1px solid rgba(255,255,255,0.5)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.5) 100%)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 28px 60px rgba(15,23,42,0.09)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.58) 0%, rgba(125,211,252,0.12) 34%, rgba(91,33,182,0.08) 100%)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 'auto -80px -120px auto',
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 72%)',
            pointerEvents: 'none',
          },
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
