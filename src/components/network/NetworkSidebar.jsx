import React from 'react';
import { Card, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Button, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';

export default function NetworkSidebar() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Card variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
        <Typography sx={{ p: 2, fontWeight: 'bold', color: '#240046', borderBottom: '1px solid #f1f5f9' }}>
          Manage my network
        </Typography>
        <List disablePadding>
          {/* Active State Example */}
          <ListItemButton sx={{ 
            bgcolor: 'rgba(224, 170, 255, 0.2)', // Light Lavender Opacity
            borderLeft: '4px solid #00B4D8', // Cyan Indicator
            '&:hover': { bgcolor: 'rgba(224, 170, 255, 0.3)' }
          }}>
            <ListItemIcon><PeopleIcon sx={{ color: '#240046' }} /></ListItemIcon>
            <ListItemText primary="Connections" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
            <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>1,240</Typography>
          </ListItemButton>
          
          <Divider sx={{ mx: 2, opacity: 0.5 }} />

          <ListItemButton>
            <ListItemIcon><ContactsIcon sx={{ color: '#94a3b8' }} /></ListItemIcon>
            <ListItemText primary="Contacts" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8' }}>482</Typography>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon><GroupsIcon sx={{ color: '#94a3b8' }} /></ListItemIcon>
            <ListItemText primary="Groups" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8' }}>12</Typography>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon><EventIcon sx={{ color: '#94a3b8' }} /></ListItemIcon>
            <ListItemText primary="Events" primaryTypographyProps={{ fontSize: '0.9rem' }} />
          </ListItemButton>
        </List>
      </Card>

      <Card variant="outlined" sx={{ borderRadius: 3, p: 2, textAlign: 'center', border: '1px solid #e2e8f0' }}>
        <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 1.5 }}>
          Add personal contacts to find connections faster.
        </Typography>
        <Button 
          variant="outlined" 
          fullWidth 
          sx={{ 
            borderRadius: 20, 
            borderColor: '#00B4D8', 
            color: '#00B4D8', 
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': { borderColor: '#00B4D8', bgcolor: 'rgba(0, 180, 216, 0.05)' }
          }}
        >
          Add Contacts
        </Button>
      </Card>
    </Box>
  );
}