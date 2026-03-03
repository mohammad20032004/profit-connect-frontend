'use client';

import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, IconButton } from '@mui/material';
import { Search, Edit } from '@mui/icons-material';

const conversations = [
  { id: 1, name: 'Sarah Jenkins', role: 'Senior Product Designer', avatar: 'https://i.pravatar.cc/150?img=5', message: "I've attached the draft...", time: '10:45 AM', online: true, unread: 2 },
  { id: 2, name: 'Ahmed Hassan', role: 'React Developer', avatar: 'https://i.pravatar.cc/150?img=12', message: 'Thanks for the feedback!', time: 'Yesterday', online: false, unread: 0 },
  { id: 3, name: 'Emily Chen', role: 'AI/ML Engineer', avatar: 'https://i.pravatar.cc/150?img=9', message: 'Let me check the code', time: '2 days ago', online: true, unread: 0 },
  { id: 4, name: 'Marcus Williams', role: 'Backend Engineer', avatar: 'https://i.pravatar.cc/150?img=14', message: 'Meeting at 3 PM?', time: '3 days ago', online: false, unread: 0 },
  { id: 5, name: 'Lisa Anderson', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=47', message: 'CSS Grid is amazing!', time: '1 week ago', online: true, unread: 0 },
];

const ConversationList = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ 
      width: { xs: '100%', md: 360 },
      borderRight: '1px solid #e0e0e0',
      bgcolor: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="700">Messages</Typography>
          <IconButton size="small">
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        <TextField 
          fullWidth
          size="small"
          variant="outlined" 
          placeholder="Search messages"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><Search fontSize="small" /></InputAdornment>),
            sx: { borderRadius: 2, bgcolor: '#f5f5f5', '& fieldset': { border: 'none' } }
          }}
        />
      </Box>
      
      <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
        {filteredConversations.map((conv) => (
          <ListItem 
            key={conv.id}
            onClick={() => setSelectedId(conv.id)}
            sx={{ 
              bgcolor: selectedId === conv.id ? '#f0f0ff' : 'transparent',
              borderLeft: selectedId === conv.id ? '3px solid #240046' : '3px solid transparent',
              cursor: 'pointer',
              py: 2,
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            <ListItemAvatar>
              <Badge 
                color="success" 
                variant="dot" 
                overlap="circular" 
                invisible={!conv.online}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar src={conv.avatar} sx={{ width: 48, height: 48 }} />
              </Badge>
            </ListItemAvatar>
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography fontWeight={conv.unread > 0 ? 700 : 600} fontSize="0.95rem">{conv.name}</Typography>
                  <Typography variant="caption" color="text.secondary" fontSize="0.7rem">{conv.time}</Typography>
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="caption" color="primary" display="block" fontSize="0.75rem">{conv.role}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                    <Typography 
                      variant="body2" 
                      noWrap 
                      color={conv.unread > 0 ? 'text.primary' : 'text.secondary'}
                      fontWeight={conv.unread > 0 ? 600 : 400}
                      sx={{ maxWidth: '200px' }}
                    >
                      {conv.message}
                    </Typography>
                    {conv.unread > 0 && (
                      <Badge 
                        badgeContent={conv.unread} 
                        color="primary" 
                        sx={{ '& .MuiBadge-badge': { bgcolor: '#240046', fontSize: '0.65rem' } }}
                      />
                    )}
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ConversationList;