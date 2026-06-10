'use client';

import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { getUserById } from '@/services/userService';

export default function Comment({ user, text_comment, userImage, timeAgo = 'الآن', userId }) {
  const router = useRouter();
  const { token } = useSelector((state) => state.user);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const handleClickUser = useCallback(async () => {
    if (!userId) return;
    if (!token) {
      router.push(`/profile/${userId}`);
      return;
    }

    try {
      setLoadingProfile(true);
      const res = await getUserById({ token, userId });
      // تمرير البيانات عبر query ليست الأفضل، لكن بدون بنية state/redirect الحالية سنحتاج طريقة.
      // سيتم فتح صفحة profile مع الاعتماد على backend endpoint لاسترجاع كامل البيانات عند الحاجة.
      router.push(`/profile/${res?.data?.id || userId}`);
    } catch {
      router.push(`/profile/${userId}`);
    } finally {
      setLoadingProfile(false);
    }
  }, [router, token, userId]);

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
              opacity: loadingProfile ? 0.7 : 1,
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

