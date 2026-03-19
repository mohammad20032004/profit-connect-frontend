"use client";

import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';

export default function AlertsSidebar() {
  const filters = [
    { label: 'All Alerts', icon: <NotificationsIcon fontSize="small" />, active: true },
    { label: 'My Posts', icon: <MailIcon fontSize="small" />, active: false },
    { label: 'Mentions', icon: <AlternateEmailIcon fontSize="small" />, active: false },
    { label: 'Job Updates', icon: <WorkIcon fontSize="small" />, active: false },
  ];

  return (
    <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 3, position: 'sticky', top: 100, border: '1px solid #e1e3e4' }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#240046', mb: 3, fontFamily: 'Manrope, sans-serif' }}>
        Manage your Alerts
      </Typography>
      
      <Stack spacing={1}>
        {filters.map((item, index) => (
          <Button
            key={index}
            startIcon={item.icon}
            sx={{
              justifyContent: 'flex-start',
              px: 2,
              py: 1.5,
              borderRadius: 50,
              textTransform: 'none',
              fontWeight: 600,
              color: item.active ? '#004e5f' : '#4b444f',
              bgcolor: item.active ? '#b3ebff' : 'transparent',
              '&:hover': {
                bgcolor: item.active ? '#b3ebff' : '#f3f4f5',
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>

      <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #edeeef' }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#00B4D8',
            color: 'white',
            borderRadius: 50,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0 4px 6px rgba(0, 180, 216, 0.2)',
            '&:hover': { bgcolor: '#0096B4' }
          }}
        >
          New Rule
        </Button>
      </Box>
    </Box>
  );
}