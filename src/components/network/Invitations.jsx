import React from 'react';
import { Card, Box, Typography, Button, Avatar, Link } from '@mui/material';

export default function Invitations() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, mb: 3, border: '1px solid #e2e8f0' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#240046' }}>Invitations</Typography>
        <Link href="#" underline="hover" sx={{ color: '#00B4D8', fontWeight: 'bold', fontSize: '0.875rem' }}>
          Manage all
        </Link>
      </Box>
      
      {/* Invitation Row */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfnTLJod2Fb9SJ6UASdUkS9Kxzf3IV3XjjrGqtJEh7Rju3BXLpU9W3Jvf5Arx_GjgX3u5cV_n8pfSCe9E50LNtFoMD4D7a-mg-kSwGY64se7wOuJQ_nyzw7dbTzftgFKsJ-i6m05ig8_xZTOeNdM__II0AHoLDJM_bwBcL_46BHLXFvGZzulqb6hA8KlGErTTBSJn-PX68yh6J8uu9p7xTXgaBPO-krnmx36ZCaMScxrT6XTzxdTnfNfk6vUJGJBjh3kAMdQKb6o0" 
            sx={{ width: 56, height: 56, border: '1px solid #f1f5f9' }} 
          />
          <Box>
            <Typography sx={{ fontWeight: 'bold', color: '#240046', fontSize: '0.95rem' }}>Sarah Jenkins</Typography>
            <Typography sx={{ color: '#64748b', fontSize: '0.8rem' }}>Senior Product Designer at DesignStudio</Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '0.7rem', mt: 0.5 }}>2 weeks ago</Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button sx={{ color: '#64748b', fontWeight: 'bold', textTransform: 'none' }}>Ignore</Button>
          <Button 
            variant="outlined" 
            sx={{ 
              borderRadius: 20, 
              borderColor: '#00B4D8', 
              color: '#00B4D8', 
              fontWeight: 'bold',
              textTransform: 'none',
              px: 3,
              '&:hover': { borderColor: '#00B4D8', bgcolor: 'rgba(0, 180, 216, 0.05)' }
            }}
          >
            Accept
          </Button>
        </Box>
      </Box>
    </Card>
  );
}