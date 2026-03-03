'use client';

import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, TextField, Button, Paper, Stack, Divider } from '@mui/material';
import { Videocam, Call, Info, Send, AttachFile, EmojiEmotions, MoreVert, DoneAll } from '@mui/icons-material';

const ReceivedMessage = ({ text, time, avatar }) => (
  <Box sx={{ display: 'flex', gap: 1.5, maxWidth: '70%', alignSelf: 'flex-start', mb: 2 }}>
    <Avatar src={avatar} sx={{ width: 32, height: 32, mt: 0.5 }} />
    <Stack spacing={0.5}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1.5, 
          bgcolor: '#f5f5f5',
          borderRadius: '16px', 
          borderTopLeftRadius: '4px',
        }}
      >
        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{text}</Typography>
      </Paper>
      <Typography variant="caption" sx={{ color: 'text.disabled', pl: 1, fontSize: '0.7rem' }}>{time}</Typography>
    </Stack>
  </Box>
);

const SentMessage = ({ text, time }) => (
  <Box sx={{ display: 'flex', gap: 1.5, maxWidth: '70%', alignSelf: 'flex-end', mb: 2, flexDirection: 'row-reverse' }}>
    <Stack spacing={0.5} alignItems="flex-end">
      <Paper 
        elevation={0}
        sx={{ 
          p: 1.5, 
          bgcolor: '#240046',
          borderRadius: '16px', 
          borderTopRightRadius: '4px',
          color: 'white',
        }}
      >
        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{text}</Typography>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pr: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.7rem' }}>{time}</Typography>
        <DoneAll sx={{ fontSize: 14, color: '#00b4d8' }} />
      </Box>
    </Stack>
  </Box>
);

export default function ChatWindow() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending:', message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      bgcolor: 'white',
      minWidth: 0
    }}>
      
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 64, md: 72 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="https://i.pravatar.cc/150?img=5" sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="700" fontSize="0.95rem">Sarah Jenkins</Typography>
              <Typography variant="caption" color="text.secondary" fontSize="0.75rem">Senior Product Designer • Online</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small"><MoreVert /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        p: { xs: 2, md: 3 }, 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#fafafa'
      }}>
        <Divider sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.disabled" fontSize="0.7rem">TODAY</Typography>
        </Divider>

        <ReceivedMessage 
          avatar="https://i.pravatar.cc/150?img=5"
          text="Hi there! I've been reviewing your portfolio and really love the case study you did for the fintech app. Would you be open to discussing a potential role at TechCorp?"
          time="10:40 AM"
        />

        <SentMessage 
          text="Hello Sarah! Thank you so much for reaching out. I'm definitely interested. TechCorp is doing some incredible work in the space."
          time="10:42 AM"
        />

        <ReceivedMessage 
          avatar="https://i.pravatar.cc/150?img=5"
          text="Great to hear! Let me know if tomorrow at 2 PM PST works for a 15-min intro call."
          time="10:45 AM"
        />

        <SentMessage 
          text="That works perfectly! Looking forward to it."
          time="10:46 AM"
        />
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <IconButton size="small" sx={{ mb: 0.5 }}>
            <AttachFile fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ mb: 0.5 }}>
            <EmojiEmotions fontSize="small" />
          </IconButton>
          <TextField 
            fullWidth
            multiline 
            maxRows={3}
            size="small"
            placeholder="Type a message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 3,
                bgcolor: '#f5f5f5'
              }
            }}
          />
          <IconButton 
            onClick={handleSend}
            disabled={!message.trim()}
            sx={{ 
              bgcolor: '#240046',
              color: 'white',
              mb: 0.5,
              '&:hover': { bgcolor: '#3c096c' },
              '&:disabled': { bgcolor: '#e0e0e0' }
            }}
          >
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Box>

    </Box>
  );
}