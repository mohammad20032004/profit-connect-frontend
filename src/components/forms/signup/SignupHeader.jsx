import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../../common'; // Import the Logo component

export default function SignupHeader() {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, md: 4 }, // Reduced padding for better alignment
        py: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Logo /> 
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Already have an account?
        </Typography>
        <Link href="/log-in" passHref>
          <Button variant="contained" color="primary">
            Log In
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
