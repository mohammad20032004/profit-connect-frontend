'use client';

import { Box, Avatar, IconButton, Stack, Tooltip } from '@mui/material';
import { Home, Group, Chat, Notifications, Work, Settings } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const SidebarNav = () => {
  const pathname = usePathname();
  const profile = useSelector((state) => state.user.profile);
  const user = useSelector((state) => state.user.user);
  
  const navItems = [
    { icon: <Home />, label: 'Home', path: '/' },
    { icon: <Group />, label: 'Network', path: '/network' },
    { icon: <Chat />, label: 'Messaging', path: '/messaging' },
    { icon: <Notifications />, label: 'Alerts', path: '/alerts' },
    { icon: <Work />, label: 'Jobs', path: '/jobs' },
  ];

  const avatarSrc = profile?.avatar || undefined;
  const avatarFallback = (profile?.fullname || user?.username || 'U').charAt(0).toUpperCase();

  return (
    <Box sx={{ 
      width: { xs: 60, md: 80 },
      height: '100%',
      bgcolor: 'rgba(255,255,255,0.55)',
      backdropFilter: 'blur(20px)',
      display: { xs: 'none', sm: 'flex' },
      flexDirection: 'column',
      alignItems: 'center',
      py: 2,
      gap: 3,
      borderRight: '1px solid rgba(226,232,240,0.85)',
      boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.5)'
    }}>
      
      <Stack spacing={2}>
        {navItems.map((item) => {
          const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
          return (
            <Link key={item.path} href={item.path}>
              <Tooltip title={item.label} placement="right">
                <IconButton 
                  sx={{ 
                    color: isActive ? '#5b21b6' : '#64748b',
                    bgcolor: isActive ? 'rgba(91, 33, 182, 0.12)' : 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(255,255,255,0.55)',
                    '&:hover': { color: '#5b21b6', bgcolor: 'rgba(91, 33, 182, 0.12)' }
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            </Link>
          );
        })}
      </Stack>

      <Stack spacing={2} sx={{ mt: 'auto' }}>
        <Tooltip title="Settings" placement="right">
          <IconButton sx={{ color: '#64748b', bgcolor: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.55)', '&:hover': { color: '#5b21b6' } }}>
            <Settings />
          </IconButton>
        </Tooltip>
        <Avatar 
          src={avatarSrc}
          sx={{ width: 36, height: 36, cursor: 'pointer', border: '2px solid rgba(91,33,182,0.25)', boxShadow: '0 8px 18px rgba(15,23,42,0.08)' }}
        >
          {avatarFallback}
        </Avatar>
      </Stack>
    </Box>
  );
}

export default SidebarNav;
