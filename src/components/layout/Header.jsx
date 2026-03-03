'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  Avatar,
  Container,
  Stack,
  Badge,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsIcon from '@mui/icons-material/Apps'; // For the "Business" grid icon
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import JobHeader from '../jobs/JobHeader';
import Logo from '../common/Logo';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: '#edf3f8', // لون خلفية رمادي فاتح جداً
  '&:hover': {
    backgroundColor: '#e1e9f1',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '280px',
  },
  [theme.breakpoints.up('md')]: {
    width: '340px', // العرض في الشاشات الأكبر
  },
  transition: 'width 0.3s',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`, // مساحة للأيقونة
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '14px',
    color: '#000',
  },
}));


const navItems = [
  { label: 'Home', icon: <HomeIcon />, hasBadge: false, link: '/' },
  { label: 'Network', icon: <PeopleIcon />, hasBadge: false, link: '/network' },
  { label: 'Jobs', icon: <WorkIcon />, hasBadge: false, link: '/jobs' },
  { label: 'Messaging', icon: <MessageIcon />, hasBadge: false, link: 'messaging' },
  { label: 'Alerts', icon: <NotificationsIcon />, hasBadge: true, link: 'alerts' },
];

const Header = () => {
  const pathname = usePathname();
  // أضفنا '/sign-out' للقائمة
  const hiddenRoutes = ['/log-in', '/sing-up', '/sign-out'];
  const jobRoutes = ['/jobs', '/jobs/search', '/jobs/post'];

  const isJobRoute = jobRoutes.some((route) => pathname.startsWith(route));
  const shouldHideHeader = hiddenRoutes.some((route) => pathname.startsWith(route));

  if (shouldHideHeader) return null;
  if (isJobRoute) return <JobHeader />;
  return (
    <AppBar
      position="sticky"
      elevation={0} // إزالة الظل الافتراضي ليكون مسطحاً
      sx={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        color: '#000'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '52px !important', justifyContent: 'space-between' }}>

          {/* ========== Left Side: Logo & Search ========== */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

<Logo />
            {/* Search Bar */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for jobs, skills, or people"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>
          </Box>

          {/* ========== Right Side: Navigation Icons ========== */}
          <Stack direction="row" spacing={{ xs: 2, md: 4 }} alignItems="center" sx={{ height: '52px' }}>

            {navItems.map((item) => {
              const isActive = pathname === item.link;
              return (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    position: 'relative',
                    color: isActive ? '#191919' : '#666666',
                    '&:hover': { color: '#191919' },
                    width: { md: '60px', xs: 'auto' }
                  }}
                >
                  <Link href={item.link}>
                    <Badge color="error" variant="dot" invisible={!item.hasBadge}>
                      {React.cloneElement(item.icon, { sx: { fontSize: 26 } })}
                    </Badge>
                    <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' }, fontSize: '12px' }}>
                      {item.label}
                    </Typography>
                  </Link>

                  {isActive && (
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      bgcolor: '#191919'
                    }} />
                  )}
                </Box>
              );
            })}

            {/* Profile Dropdown */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderLeft: '1px solid #e0e0e0',
              pl: 3,
              height: '100%',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Avatar
                alt="User Profile"
                src="https://i.pravatar.cc/150?img=68"
                sx={{ width: 24, height: 24 }}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
                  Me
                </Typography>
                <ArrowDropDownIcon sx={{ fontSize: 16, color: '#666' }} />
              </Box>
            </Box>

            {/* Business Link */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#666',
              '&:hover': { color: '#191919' }
            }}>
              <AppsIcon sx={{ fontSize: 24 }} />
              <Typography variant="caption" sx={{ fontSize: '12px' }}>
                For Business
              </Typography>
            </Box>

          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
