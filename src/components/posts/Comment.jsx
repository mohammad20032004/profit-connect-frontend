'use client';

import React, { useCallback } from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Comment({ user, text_comment, userImage, timeAgo = 'الآن', userId }) {
  const router = useRouter();

  const handleClickUser = useCallback(() => {
    if (userId) {
      router.push(`/user-profile/${userId}`);
    }
  }, [router, userId]);

  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <Avatar
        src={userImage || `https://i.pravatar.cc/150?u=${user}`}
        sx={{ width: 40, height: 40, cursor: userId ? 'pointer' : 'default' }}
        onClick={handleClickUser}
      />
      <Box sx={{ flex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: '#f3f6f8',
            p: 1.5,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography
            role="button"
            tabIndex={0}
            onClick={handleClickUser}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleClickUser();
            }}
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              mb: 0.5,
              cursor: userId ? 'pointer' : 'default',
              display: 'inline-block',
              '&:hover': userId ? {
                color: '#0ea5e9',
                textDecoration: 'underline',
              } : {},
            }}
          >
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
