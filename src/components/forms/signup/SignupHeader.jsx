import React from 'react'
import { Box, Typography, Stack , Button} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
export default function SignupHeader() {

const themeColors = {
  primary: "#250047",
  accentCyan: "#00B4D8",
  bgLight: "#f7f5f8",
  textPurple: "#7445a1",
  textDark: "#140d1b",
  borderLight: "#dccdea"
};
  return (
    <Box component="header" sx={{ 
           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
           px: { xs: 2, md: 15 }, py: 2, bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider'
         }}>
           <Stack direction="row" spacing={1} alignItems="center">
             <Box sx={{ color: themeColors.primary, display: 'flex' }}>
                   <Image src="/logo/logo.svg" alt="Logo" width={38} height={38} />
             </Box>
             <Typography variant="h6" sx={{ fontWeight: 'bold', color: themeColors.textDark }}>
               Profit Connect
             </Typography>
           </Stack>
           <Stack direction="row" spacing={2} alignItems="center">
             <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
               Already have an account?
             </Typography>
             <Link href="/log-in">
             
             <Button variant="contained" sx={{ 
               bgcolor: themeColors.primary, fontWeight: 'bold', textTransform: 'none',
               '&:hover': { bgcolor: '#560ca3' }
             }}>
               Log In
             </Button></Link>
           </Stack>
         </Box>
  )
}
