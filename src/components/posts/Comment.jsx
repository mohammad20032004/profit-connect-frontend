'use client';

import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';

export default function Comment({ user, text_comment, userImage, timeAgo = 'الآن' }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <Avatar 
        src={userImage || `https://i.pravatar.cc/150?u=${user}`} 
        sx={{ width: 40, height: 40 }}
      />
      <Box sx={{ flex: 1 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            bgcolor: '#f3f6f8', 
            p: 1.5, 
            borderRadius: 2,
            border: '1px solid #e0e0e0'
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {user}
          </Typography>
          <Typography variant="body2" sx={{ color: '#191919', lineHeight: 1.5 }}>
            {text_comment}
          </Typography>
        </Paper>
        <Typography variant="caption" sx={{ color: '#666', ml: 1.5, mt: 0.5, display: 'block' }}>
          {timeAgo}
        </Typography>
      </Box>
    </Box>
  );
}
