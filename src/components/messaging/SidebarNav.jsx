'use client';

import { Box, Avatar, IconButton, Stack, Tooltip } from '@mui/material';
import { Home, Group, Chat, Notifications, Work, Settings } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarNav = () => {
  const pathname = usePathname();
  
  const navItems = [
    { icon: <Home />, label: 'Home', path: '/' },
    { icon: <Group />, label: 'Network', path: '/network' },
    { icon: <Chat />, label: 'Messaging', path: '/messaging' },
    { icon: <Notifications />, label: 'Notifications', path: '/notifications' },
    { icon: <Work />, label: 'Jobs', path: '/jobs' },
  ];

  return (
    <Box sx={{ 
      width: { xs: 60, md: 80 },
      height: '100%',
      bgcolor: '#1a1a1a',
      display: { xs: 'none', sm: 'flex' },
      flexDirection: 'column',
      alignItems: 'center',
      py: 2,
      gap: 3,
      borderRight: '1px solid #333'
    }}>
      
      <Stack spacing={2}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <Tooltip title={item.label} placement="right">
                <IconButton 
                  sx={{ 
                    color: isActive ? '#00b4d8' : 'grey.500',
                    bgcolor: isActive ? 'rgba(0, 180, 216, 0.1)' : 'transparent',
                    '&:hover': { color: '#00b4d8', bgcolor: 'rgba(0, 180, 216, 0.1)' }
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
          <IconButton sx={{ color: 'grey.500', '&:hover': { color: '#00b4d8' } }}>
            <Settings />
          </IconButton>
        </Tooltip>
        <Avatar 
          src="https://i.pravatar.cc/150?img=68" 
          sx={{ width: 36, height: 36, cursor: 'pointer', border: '2px solid #00b4d8' }} 
        />
      </Stack>
    </Box>
  );
}

export default SidebarNav;