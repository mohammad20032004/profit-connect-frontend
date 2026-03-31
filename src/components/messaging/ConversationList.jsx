'use client';

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Edit, Search } from '@mui/icons-material';

export const demoConversations = [
  { id: 1, name: 'Sarah Jenkins', role: 'Senior Product Designer', avatar: 'https://i.pravatar.cc/150?img=5', message: "I've attached the draft for the dashboard refresh.", time: '10:45 AM', online: true, unread: 2 },
  { id: 2, name: 'Ahmed Hassan', role: 'React Developer', avatar: 'https://i.pravatar.cc/150?img=12', message: 'Thanks for the feedback. I pushed the new branch.', time: 'Yesterday', online: false, unread: 0 },
  { id: 3, name: 'Emily Chen', role: 'AI/ML Engineer', avatar: 'https://i.pravatar.cc/150?img=9', message: 'Let me check the model metrics again and get back to you.', time: '2 days ago', online: true, unread: 0 },
  { id: 4, name: 'Marcus Williams', role: 'Backend Engineer', avatar: 'https://i.pravatar.cc/150?img=14', message: 'Meeting at 3 PM still works on my side.', time: '3 days ago', online: false, unread: 1 },
  { id: 5, name: 'Lisa Anderson', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=47', message: 'CSS Grid is amazing for this layout.', time: '1 week ago', online: true, unread: 0 },
];

const ConversationList = ({
  conversations = demoConversations,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelectConversation,
}) => {
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: { xs: '100%', md: 370 },
        minWidth: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: { xs: 'none', md: '1px solid rgba(226,232,240,0.9)' },
        bgcolor: 'rgba(255,255,255,0.42)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <Box sx={{ p: 2.25, borderBottom: '1px solid rgba(226,232,240,0.85)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Messages</Typography>
            <Typography sx={{ color: '#64748b', fontSize: '0.82rem' }}>Stay close to your active conversations.</Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.6)',
              color: '#5b21b6',
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          size="small"
          placeholder="Search messages"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" sx={{ color: '#64748b' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.62)',
              '& fieldset': { borderColor: 'rgba(226,232,240,0.9)' },
            },
          }}
        />
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', p: 1.2 }}>
        {filteredConversations.map((conv) => {
          const isSelected = selectedId === conv.id;
          return (
            <ListItemButton
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
              sx={{
                mb: 1,
                alignItems: 'flex-start',
                borderRadius: 3,
                border: '1px solid transparent',
                bgcolor: isSelected ? 'rgba(91,33,182,0.12)' : 'rgba(255,255,255,0.38)',
                borderColor: isSelected ? 'rgba(91,33,182,0.22)' : 'rgba(255,255,255,0.45)',
                boxShadow: isSelected ? '0 12px 24px rgba(91,33,182,0.08)' : 'none',
                '&:hover': {
                  bgcolor: isSelected ? 'rgba(91,33,182,0.14)' : 'rgba(255,255,255,0.58)',
                },
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
                disableTypography
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontWeight: conv.unread > 0 ? 800 : 700, fontSize: '0.94rem', color: '#0f172a' }}>
                      {conv.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', flexShrink: 0 }}>
                      {conv.time}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 0.35 }}>
                    <Typography sx={{ color: '#5b21b6', fontSize: '0.73rem', fontWeight: 700, mb: 0.4 }}>
                      {conv.role}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                      <Typography
                        noWrap
                        sx={{
                          maxWidth: '190px',
                          color: conv.unread > 0 ? '#334155' : '#64748b',
                          fontWeight: conv.unread > 0 ? 700 : 500,
                          fontSize: '0.82rem',
                        }}
                      >
                        {conv.message}
                      </Typography>
                      {conv.unread > 0 ? (
                        <Box
                          sx={{
                            minWidth: 20,
                            height: 20,
                            px: 0.75,
                            borderRadius: 999,
                            bgcolor: '#240046',
                            color: '#fff',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                          }}
                        >
                          {conv.unread}
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default ConversationList;
