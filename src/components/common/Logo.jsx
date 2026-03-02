import React from 'react'
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
export default function Logo() {
  return (
                
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', py: 1.5 }}>
              {/* Logo Box */}
              <Box sx={{
                bgcolor: 'transparent', // Cyan Secondary Color
                borderRadius: '2px',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image src="/logo/logo.svg" alt="Logo" width={38} height={38} />
              </Box>
              {/* Logo Text */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 'bold',
                  color: '#240046', // Deep Purple Primary Color
                  letterSpacing: '-0.5px'
                }}
              >
                Profit Connect
              </Typography>
            </Box>

  )
}
