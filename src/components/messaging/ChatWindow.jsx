'use client';

import { useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { AttachFile, DoneAll, EmojiEmotions, MoreVert, Send } from '@mui/icons-material';

const messageMap = {
  1: [
    { id: '1-r-1', type: 'received', text: 'Hi there! I reviewed your portfolio and loved the fintech case study.', time: '10:40 AM' },
    { id: '1-s-1', type: 'sent', text: 'Thank you, Sarah. I am glad it resonated with you.', time: '10:42 AM' },
    { id: '1-r-2', type: 'received', text: 'Would you be open to a quick intro chat tomorrow?', time: '10:45 AM' },
    { id: '1-s-2', type: 'sent', text: 'Absolutely. Tomorrow works well for me.', time: '10:46 AM' },
  ],
  2: [
    { id: '2-r-1', type: 'received', text: 'Thanks for the feedback. I pushed the updated branch.', time: 'Yesterday' },
    { id: '2-s-1', type: 'sent', text: 'Perfect, I will review it tonight.', time: 'Yesterday' },
  ],
  3: [
    { id: '3-r-1', type: 'received', text: 'Let me verify the latest metrics and send you the summary.', time: '2 days ago' },
  ],
  4: [
    { id: '4-r-1', type: 'received', text: 'Meeting at 3 PM still works on my side.', time: '3 days ago' },
  ],
  5: [
    { id: '5-r-1', type: 'received', text: 'CSS Grid is amazing for this layout.', time: '1 week ago' },
  ],
};

const Bubble = ({ type, text, time, avatar }) => {
  const isSent = type === 'sent';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.25,
        maxWidth: '75%',
        alignSelf: isSent ? 'flex-end' : 'flex-start',
        mb: 2,
        flexDirection: isSent ? 'row-reverse' : 'row',
      }}
    >
      {!isSent ? <Avatar src={avatar} sx={{ width: 34, height: 34, mt: 0.5 }} /> : null}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isSent ? 'flex-end' : 'flex-start' }}>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 3,
            borderTopLeftRadius: isSent ? 16 : 6,
            borderTopRightRadius: isSent ? 6 : 16,
            color: isSent ? '#fff' : '#1e293b',
            bgcolor: isSent ? '#240046' : 'rgba(255,255,255,0.66)',
            border: isSent ? 'none' : '1px solid rgba(255,255,255,0.55)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 12px 26px rgba(15,23,42,0.06)',
          }}
        >
          <Typography sx={{ lineHeight: 1.65, fontSize: '0.9rem' }}>{text}</Typography>
        </Paper>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 0.8, mt: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>{time}</Typography>
          {isSent ? <DoneAll sx={{ fontSize: 14, color: '#0ea5e9' }} /> : null}
        </Box>
      </Box>
    </Box>
  );
};

export default function ChatWindow({ conversation }) {
  const [message, setMessage] = useState('');
  const messages = useMemo(() => messageMap[conversation?.id] || [], [conversation?.id]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  if (!conversation) {
    return (
      <Box sx={{ flex: 1, display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,0.28)' }}>
        <Typography sx={{ color: '#64748b' }}>Select a conversation to start messaging.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: 0,
        bgcolor: 'rgba(255,255,255,0.22)',
      }}
    >
      <AppBar position="static" color="inherit" elevation={0} sx={{ bgcolor: 'transparent', borderBottom: '1px solid rgba(226,232,240,0.85)' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 64, md: 74 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
            <Avatar src={conversation.avatar} sx={{ width: 42, height: 42, boxShadow: '0 10px 20px rgba(15,23,42,0.08)' }} />
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>{conversation.name}</Typography>
              <Typography sx={{ color: '#64748b', fontSize: '0.77rem' }}>
                {conversation.role} {conversation.online ? '• Online' : '• Offline'}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.6)',
              color: '#5b21b6',
            }}
          >
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(circle at top left, rgba(255,255,255,0.45), transparent 22%), linear-gradient(180deg, rgba(248,250,252,0.75), rgba(241,245,249,0.55))',
        }}
      >
        <Divider sx={{ mb: 3 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>TODAY</Typography>
        </Divider>

        {messages.map((item) => (
          <Bubble
            key={item.id}
            type={item.type}
            text={item.text}
            time={item.time}
            avatar={conversation.avatar}
          />
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(226,232,240,0.85)', bgcolor: 'rgba(255,255,255,0.34)' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <IconButton size="small" sx={{ mb: 0.5, color: '#64748b' }}>
            <AttachFile fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ mb: 0.5, color: '#64748b' }}>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.62)',
              },
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
              '&:disabled': { bgcolor: '#cbd5e1', color: '#94a3b8' },
            }}
          >
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
