import React from 'react';
import { Card, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';

export default function NetworkSidebar({ connectionsCount = 0, requestsCount = 0 }) {
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
            <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>{connectionsCount}</Typography>
          </ListItemButton>
          
          <Divider sx={{ mx: 2, opacity: 0.5 }} />

          <ListItemButton>
            <ListItemIcon><ContactsIcon sx={{ color: '#94a3b8' }} /></ListItemIcon>
            <ListItemText primary="Invitations" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8' }}>{requestsCount}</Typography>
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

      <Card variant="outlined" sx={{ borderRadius: 3, p: 2, border: '1px solid #e2e8f0', bgcolor: '#fafcff' }}>
        <Typography sx={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.7 }}>
          Invitations and accepted connections on this page now come directly from the network API.
        </Typography>
      </Card>
    </Box>
  );
}
